import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Clock, MapPin, Users, HelpCircle, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Resort Amenities & Facilities",
  description: "Discover our premium amenities at RKPR Resort including the infinity swimming pool, kids club, fitness centre, boardroom, and games room.",
};

const amenitiesList = [
  {
    id: "infinity-pool",
    name: "Infinity Swimming Pool",
    image: "/Images/Amenities/AM-01_Infinity_Swimming_Pool_with_Valley_Outlo.png",
    location: "Main Deck, adjacent to Azure Terrace",
    hours: "7:00 AM - 9:00 PM (Last entry 8:45 PM)",
    capacity: "40 guests in pool area",
    details: "An outdoor, temperature-moderated infinity pool with a gorgeous valley outlook. Please note: the pool water temperature is passively moderated and varies with weather and operational settings; it is not classified as heated. Swimwear is mandatory. Children under 12 must be supervised by an adult at all times.",
    rules: "No glass bottles or food inside the pool. Shower is required before entering."
  },
  {
    id: "fitness-centre",
    name: "Modern Fitness Centre",
    image: "/Images/Amenities/AM-02_Modern_Fitness_Centre.png",
    location: "Level 1, Wellness Wing",
    hours: "6:00 AM - 10:00 PM",
    capacity: "12 guests simultaneously",
    details: "Fully equipped with modern treadmills, ellipticals, free weights, and multi-gym setups. Clean towels and drinking water are provided. Personal training can be scheduled at the spa reception.",
    rules: "Sports footwear and athletic wear are mandatory. Open only to guests aged 16 and above."
  },
  {
    id: "kids-club",
    name: "Kids' Club & Creative Space",
    image: "/Images/Amenities/AM-03_Kids_Club_and_Creative_Space.png",
    location: "Ground Floor, Family Courtyard",
    hours: "9:00 AM - 7:00 PM (Last entry 6:30 PM)",
    capacity: "25 children",
    details: "A dedicated safe play zone featuring toys, slides, arts & crafts, books, and child-safe gaming consoles. Supervised by qualified resort caretakers. Parents or guardians must remain on the resort property while children are checked in.",
    rules: "Open for children aged 4-12. Socks are mandatory inside the play area."
  },
  {
    id: "library-lounge",
    name: "Library Lounge & Quiet Area",
    image: "/Images/Amenities/AM-04_Library_Lounge_and_Quiet_Area.png",
    location: "Lobby Level, North Wing",
    hours: "8:00 AM - 10:00 PM",
    capacity: "20 guests",
    details: "A quiet retreat featuring comfortable leather armchairs, a curated collection of books, newspapers, and regional travel journals. Ideal for reading, light laptop work, or enjoying coffee from the lobby counter.",
    rules: "Silence is requested. Mobile phone calls are not permitted inside the lounge."
  },
  {
    id: "executive-boardroom",
    name: "Executive Boardroom",
    image: "/Images/Amenities/AM-05_Executive_Boardroom.png",
    location: "Mezzanine Level, Business Centre",
    hours: "8:00 AM - 10:00 PM (Prior booking required)",
    capacity: "20 delegates in board style",
    details: "A fully air-conditioned boardroom equipped with a high-definition presentation screen, modern video conferencing hardware, and high-speed secure business Wi-Fi.",
    rules: "Booking fee: from INR 5,000 for 2 hours. Catering and refreshments can be coordinated through the events desk."
  },
  {
    id: "games-room",
    name: "Games Room & Entertainment Zone",
    image: "/Images/Amenities/AM-06_Games_Room_and_Entertainment_Zone.png",
    location: "Recreation Hub, West Wing",
    hours: "9:00 AM - 10:00 PM",
    capacity: "30 guests",
    details: "Features a full-size pool table, table tennis, foosball, carrom, chess, and popular board games. Equipment is complimentary for in-house guests and can be checked out at the recreation desk.",
    rules: "Maximum 30 minutes' play time per table if other guests are waiting."
  }
];

export default function Amenities() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Resort Facilities
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-wide text-primary mb-6">
              Resort Amenities
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-base text-charcoal/80 font-light leading-relaxed">
              Explore the premium services and facilities available during your stay. From our temperature-moderated infinity swimming pool to our creative kids&apos; club, our amenities are designed for absolute comfort.
            </p>
          </div>

          {/* Amenities Listing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {amenitiesList.map((facility) => (
              <div
                key={facility.id}
                className="bg-white border border-sand rounded-sm overflow-hidden flex flex-col justify-between card-shadow hover:-translate-y-0.5 transition-all duration-300"
              >
                <div>
                  <div className="relative h-64 md:h-80 w-full">
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <h3 className="font-serif text-2xl font-bold text-primary mb-4">{facility.name}</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-sand/55 pb-4 mb-6 text-xs font-sans text-charcoal/80">
                      <div className="flex gap-2 items-center">
                        <MapPin size={14} className="text-accent shrink-0" />
                        <span><strong>Location:</strong> {facility.location}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Clock size={14} className="text-accent shrink-0" />
                        <span><strong>Hours:</strong> {facility.hours}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Users size={14} className="text-accent shrink-0" />
                        <span><strong>Capacity Limit:</strong> {facility.capacity}</span>
                      </div>
                    </div>

                    <p className="font-sans text-sm text-charcoal/80 leading-relaxed font-light mb-6">
                      {facility.details}
                    </p>
                  </div>
                </div>

                <div className="px-6 md:px-8 pb-6 pt-4 border-t border-sand/50 bg-secondary/10 text-xs font-sans text-charcoal/60 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold text-primary mb-1">
                    <HelpCircle size={14} className="text-accent" />
                    <span>Guidelines & Policies</span>
                  </div>
                  <p className="font-light">{facility.rules}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Kids' Club Closing Notice */}
          <div className="mt-16 bg-primary-dark/5 border border-primary/10 rounded-sm p-6 flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto">
            <ShieldAlert className="text-accent shrink-0" size={24} />
            <p className="font-sans text-xs text-charcoal/75 leading-relaxed font-light">
              <strong>Important Timing Update:</strong> Per our July 2026 audit (resolving CON-009 / CON-012), the Kids&apos; Club closes at 7:00 PM daily, with last entry at 6:30 PM. On declared festival weekends, hours may extend to 8:00 PM subject to same-day staffing confirmations.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
