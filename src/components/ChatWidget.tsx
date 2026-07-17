"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Namaste and welcome to RKPR Resort! I am Aranya, your AI concierge. How may I help you discover our sanctuary today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg, timestamp: new Date() },
    ]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: messages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply, timestamp: new Date() },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I apologize, but I am experiencing difficulty connecting to the resort services. Please call our reception at +91 98765 43210 for immediate assistance.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-ivory border border-sand w-[350px] sm:w-[380px] h-[500px] rounded-lg shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Chat Header */}
            <div className="bg-primary text-ivory px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-ivory">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wide">Aranya</h4>
                  <p className="text-[10px] text-accent-light uppercase tracking-widest font-light">
                    AI Concierge Receptionist
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-ivory/80 hover:text-ivory transition-colors focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-sand/20">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2 max-w-[80%] ${
                    msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      msg.sender === "user"
                        ? "bg-accent text-ivory"
                        : "bg-primary text-ivory"
                    }`}
                  >
                    {msg.sender === "user" ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div
                    className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-accent text-ivory"
                        : "bg-white text-charcoal border border-sand/50 shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 self-start max-w-[80%]">
                  <div className="w-6 h-6 rounded-full bg-primary text-ivory flex items-center justify-center text-xs shrink-0">
                    <Bot size={12} />
                  </div>
                  <div className="rounded-lg px-3 py-2 text-sm bg-white text-charcoal border border-sand/50 shadow-sm flex items-center gap-2">
                    <Loader className="animate-spin text-accent" size={14} />
                    <span className="text-charcoal/60">Aranya is searching...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSend} className="border-t border-sand bg-white p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about rooms, rates, spa, menus, policies..."
                className="flex-1 border border-sand rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-accent text-charcoal"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-primary text-ivory p-2 rounded-sm hover:bg-accent disabled:opacity-40 disabled:hover:bg-primary transition-all duration-300 focus:outline-none flex items-center justify-center shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-ivory w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-accent transition-all duration-300 focus:outline-none relative border border-primary-dark"
        aria-label="Chat with Aranya"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-accent text-[9px] text-ivory font-bold items-center justify-center">
              1
            </span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
