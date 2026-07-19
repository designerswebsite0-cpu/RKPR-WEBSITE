import { NextRequest, NextResponse } from "next/server";
import { fetchFromWebchatApi, getWebchatCookies, logWebchatRouteError } from "@/lib/server-webchat";

function noSessionResponse() {
  return NextResponse.json(
    { success: false, error: { code: "SESSION_REQUIRED", message: "Start a chat session first" } },
    { status: 440 },
  );
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await getWebchatCookies();
    if (!sessionId) return noSessionResponse();

    const body = await request.text();
    const upstream = await fetchFromWebchatApi(`/api/v1/webchat/sessions/${sessionId}/messages`, {
      method: "POST",
      body,
    });
    const payload = await upstream.json();
    return NextResponse.json(payload, { status: upstream.status });
  } catch (err) {
    return logWebchatRouteError("messages:POST", err);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { sessionId } = await getWebchatCookies();
    if (!sessionId) return noSessionResponse();

    const upstream = await fetchFromWebchatApi(
      `/api/v1/webchat/sessions/${sessionId}/messages${request.nextUrl.search}`,
    );
    const payload = await upstream.json();
    return NextResponse.json(payload, { status: upstream.status });
  } catch (err) {
    return logWebchatRouteError("messages:GET", err);
  }
}
