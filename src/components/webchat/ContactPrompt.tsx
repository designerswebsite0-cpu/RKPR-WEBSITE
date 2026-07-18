"use client";

import { useState } from "react";
import { submitContact } from "@/lib/webchat-client";

/** Optional contact capture (Phase 5 brief §8) — only ever shown when
 * useful (after handoff is requested), never blocking basic Q&A, and never
 * asking for anything beyond name/phone/email/marketing consent. */
export default function ContactPrompt({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = (phone.trim().length > 0 || email.trim().length > 0) && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitContact({
        full_name: name.trim() || undefined,
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        marketing_consent: consent,
      });
      onDone();
    } catch {
      setError("Couldn't save your details just now — you can still continue chatting.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-1 flex flex-col gap-2 rounded-lg border border-sand bg-white p-3 text-xs"
    >
      <p className="font-serif text-sm text-primary">Leave your details for a follow-up</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name (optional)"
        className="rounded-sm border border-sand px-2 py-1.5 text-xs focus:outline-none focus:border-accent"
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone number"
        className="rounded-sm border border-sand px-2 py-1.5 text-xs focus:outline-none focus:border-accent"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="rounded-sm border border-sand px-2 py-1.5 text-xs focus:outline-none focus:border-accent"
      />
      <label className="flex items-start gap-1.5 text-[11px] text-charcoal/70">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        I&apos;d like to receive offers and updates by email/phone.
      </label>
      {error && <p className="text-[11px] text-red-600">{error}</p>}
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={!canSubmit}
          className="flex-1 rounded-sm bg-primary py-1.5 text-[11px] font-semibold uppercase tracking-wider text-ivory hover:bg-accent disabled:opacity-40 transition-colors"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-sm border border-sand px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-charcoal/60 hover:text-charcoal transition-colors"
        >
          Skip
        </button>
      </div>
    </form>
  );
}
