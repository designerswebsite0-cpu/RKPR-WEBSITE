import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { resortDetails } from "@/data/contact";
import { ShieldCheck, CreditCard, ShieldAlert, BadgeInfo } from "lucide-react";

export const metadata = {
  title: "Payments & Refund Policies",
  description: "Check billing procedures, accepted payment methods, deposit rules, refund schedules, and payment security disclaimers at RKPR Resort.",
};

export default function PaymentsPage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Financial Integrity
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-wide text-primary mb-4 flex items-center justify-center gap-3">
              <CreditCard size={32} className="text-accent" /> Payments & Billing Policies
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-sm text-charcoal/70 font-light leading-relaxed">
              Verify payment methods, reservation deposit guidelines, refund timelines, and secure billing warnings.
            </p>
          </div>

          {/* Core Content */}
          <div className="space-y-8 mb-12 font-sans text-sm text-charcoal/80 font-light leading-relaxed">
            {/* Payment security notice */}
            <div className="bg-red-50 border border-red-200 rounded-sm p-6 card-shadow flex gap-4 items-start">
              <ShieldAlert className="text-red-700 shrink-0 mt-0.5" size={24} />
              <div>
                <h3 className="font-serif text-lg font-bold text-red-950 mb-2">Important Payment Security Warning</h3>
                <p className="text-xs text-red-900 leading-relaxed font-light">
                  RKPR Resort will <strong>NEVER</strong> request an OTP (One-Time Password), CVV number, credit card PIN, UPI PIN, or banking passwords through email, phone, SMS, or WhatsApp. Do not disclose these credentials to anyone. All official bookings are processed through our secure, verified booking portal. If you receive a suspicious payment request, please report it immediately to our Front Office Director.
                </p>
              </div>
            </div>

            {/* Billing Procedures */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-accent" /> Accepted Payment Methods
              </h3>
              <p className="mb-4">
                We accept payments through the following secure channels:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs font-sans text-charcoal/70 mb-4">
                <li>Major credit and debit cards (Visa, Mastercard, American Express, RuPay).</li>
                <li>Unified Payments Interface (UPI) transfers and Google Pay / PhonePe.</li>
                <li>Direct Bank Wire / NEFT / RTGS transfers (bank details can be provided by the reservations team).</li>
                <li>Secure online payment links generated exclusively from our verified system domain.</li>
              </ul>
            </div>

            {/* Booking Deposits */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-accent" /> Deposit Requirements
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xs font-sans text-charcoal/70 mb-4">
                <li><strong>Standard Bookings:</strong> A <strong>30% advance deposit</strong> is required at booking. The remaining 70% balance is payable at check-out along with any incidental charges.</li>
                <li><strong>Peak Period Bookings (20 December - 5 January):</strong> Requires a <strong>100% advance deposit</strong> at booking. Peak bookings are non-refundable.</li>
                <li><strong>Incidental Security Deposit:</strong> A security deposit of <strong>INR 5,000 per room</strong> is required upon check-in to cover incidental room charges (minibar, laundry, telephone). This hold is released at check-out, minus any actual room charge deductibles.</li>
              </ul>
            </div>

            {/* Cancellations & Refunds */}
            <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <BadgeInfo size={18} className="text-accent" /> Cancellations & Refunds
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xs font-sans text-charcoal/70">
                <li>Cancellations made <strong>14+ days before arrival</strong>: Full refund of the advance deposit.</li>
                <li>Cancellations made <strong>7-14 days before arrival</strong>: 50% of the advance deposit is refunded.</li>
                <li>Cancellations made <strong>within 7 days of arrival</strong>: The entire advance deposit is forfeited.</li>
                <li><strong>Refund Processing Timeline:</strong> Approved refunds are credited back to the original payment channel within <strong>7 to 10 business days</strong>.</li>
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
