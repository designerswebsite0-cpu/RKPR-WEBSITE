import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { diningOutlets } from "@/data/dining";
import { Clock, Star, ArrowRight, BookOpen, CalendarCheck } from "lucide-react";

export const metadata = {
  title: "Dining Outlets",
  description: "Explore our fine dining restaurants and lounges at RKPR Resort, featuring Azure Terrace all-day dining, Ember & Spice dinner grills, The Cedar Lounge, and Summit Bar.",
};

export default function DiningListing() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Gastronomy & Sanctuaries
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-wide text-primary mb-6">
              Our Dining Outlets
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-base text-charcoal/80 font-light leading-relaxed">
              Indulge in a journey of culinary excellence. RKPR Resort offers four distinct dining sanctuaries, each overseen by our Executive Chef. From rich buffet spreads to slow-cooked clay-oven grills, our menus are 100% audited and approved for the 2026 season.
            </p>
          </div>

          {/* Menu Catalog CTA Banner */}
          <div className="mb-16 bg-primary text-ivory rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl card-shadow">
            <div className="flex gap-4 items-start">
              <BookOpen className="text-accent-light shrink-0 mt-1" size={28} />
              <div>
                <h3 className="font-serif text-xl font-bold text-accent-light">Audited A La Carte Menu</h3>
                <p className="font-sans text-sm text-sand/80 font-light mt-1">
                  Browse our complete directory of 52 dishes and beverages. Filter by outlet, dietary needs (Vegetarian, Vegan, Jain, Gluten-free) or search ingredients.
                </p>
              </div>
            </div>
            <Link
              href="/dining/menu"
              className="bg-accent hover:bg-accent-light text-ivory px-8 py-3.5 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 whitespace-nowrap"
            >
              Browse Full Menu
            </Link>
          </div>

          {/* Outlets List */}
          <div className="space-y-16">
            {diningOutlets.map((outlet, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={outlet.id}
                  className={`flex flex-col lg:flex-row gap-12 items-center bg-white border border-sand rounded-sm p-6 lg:p-10 card-shadow ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Image Container */}
                  <div className="w-full lg:w-1/2 relative h-[300px] lg:h-[400px] rounded-sm overflow-hidden shadow-lg">
                    <Image
                      src={outlet.images[0]}
                      alt={outlet.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    <div>
                      <span className="font-sans text-xs font-bold text-accent uppercase tracking-widest mb-2 block">
                        {outlet.cuisine}
                      </span>
                      <h2 className="font-serif text-3xl lg:text-4xl font-bold text-primary mb-4">
                        {outlet.name}
                      </h2>
                      <p className="font-sans text-sm lg:text-base text-charcoal/80 leading-relaxed font-light">
                        {outlet.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-y border-sand/55 py-6">
                      <div className="flex gap-2.5 items-start">
                        <Clock className="text-accent shrink-0 mt-0.5" size={16} />
                        <div>
                          <h4 className="font-sans text-xs uppercase tracking-wider font-semibold text-primary">
                            Operating Hours
                          </h4>
                          {outlet.mealPeriods.map((period, i) => (
                            <p key={i} className="text-xs text-charcoal/70 font-light mt-1">
                              <strong>{period.name}:</strong> {period.timing} (Last order {period.lastOrder})
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2.5 items-start">
                        <Star className="text-accent shrink-0 mt-0.5" size={16} />
                        <div>
                          <h4 className="font-sans text-xs uppercase tracking-wider font-semibold text-primary">
                            Fine Specs
                          </h4>
                          <p className="text-xs text-charcoal/70 font-light mt-1">
                            <strong>Dress Code:</strong> {outlet.dressCode}
                          </p>
                          <p className="text-xs text-charcoal/70 font-light mt-0.5">
                            <strong>Reservations:</strong> {outlet.reservationRequired ? "Required" : "Recommended"}
                          </p>
                          <p className="text-xs text-charcoal/70 font-light mt-0.5">
                            <strong>Room Service:</strong> {outlet.roomService ? "Available" : "No"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href={`/dining/${outlet.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-primary hover:text-accent transition-colors"
                      >
                        <span>View Details</span>
                        <ArrowRight size={14} />
                      </Link>
                      {outlet.reservationRequired && (
                        <Link
                          href={`/contact?enquiryType=dining&outlet=${outlet.id}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 border border-primary hover:bg-primary hover:text-ivory text-primary text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                        >
                          <CalendarCheck size={14} />
                          <span>Reserve Table</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 bg-sand/20 border border-sand rounded-sm p-5 text-center text-xs font-sans text-charcoal/50 leading-relaxed max-w-4xl mx-auto">
            <strong>In-Room Dining Information:</strong> Room service is available 24 hours. A midnight menu (abbreviated selection from Azure Terrace and The Cedar Lounge) is served from 11:00 PM to 6:30 AM. A tray delivery charge of INR 150 applies for orders placed between 11:00 PM and 6:30 AM.
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
