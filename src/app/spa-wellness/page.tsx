import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { spaTreatments, coupleRituals, spaFacilities } from "@/data/spa";
import { Clock, CalendarCheck, ShieldAlert, Waves } from "lucide-react";

export const metadata = {
  title: "Aranya Wellness Spa",
  description: "Experience Ayurvedic rejuvenation, professional massages, steam rooms, and hot stone therapies at Aranya Wellness Spa in RKPR Resort.",
};

export default function SpaWellness() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        {/* Banner Section */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Holistic Rejuvenation
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-wide text-primary mb-6">
              Aranya Wellness Spa
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-base text-charcoal/80 font-light leading-relaxed">
              Step into a sanctuary of wellness. Aranya Wellness Spa offers traditional Ayurvedic therapies and premium wellness treatments. Featuring couple suites, a steam room, a sauna, and a hydrotherapy jacuzzi.
            </p>
          </div>

          {/* Operating Hours & Reservation Notice */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-primary text-ivory rounded-sm p-6 card-shadow md:col-span-2 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-accent-light border-b border-ivory/10 pb-3 mb-4 flex items-center gap-2">
                  <Clock size={20} /> Operating Hours
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-sans text-sand/90 font-light">
                  <div>
                    <h4 className="font-bold text-ivory">Weekdays (Monday - Friday)</h4>
                    <p className="mt-1 text-xs">9:00 AM - 9:00 PM</p>
                    <p className="mt-2 text-[10px] text-sand/60">
                      * Last start time: 7:45 PM (60-min treatment), 7:15 PM (90-min treatment).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-ivory">Weekends & Public Holidays</h4>
                    <p className="mt-1 text-xs">8:00 AM - 10:00 PM</p>
                    <p className="mt-2 text-[10px] text-sand/60">
                      * Last start time: 8:45 PM (60-min treatment), 8:15 PM (90-min treatment).
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-sand/50 font-sans border-t border-ivory/10 pt-4 mt-6">
                * Hours are formally audited and approved by the Spa Manager on 17 July 2026, resolving CON-005.
              </p>
            </div>

            <div className="bg-white border border-sand rounded-sm p-6 card-shadow flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-primary border-b border-sand pb-3 mb-4 flex items-center gap-2">
                  <CalendarCheck size={18} className="text-accent" /> Appointments
                </h3>
                <p className="font-sans text-xs text-charcoal/70 leading-relaxed mb-6 font-light">
                  Treatments require prior reservations. We recommend booking at least 12 hours in advance. Standard cancellations require 6+ hours&apos; notice.
                </p>
              </div>
              <Link
                href="/contact?enquiryType=spa"
                className="bg-accent hover:bg-accent-light text-ivory text-center py-3 rounded-sm font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 block w-full shadow-md"
              >
                Request Appointment
              </Link>
            </div>
          </div>

          {/* Facilities Section */}
          <div className="mb-16">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-primary mb-8 text-center">
              Spa Facilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {spaFacilities.map((facility) => (
                <div key={facility.name} className="bg-white border border-sand rounded-sm p-6 card-shadow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary mb-3 flex items-center gap-2">
                      <Waves size={18} className="text-accent" /> {facility.name}
                    </h3>
                    <div className="space-y-2 text-xs font-sans text-charcoal/80 mb-4 font-light">
                      <div><strong>Hours:</strong> {facility.timings}</div>
                      <div><strong>Capacity:</strong> {facility.capacity}</div>
                      <div><strong>Age Limit:</strong> {facility.minimumAge}+ years</div>
                      <div><strong>Dress Code:</strong> {facility.dressCode}</div>
                      {facility.charge && <div><strong>Facility Charge:</strong> {facility.charge}</div>}
                    </div>
                  </div>
                  <div className="border-t border-sand/55 pt-4 text-[10px] font-sans text-charcoal/50 leading-relaxed">
                    <strong>Safety Notice:</strong> {facility.safetyNotes}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Couple Rituals */}
          <div className="mb-16 bg-secondary/25 border border-sand rounded-sm p-8 card-shadow">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">
              Signature Couple Rituals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coupleRituals.map((ritual) => (
                <div key={ritual.id} className="bg-white border border-sand rounded-sm p-6 card-shadow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-primary mb-2">{ritual.name}</h3>
                    <span className="text-xs font-sans text-accent font-semibold block mb-4">
                      {ritual.duration} | INR {ritual.price.toLocaleString()} (for two)
                    </span>
                    <p className="font-sans text-xs text-charcoal/70 leading-relaxed font-light mb-6">
                      <strong>Includes:</strong> {ritual.includes}
                    </p>
                  </div>
                  <div className="border-t border-sand/55 pt-4 text-[10px] font-sans text-charcoal/50">
                    <div>Booking Deadline: {ritual.bookingDeadline}</div>
                    <div>Cancellation Deadline: {ritual.cancellationDeadline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Treatments List */}
          <div>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-primary mb-8 text-center">
              Massage & Therapy Menu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {spaTreatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className="bg-white border border-sand rounded-sm p-6 card-shadow flex justify-between gap-6 hover:border-accent transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-bold text-primary mb-1">{treatment.name}</h3>
                    <p className="font-sans text-xs text-charcoal/50 mb-3">
                      Duration: {treatment.duration} | Min Age: {treatment.minimumAge}+ years
                    </p>
                    <p className="font-sans text-sm text-charcoal/80 leading-relaxed font-light">
                      {treatment.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0 flex flex-col justify-between items-end border-l border-sand/50 pl-6 w-32">
                    <span className="font-serif text-base font-bold text-accent">
                      INR {treatment.price.toLocaleString()}
                    </span>
                    <Link
                      href={`/contact?enquiryType=spa&treatment=${treatment.id}`}
                      className="text-[10px] font-sans font-bold text-primary hover:text-accent uppercase tracking-wider"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Notice */}
          <div className="mt-16 bg-primary-dark/5 border border-primary/10 rounded-sm p-6 flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto">
            <ShieldAlert className="text-accent shrink-0" size={24} />
            <p className="font-sans text-xs text-charcoal/75 leading-relaxed font-light">
              <strong>Medical Disclaimer:</strong> Spa therapies and temperature-moderated facilities are not recommended for guests with high blood pressure, heart conditions, fever, open wounds, skin infections, or certain stages of pregnancy. Please disclose all health conditions during booking.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
