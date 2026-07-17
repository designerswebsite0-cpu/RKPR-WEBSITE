import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Accessibility, CheckCircle, ShieldAlert, Phone } from "lucide-react";
import { resortDetails } from "@/data/contact";

export const metadata = {
  title: "Accessibility Features",
  description: "Learn about wheelchair-accessible rooms, flat pathways, step-free access, and certified service animal rules at RKPR Resort.",
};

export default function AccessibilityPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Inclusive Hospitality
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-primary mb-4 flex items-center justify-center gap-3">
              <Accessibility size={32} className="text-accent" /> Accessibility Features
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-sm text-charcoal/70 font-light leading-relaxed">
              RKPR Resort is committed to providing a comfortable experience for guests of all physical abilities. Discover our wheelchair-accessible configurations, pathways, and support services.
            </p>
          </div>

          {/* Core Content */}
          <div className="space-y-8 mb-12 font-sans text-sm text-charcoal/80 font-light leading-relaxed">
            {/* Rooms */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-accent" /> Accessible Room Categories
              </h3>
              <p className="mb-4">
                We have designated exactly <strong>4 rooms</strong> in our <strong>Garden Deluxe Room (GDR)</strong> category as fully wheelchair-accessible. These rooms are positioned on the ground floor of Garden Wings A and B.
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs font-sans text-charcoal/70">
                <li>Step-free ground-level entrance with ramped door threshold.</li>
                <li>Wider entrance doorway (90 cm clearance) and bathroom doorway (85 cm clearance).</li>
                <li>Lowered light switches, clothing hanging rods, and in-room electronic safe.</li>
                <li>Roll-in shower with hand-held shower wand and folding shower seat.</li>
                <li>Wall-mounted grab bars at the toilet and inside the shower area.</li>
                <li>Lowered washbasin with clear underspace for knee clearance.</li>
                <li>Emergency pull cord in the bathroom linked directly to the 24h Front Office helpdesk.</li>
              </ul>
            </div>

            {/* Resort Layout */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-accent" /> Step-Free Pathways & Lift Access
              </h3>
              <p className="mb-4">
                The resort is designed with gentle inclines and flat concrete/stone pathways linking major components:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs font-sans text-charcoal/70">
                <li><strong>Public Spaces:</strong> The lobby, reception desk, Business Centre, and Azure Terrace restaurant feature step-free flat pathway entries.</li>
                <li><strong>Main Infinity Pool:</strong> The pool deck area is fully accessible from the main pathway. Hand-rail assisted steps lead into the pool water.</li>
                <li><strong>Elevators:</strong> Modern passenger elevators serve the multi-level wings (Valley View and Mountain Panorama wings) with tactile buttons and audio floor announcers.</li>
                <li><strong>Golf Carts:</strong> Ramped electric golf carts with luggage and wheelchair stowage are available 24/7 for guest transfers on property.</li>
              </ul>
            </div>

            {/* Service Animals */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-accent" /> Certified Service Animals
              </h3>
              <p>
                While the resort maintains a strict no-pets policy, certified service animals (e.g. guide dogs for visually impaired guests) are fully permitted to accompany guests in all public spaces, guest rooms, and dining locations.
              </p>
              <p className="mt-2 text-xs text-charcoal/50">
                * Prior declaration and service-registration certificates must be filed with the Reservations Desk during booking. No pet fee applies for registered service animals.
              </p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-primary text-ivory rounded-sm p-6 card-shadow flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex gap-4 items-start">
              <Phone className="text-accent-light shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-serif text-lg font-bold text-accent-light">Accessibility Coordination</h4>
                <p className="font-sans text-xs text-sand/80 font-light mt-1">
                  If you require special equipment (e.g. shower chairs, bed rails) or need specific room coordinates close to the lobby, please contact our Front Office Manager.
                </p>
              </div>
            </div>
            <a
              href={`tel:${resortDetails.phone}`}
              className="bg-accent hover:bg-accent-light text-ivory px-6 py-2.5 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 whitespace-nowrap"
            >
              Call Concierge
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
