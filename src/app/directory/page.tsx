import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { resortDirectory } from "@/data/directory";
import { Clock, PhoneCall } from "lucide-react";
import { resortDetails } from "@/data/contact";

export const metadata = {
  title: "Resort Timings Directory",
  description: "Check operating hours and schedules for all departments, pools, restaurants, spas, and front desk at RKPR Resort.",
};

export default function Directory() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Hours of Operation
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-primary mb-4 flex items-center justify-center gap-3">
              <Clock size={32} className="text-accent" /> Timings & Hours Directory
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-sm text-charcoal/70 font-light leading-relaxed">
              Find the opening and closing hours for all guest-facing services, dining outlets, recreational spaces, and help desks.
            </p>
          </div>

          {/* Directory Table */}
          <div className="bg-white border border-sand rounded-sm shadow-xl overflow-hidden card-shadow mb-12">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-sand bg-secondary/15">
                  <th className="p-4 font-serif text-sm font-bold text-primary w-1/3">Department / Service</th>
                  <th className="p-4 font-serif text-sm font-bold text-primary w-1/3 text-center">Operating Hours</th>
                  <th className="p-4 font-serif text-sm font-bold text-primary w-1/3">Operational Guidelines</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/55 font-sans text-sm text-charcoal/80">
                {resortDirectory.map((entry) => (
                  <tr key={entry.department} className="hover:bg-secondary/5 transition-colors">
                    <td className="p-4 font-semibold text-primary">{entry.department}</td>
                    <td className="p-4 text-center font-mono text-xs font-semibold text-accent bg-secondary/10">
                      {entry.opening} - {entry.closing}
                    </td>
                    <td className="p-4 font-light text-xs leading-relaxed">{entry.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Helpdesk Contact Section */}
          <div className="bg-primary text-ivory rounded-sm p-6 card-shadow flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4 items-start">
              <PhoneCall className="text-accent-light shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-serif text-lg font-bold text-accent-light">Direct Helpline Extensions</h4>
                <p className="font-sans text-xs text-sand/80 font-light mt-1">
                  Connect instantly to resort teams. Front Desk is available 24/7. Reservations desk accepts calls from 8:00 AM to 8:00 PM daily.
                </p>
              </div>
            </div>
            <div className="text-right font-mono text-sm font-bold shrink-0">
              <div>Reception: {resortDetails.phone}</div>
              <div>Emergency: {resortDetails.emergencyLine}</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
