import { NextRequest, NextResponse } from "next/server";
import { fetchFromWebchatApi, getWebchatCookies, logWebchatRouteError } from "@/lib/server-webchat";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await getWebchatCookies();
    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: { code: "SESSION_REQUIRED", message: "Start a chat session first" } },
        { status: 440 },
      );
    }

    const body = await request.text();
    const upstream = await fetchFromWebchatApi(`/api/v1/webchat/sessions/${sessionId}/feedback`, {
      method: "POST",
      body,
    });
    const payload = await upstream.json();
    return NextResponse.json(payload, { status: upstream.status });
  } catch (err) {
    return logWebchatRouteError("feedback:POST", err);
  }
}
