"use client";

import { Compass, UtensilsCrossed, Waves, MapPin, ScrollText, Users } from "lucide-react";

export interface QuickAction {
  label: string;
  icon: typeof Compass;
  message?: string; // sent through the normal orchestration pipeline
  action?: "handoff"; // dedicated deterministic action instead of free text
}

export const QUICK_ACTIONS: QuickAction[] = [
  { label: "Explore rooms", icon: Compass, message: "Can you tell me about the different room and villa categories?" },
  { label: "Dining options", icon: UtensilsCrossed, message: "What dining and restaurant options are available?" },
  { label: "Spa & wellness", icon: Waves, message: "Tell me about the spa and wellness facilities." },
  { label: "Location & directions", icon: MapPin, message: "Where is the resort located and how do I get there?" },
  { label: "Resort policies", icon: ScrollText, message: "What are the resort's check-in and guest policies?" },
  { label: "Speak to staff", icon: Users, action: "handoff" },
];

export default function QuickActions({
  onSelect,
  disabled,
}: {
  onSelect: (action: QuickAction) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2 px-1">
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.label}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(action)}
          className="flex items-center gap-1.5 rounded-full border border-sand bg-white px-3 py-1.5 text-[11px] font-medium text-primary hover:bg-primary hover:text-ivory hover:border-primary transition-colors disabled:opacity-40"
        >
          <action.icon size={12} />
          {action.label}
        </button>
      ))}
    </div>
  );
}
