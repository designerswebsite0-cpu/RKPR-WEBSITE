"use client";

import { useState } from "react";
import { ChevronDown, ShieldCheck, Info } from "lucide-react";
import type { WebchatCitation } from "@/lib/webchat-client";

/** Guest-friendly source attribution — never chunk ids, vector scores, or
 * any other internal identifier (Phase 5 brief §9). Draft/non-authoritative
 * sources are visually flagged, never presented as confirmed fact. */
export default function CitationList({ citations }: { citations: WebchatCitation[] }) {
  const [expanded, setExpanded] = useState(false);
  if (!citations.length) return null;

  return (
    <div className="mt-2 border-t border-sand/60 pt-2">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-primary/70 hover:text-accent transition-colors"
      >
        <span>Sources ({citations.length})</span>
        <ChevronDown size={12} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <ul className="mt-1.5 flex flex-col gap-1">
          {citations.map((citation, index) => (
            <li key={index} className="flex items-start gap-1.5 text-[11px] text-charcoal/70">
              {citation.authoritative ? (
                <ShieldCheck size={12} className="mt-0.5 shrink-0 text-primary/60" />
              ) : (
                <Info size={12} className="mt-0.5 shrink-0 text-accent" />
              )}
              <span>
                {citation.source_title}
                {!citation.authoritative && (
                  <span className="ml-1 italic text-accent">(unconfirmed — please verify with staff)</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
