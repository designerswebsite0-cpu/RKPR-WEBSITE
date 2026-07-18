import type { WebchatCitation, WebchatHandoff } from "@/lib/webchat-client";

export type MessageRole = "guest" | "ai" | "human" | "system";
export type MessageStatus = "sending" | "sent" | "failed";

export interface DisplayMessage {
  id: string;
  role: MessageRole;
  text: string;
  citations?: WebchatCitation[];
  status: MessageStatus;
  clientMessageId?: string;
  createdAt: string;
}

export type HandoffStatus = WebchatHandoff["status"];
