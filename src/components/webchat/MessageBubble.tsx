"use client";

import { useState } from "react";
import { ConciergeBell, User, Users, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import CitationList from "./CitationList";
import MarkdownText from "./MarkdownText";
import type { DisplayMessage } from "./types";

interface Props {
  message: DisplayMessage;
  onRetry?: (message: DisplayMessage) => void;
  onFeedback?: (rating: "up" | "down") => void;
}

const ICONS = { guest: User, ai: ConciergeBell, human: Users, system: ConciergeBell } as const;

export default function MessageBubble({ message, onRetry, onFeedback }: Props) {
  const [feedbackGiven, setFeedbackGiven] = useState<"up" | "down" | null>(null);
  const isGuest = message.role === "guest";
  const Icon = ICONS[message.role];

  const bubbleStyle = isGuest
    ? "bg-accent text-ivory"
    : message.role === "human"
      ? "bg-primary/90 text-ivory"
      : message.role === "system"
        ? "bg-sand/70 text-charcoal italic"
        : "bg-white text-charcoal border border-sand/50 shadow-sm";

  return (
    <div className={`flex gap-2 max-w-[85%] ${isGuest ? "self-end flex-row-reverse" : "self-start"}`}>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
          isGuest ? "bg-accent text-ivory" : "bg-primary text-ivory"
        }`}
        aria-hidden="true"
      >
        <Icon size={12} />
      </div>
      <div className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${bubbleStyle} ${message.status === "failed" ? "opacity-70" : ""}`}>
        {message.role === "human" && (
          <p className="mb-0.5 text-[10px] uppercase tracking-widest text-ivory/70">Resort Staff</p>
        )}
        {message.role === "ai" || message.role === "human" ? (
          <MarkdownText text={message.text} />
        ) : (
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        )}

        {message.status === "failed" && onRetry && (
          <button
            type="button"
            onClick={() => onRetry(message)}
            className="mt-2 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-ivory/90 hover:text-ivory underline"
          >
            <RefreshCw size={11} />
            Retry
          </button>
        )}

        {message.role === "ai" && message.citations && <CitationList citations={message.citations} />}

        {message.role === "ai" && onFeedback && (
          <div className="mt-2 flex items-center gap-2 border-t border-sand/60 pt-1.5">
            <span className="text-[10px] text-charcoal/50">Helpful?</span>
            <button
              type="button"
              aria-label="Mark response as helpful"
              disabled={feedbackGiven !== null}
              onClick={() => {
                setFeedbackGiven("up");
                onFeedback("up");
              }}
              className={`p-1 rounded transition-colors ${feedbackGiven === "up" ? "text-primary" : "text-charcoal/40 hover:text-primary"}`}
            >
              <ThumbsUp size={12} />
            </button>
            <button
              type="button"
              aria-label="Mark response as not helpful"
              disabled={feedbackGiven !== null}
              onClick={() => {
                setFeedbackGiven("down");
                onFeedback("down");
              }}
              className={`p-1 rounded transition-colors ${feedbackGiven === "down" ? "text-accent" : "text-charcoal/40 hover:text-accent"}`}
            >
              <ThumbsDown size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
