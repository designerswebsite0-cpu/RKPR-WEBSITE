import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { resortDetails } from "@/data/contact";
import { ShieldCheck, UserCheck, AlertTriangle, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Guest Policies",
  description: "Read guest policies including check-in/out times, smoking rules, pet policies, visitor ID rules, and child age brackets at RKPR Resort.",
};

export default function GuestPolicies() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Resort Guidelines
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-primary mb-4 flex items-center justify-center gap-3">
              <ShieldCheck size={32} className="text-accent" /> Guest Policies & Guidelines
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-sm text-charcoal/70 font-light leading-relaxed">
              We appreciate your cooperation in adhering to our resort policies to ensure a safe and pleasant stay for all guests.
            </p>
          </div>

          {/* Core Policies */}
          <div className="space-y-8 mb-12 font-sans text-sm text-charcoal/80 font-light leading-relaxed">
            {/* Checkin Checkout */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <UserCheck size={18} className="text-accent" /> Check-In and Check-Out
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xs font-sans text-charcoal/70">
                <li><strong>Check-In Time:</strong> From 2:00 PM. Access to rooms prior to 2:00 PM is subject to availability and cannot be guaranteed without pre-booking the night before.</li>
                <li><strong>Check-Out Time:</strong> By 11:00 AM. Delayed check-out is subject to availability and carries additional charges: 50% room tariff up to 4:00 PM, and 100% room tariff after 4:00 PM.</li>
                <li><strong>Registration:</strong> Under government guidelines, all guests (including children) must provide a valid government-issued photo ID during check-in. Foreign nationals must present a valid passport and tourist visa.</li>
              </ul>
            </div>

            {/* Child Bands */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <UserCheck size={18} className="text-accent" /> Child & Occupancy Policies
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xs font-sans text-charcoal/70">
                <li><strong>Infant Band (Ages 0 - 5):</strong> Stay and dine (breakfast) complimentary on a sharing basis. No extra bed is provided.</li>
                <li><strong>Child Band (Ages 6 - 11):</strong> Rollaway extra beds can be set up in eligible rooms (INR 2,500/night including breakfast).</li>
                <li><strong>Adult Band (Ages 12+):</strong> Classified as adults and subject to full occupant rates. Extra bed usage is mandatory if exceeding base room capacities.</li>
                <li><strong>Honeymoon Pool Villa Exception:</strong> Strictly an adult-only room (maximum 2 adults). No children or infants are accommodated in this category for safety reasons due to the private plunge pool.</li>
              </ul>
            </div>

            {/* Smoking and Visitors */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-accent" /> Smoking, Pets & Visitors
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xs font-sans text-charcoal/70">
                <li><strong>Smoking Restrictions:</strong> All rooms, suites, villas, balconies, decks, and indoor public spaces are strictly non-smoking. Designated outdoor smoking zones are marked across the property. A cleaning fee of INR 10,000 applies to any violation.</li>
                <li><strong>Pet Regulations:</strong> Pets are not permitted on the property. Certified service animals (such as guide dogs) are allowed with prior documentation.</li>
                <li><strong>Visitor Regulations:</strong> External visitors are allowed in public areas and dining outlets only, and must register at reception. Overnight visitors in rooms are not permitted unless formally checked in as registered guests.</li>
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
