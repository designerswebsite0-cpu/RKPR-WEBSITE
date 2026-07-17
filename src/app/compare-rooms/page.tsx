import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { roomCategories } from "@/data/rooms";
import { GitCompare, Waves, Sparkles, Check, X, ArrowRight, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Compare Rooms & Suites",
  description: "Compare features, inventories, private pool specifications, jacuzzis, maximum occupancies, and rates of all accommodations at RKPR Resort.",
};

export default function CompareRooms() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Sanctuary Accommodations
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-primary mb-4 flex items-center justify-center gap-3">
              <GitCompare size={32} className="text-accent" /> Side-by-Side Room Comparison
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-sm text-charcoal/70 font-light leading-relaxed">
              Analyze room features, bedding, maximum capacity limitations, and seasonal rates to select the perfect accommodation for your stay. All values are certified by our July 2026 revenue audit.
            </p>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-sand rounded-sm shadow-xl overflow-x-auto card-shadow">
            <table className="w-full text-left border-collapse min-w-[900px]">
              {/* Table Head */}
              <thead>
                <tr className="border-b border-sand bg-secondary/15">
                  <th className="p-4 font-serif text-sm font-bold text-primary w-[200px]">Feature</th>
                  {roomCategories.map((room) => (
                    <th key={room.id} className="p-4 text-center border-l border-sand w-[180px]">
                      <span className="font-serif text-base font-bold text-primary block">{room.name}</span>
                      <span className="font-sans text-[10px] uppercase text-accent tracking-wider font-semibold">
                        Code: {room.id}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-sand/55 font-sans text-sm text-charcoal/80">
                {/* Inventory */}
                <tr>
                  <td className="p-4 font-semibold text-primary bg-secondary/5">Inventory keys</td>
                  {roomCategories.map((room) => (
                    <td key={room.id} className="p-4 text-center border-l border-sand font-light">
                      {room.inventory} rooms
                    </td>
                  ))}
                </tr>

                {/* Size */}
                <tr>
                  <td className="p-4 font-semibold text-primary bg-secondary/5">Room Size</td>
                  {roomCategories.map((room) => (
                    <td key={room.id} className="p-4 text-center border-l border-sand font-light">
                      {room.size}
                    </td>
                  ))}
                </tr>

                {/* Bed Type */}
                <tr>
                  <td className="p-4 font-semibold text-primary bg-secondary/5">Bedding</td>
                  {roomCategories.map((room) => (
                    <td key={room.id} className="p-4 text-center border-l border-sand font-light text-xs leading-normal px-2">
                      {room.bedType}
                    </td>
                  ))}
                </tr>

                {/* Max Occupancy */}
                <tr>
                  <td className="p-4 font-semibold text-primary bg-secondary/5">Max Occupancy</td>
                  {roomCategories.map((room) => (
                    <td key={room.id} className="p-4 text-center border-l border-sand font-semibold text-primary">
                      {room.maximumOccupancy} guests
                      <span className="text-[10px] text-charcoal/50 block font-light">
                        Max {room.adultsAllowed} adults + {room.childrenAllowed} child
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Low Season Tariff */}
                <tr>
                  <td className="p-4 font-semibold text-primary bg-secondary/5">Low Season Rate</td>
                  {roomCategories.map((room) => (
                    <td key={room.id} className="p-4 text-center border-l border-sand font-bold text-accent">
                      INR {room.rates.lowSeason.toLocaleString()}
                      <span className="text-[9px] text-charcoal/40 block font-light">Per Night + Taxes</span>
                    </td>
                  ))}
                </tr>

                {/* High Season Tariff */}
                <tr>
                  <td className="p-4 font-semibold text-primary bg-secondary/5">High Season Rate</td>
                  {roomCategories.map((room) => (
                    <td key={room.id} className="p-4 text-center border-l border-sand font-bold text-accent">
                      INR {room.rates.highSeason.toLocaleString()}
                      <span className="text-[9px] text-charcoal/40 block font-light">Per Night + Taxes</span>
                    </td>
                  ))}
                </tr>

                {/* Private Pool */}
                <tr>
                  <td className="p-4 font-semibold text-primary bg-secondary/5">Private Plunge Pool</td>
                  {roomCategories.map((room) => (
                    <td key={room.id} className="p-4 text-center border-l border-sand">
                      {room.privatePool ? (
                        <div className="flex flex-col items-center text-xs">
                          <Check className="text-accent mb-1" size={18} />
                          <span className="text-[10px] font-light text-charcoal/60 leading-normal">
                            {room.id === "HPV" ? "5m × 3m (Heated)" : "8m × 4m (Heated)"}
                          </span>
                        </div>
                      ) : (
                        <X className="text-charcoal/20 mx-auto" size={18} />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Jacuzzi */}
                <tr>
                  <td className="p-4 font-semibold text-primary bg-secondary/5">In-Room Jacuzzi</td>
                  {roomCategories.map((room) => (
                    <td key={room.id} className="p-4 text-center border-l border-sand">
                      {room.jacuzzi ? (
                        <div className="flex flex-col items-center text-xs">
                          <Check className="text-accent mb-1" size={18} />
                          <span className="text-[10px] font-light text-charcoal/60 leading-normal">
                            {room.id === "MPS" ? "Indoor whirlpool (2-seater)" : "Outdoor whirlpool (4-seater)"}
                          </span>
                        </div>
                      ) : (
                        <X className="text-charcoal/20 mx-auto" size={18} />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Breakfast Included */}
                <tr>
                  <td className="p-4 font-semibold text-primary bg-secondary/5">Complimentary Breakfast</td>
                  {roomCategories.map((room) => (
                    <td key={room.id} className="p-4 text-center border-l border-sand">
                      {room.breakfastIncluded ? (
                        <Check className="text-accent mx-auto" size={18} />
                      ) : (
                        <X className="text-charcoal/20 mx-auto" size={18} />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Extra Bed */}
                <tr>
                  <td className="p-4 font-semibold text-primary bg-secondary/5">Extra Bed Allowed</td>
                  {roomCategories.map((room) => (
                    <td key={room.id} className="p-4 text-center border-l border-sand">
                      {room.extraBedAvailable ? (
                        <Check className="text-accent mx-auto" size={18} />
                      ) : (
                        <X className="text-charcoal/20 mx-auto" size={18} />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Wheelchair Accessible */}
                <tr>
                  <td className="p-4 font-semibold text-primary bg-secondary/5">Wheelchair Accessible</td>
                  {roomCategories.map((room) => (
                    <td key={room.id} className="p-4 text-center border-l border-sand">
                      {room.id === "GDR" ? (
                        <div className="flex flex-col items-center">
                          <Check className="text-accent mb-1" size={18} />
                          <span className="text-[9px] font-light text-charcoal/50">4 rooms fully adapted</span>
                        </div>
                      ) : (
                        <X className="text-charcoal/20 mx-auto" size={18} />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Connecting Room */}
                <tr>
                  <td className="p-4 font-semibold text-primary bg-secondary/5">Connecting Pairs</td>
                  {roomCategories.map((room) => (
                    <td key={room.id} className="p-4 text-center border-l border-sand">
                      {room.connectingRoomAvailable ? (
                        <div className="flex flex-col items-center">
                          <Check className="text-accent mb-1" size={18} />
                          <span className="text-[9px] font-light text-charcoal/50">
                            {room.id === "GDR" ? "4 pairs available" : "3 pairs available"}
                          </span>
                        </div>
                      ) : (
                        <X className="text-charcoal/20 mx-auto" size={18} />
                      )}
                    </td>
                  ))}
                </tr>

                {/* Location */}
                <tr>
                  <td className="p-4 font-semibold text-primary bg-secondary/5">Location Area</td>
                  {roomCategories.map((room) => (
                    <td key={room.id} className="p-4 text-center border-l border-sand text-xs font-light leading-normal px-2">
                      {room.location}
                    </td>
                  ))}
                </tr>

                {/* Action Buttons */}
                <tr className="bg-secondary/5">
                  <td className="p-4"></td>
                  {roomCategories.map((room) => (
                    <td key={room.id} className="p-4 text-center border-l border-sand">
                      <Link
                        href={`/stay/${room.slug}`}
                        className="text-xs uppercase tracking-widest font-bold text-primary hover:text-accent transition-colors block mb-3"
                      >
                        Details <ArrowRight className="inline-block" size={12} />
                      </Link>
                      <Link
                        href={`/contact?enquiryType=stay&roomType=${room.id}`}
                        className="bg-primary hover:bg-accent text-ivory text-[10px] uppercase tracking-widest font-bold py-2 px-3 rounded-sm transition-all duration-300 block shadow-md"
                      >
                        Enquire
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-sand/20 border border-sand rounded-sm p-4 text-xs font-sans text-charcoal/60 leading-relaxed max-w-4xl mx-auto text-center">
            <strong>Check-in and Check-out Policies:</strong> Check-in is available from 2:00 PM. Check-out is scheduled by 11:00 AM. Early arrivals or late departures are subject to room availability and seasonal service charges. Pets are not permitted on the property, with the exception of certified service animals.
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
