import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { attractions, travelItineraries } from "@/data/attractions";
import { resortDetails } from "@/data/contact";
import { transferData } from "@/data/transfers";
import { MapPin, Compass, Clock, ShieldAlert, Navigation, Landmark, CalendarRange, Bike } from "lucide-react";

export const metadata = {
  title: "Location & Attractions",
  description: "Find directions to RKPR Resort near BR Hills, Karnataka. Explore nearby landmarks like Shivanasamudra Falls, K. Gudi wildlife safari, and Mysuru Palace.",
};

export default function LocationPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Directions & Landmarks
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-wide text-primary mb-6">
              Our Location & Surroundings
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-base text-charcoal/80 font-light leading-relaxed">
              RKPR Resort is located near the Biligiriranga Hills (BR Hills) in southern Karnataka. Surrounded by deciduous forests, wildlife sanctuaries, and ancient heritage landmarks.
            </p>
          </div>

          {/* Grid Layout: Address & Travel hubs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
            {/* Address Card */}
            <div className="bg-primary text-ivory rounded-sm p-8 card-shadow flex flex-col justify-between lg:col-span-2">
              <div>
                <h3 className="font-serif text-2xl font-bold text-accent-light border-b border-ivory/10 pb-3 mb-4 flex items-center gap-2">
                  <MapPin size={24} /> Resort Address
                </h3>
                <p className="font-sans text-base font-light leading-relaxed text-sand/90">
                  {resortDetails.address}
                </p>
                <div className="mt-6 flex flex-wrap gap-6 text-sm font-mono text-sand">
                  <div className="flex items-center gap-1.5">
                    <Compass size={16} className="text-accent-light" />
                    <span>Latitude: {resortDetails.coordinates.lat}° N</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Compass size={16} className="text-accent-light" />
                    <span>Longitude: {resortDetails.coordinates.lng}° E</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-ivory/10 pt-4 mt-6 flex justify-between items-center text-xs text-sand/60 font-sans">
                <span>Emergency helpline: {resortDetails.emergencyLine}</span>
                <span>Transport desk: {resortDetails.transportDesk}</span>
              </div>
            </div>

            {/* Travel Hubs Card */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow space-y-4 text-xs font-sans text-charcoal/80 font-light">
              <h3 className="font-serif text-base font-bold text-primary border-b border-sand pb-3 mb-4 flex items-center gap-2">
                <Navigation size={18} className="text-accent" /> Travel Connections
              </h3>
              <div>
                <strong className="text-primary font-semibold block">Nearest Airport:</strong>
                <span>Kempegowda Airport, Bengaluru (BLR) — 190 km / ~5 hours road journey.</span>
              </div>
              <div>
                <strong className="text-primary font-semibold block">Nearest Railway:</strong>
                <span>Mysuru Junction Railway Station (MYS) — 95 km / ~2.5 hours road journey.</span>
              </div>
              <div>
                <strong className="text-primary font-semibold block">Nearest Bus Station:</strong>
                <span>Mysuru Suburban Bus Station — 93 km / ~2.5 hours road journey.</span>
              </div>
            </div>
          </div>

          {/* Itineraries Section */}
          <div className="mb-20 bg-secondary/20 border border-sand rounded-sm p-8 card-shadow">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-primary mb-8 text-center">
              Curated Local Itineraries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {travelItineraries.map((itinerary) => (
                <div key={itinerary.title} className="bg-white border border-sand rounded-sm p-6 card-shadow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-primary mb-2 flex items-center gap-2">
                      <CalendarRange className="text-accent" size={20} /> {itinerary.title}
                    </h3>
                    <p className="text-xs text-charcoal/50 mb-6">Duration: {itinerary.duration} | Ideal for: {itinerary.bestFor}</p>
                    <div className="space-y-4 relative border-l border-sand/60 pl-5 ml-2.5">
                      {itinerary.timeline.map((step, idx) => (
                        <div key={idx} className="relative">
                          <span className="absolute -left-[26px] top-0.5 w-3.5 h-3.5 rounded-full bg-accent border-2 border-white shadow-sm" />
                          <span className="font-mono text-xs font-bold text-accent block">{step.time}</span>
                          <span className="font-sans text-xs text-charcoal/80 font-light mt-0.5 block">{step.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-sand/55 pt-4 mt-6 text-[10px] font-sans text-charcoal/50 leading-relaxed">
                    <strong>Mobility Note:</strong> {itinerary.mobilityNote}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attractions Grid */}
          <div className="mb-20">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-primary mb-10 text-center border-b border-sand pb-4">
              Explore Nearby Landmarks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {attractions.map((att) => (
                <div key={att.id} className="bg-white border border-sand rounded-sm p-6 card-shadow flex flex-col justify-between hover:border-accent transition-colors">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary mb-2 flex items-center gap-2">
                      <Landmark size={20} className="text-accent shrink-0" /> {att.name}
                    </h3>
                    <div className="space-y-1.5 text-xs font-sans text-charcoal/50 mb-4 font-light border-b border-sand/40 pb-3">
                      <div>Distance: {att.distance} | Travel time: {att.travelTime}</div>
                      <div>Coordinates: {att.coordinates}</div>
                      <div>Best season: {att.bestTime}</div>
                    </div>
                    <p className="font-sans text-xs lg:text-sm text-charcoal/80 leading-relaxed font-light mb-6">
                      {att.description}
                    </p>
                  </div>

                  <div className="border-t border-sand/55 pt-4 text-[10px] font-sans text-charcoal/60 leading-relaxed space-y-1.5 bg-secondary/5 -mx-6 -mb-6 p-6 rounded-b-sm">
                    <div><strong>Entry Fee:</strong> {att.entryFee}</div>
                    <div><strong>Dress Code:</strong> {att.dressCode}</div>
                    <div><strong>Accessibility:</strong> {att.accessibility}</div>
                    <div className="text-red-700/80 font-semibold flex items-start gap-1">
                      <ShieldAlert size={12} className="shrink-0 mt-0.5" />
                      <span>{att.warning}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
