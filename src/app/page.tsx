import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { roomCategories } from "@/data/rooms";
import { diningOutlets } from "@/data/dining";
import { offers } from "@/data/offers";
import { ArrowRight, Waves, Star, MapPin, Clock, ShieldAlert } from "lucide-react";

export default function Home() {
  // Select three featured rooms to showcase
  const featuredRooms = roomCategories.filter(r => ["GDR", "HPV", "G2PV"].includes(r.id));
  
  // Select active offers
  const featuredOffers = offers.slice(0, 3);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Images/Amenities/AM-01_Infinity_Swimming_Pool_with_Valley_Outlo.png"
            alt="RKPR Resort Infinity Pool with Valley Outlook"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-ivory flex flex-col items-center">
          <span className="font-sans text-xs lg:text-sm uppercase tracking-widest font-light text-accent-light mb-4 block">
            Welcome to the Sanctuary of southern Karnataka
          </span>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold tracking-wide leading-tight mb-6">
            RKPR RESORT
          </h1>
          <p className="font-sans text-base lg:text-xl max-w-2xl leading-relaxed mb-10 font-light text-sand/90">
            A premium five-star wilderness retreat nestled near the scenic Biligiriranga Hills. Reconnect with nature in luxury.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/stay"
              className="bg-accent hover:bg-accent-light text-ivory px-8 py-3.5 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 w-48 text-center"
            >
              Explore Stay
            </Link>
            <Link
              href="/contact"
              className="border border-ivory hover:bg-ivory hover:text-primary text-ivory px-8 py-3.5 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 w-48 text-center"
            >
              Book Reservation
            </Link>
          </div>
        </div>

        {/* Floating coordinate marker */}
        <div className="absolute bottom-10 left-6 z-10 hidden md:flex items-center gap-2 text-xs font-mono text-ivory/60 select-none">
          <MapPin size={12} />
          <span>BR Hills Road, Karnataka | 11.9896° N, 77.1428° E</span>
        </div>
      </section>

      {/* Sanctuary Overview Section */}
      <section className="py-20 bg-ivory text-charcoal">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-primary mb-6">
            Unwind in the Lap of Wilderness
          </h2>
          <div className="w-16 h-[2px] bg-accent mx-auto mb-8" />
          <p className="font-sans text-base lg:text-lg leading-relaxed text-charcoal/80 mb-6 font-light">
            Situated at Survey No. 48/2 along K. Gudi Road, RKPR Resort is a premium haven surrounded by dense deciduous forests and rich wildlife. Spanning a lush estate, we feature 88 guest-knowledge certified documents and 49 audited photography assets showcasing our sanctuary.
          </p>
          <p className="font-sans text-base lg:text-lg leading-relaxed text-charcoal/80 font-light">
            Whether soaking in our outdoor, temperature-moderated infinity pool with valley views, undergoing Ayurvedic therapy at Aranya Wellness Spa, or enjoying regional tandoor dining at Ember & Spice, RKPR is where raw nature meets refined five-star hospitality.
          </p>
        </div>
      </section>

      {/* Accommodations Preview */}
      <section className="py-20 bg-secondary/30 border-y border-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
                Accommodations
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-primary">
                Luxury Suites & Villas
              </h2>
            </div>
            <Link
              href="/stay"
              className="group flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold text-accent hover:text-primary transition-colors mt-4 md:mt-0"
            >
              <span>View All Categories</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <div key={room.id} className="bg-ivory border border-sand rounded-sm overflow-hidden flex flex-col card-shadow hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-64">
                  <Image
                    src={
                      room.id === "GDR"
                        ? "/Images/Rooms/GDR-01_Garden_Deluxe_Room_-_king-bed_room_overv.jpg"
                        : room.id === "HPV"
                        ? "/Images/Rooms/HPV-01_Honeymoon_Pool_Villa_-_pool_villa_exteri.jpg"
                        : "/Images/Rooms/G2PV-01_Grand_Two-Bedroom_Pool_Villa_-_exterior.jpg"
                    }
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                  {room.privatePool && (
                    <span className="absolute top-4 left-4 bg-primary text-ivory text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-sm flex items-center gap-1 shadow-md">
                      <Waves size={10} /> Private Pool
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary mb-2">{room.name}</h3>
                    <p className="font-sans text-xs text-charcoal/60 mb-4">{room.size} | Max {room.maximumOccupancy} Guests</p>
                    <p className="font-sans text-sm text-charcoal/85 leading-relaxed font-light mb-6">
                      {room.shortDescription}
                    </p>
                  </div>
                  <div className="border-t border-sand pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-charcoal/50 block">Starting From</span>
                      <span className="font-serif text-lg font-bold text-accent">INR {room.rates.lowSeason.toLocaleString()}</span>
                      <span className="text-xs text-charcoal/60"> / Night</span>
                    </div>
                    <Link
                      href={`/stay/${room.slug}`}
                      className="text-xs uppercase tracking-widest font-bold text-primary hover:text-accent transition-colors flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/compare-rooms"
              className="inline-flex items-center gap-2 border border-primary hover:bg-primary hover:text-ivory text-primary px-8 py-3 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300"
            >
              <span>Compare Room Features</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Dining Preview */}
      <section className="py-20 bg-ivory text-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
                Gastronomy
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-primary">
                Fine Dining Outlets
              </h2>
            </div>
            <Link
              href="/dining/menu"
              className="group flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold text-accent hover:text-primary transition-colors mt-4 md:mt-0"
            >
              <span>Browse A La Carte Menu</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {diningOutlets.map((outlet) => (
              <div key={outlet.id} className="bg-secondary/20 border border-sand rounded-sm p-6 flex flex-col justify-between card-shadow">
                <div>
                  <div className="relative h-60 w-full mb-6 rounded-sm overflow-hidden">
                    <Image
                      src={outlet.images[0]}
                      alt={outlet.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-2xl font-bold text-primary">{outlet.name}</h3>
                    <span className="text-xs font-sans text-accent font-semibold px-2 py-0.5 bg-sand rounded-sm uppercase tracking-wider">
                      {outlet.cuisine}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-charcoal/80 leading-relaxed font-light mb-6">
                    {outlet.description}
                  </p>
                </div>

                <div className="border-t border-sand/60 pt-4 flex flex-col gap-2 text-xs font-sans text-charcoal/70">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-accent" />
                    <span>
                      {outlet.mealPeriods.map(p => `${p.name}: ${p.timing}`).join(" | ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-accent" />
                    <span>Dress Code: {outlet.dressCode}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spa & Rejuvenation Section */}
      <section className="relative py-24 bg-forest-gradient text-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/Images/Spa/SPA-02_Luxury_Treatment_Room.png"
            alt="Spa Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent-light mb-2 block">
            Holistic Wellness
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold tracking-wide mb-6">
            Aranya Wellness Spa
          </h2>
          <p className="font-sans text-base lg:text-lg max-w-3xl mx-auto leading-relaxed text-sand/90 font-light mb-8">
            Experience traditional Ayurveda, deep tissue therapies, and couple rituals in a modern forest sanctuary. Guided by our expert therapists, rejuvenate with weekdays timings (9:00 AM - 9:00 PM) and extended weekends hours (8:00 AM - 10:00 PM) designed for complete peace.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-10">
            <div className="bg-ivory/5 border border-ivory/10 p-4 rounded-sm">
              <span className="font-serif text-2xl font-bold text-accent-light block">18+</span>
              <span className="font-sans text-xs text-sand/80">Treatments</span>
            </div>
            <div className="bg-ivory/5 border border-ivory/10 p-4 rounded-sm">
              <span className="font-serif text-2xl font-bold text-accent-light block">Couple</span>
              <span className="font-sans text-xs text-sand/80">Suites Available</span>
            </div>
            <div className="bg-ivory/5 border border-ivory/10 p-4 rounded-sm">
              <span className="font-serif text-2xl font-bold text-accent-light block">Steam & Sauna</span>
              <span className="font-sans text-xs text-sand/80">Complimentary Use</span>
            </div>
            <div className="bg-ivory/5 border border-ivory/10 p-4 rounded-sm">
              <span className="font-serif text-2xl font-bold text-accent-light block">Hydrotherapy</span>
              <span className="font-sans text-xs text-sand/80">Jacuzzi Facility</span>
            </div>
          </div>
          <Link
            href="/spa-wellness"
            className="inline-flex bg-accent hover:bg-accent-light text-ivory px-8 py-3 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300"
          >
            Explore Treatments & Booking
          </Link>
        </div>
      </section>

      {/* Offers & Packages Preview */}
      <section className="py-20 bg-secondary/30 border-b border-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Exclusive stays
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-primary">
              Active Offers & Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredOffers.map((offer) => (
              <div key={offer.id} className="bg-ivory border border-sand rounded-sm p-6 flex flex-col justify-between card-shadow">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-sans font-bold text-accent px-2 py-0.5 bg-sand rounded-sm uppercase tracking-wider">
                      Code: {offer.bookingCode}
                    </span>
                    <span className="text-[11px] font-sans text-charcoal/50">Min stay: {offer.minimumStay}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">{offer.name}</h3>
                  <p className="font-sans text-xs text-accent font-semibold mb-4">{offer.price}</p>
                  <ul className="text-xs font-sans text-charcoal/70 space-y-2 mb-6 list-disc list-inside">
                    {offer.inclusions.slice(0, 4).map((inc, i) => (
                      <li key={i} className="line-clamp-2">{inc}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/offers/${offer.slug}`}
                  className="bg-primary hover:bg-accent text-ivory text-center py-2.5 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-ivory text-charcoal">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Questions
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-primary">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="border border-sand rounded-sm p-5 bg-secondary/15">
              <h4 className="font-serif text-base font-bold text-primary mb-2">Q: Do you serve Jain food?</h4>
              <p className="font-sans text-sm text-charcoal/80 leading-relaxed font-light">
                A: Yes. Jain dishes (prepared without onions, garlic, or root vegetables) are available across all of our dining venues. We request advance notice for specific preparations to ensure chef verification.
              </p>
            </div>
            <div className="border border-sand rounded-sm p-5 bg-secondary/15">
              <h4 className="font-serif text-base font-bold text-primary mb-2">Q: What are the timings for the Kids&apos; Club and spa?</h4>
              <p className="font-sans text-sm text-charcoal/80 leading-relaxed font-light">
                A: The Kids&apos; Club is open daily from 9:00 AM to 7:00 PM (last entry at 6:30 PM). Aranya Wellness Spa is open from 9:00 AM to 9:00 PM on weekdays, and from 8:00 AM to 10:00 PM on weekends and public holidays.
              </p>
            </div>
            <div className="border border-sand rounded-sm p-5 bg-secondary/15">
              <h4 className="font-serif text-base font-bold text-primary mb-2">Q: Is the main infinity pool heated?</h4>
              <p className="font-sans text-sm text-charcoal/80 leading-relaxed font-light">
                A: Our main infinity pool is outdoor and temperature-moderated with a valley outlook. The temperature is passively moderated and varies with weather and operational settings; it is not classified as heated. Private plunge pools in our Honeymoon Pool Villas and Grand Two-Bedroom Pool Villas are temperature-controlled.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/policies"
              className="text-sm font-sans text-accent hover:text-primary transition-colors font-semibold uppercase tracking-wider"
            >
              See All FAQs & Guest Policies
            </Link>
          </div>
        </div>
      </section>

      {/* Home Security Warning Banner */}
      <section className="bg-red-50 border-y border-red-200 py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <ShieldAlert className="text-red-700 shrink-0" size={28} />
          <p className="font-sans text-xs text-red-900 leading-relaxed font-light">
            <strong>Important Billing Notice:</strong> RKPR Resort will never request an OTP, CVV, Card PIN, UPI PIN, or bank password. Protect your payment information and process bookings only through our verified reservation systems.
          </p>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </>
  );
}
