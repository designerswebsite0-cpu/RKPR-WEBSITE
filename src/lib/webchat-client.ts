/**
 * Browser-side client for the resort's website chat — talks only to this
 * Next.js app's own same-origin /api/webchat/* routes, never to the
 * FastAPI backend directly (see docs/phase-5/WEBCHAT_ARCHITECTURE.md).
 * No AI/backend credentials of any kind exist in this file or anywhere
 * else in browser-shipped code.
 */

export interface WebchatSessionState {
  exists: boolean;
  session_id?: string;
  conversation_id?: string;
  current_state?: string;
  flow_state?: string | null;
  status?: string;
  ai_active?: boolean;
  human_active?: boolean;
  expires_at?: string;
}

export interface WebchatCitation {
  source_title: string;
  source_priority: string;
  authoritative: boolean;
}

export interface WebchatHandoff {
  required: boolean;
  status: "none" | "requested" | "active";
  department: string | null;
}

export interface WebchatMessageResult {
  message_id: string | null;
  response_text: string | null;
  citations: WebchatCitation[];
  handoff: WebchatHandoff;
  ai_active: boolean;
  human_active: boolean;
  flow_state: string | null;
  error_code: string | null;
}

export interface WebchatTranscriptMessage {
  id: string;
  sender_type: "customer" | "ai" | "human" | "system";
  content_text: string | null;
  created_at: string;
}

export class WebchatApiError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

type Envelope<T> =
  | { success: true; data: T }
  | { success: false; error: { code: string; message: string } };

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
  } catch {
    throw new WebchatApiError("network_error", "Unable to reach the chat service right now.", 0);
  }

  let payload: Envelope<T>;
  try {
    payload = await response.json();
  } catch {
    throw new WebchatApiError("bad_response", "Received an unreadable response from the chat service.", response.status);
  }

  if (!response.ok || !payload.success) {
    const code = !payload.success ? payload.error.code : "unknown_error";
    const message = !payload.success ? payload.error.message : "Something went wrong.";
    throw new WebchatApiError(
      response.status === 429 ? "rate_limited" : response.status === 440 ? "session_required" : code,
      message,
      response.status,
    );
  }

  return payload.data;
}

export function restoreSession(): Promise<WebchatSessionState> {
  return call<WebchatSessionState>("/api/webchat/session");
}

export function startSession(): Promise<WebchatSessionState> {
  return call<WebchatSessionState>("/api/webchat/session", { method: "POST" });
}

export function endSession(): Promise<{ ended: boolean }> {
  return call<{ ended: boolean }>("/api/webchat/session", { method: "DELETE" });
}

/** Ensures a session exists (restoring one on refresh, or minting a fresh
 * one on a guest's first visit) before the caller needs it. */
export async function ensureSession(): Promise<WebchatSessionState> {
  const restored = await restoreSession();
  if (restored.exists) return restored;
  return startSession();
}

export function sendMessage(message: string, clientMessageId: string): Promise<WebchatMessageResult> {
  return call<WebchatMessageResult>("/api/webchat/messages", {
    method: "POST",
    body: JSON.stringify({ message, client_message_id: clientMessageId }),
  });
}

export function listMessages(
  page = 1,
  pageSize = 50,
): Promise<{ items: WebchatTranscriptMessage[]; meta: { total: number } }> {
  return call(`/api/webchat/messages?page=${page}&page_size=${pageSize}`);
}

export function requestHandoff(reason: string): Promise<WebchatSessionState> {
  return call<WebchatSessionState>("/api/webchat/handoff", {
    method: "POST",
    body: JSON.stringify({ reason }),
  });
}

export function submitFeedback(
  turnId: string | null,
  rating: "up" | "down",
  comment?: string,
): Promise<{ recorded: boolean }> {
  return call<{ recorded: boolean }>("/api/webchat/feedback", {
    method: "POST",
    body: JSON.stringify({ turn_id: turnId, rating, comment }),
  });
}

export interface WebchatContactPayload {
  full_name?: string;
  phone?: string;
  email?: string;
  marketing_consent?: boolean;
}

export function submitContact(payload: WebchatContactPayload): Promise<{ message: string }> {
  return call<{ message: string }>("/api/webchat/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function generateClientMessageId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
