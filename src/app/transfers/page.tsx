import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { transferData } from "@/data/transfers";
import { Car, Clock, ShieldAlert, BadgeInfo, CalendarCheck2, MapPin } from "lucide-react";

export const metadata = {
  title: "Airport Transfers & Local Travel",
  description: "Book airport transfers, railway pickups, and local sightseeing tours at RKPR Resort. Browse vehicle tariffs, capacities, and transfer rules.",
};

export default function Transfers() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Travel & Transfers
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-wide text-primary mb-6">
              Transfers & Transportation
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-base text-charcoal/80 font-light leading-relaxed">
              Travel comfortably to and from our hilltop retreat. We provide private transfers from Bengaluru Airport, Mysuru Railway Station, and local sightseeing packages, all with approved transparent rates.
            </p>
          </div>

          {/* Location details card */}
          <div className="mb-12 bg-white border border-sand rounded-sm p-6 card-shadow flex flex-col md:flex-row gap-8 items-center">
            <div className="bg-primary/5 p-4 rounded-full text-primary shrink-0">
              <MapPin size={32} />
            </div>
            <div className="flex-1 font-sans text-sm text-charcoal/80 font-light leading-relaxed">
              <h3 className="font-serif text-lg font-bold text-primary mb-1">Nearest International Airport</h3>
              <p><strong>Airport Name:</strong> {transferData.nearestAirport.name}</p>
              <p><strong>Road Distance:</strong> {transferData.nearestAirport.distance} from resort</p>
              <p className="text-xs text-charcoal/50 mt-1">
                <strong>Travel Time:</strong> {transferData.nearestAirport.travelTime}
              </p>
            </div>
          </div>

          {/* Vehicle Rates Grid */}
          <div className="mb-16">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-primary mb-8 text-center">
              Bengaluru Airport (BLR) Transfer Tariffs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {transferData.vehicles.map((v) => (
                <div key={v.code} className="bg-white border border-sand rounded-sm p-6 card-shadow flex flex-col justify-between hover:border-accent transition-colors">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary mb-3 flex justify-between items-center">
                      <span>{v.name}</span>
                      <span className="text-[10px] font-sans font-bold text-accent px-1.5 py-0.5 bg-sand rounded-sm uppercase tracking-wider">
                        {v.code}
                      </span>
                    </h3>
                    <div className="space-y-2 text-xs font-sans text-charcoal/80 mb-6 font-light border-b border-sand/55 pb-4">
                      <div><strong>Maximum Passengers:</strong> {v.maxGuests} guests</div>
                      <div><strong>Luggage Capacity:</strong> {v.luggage}</div>
                      <div><strong>Night Transfer Premium:</strong> +INR {v.nightCharge}</div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-4 text-center mb-6">
                      <div className="bg-secondary/15 p-2 rounded-sm">
                        <span className="text-[10px] text-charcoal/50 block font-sans">One Way</span>
                        <span className="font-serif text-base font-bold text-accent">INR {v.oneWay.toLocaleString()}</span>
                      </div>
                      <div className="bg-secondary/15 p-2 rounded-sm">
                        <span className="text-[10px] text-charcoal/50 block font-sans">Round Trip</span>
                        <span className="font-serif text-base font-bold text-accent">INR {v.roundTrip.toLocaleString()}</span>
                      </div>
                    </div>
                    <Link
                      href={`/contact?enquiryType=transfer&vehicle=${v.code}`}
                      className="bg-primary hover:bg-accent text-ivory text-center py-2.5 rounded-sm font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 block w-full shadow-md"
                    >
                      Enquire Transfer
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Railway, Bus & Local Sightseeing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Station Transfers */}
            <div className="bg-secondary/20 border border-sand rounded-sm p-8 card-shadow">
              <h2 className="font-serif text-2xl font-bold text-primary mb-6 border-b border-sand pb-3">
                Mysuru Station & Bus Transfers
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-base font-bold text-primary mb-1">
                    {transferData.railwayTransfers.station}
                  </h3>
                  <p className="text-xs text-charcoal/50 mb-3">
                    Distance: {transferData.railwayTransfers.distance} | Time: {transferData.railwayTransfers.travelTime}
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs font-sans text-charcoal/80 mb-3">
                    {Object.entries(transferData.railwayTransfers.rates).map(([name, r]) => (
                      <div key={name} className="flex justify-between border-b border-sand/40 pb-1">
                        <span>{name}:</span>
                        <span className="font-bold text-accent">INR {r.oneWay.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-charcoal/50 leading-relaxed font-light font-sans">
                    * {transferData.railwayTransfers.nightChargeNote}
                  </p>
                </div>

                <div className="border-t border-sand/60 pt-6">
                  <h3 className="font-serif text-base font-bold text-primary mb-1">
                    {transferData.busTransfers.station}
                  </h3>
                  <p className="text-xs text-charcoal/50 mb-3">
                    Distance: {transferData.busTransfers.distance} | Time: {transferData.busTransfers.travelTime}
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs font-sans text-charcoal/80">
                    {Object.entries(transferData.busTransfers.rates).map(([name, r]) => (
                      <div key={name} className="flex justify-between border-b border-sand/40 pb-1">
                        <span>{name}:</span>
                        <span className="font-bold text-accent">INR {r.oneWay.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Local Sightseeing & Helicopters */}
            <div className="bg-secondary/20 border border-sand rounded-sm p-8 card-shadow flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-primary mb-6 border-b border-sand pb-3">
                  Sightseeing & Helicopters
                </h2>
                
                <h3 className="font-serif text-base font-bold text-primary mb-3">Local Sightseeing Tours</h3>
                <div className="space-y-2 text-xs font-sans text-charcoal/80 mb-6 font-light">
                  {transferData.localSightseeing.rates.map((rate, idx) => (
                    <div key={idx} className="flex justify-between border-b border-sand/40 pb-1">
                      <span>{rate.vehicle} ({rate.package}):</span>
                      <span className="font-bold text-accent">
                        INR {rate.price.toLocaleString()} <span className="text-[10px] text-charcoal/50 font-light">(Extra km: INR {rate.extraKm})</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-sand/60 pt-6">
                  <h3 className="font-serif text-base font-bold text-primary mb-1">Helicopter Charter Transfers</h3>
                  <p className="text-xs font-sans text-accent font-semibold mb-2">
                    {transferData.helicopterTransfer.price}
                  </p>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-light font-sans mb-3">
                    {transferData.helicopterTransfer.details}
                  </p>
                  <p className="text-[10px] text-charcoal/50 font-sans">
                    * Booking deadline: {transferData.helicopterTransfer.bookingDeadline}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transfer Policies */}
          <div className="bg-white border border-sand rounded-sm p-8 card-shadow">
            <h2 className="font-serif text-2xl font-bold text-primary mb-6 border-b border-sand pb-3 flex items-center gap-2">
              <ShieldAlert className="text-accent" /> Transfer Booking Policies & Waiting Fees
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-sans text-charcoal/80 font-light leading-relaxed">
              <div className="space-y-4">
                <div className="flex gap-2 items-start">
                  <BadgeInfo size={16} className="text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-primary">Night Transfer Periods</h4>
                    <p className="mt-1 text-xs">
                      Pickups or drops scheduled between 11:00 PM and 5:00 AM carry the specified vehicle-class night premium surcharges.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <BadgeInfo size={16} className="text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-primary">Cancellation Policies</h4>
                    <p className="mt-1 text-xs">
                      <strong>Standard Vehicles:</strong> Free cancellation 24+ hours before; 50% charge 12-24 hours before; 100% within 12 hours.<br />
                      <strong>Luxury & Group Vehicles:</strong> Free cancellation 48+ hours before; 50% charge 24-48 hours (luxury only); 100% within 24 hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2 items-start">
                  <BadgeInfo size={16} className="text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-primary">Flight Delays & Waiting Times</h4>
                    <p className="mt-1 text-xs">
                      Wait times are monitored from your supplied flight number. The first 60 minutes (domestic arrivals) or 90 minutes (international arrivals) are complimentary. Further waiting is charged hourly: INR 600/hr (sedan/SUV/MUV), INR 900/hr (van), and INR 1,500/hr (luxury vehicles).
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
