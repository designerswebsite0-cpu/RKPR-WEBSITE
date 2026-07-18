import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { offers } from "@/data/offers";
import { Calendar, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Special Offers & Holiday Packages",
  description: "Browse luxury holiday packages, stay promotions, early bird discounts, and seasonal offers at RKPR Resort.",
};

export default function OffersListing() {
  const currentDate = new Date("2026-07-17"); // System baseline time

  // Filter offers to show only active, non-expired ones
  const activeOffers = offers.filter((offer) => {
    const expiry = new Date(offer.expiryDate);
    return expiry >= currentDate;
  });

  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Exclusive Packages
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-wide text-primary mb-6">
              Holiday Packages & Promotions
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-base text-charcoal/80 font-light leading-relaxed">
              Enhance your stay with our curated holiday packages. Each package is tailored to offer the best value, combining dining, spa, and adventure credits. All offers are valid for the 2026 season.
            </p>
          </div>

          {/* Active Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white border border-sand rounded-sm overflow-hidden flex flex-col justify-between card-shadow hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-sans font-bold text-accent px-2.5 py-0.5 bg-sand rounded-sm uppercase tracking-wider">
                      Promo Code: {offer.bookingCode}
                    </span>
                    <span className="text-[11px] font-sans text-charcoal/50">Min Stay: {offer.minimumStay}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-primary mb-3 leading-tight">
                    {offer.name}
                  </h3>
                  
                  <p className="font-sans text-sm text-accent font-semibold mb-6">
                    {offer.price}
                  </p>

                  <div className="border-t border-sand/55 pt-4 mb-6">
                    <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-primary mb-3">
                      Package Inclusions
                    </h4>
                    <ul className="text-xs font-sans text-charcoal/85 space-y-2 leading-relaxed">
                      {offer.inclusions.slice(0, 5).map((inc, i) => (
                        <li key={i} className="flex gap-2 items-start font-light">
                          <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 md:px-8 pb-6 pt-4 border-t border-sand/50 bg-secondary/10 flex items-center justify-between">
                  <div className="text-[10px] font-sans text-charcoal/50">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-accent" />
                      <span>Expires: {new Date(offer.expiryDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <Link
                    href={`/offers/${offer.slug}`}
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-widest font-bold text-primary hover:text-accent transition-colors"
                  >
                    <span>View Package</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {activeOffers.length === 0 && (
            <div className="text-center py-20 border border-dashed border-sand rounded-sm bg-white card-shadow">
              <p className="font-serif text-xl text-primary font-bold mb-2">No Active Offers Available</p>
              <p className="font-sans text-sm text-charcoal/60 font-light mb-6">
                All promotions are currently expired or blocked for seasonal maintenance.
              </p>
            </div>
          )}

          {/* Booking Notice */}
          <div className="mt-16 bg-primary-dark/5 border border-primary/10 rounded-sm p-6 flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto">
            <AlertTriangle className="text-accent shrink-0" size={24} />
            <p className="font-sans text-xs text-charcoal/75 leading-relaxed font-light">
              <strong>Blackout & Peak Season Policy:</strong> Special packages are not valid during peak dates (24 December 2026 to 2 January 2027), festival long weekends, and during full-resort buyout bookings. Standard cancellation schedules apply.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
