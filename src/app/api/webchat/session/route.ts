import { NextResponse } from "next/server";
import {
  clearWebchatCookies,
  fetchFromWebchatApi,
  getWebchatCookies,
  setWebchatCookies,
} from "@/lib/server-webchat";

/** Restores an existing session (page refresh) — returns { exists: false }
 * rather than an error when there's nothing to restore, since "no session
 * yet" is the normal first-visit state, not a failure. */
export async function GET() {
  const { token, sessionId } = await getWebchatCookies();
  if (!token || !sessionId) {
    return NextResponse.json({ success: true, data: { exists: false } });
  }

  const upstream = await fetchFromWebchatApi(`/api/v1/webchat/sessions/${sessionId}`);
  if (upstream.status === 401 || upstream.status === 404) {
    await clearWebchatCookies();
    return NextResponse.json({ success: true, data: { exists: false } });
  }

  const payload = await upstream.json();
  if (!upstream.ok) {
    return NextResponse.json(payload, { status: upstream.status });
  }
  return NextResponse.json({ success: true, data: { exists: true, ...payload.data } });
}

export async function POST() {
  const upstream = await fetchFromWebchatApi("/api/v1/webchat/sessions", { method: "POST" });
  const payload = await upstream.json();
  if (!upstream.ok) {
    return NextResponse.json(payload, { status: upstream.status });
  }

  const { token, session_id: sessionId, expires_at: expiresAt, ...safeData } = payload.data;
  const maxAge = Math.max(1, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
  await setWebchatCookies(token, sessionId, maxAge);

  // Never forward the raw token back into the browser-visible response —
  // the cookie is the only place it lives from here on.
  return NextResponse.json({ success: true, data: { session_id: sessionId, expires_at: expiresAt, ...safeData } });
}

export async function DELETE() {
  const { sessionId } = await getWebchatCookies();
  if (sessionId) {
    await fetchFromWebchatApi(`/api/v1/webchat/sessions/${sessionId}`, { method: "DELETE" });
  }
  await clearWebchatCookies();
  return NextResponse.json({ success: true, data: { ended: true } });
}
