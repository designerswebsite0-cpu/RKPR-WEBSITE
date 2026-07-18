import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { eventData } from "@/data/events";
import { ShieldAlert, Compass, Table, FileText, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Weddings, Events & Conferences",
  description: "Plan your dream destination wedding or corporate conference at RKPR Resort. Browse our banquet halls, lawns, and corporate packages.",
};

export default function EventsPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Celebrations & Gatherings
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-wide text-primary mb-6">
              Weddings & Conferences
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-base text-charcoal/80 font-light leading-relaxed">
              Plan your grand event at RKPR Resort. Whether an intimate family celebration, a lavish destination wedding, or a high-level corporate retreat, we provide state-of-the-art facilities and dedicated banquet teams.
            </p>
          </div>

          {/* Venues Section */}
          <div className="mb-20">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-primary mb-10 text-center border-b border-sand pb-4">
              Our Versatile Venues
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {eventData.venues.map((venue) => {
                // Map images
                const venueImg = {
                  "grand-orchid-ballroom": "/Images/Amenities/AM-03_Kids_Club_and_Creative_Space.png", // Stand-in from amenities
                  "valley-lawn": "/Images/Amenities/AM-01_Infinity_Swimming_Pool_with_Valley_Outlo.png",
                  "cedar-conference-hall": "/Images/Amenities/AM-05_Executive_Boardroom.png",
                  "executive-boardroom": "/Images/Amenities/AM-05_Executive_Boardroom.png"
                }[venue.id] || "/Images/Amenities/AM-01_Infinity_Swimming_Pool_with_Valley_Outlo.png";

                return (
                  <div key={venue.id} className="bg-white border border-sand rounded-sm overflow-hidden flex flex-col justify-between card-shadow hover:-translate-y-0.5 transition-all duration-300">
                    <div>
                      <div className="relative h-60 w-full">
                        <Image
                          src={venueImg}
                          alt={venue.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-2xl font-bold text-primary mb-2">{venue.name}</h3>
                        <p className="font-sans text-xs text-charcoal/50 mb-4">
                          Dimensions: {venue.dimensions} | Rental: <strong className="text-accent font-semibold">{venue.pricing}</strong>
                        </p>
                        <p className="font-sans text-sm text-charcoal/80 leading-relaxed font-light mb-6">
                          {venue.description}
                        </p>

                        <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-primary mb-3 flex items-center gap-1.5">
                          <Table size={14} className="text-accent" /> Venue Capacity Specifications
                        </h4>
                        <div className="bg-secondary/15 rounded-sm p-4 grid grid-cols-2 gap-4 text-xs font-sans text-charcoal/85">
                          {Object.entries(venue.capacities).map(([key, val]) => (
                            <div key={key} className="flex justify-between border-b border-sand/30 pb-1">
                              <span className="font-medium">{key}:</span>
                              <span>{val} Pax</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-4 bg-secondary/5 border-t border-sand/50">
                      <Link
                        href={`/contact?enquiryType=event&venue=${venue.id}`}
                        className="bg-primary hover:bg-accent text-ivory text-center py-2.5 rounded-sm font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 block w-full shadow-md"
                      >
                        Enquire About Venue
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Packages Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Wedding Packages */}
            <div className="bg-secondary/20 border border-sand rounded-sm p-8 card-shadow">
              <h2 className="font-serif text-2xl font-bold text-primary mb-6 text-center border-b border-sand pb-3 flex items-center justify-center gap-2">
                <Compass className="text-accent" size={24} /> Destination Wedding Packages
              </h2>
              <div className="space-y-6">
                {eventData.weddingPackages.map((pkg) => (
                  <div key={pkg.name} className="bg-white border border-sand rounded-sm p-5 card-shadow">
                    <h3 className="font-serif text-lg font-bold text-primary mb-1">{pkg.name}</h3>
                    <span className="text-xs font-sans text-accent font-semibold block mb-4">{pkg.price}</span>
                    <ul className="text-xs font-sans text-charcoal/70 space-y-2 font-light list-disc list-inside">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i}>{inc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate Packages */}
            <div className="bg-secondary/20 border border-sand rounded-sm p-8 card-shadow">
              <h2 className="font-serif text-2xl font-bold text-primary mb-6 text-center border-b border-sand pb-3 flex items-center justify-center gap-2">
                <FileText className="text-accent" size={24} /> Corporate Meeting Packages
              </h2>
              <div className="space-y-6">
                {eventData.corporatePackages.map((pkg) => (
                  <div key={pkg.name} className="bg-white border border-sand rounded-sm p-5 card-shadow">
                    <h3 className="font-serif text-lg font-bold text-primary mb-1">{pkg.name}</h3>
                    <span className="text-xs font-sans text-accent font-semibold block mb-4">{pkg.price}</span>
                    <ul className="text-xs font-sans text-charcoal/70 space-y-2 font-light list-disc list-inside">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i}>{inc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Event Policies */}
          <div className="bg-white border border-sand rounded-sm p-8 card-shadow">
            <h2 className="font-serif text-2xl font-bold text-primary mb-6 border-b border-sand pb-3 flex items-center gap-2">
              <ShieldAlert className="text-accent" /> Event Policies & Guidelines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-sans text-charcoal/80 font-light leading-relaxed">
              <div className="space-y-4">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="text-accent shrink-0 mt-1" size={16} />
                  <div>
                    <h4 className="font-bold text-primary">Decoration Guidelines</h4>
                    <p className="mt-1 text-xs">
                      Only approved decorators or authorized external vendors are allowed. Permanent modifications (screws, nails, or tape on wall finishes/ceilings) are strictly forbidden. Open fire (candles, wood fires) is banned, except approved Hindu ceremonial fire (mandap havan).
                    </p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="text-accent shrink-0 mt-1" size={16} />
                  <div>
                    <h4 className="font-bold text-primary">Music and Amplification</h4>
                    <p className="mt-1 text-xs">
                      Indoor amplified sound systems are permitted until 10:30 PM. Outdoor music decibel levels must adhere to local silence-zone regulations and require prior written approval. Noise levels are monitored by security staff.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="text-accent shrink-0 mt-1" size={16} />
                  <div>
                    <h4 className="font-bold text-primary">Alcohol Policy</h4>
                    <p className="mt-1 text-xs">
                      Alcoholic drinks are only served through resort-operated bars. Outside alcohol is strictly forbidden unless specific corkage arrangements are contracted in writing.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="text-accent shrink-0 mt-1" size={16} />
                  <div>
                    <h4 className="font-bold text-primary">Guest Parking & Logistics</h4>
                    <p className="mt-1 text-xs">
                      Valet and self-parking are complimentary for all attendees. Specialized coach parking can be coordinated with 48 hours&apos; notice to security teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
