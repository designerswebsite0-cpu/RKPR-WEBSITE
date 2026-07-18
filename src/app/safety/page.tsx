import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { resortDetails } from "@/data/contact";
import { ShieldCheck, PhoneCall, HeartPulse, ShieldAlert, Siren } from "lucide-react";

export const metadata = {
  title: "Safety & Emergency Procedures",
  description: "Read safety guidelines, evacuation plans, medical services, and emergency contact numbers at RKPR Resort.",
};

export default function SafetyPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Guest Security
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-primary mb-4 flex items-center justify-center gap-3">
              <Siren size={32} className="text-accent" /> Safety & Emergency Procedures
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-sm text-charcoal/70 font-light leading-relaxed">
              Your security and well-being are our highest priorities. Review our on-property safety protocols, medical services, and evacuation procedures.
            </p>
          </div>

          {/* Emergency contacts card */}
          <div className="mb-12 bg-red-50 border border-red-200 rounded-sm p-6 card-shadow flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex gap-4 items-start">
              <PhoneCall className="text-red-700 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-serif text-lg font-bold text-red-950">Emergency Helpline</h4>
                <p className="font-sans text-xs text-red-900 font-light mt-1">
                  Connect instantly to the resort&apos;s 24-hour Emergency Response Desk or Security Officer.
                </p>
              </div>
            </div>
            <div className="text-right font-mono text-base font-bold text-red-950 shrink-0">
              <div>Phone: {resortDetails.emergencyLine}</div>
              <div>From Room: Dial 99</div>
            </div>
          </div>

          {/* Core Content */}
          <div className="space-y-8 mb-12 font-sans text-sm text-charcoal/80 font-light leading-relaxed">
            {/* Medical Facilities */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <HeartPulse size={18} className="text-accent" /> Medical Support Services
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xs font-sans text-charcoal/70">
                <li><strong>First-Aid & Medical Room:</strong> Located on the ground floor next to the main lobby. Staffed with a qualified nurse during regular operational hours. Basic first-aid kits are available at all reception desks.</li>
                <li><strong>On-Call Doctor:</strong> An on-call doctor from Chamarajanagar General Hospital can be summoned for room consultation. A standard consultation fee applies.</li>
                <li><strong>Nearest Hospital:</strong> Chamarajanagar District Hospital is located 32 km from the resort (~45 minutes&apos; drive). In the event of a critical emergency, our resort ambulance is on standby to transport patients.</li>
              </ul>
            </div>

            {/* Fire and Evacuation */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <ShieldAlert size={18} className="text-accent" /> Fire and Evacuation Protocols
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xs font-sans text-charcoal/70">
                <li><strong>Fire Alarms & Smoke Detectors:</strong> All guest rooms, corridors, and public spaces are fitted with addressable smoke detectors and sprinkler systems.</li>
                <li><strong>Evacuation Routes:</strong> Exit route diagrams are mounted on the inside of every guest room door. Please review these diagrams upon arrival. Elevators must not be used during fire evacuations.</li>
                <li><strong>Assembly Point:</strong> The designated emergency assembly point is the <strong>Open Events Lawn</strong>, located in front of the Garden Wing. Please proceed there in an orderly fashion in the event of an alarm.</li>
              </ul>
            </div>

            {/* Incident Protocols */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-accent" /> Incident Action Guidelines
              </h3>
              <div className="space-y-4 text-xs font-sans text-charcoal/70">
                <div>
                  <h4 className="font-bold text-primary text-sm">Suspicious Activities:</h4>
                  <p className="mt-1">
                    If you observe suspicious persons, unattended luggage, or potential security hazards, report them immediately by dialing 99 from your room or informing a staff member.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">Lost Children:</h4>
                  <p className="mt-1">
                    If a child is lost, immediately notify the Kids&apos; Club Desk or the Front Desk. Security staff will initiate standard property search procedures and monitor exit gates.
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
