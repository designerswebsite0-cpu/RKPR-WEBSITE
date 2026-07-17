import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { offers } from "@/data/offers";
import { ArrowLeft, Check, X, Calendar, AlertTriangle, ShieldCheck, Mail } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return offers.map((offer) => ({
    slug: offer.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const offer = offers.find((o) => o.slug === resolvedParams.slug);
  if (!offer) return {};

  return {
    title: `${offer.name} | Special Offer`,
    description: offer.price,
  };
}

export default async function OfferDetails({ params }: Props) {
  const resolvedParams = await params;
  const offer = offers.find((o) => o.slug === resolvedParams.slug);

  if (!offer) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <Link
            href="/offers"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-accent hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span>Back to Offers Listing</span>
          </Link>

          {/* Heading */}
          <div className="mb-10 border-b border-sand pb-6">
            <span className="text-xs font-sans font-bold text-accent uppercase tracking-widest block mb-2">
              Holiday Package Promotion
            </span>
            <h1 className="font-serif text-3xl lg:text-5xl font-bold tracking-wide text-primary mb-3">
              {offer.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-charcoal/50">
              <span>Booking Code: <strong className="text-primary font-semibold">{offer.bookingCode}</strong></span>
              <span>•</span>
              <span>Min Stay: {offer.minimumStay}</span>
              <span>•</span>
              <span>Eligible: {offer.applicableGuestType}</span>
            </div>
          </div>

          {/* Offer Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Left Content */}
            <div className="md:col-span-2 flex flex-col gap-8">
              {/* Inclusions */}
              <div>
                <h2 className="font-serif text-xl font-bold text-primary mb-4">Package Inclusions</h2>
                <div className="space-y-2.5">
                  {offer.inclusions.map((inc, i) => (
                    <div key={i} className="flex gap-2.5 items-start text-sm font-sans text-charcoal/80 font-light">
                      <Check className="text-accent shrink-0 mt-0.5" size={16} />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions */}
              {offer.exclusions && offer.exclusions.length > 0 && (
                <div>
                  <h2 className="font-serif text-xl font-bold text-primary mb-4">Package Exclusions</h2>
                  <div className="space-y-2.5">
                    {offer.exclusions.map((exc, i) => (
                      <div key={i} className="flex gap-2.5 items-start text-sm font-sans text-charcoal/70 font-light">
                        <X className="text-charcoal/30 shrink-0 mt-1" size={12} />
                        <span>{exc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Seasonal warning if any */}
              {offer.seasonalWarning && (
                <div className="bg-amber-50 border border-amber-200 rounded-sm p-4 text-xs font-sans text-amber-800 leading-relaxed">
                  <strong>Seasonal Activity Warning:</strong> {offer.seasonalWarning}
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Price & Book Card */}
              <div className="bg-primary text-ivory rounded-sm p-6 card-shadow text-center">
                <span className="text-[10px] uppercase tracking-wider text-sand/60 block mb-1">Package Pricing</span>
                <span className="font-serif text-xl lg:text-2xl font-bold text-accent-light block mb-6">
                  {offer.price}
                </span>
                <Link
                  href={`/contact?enquiryType=offer&promoCode=${offer.bookingCode}`}
                  className="bg-accent hover:bg-accent-light text-ivory text-center py-3 rounded-sm font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 block w-full shadow-md"
                >
                  Book Package Now
                </Link>
              </div>

              {/* Specs & Dates */}
              <div className="bg-white border border-sand rounded-sm p-6 card-shadow text-xs font-sans text-charcoal/80 font-light space-y-4">
                <div>
                  <strong className="text-primary font-semibold block">Valid From:</strong>
                  <span>{new Date(offer.startDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div>
                  <strong className="text-primary font-semibold block">Valid Until:</strong>
                  <span>{new Date(offer.expiryDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                {offer.bookingRequirement && (
                  <div>
                    <strong className="text-primary font-semibold block">Booking Requirement:</strong>
                    <span>{offer.bookingRequirement}</span>
                  </div>
                )}
                <div>
                  <strong className="text-primary font-semibold block">Eligible Rooms:</strong>
                  <span className="block mt-1 font-semibold text-primary">{offer.eligibleRooms.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Cancellation section */}
          <div className="border-t border-sand/60 pt-8 space-y-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-primary mb-2 flex items-center gap-2">
                <ShieldCheck className="text-accent" size={18} /> Cancellation & Reservation Terms
              </h3>
              <p className="font-sans text-sm text-charcoal/80 leading-relaxed font-light">
                {offer.cancellationTerms}
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-primary mb-2 flex items-center gap-2">
                <AlertTriangle className="text-accent" size={18} /> Blackout Dates & Restrictions
              </h3>
              <ul className="list-disc list-inside text-sm font-sans text-charcoal/70 font-light space-y-1">
                {offer.blackoutDates.map((date, idx) => (
                  <li key={idx}>{date}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
