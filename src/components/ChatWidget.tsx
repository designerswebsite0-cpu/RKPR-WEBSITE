"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ensureSession,
  restoreSession,
  listMessages,
  sendMessage,
  requestHandoff,
  submitFeedback,
  generateClientMessageId,
  WebchatApiError,
  type WebchatSessionState,
  type WebchatTranscriptMessage,
} from "@/lib/webchat-client";
import { resortDetails } from "@/data/contact";
import MessageBubble from "@/components/webchat/MessageBubble";
import QuickActions, { type QuickAction } from "@/components/webchat/QuickActions";
import ContactPrompt from "@/components/webchat/ContactPrompt";
import type { DisplayMessage } from "@/components/webchat/types";

const WELCOME_MESSAGE: DisplayMessage = {
  id: "welcome",
  role: "ai",
  text: "Namaste and welcome to RKPR Resort! I am Aranya, your concierge. How may I help you discover our sanctuary today?",
  status: "sent",
  createdAt: new Date().toISOString(),
};

const POLL_INTERVAL_MS = 10000;

// Pacing to feel like a real person reading and typing a reply, not an
// instant machine response: a short pause before anything shows a
// "typing…" indicator, and a minimum total time before the reply appears
// even if the backend genuinely answered faster than that.
const TYPING_INDICATOR_DELAY_MS = 1200;
const MIN_REPLY_DELAY_MS = 1800;

// A rough, client-side-only heuristic for "this probably isn't a quick
// lookup" — never a business decision (the backend's own handoff/tool
// logic is what actually decides anything), just a cue for showing an
// immediate acknowledgment before the real reply, the way a real
// receptionist would say "let me check" before actually checking.
const HEAVY_TASK_KEYWORDS = [
  "book", "booking", "reserve", "reservation",
  "cancel", "cancellation",
  "refund", "reimburse",
  "modify my", "change my booking", "change my reservation", "reschedule",
  "complaint", "complain",
  "speak to staff", "speak to a human", "talk to a person", "human agent",
  "negotiate", "discount", "lower the price",
];

function isHeavyTask(text: string): boolean {
  const lowered = text.toLowerCase();
  return HEAVY_TASK_KEYWORDS.some((keyword) => lowered.includes(keyword));
}

const HEAVY_TASK_ACK_PHRASES = [
  "Just a sec, let me look into that for you…",
  "One moment please…",
  "Give me a moment to check that…",
  "Just a moment, checking now…",
  "Let me pull that up for you, one sec…",
];

function randomAckPhrase(): string {
  return HEAVY_TASK_ACK_PHRASES[Math.floor(Math.random() * HEAVY_TASK_ACK_PHRASES.length)];
}

function transcriptToDisplay(items: WebchatTranscriptMessage[]): DisplayMessage[] {
  const roleMap: Record<WebchatTranscriptMessage["sender_type"], DisplayMessage["role"]> = {
    customer: "guest",
    ai: "ai",
    human: "human",
    system: "system",
  };
  return items
    .filter((item) => item.content_text)
    .map((item) => ({
      id: item.id,
      role: roleMap[item.sender_type],
      text: item.content_text as string,
      status: "sent",
      createdAt: item.created_at,
    }));
}

function errorMessageFor(err: unknown): string {
  if (err instanceof WebchatApiError) {
    if (err.code === "rate_limited") {
      return "You're sending messages a little quickly — please wait a moment and try again.";
    }
    if (err.code === "network_error") {
      return `I'm having trouble connecting right now. Please try again, or call our reception at ${resortDetails.phone}.`;
    }
  }
  return `Something went wrong on our end. Please try again, or call our reception at ${resortDetails.phone}.`;
}

