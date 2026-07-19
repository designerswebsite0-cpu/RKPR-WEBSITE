import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

// Both HttpOnly — the raw session token never reaches browser JavaScript
// (Phase 5 brief §3: "Do not store API secrets in local storage"). The
// session id alone is meaningless without the token, but is kept HttpOnly
// too for consistency and to prevent client-side tampering with it.
export const TOKEN_COOKIE = "rkpr_wc_token";
export const SESSION_ID_COOKIE = "rkpr_wc_sid";

const isProduction = process.env.NODE_ENV === "production";

export async function getWebchatCookies(): Promise<{ token: string | null; sessionId: string | null }> {
  const store = await cookies();
  return {
    token: store.get(TOKEN_COOKIE)?.value ?? null,
    sessionId: store.get(SESSION_ID_COOKIE)?.value ?? null,
  };
}

/** Server-side only: forwards the visitor's real IP (so the backend's
 * per-IP rate limits key on the actual guest, not this Next.js server) and
 * the webchat session token as a header — never as a cookie the browser
 * could read, and never the FastAPI backend's own secrets. */
export async function fetchFromWebchatApi(path: string, init: RequestInit = {}): Promise<Response> {
  const { token } = await getWebchatCookies();
  const incoming = await headers();
  const forwardedFor = incoming.get("x-forwarded-for") ?? incoming.get("x-real-ip");

  const requestHeaders = new Headers(init.headers);
  requestHeaders.set("Content-Type", "application/json");
  if (token) requestHeaders.set("x-webchat-session-token", token);
  if (forwardedFor) requestHeaders.set("x-forwarded-for", forwardedFor);

  return fetch(`${API_BASE_URL}${path}`, { ...init, headers: requestHeaders, cache: "no-store" });
}

export async function setWebchatCookies(token: string, sessionId: string, maxAgeSeconds: number): Promise<void> {
  const store = await cookies();
  const shared = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
  store.set(TOKEN_COOKIE, token, shared);
  store.set(SESSION_ID_COOKIE, sessionId, shared);
}

export async function clearWebchatCookies(): Promise<void> {
  const store = await cookies();
  store.delete(TOKEN_COOKIE);
  store.delete(SESSION_ID_COOKIE);
}

/** Every webchat Route Handler wraps its body in this — an unhandled
 * exception (bad FastAPI_BASE_URL, a network failure, malformed upstream
 * JSON, etc.) must never surface as a bare platform crash (empty body, no
 * detail anywhere). Logs the real error server-side (visible in Vercel's
 * Runtime Logs, including the resolved API_BASE_URL so a misconfigured
 * env var is immediately obvious there) and always returns the same safe,
 * generic envelope to the client — never a stack trace or internal URL. */
export function logWebchatRouteError(context: string, err: unknown): NextResponse {
  console.error(`[webchat:${context}] API_BASE_URL=${API_BASE_URL}`, err);
  return NextResponse.json(
    { success: false, error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again shortly." } },
    { status: 500 },
  );
}
