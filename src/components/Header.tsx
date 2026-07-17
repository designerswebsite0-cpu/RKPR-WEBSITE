"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/data/navigation";
import { resortDetails } from "@/data/contact";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glassmorphism py-3 shadow-md bg-ivory/95"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col select-none">
            <span
              className={`font-serif text-2xl lg:text-3xl font-semibold tracking-wider transition-colors duration-300 ${
                isScrolled || pathname !== "/"
                  ? "text-primary"
                  : "text-ivory"
              }`}
            >
              RKPR
            </span>
            <span
              className={`font-sans text-[10px] uppercase tracking-widest -mt-1 font-light transition-colors duration-300 ${
                isScrolled || pathname !== "/"
                  ? "text-accent"
                  : "text-accent-light"
              }`}
            >
              Resort & Sanctuary
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-sans text-xs uppercase tracking-widest font-medium transition-colors hover:text-accent relative py-2 ${
                    isScrolled || pathname !== "/"
                      ? isActive
                        ? "text-accent"
                        : "text-charcoal"
                      : isActive
                      ? "text-accent-light"
                      : "text-ivory/90"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        isScrolled || pathname !== "/"
                          ? "bg-accent"
                          : "bg-accent-light"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${resortDetails.phone}`}
              className={`flex items-center gap-2 font-sans text-xs uppercase tracking-wider font-semibold transition-colors ${
                isScrolled || pathname !== "/"
                  ? "text-primary hover:text-accent"
                  : "text-ivory hover:text-accent-light"
              }`}
            >
              <Phone size={14} />
              <span>Call Us</span>
            </a>
            <Link
              href="/contact"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                isScrolled || pathname !== "/"
                  ? "bg-primary text-ivory hover:bg-accent hover:shadow-md"
                  : "bg-ivory text-primary hover:bg-accent hover:text-ivory hover:shadow-md"
              }`}
            >
              <Calendar size={14} />
              <span>Book Stay</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`xl:hidden p-2 rounded-md focus:outline-none transition-colors ${
              isScrolled || pathname !== "/"
                ? "text-primary hover:text-accent"
                : "text-ivory hover:text-accent-light"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ivory pt-24 pb-8 px-6 flex flex-col justify-between overflow-y-auto xl:hidden"
          >
            <div className="flex flex-col gap-6 mt-8">
              {mainNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-serif text-2xl font-medium tracking-wide transition-colors ${
                      isActive ? "text-accent" : "text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-5 border-t border-sand pt-6 mt-8">
              <a
                href={`tel:${resortDetails.phone}`}
                className="flex items-center justify-center gap-3 w-full py-3 border border-primary text-primary font-sans text-sm uppercase tracking-widest font-semibold hover:bg-primary/5 transition-all"
              >
                <Phone size={16} />
                <span>Call Concierge</span>
              </a>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-3 bg-primary text-ivory font-sans text-sm uppercase tracking-widest font-semibold hover:bg-accent transition-all"
              >
                <Calendar size={16} />
                <span>Book Stay Online</span>
              </Link>
              <div className="text-center font-sans text-[11px] text-charcoal/50 mt-2">
                Emergency Helpline: {resortDetails.emergencyLine}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