function handoffBannerText(state: WebchatSessionState | null): string | null {
  if (!state) return null;
  if (state.human_active) return "You're now chatting with a member of our team.";
  if (state.flow_state === "human_handoff_requested" || state.status === "escalated") {
    return "Connecting you with our team — they'll respond here shortly.";
  }
  return null;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<DisplayMessage[]>([WELCOME_MESSAGE]);
  const [isSending, setIsSending] = useState(false);
  const [isTypingVisible, setIsTypingVisible] = useState(false);
  const [bannerError, setBannerError] = useState<string | null>(null);
  const [sessionState, setSessionState] = useState<WebchatSessionState | null>(null);
  const [showContactPrompt, setShowContactPrompt] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Restore a session from a prior visit (page refresh) — never creates a
  // new one on its own (brief §3: a guest who never opens the widget
  // should never get a database row).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const state = await restoreSession();
        if (cancelled || !state.exists) return;
        setSessionState(state);
        const transcript = await listMessages(1, 50);
        if (transcript.items.length) setMessages(transcriptToDisplay(transcript.items));
      } catch {
        // No reachable session to restore — guest just starts fresh.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  }, [messages, isTypingVisible, prefersReducedMotion]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  function openChat() {
    setIsOpen(true);
    setHasUnread(false);
  }

  // Lets staff replies (sent from the dashboard, not this widget) show up
  // here without a page refresh. This is a deliberate, documented stand-in
  // for real-time delivery — see docs/phase-5/WEBCHAT_ARCHITECTURE.md for
  // why real streaming/websockets were deferred rather than faked.
  useEffect(() => {
    if (!sessionState?.session_id) return;
    const interval = setInterval(async () => {
      try {
        const transcript = await listMessages(1, 50);
        const incoming = transcript.items.filter((item) => item.sender_type !== "customer");
        setMessages((prev) => {
          const knownIds = new Set(prev.map((m) => m.id));
          const fresh = transcriptToDisplay(incoming).filter((m) => !knownIds.has(m.id));
          if (!fresh.length) return prev;
          if (!isOpen) setHasUnread(true);
          return [...prev, ...fresh];
        });
      } catch {
        // Transient poll failure — try again next tick.
      }
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [sessionState?.session_id, isOpen]);

  const dispatchMessage = useCallback(
    async (text: string, retry?: DisplayMessage) => {
      const clientMessageId = retry?.clientMessageId ?? generateClientMessageId();
      const localId = retry?.id ?? `local-${clientMessageId}`;
      setBannerError(null);

      const showHeavyTaskAck = !retry && isHeavyTask(text);
      setMessages((prev) =>
        retry
          ? prev.map((m) => (m.id === localId ? { ...m, status: "sending" } : m))
          : [
              ...prev,
              {
                id: localId,
                role: "guest",
                text,
                status: "sending",
                clientMessageId,
                createdAt: new Date().toISOString(),
              },
              // An immediate acknowledgment for anything that sounds like
              // more than a quick lookup — a real receptionist says "let
              // me check" before actually checking, not after.
              ...(showHeavyTaskAck
                ? [
                    {
                      id: `ack-${clientMessageId}`,
                      role: "ai" as const,
                      text: randomAckPhrase(),
                      status: "sent" as const,
                      createdAt: new Date().toISOString(),
                    },
                  ]
                : []),
            ],
      );
      setIsSending(true);
      const sentAt = Date.now();
      const typingTimer = setTimeout(() => setIsTypingVisible(true), TYPING_INDICATOR_DELAY_MS);

      try {
        let state = sessionState;
        if (!state?.session_id) {
          state = await ensureSession();
          setSessionState(state);
        }
        const result = await sendMessage(text, clientMessageId);

        // Never reveal a reply faster than a real person plausibly would,
        // even if the backend genuinely answered right away.
        const elapsed = Date.now() - sentAt;
        if (elapsed < MIN_REPLY_DELAY_MS) {
          await new Promise((resolve) => setTimeout(resolve, MIN_REPLY_DELAY_MS - elapsed));
        }
        clearTimeout(typingTimer);
        setIsTypingVisible(false);

        setMessages((prev) => prev.map((m) => (m.id === localId ? { ...m, status: "sent" } : m)));
        setSessionState((prev) =>
          prev
            ? { ...prev, ai_active: result.ai_active, human_active: result.human_active, flow_state: result.flow_state }
            : prev,
        );
        if (result.response_text) {
          // Use the backend's real message id (when available) rather than
          // a synthetic one — the staff-reply poll below dedupes incoming
          // transcript messages by id, so a synthetic id here would never
          // match the real one it later fetches, causing this same AI
          // reply to appear a second time (without citations, since the
          // transcript endpoint doesn't include them) once the poll runs.
          const aiMessageId = result.message_id ?? `ai-${clientMessageId}`;
          setMessages((prev) => {
            // Idempotent add: React 19's development Strict Mode replays
            // an event handler's post-await continuation once (mount →
            // cleanup → mount, applied to the async continuation, not just
            // effects), which would otherwise append this exact reply
            // twice for a single guest message. Guarding on id makes this
            // safe regardless of how many times it's invoked.
            if (prev.some((m) => m.id === aiMessageId)) return prev;
            return [
              ...prev,
              {
                id: aiMessageId,
                role: "ai",
                text: result.response_text as string,
                citations: result.citations,
                status: "sent",
                createdAt: new Date().toISOString(),
              },
            ];
          });
        }
        if (result.handoff.status !== "none") setShowContactPrompt(true);
      } catch (err) {
        // A failure surfaces immediately — no reason to fake a delay on bad news.
        clearTimeout(typingTimer);
        setIsTypingVisible(false);
        setMessages((prev) => prev.map((m) => (m.id === localId ? { ...m, status: "failed" } : m)));
        setBannerError(errorMessageFor(err));
      } finally {
        setIsSending(false);
      }
    },
    [sessionState],
  );

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;
    setInput("");
    await dispatchMessage(text);
  }

  async function handleQuickAction(action: QuickAction) {
    if (isSending) return;
    if (action.action === "handoff") {
      setIsSending(true);
      setBannerError(null);
      try {
        if (!sessionState?.session_id) await ensureSession();
        const state = await requestHandoff("Guest requested to speak with a staff member.");
        setSessionState(state);
        setMessages((prev) => [
          ...prev,
          {
            id: `system-${Date.now()}`,
            role: "system",
            text: "Connecting you with a member of our team — they'll follow up with you here shortly.",
            status: "sent",
            createdAt: new Date().toISOString(),
          },
        ]);
        setShowContactPrompt(true);
      } catch {
        setBannerError(`Couldn't reach our team right now — please call reception at ${resortDetails.phone}.`);
      } finally {
        setIsSending(false);
      }
      return;
    }
    if (action.message) await dispatchMessage(action.message);
  }

  function handleFeedback(rating: "up" | "down") {
    submitFeedback(null, rating).catch(() => {
      // Best-effort — feedback is optional (brief §4), never worth
      // surfacing an error to the guest over.
    });
  }

  const banner = handoffBannerText(sessionState);

  return (
    <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 font-sans select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Chat with Aranya at RKPR Resort"
            initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.8, y: 50 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.25 }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsOpen(false);
            }}
            className="bg-ivory border border-sand w-screen h-[100dvh] sm:w-[380px] sm:h-[600px] sm:rounded-lg shadow-2xl flex flex-col overflow-hidden sm:mb-4"
          >
            {/* Header */}
            <div className="bg-primary text-ivory px-4 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-ivory">
                  <Bot size={18} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-serif text-sm font-semibold tracking-wide">Aranya</h2>
                  <p className="text-[10px] text-accent-light uppercase tracking-widest font-light">
                    Front Desk · Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="text-ivory/80 hover:text-ivory transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light rounded p-1"
              >
                <X size={20} />
              </button>
            </div>

            {banner && (
              <div className="bg-accent-light/30 text-primary text-[11px] px-4 py-2 border-b border-sand shrink-0">
                {banner}
              </div>
            )}

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-sand/20"
              aria-live="polite"
              aria-atomic="false"
              data-lenis-prevent
            >
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onRetry={(m) => dispatchMessage(m.text, m)}
                  onFeedback={message.role === "ai" && message.id !== "welcome" ? handleFeedback : undefined}
                />
              ))}
              {isTypingVisible && (
                <div className="flex gap-2 self-start max-w-[80%]" aria-label="Aranya is typing" role="status">
                  <div className="w-6 h-6 rounded-full bg-primary text-ivory flex items-center justify-center text-xs shrink-0">
                    <Bot size={12} />
                  </div>
                  <div className="rounded-lg px-4 py-3 bg-white border border-sand/50 shadow-sm flex items-center gap-1">
                    <span className="typing-dot w-1.5 h-1.5 bg-charcoal/40 rounded-full" style={{ animationDelay: "0ms" }} />
                    <span className="typing-dot w-1.5 h-1.5 bg-charcoal/40 rounded-full" style={{ animationDelay: "200ms" }} />
                    <span className="typing-dot w-1.5 h-1.5 bg-charcoal/40 rounded-full" style={{ animationDelay: "400ms" }} />
                  </div>
                </div>
              )}
              {bannerError && (
                <div
                  role="alert"
                  className="self-center rounded-md bg-red-50 border border-red-200 px-3 py-2 text-[11px] text-red-700 max-w-[90%]"
                >
                  {bannerError}
                </div>
              )}
              {showContactPrompt && <ContactPrompt onDone={() => setShowContactPrompt(false)} />}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions — only while the conversation hasn't really started yet */}
            {messages.length <= 2 && (
              <div className="px-3 pt-2 pb-1 shrink-0">
                <QuickActions onSelect={handleQuickAction} disabled={isSending} />
              </div>
            )}

            <p className="px-4 pt-1 text-[10px] text-charcoal/45 shrink-0">
              Messages may be stored to provide assistance and allow resort staff to follow up.
            </p>

            {/* Composer */}
            <form onSubmit={handleSend} className="border-t border-sand bg-white p-3 flex gap-2 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about rooms, dining, spa, policies…"
                aria-label="Type your message"
                className="flex-1 border border-sand rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-accent text-charcoal"
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                aria-label="Send message"
                className="bg-primary text-ivory p-2.5 rounded-sm hover:bg-accent disabled:opacity-40 disabled:hover:bg-primary transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent flex items-center justify-center shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher */}
      {!isOpen && (
        <motion.button
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
          onClick={openChat}
          aria-label="Chat with Aranya, RKPR Resort's AI concierge"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="m-4 sm:m-0 bg-primary text-ivory w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-accent transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light relative border border-primary-dark"
        >
          <MessageSquare size={24} />
          {hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-accent" />
            </span>
          )}
        </motion.button>
      )}
    </div>
  );
}
