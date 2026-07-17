import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Users, CheckCircle, Clock, Baby, HelpCircle } from "lucide-react";
import { resortDetails } from "@/data/contact";

export const metadata = {
  title: "Families & Kids Services",
  description: "Check kids club hours, kids pool rules, babysitting fees, and family accommodations at RKPR Resort.",
};

export default function FamiliesPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Family Holidays
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-primary mb-4 flex items-center justify-center gap-3">
              <Users size={32} className="text-accent" /> Families & Kids Services
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-sm text-charcoal/70 font-light leading-relaxed">
              We provide family-friendly accommodations, supervised recreation spaces, and child-safe pools to ensure a memorable holiday for all ages.
            </p>
          </div>

          {/* Core Content */}
          <div className="space-y-8 mb-12 font-sans text-sm text-charcoal/80 font-light leading-relaxed">
            {/* Kids Club */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Clock size={18} className="text-accent" /> Kids' Club & Creative Space
              </h3>
              <p className="mb-4">
                Our supervised Kids' Club is located in the Family Courtyard. It is open daily from <strong>9:00 AM to 7:00 PM</strong>, with last guest entry registered by <strong>6:30 PM</strong>.
              </p>
              <div className="bg-secondary/15 rounded-sm p-4 mb-4">
                <h4 className="font-semibold text-primary mb-2 text-xs uppercase tracking-wider">Scheduled Activities & Costs:</h4>
                <ul className="space-y-1.5 text-xs">
                  <li><strong>Treasure Hunt:</strong> Complimentary (Daily 11:00 AM & 4:00 PM)</li>
                  <li><strong>Arts & Crafts (Clay modelling, painting):</strong> INR 350 per child (Daily 2:00 PM - 3:30 PM)</li>
                  <li><strong>Junior Chef Baking Workshop:</strong> INR 900 per child (Weekends 10:30 AM - 12:00 PM)</li>
                  <li><strong>Evening Cartoons:</strong> Complimentary (Daily 5:30 PM - 6:45 PM)</li>
                </ul>
              </div>
              <ul className="list-disc list-inside space-y-2 text-xs font-sans text-charcoal/70">
                <li>Available for children aged 4 to 12 years. Children under 4 must be accompanied by a parent or personal nanny.</li>
                <li>Socks are mandatory inside the indoor play areas.</li>
                <li>Parents or guardians must remain on the resort property while children are checked in.</li>
              </ul>
            </div>

            {/* Family Rooms */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Users size={18} className="text-accent" /> Family-Focused Accommodations
              </h3>
              <p className="mb-4">
                For family getaways, we recommend our specialized room categories:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs font-sans text-charcoal/70 mb-4">
                <li><strong>Family Courtyard Suite (FCS):</strong> Offers 78 sq m of space. Features a semi-private kids' bunk area (two bunk beds), a main king bedroom for parents, and a private garden patio. Accommodates up to 4 adults or 2 adults + 3 children.</li>
                <li><strong>Connecting Rooms (GDR):</strong> We offer 4 connecting pairs in the Garden Deluxe category (1 King Room connected to 1 Twin Room), providing space and proximity.</li>
              </ul>
              <Link
                href="/stay"
                className="text-xs uppercase tracking-widest font-bold text-primary hover:text-accent transition-colors flex items-center gap-1"
              >
                <span>Browse Family Rooms</span>
                <span>&rarr;</span>
              </Link>
            </div>

            {/* Pools & Babysitting */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Baby size={18} className="text-accent" /> Kids' Pool & Babysitting Rules
              </h3>
              <div className="space-y-4 text-xs font-sans text-charcoal/70">
                <div>
                  <h4 className="font-bold text-primary text-sm">Children's Pool:</h4>
                  <p className="mt-1">
                    Open daily from <strong>7:00 AM to 7:00 PM</strong>. Situated next to the main infinity pool, it has a depth of 0.45 meters. There are no dedicated lifeguards; children must be supervised by an adult at all times. Swimwear is required.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">In-Room Babysitting:</h4>
                  <p className="mt-1">
                    Babysitting can be arranged for in-house children aged 2+ years. Charges are INR 500 per hour, with a minimum commitment of 2 hours. Booking requires 6 hours' advance notice at the reception desk.
                  </p>
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
