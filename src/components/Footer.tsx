import Link from "next/link";
import { resortDetails } from "@/data/contact";
import { mainNavigation } from "@/data/navigation";
import { ShieldAlert, Mail, Phone, MapPin, Compass } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-ivory border-t border-primary-dark mt-auto">
      {/* Security Warning Banner */}
      <div className="bg-primary-dark border-b border-primary py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left">
          <ShieldAlert className="text-accent-light shrink-0" size={20} />
          <p className="font-sans text-xs tracking-wider text-sand uppercase font-medium">
            <span className="text-accent-light font-bold">Important Security Notice:</span>{" "}
            RKPR Resort will never request an OTP, CVV, Card PIN, UPI PIN, or banking passwords. Guard your financial information.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="font-serif text-2xl font-bold tracking-wider">RKPR RESORT</h3>
            <p className="font-sans text-[10px] text-accent-light uppercase tracking-widest -mt-1 font-light">
              Sanctuary of Biligiriranga Hills
            </p>
          </div>
          <p className="font-sans text-sm text-sand/80 leading-relaxed font-light">
            A sanctuary nestled in the forest wilderness of southern Karnataka. Immerse yourself in unmatched luxury, culinary delights, and Ayurvedic rejuvenation.
          </p>
          <div className="flex items-center gap-2 text-xs text-sand font-mono">
            <Compass size={14} className="text-accent-light" />
            <span>GPS: {resortDetails.coordinates.lat}° N, {resortDetails.coordinates.lng}° E</span>
          </div>
        </div>

        {/* Navigation Links Column */}
        <div className="flex flex-col gap-5">
          <h4 className="font-serif text-lg font-semibold tracking-wide text-accent-light border-b border-ivory/10 pb-2">
            Explore
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {mainNavigation.slice(0, 10).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-sans text-sm text-sand hover:text-accent-light transition-colors font-light"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Policies and Utilities Column */}
        <div className="flex flex-col gap-5">
          <h4 className="font-serif text-lg font-semibold tracking-wide text-accent-light border-b border-ivory/10 pb-2">
            Information
          </h4>
          <div className="flex flex-col gap-3">
            <Link
              href="/policies"
              className="font-sans text-sm text-sand hover:text-accent-light transition-colors font-light"
            >
              Guest Policies & FAQ
            </Link>
            <Link
              href="/payments"
              className="font-sans text-sm text-sand hover:text-accent-light transition-colors font-light"
            >
              Payments & Refund Policies
            </Link>
            <Link
              href="/accessibility"
              className="font-sans text-sm text-sand hover:text-accent-light transition-colors font-light"
            >
              Accessibility Features
            </Link>
            <Link
              href="/families"
              className="font-sans text-sm text-sand hover:text-accent-light transition-colors font-light"
            >
              Families & Kids' Club
            </Link>
            <Link
              href="/safety"
              className="font-sans text-sm text-sand hover:text-accent-light transition-colors font-light"
            >
              Emergency & Safety
            </Link>
            <Link
              href="/directory"
              className="font-sans text-sm text-sand hover:text-accent-light transition-colors font-light"
            >
              Timings Directory
            </Link>
          </div>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col gap-5">
          <h4 className="font-serif text-lg font-semibold tracking-wide text-accent-light border-b border-ivory/10 pb-2">
            Contact
          </h4>
          <div className="flex flex-col gap-4 font-sans text-sm text-sand leading-relaxed font-light">
            <div className="flex gap-3">
              <MapPin size={18} className="text-accent-light shrink-0 mt-1" />
              <span>{resortDetails.address}</span>
            </div>
            <div className="flex gap-3 items-center">
              <Phone size={16} className="text-accent-light shrink-0" />
              <a href={`tel:${resortDetails.phone}`} className="hover:text-accent-light transition-colors">
                {resortDetails.phone}
              </a>
            </div>
            <div className="flex gap-3 items-center">
              <Mail size={16} className="text-accent-light shrink-0" />
              <a href={`mailto:${resortDetails.email}`} className="hover:text-accent-light transition-colors">
                {resortDetails.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-primary-dark py-6 px-6 text-center text-xs text-sand/60 bg-primary-dark/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            &copy; {currentYear} RKPR Resort & Sanctuary. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/dev/content-audit" className="hover:text-accent-light transition-colors text-[10px] uppercase tracking-wider">
              Content Audit Portal
            </Link>
            <span className="text-sand/30">|</span>
            <span className="font-light">Designed for Phase 3 Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
