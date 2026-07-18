"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { faqItems } from "@/data/faq";
import { Search, HelpCircle, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { resortDetails } from "@/data/contact";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const categories = ["All", ...Array.from(new Set(faqItems.map((item) => item.category)))];

  const filteredFaqs = faqItems.filter((faq) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchQ = faq.question.toLowerCase().includes(q);
      const matchA = faq.answer.toLowerCase().includes(q);
      if (!matchQ && !matchA) return false;
    }

    // Category
    if (activeCategory !== "All" && faq.category !== activeCategory) {
      return false;
    }

    return true;
  });

  const toggleFaq = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Guest Assistance
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-primary mb-4 flex items-center justify-center gap-3">
              <HelpCircle size={32} className="text-accent" /> Frequently Asked Questions
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-sm text-charcoal/70 font-light leading-relaxed">
              Find answers to policies, bookings, timings, and other details. All items are verified by our Front Office Director.
            </p>
          </div>

          {/* Search bar and tabs */}
          <div className="bg-white border border-sand rounded-sm p-6 mb-8 shadow-lg card-shadow">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3.5 text-charcoal/40" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQ questions, answers, keywords..."
                className="w-full pl-10 pr-4 py-3 border border-sand rounded-sm text-sm focus:outline-none focus:border-accent text-charcoal"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndexes([]); // Collapse all when switching
                  }}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold border rounded-sm transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-primary border-primary text-ivory"
                      : "border-sand text-charcoal/70 hover:bg-sand/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordions */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              // Find index in original array to keep states consistent
              const idx = faqItems.findIndex((f) => f.question === faq.question);
              const isOpen = openIndexes.includes(idx);

              return (
                <div
                  key={idx}
                  className="bg-white border border-sand rounded-sm overflow-hidden card-shadow"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-secondary/5 transition-colors focus:outline-none"
                  >
                    <div>
                      <span className="text-[9px] font-sans font-bold text-accent uppercase tracking-wider block mb-1">
                        Category: {faq.category}
                      </span>
                      <h3 className="font-serif text-base font-bold text-primary">{faq.question}</h3>
                    </div>
                    <div className="text-accent shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-sand/55 font-sans text-sm text-charcoal/80 leading-relaxed font-light">
                      <p className="whitespace-pre-line">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-16 border border-dashed border-sand rounded-sm bg-white card-shadow">
              <p className="font-serif text-lg text-primary font-bold mb-2">No FAQ Matches Found</p>
              <p className="font-sans text-sm text-charcoal/60 font-light mb-6">
                Try typing another search term or resetting the categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  setOpenIndexes([]);
                }}
                className="bg-primary hover:bg-accent text-ivory px-6 py-2 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Call Front Desk Notice */}
          <div className="mt-12 bg-secondary/20 border border-sand rounded-sm p-6 card-shadow flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex gap-4 items-start">
              <AlertCircle className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-serif text-lg font-bold text-primary">Still have questions?</h4>
                <p className="font-sans text-xs text-charcoal/70 font-light mt-1">
                  Our front office desk is staffed 24 hours a day to answer guest inquiries in detail.
                </p>
              </div>
            </div>
            <a
              href={`tel:${resortDetails.phone}`}
              className="bg-primary hover:bg-accent text-ivory px-6 py-2.5 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 whitespace-nowrap"
            >
              Call Front Desk
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
