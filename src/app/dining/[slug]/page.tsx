import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { diningOutlets } from "@/data/dining";
import { menuItems } from "@/data/menu";
import { ArrowLeft, Clock, Star, CalendarCheck, UtensilsCrossed, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return diningOutlets.map((outlet) => ({
    slug: outlet.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const outlet = diningOutlets.find((o) => o.slug === resolvedParams.slug);
  if (!outlet) return {};

  return {
    title: `${outlet.name} | Dining`,
    description: outlet.description,
  };
}

export default async function DiningDetails({ params }: Props) {
  const resolvedParams = await params;
  const outlet = diningOutlets.find((o) => o.slug === resolvedParams.slug);

  if (!outlet) {
    notFound();
  }

  // Fetch signature menu items for this outlet
  const signatureItems = menuItems
    .filter((item) => item.outlet === outlet.id)
    .slice(0, 3);

  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Back Button */}
          <Link
            href="/dining"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-accent hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span>Back to Dining Outlets</span>
          </Link>

          {/* Heading */}
          <div className="mb-10">
            <span className="text-xs font-sans font-bold text-accent uppercase tracking-widest block mb-2">
              {outlet.cuisine} Outlet
            </span>
            <h1 className="font-serif text-3xl lg:text-5xl font-bold tracking-wide text-primary">
              {outlet.name}
            </h1>
          </div>

          {/* Large Main Image */}
          <div className="relative h-[350px] lg:h-[500px] rounded-sm overflow-hidden mb-12 shadow-xl card-shadow">
            <Image
              src={outlet.images[0]}
              alt={outlet.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            {/* Left Content */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-primary mb-4">About the Outlet</h2>
                <p className="font-sans text-base text-charcoal/80 leading-relaxed font-light">
                  {outlet.description}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <Clock className="text-accent" size={20} />
                  <span>Meal Periods & Timing Schedule</span>
                </h3>
                <div className="border border-sand rounded-sm divide-y divide-sand bg-white shadow-sm overflow-hidden">
                  {outlet.mealPeriods.map((period, i) => (
                    <div key={i} className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="font-sans text-sm font-semibold text-primary">{period.name}</span>
                      <div className="text-xs font-sans text-charcoal/70">
                        <span className="font-medium">Hours:</span> {period.timing} 
                        <span className="text-charcoal/30 px-2">|</span> 
                        <span className="font-medium text-accent">Last Order:</span> {period.lastOrder}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature Dishes Preview */}
              {signatureItems.length > 0 && (
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-4">Chef's Signature Selections</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {signatureItems.map((item) => (
                      <div key={item.id} className="bg-white border border-sand rounded-sm p-4 card-shadow flex flex-col justify-between">
                        <div>
                          {item.image && (
                            <div className="relative h-32 w-full mb-3 rounded-sm overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <h4 className="font-serif text-base font-bold text-primary mb-1">{item.name}</h4>
                          <span className="text-[10px] font-sans font-bold text-accent px-1.5 py-0.5 bg-sand rounded-sm uppercase tracking-wider mb-2 inline-block">
                            {item.tags.join(", ")}
                          </span>
                          <p className="font-sans text-xs text-charcoal/70 leading-normal mb-3 font-light">
                            {item.description}
                          </p>
                        </div>
                        <div className="text-sm font-bold text-primary pt-2 border-t border-sand/55 flex justify-between items-center">
                          <span>Price</span>
                          <span className="text-accent">{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-right">
                    <Link
                      href={`/dining/menu?outlet=${outlet.id}`}
                      className="inline-flex items-center gap-1 text-xs uppercase tracking-widest font-bold text-primary hover:text-accent transition-colors"
                    >
                      <span>View Outlet Full Menu</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Outlet Specs Card */}
              <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
                <h3 className="font-serif text-lg font-bold text-primary border-b border-sand pb-3 mb-4">
                  Reservations & Specs
                </h3>
                <div className="space-y-4 text-sm font-sans text-charcoal/80 font-light">
                  <div className="flex justify-between border-b border-sand/50 pb-2.5">
                    <span className="font-semibold">Cuisine Type:</span>
                    <span>{outlet.cuisine}</span>
                  </div>
                  <div className="flex justify-between border-b border-sand/50 pb-2.5">
                    <span className="font-semibold">Dress Code:</span>
                    <span>{outlet.dressCode}</span>
                  </div>
                  <div className="flex justify-between border-b border-sand/50 pb-2.5">
                    <span className="font-semibold">Table Reservation:</span>
                    <span>{outlet.reservationRequired ? "Required" : "Recommended"}</span>
                  </div>
                  <div className="flex justify-between border-b border-sand/50 pb-2.5">
                    <span className="font-semibold">In-Room Delivery:</span>
                    <span className="text-right max-w-[120px] text-xs">{outlet.roomService}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry CTA */}
              <div className="bg-primary text-ivory rounded-sm p-6 card-shadow">
                <h3 className="font-serif text-lg font-bold text-accent-light border-b border-ivory/10 pb-3 mb-4 flex items-center gap-2">
                  <CalendarCheck size={18} /> Table Bookings
                </h3>
                <p className="font-sans text-xs text-sand/80 leading-relaxed mb-6 font-light">
                  Ensure a table by reserving in advance. Special group seatings, outdoor deck dining, and dietary custom orders require F&B manager clearance.
                </p>
                <Link
                  href={`/contact?enquiryType=dining&outlet=${outlet.id}`}
                  className="bg-accent hover:bg-accent-light text-ivory text-center py-3 rounded-sm font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 block w-full shadow-md"
                >
                  Book Table Now
                </Link>
              </div>

              {/* Dietary Programs */}
              <div className="bg-sand/20 border border-sand rounded-sm p-4 text-xs font-sans text-charcoal/60 leading-relaxed flex flex-col gap-2">
                <div className="flex items-center gap-1.5 font-bold text-primary">
                  <UtensilsCrossed size={12} />
                  <span>Dietary Programmes</span>
                </div>
                <div>{outlet.dietaryNotes}</div>
                <div className="text-[10px] text-charcoal/40 mt-1">
                  * Jain preparations can be accommodated across all dining locations. Please mention dietary requirements during booking.
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
