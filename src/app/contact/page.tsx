"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { resortDetails } from "@/data/contact";
import { roomCategories } from "@/data/rooms";
import { diningOutlets } from "@/data/dining";
import { spaTreatments } from "@/data/spa";
import { transferData } from "@/data/transfers";
import { Phone, Mail, MapPin, ShieldAlert, CheckCircle, AlertCircle, Calendar } from "lucide-react";

function ContactFormContent() {
  const searchParams = useSearchParams();

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [enquiryType, setEnquiryType] = useState("general");
  const [roomType, setRoomType] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [outlet, setOutlet] = useState("");
  const [guestsCount, setGuestsCount] = useState(2);
  const [preferredTime, setPreferredTime] = useState("");
  const [treatment, setTreatment] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [comments, setComments] = useState("");

  // UI States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<any>(null);

  // Pre-fill fields from URL queries
  useEffect(() => {
    const type = searchParams.get("enquiryType");
    if (type) setEnquiryType(type);

    const room = searchParams.get("roomType");
    if (room) setRoomType(room);

    const rest = searchParams.get("outlet");
    if (rest) setOutlet(rest);

    const treat = searchParams.get("treatment");
    if (treat) setTreatment(treat);

    const veh = searchParams.get("vehicle");
    if (veh) setVehicle(veh);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const payload: any = {
      fullName,
      email,
      phone,
      enquiryType,
      comments,
    };

    if (enquiryType === "stay") {
      payload.roomType = roomType;
      payload.checkIn = checkIn || undefined;
      payload.checkOut = checkOut || undefined;
      payload.guests = Number(guests);
    } else if (enquiryType === "dining") {
      payload.outlet = outlet;
      payload.guestsCount = Number(guestsCount);
      payload.preferredTime = preferredTime || undefined;
    } else if (enquiryType === "spa") {
      payload.treatment = treatment;
    } else if (enquiryType === "transfer") {
      payload.vehicle = vehicle;
      payload.flightNumber = flightNumber || undefined;
    }

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrors(data.errors || { general: data.message || "An error occurred." });
      } else {
        setSuccessReceipt(data);
      }
    } catch (err) {
      setErrors({ general: "Unable to connect to the server. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successReceipt) {
    return (
      <div className="bg-white border border-sand rounded-sm p-8 card-shadow text-center max-w-xl mx-auto my-12">
        <CheckCircle className="text-accent mx-auto mb-4" size={48} />
        <h2 className="font-serif text-2xl font-bold text-primary mb-2">Enquiry Submitted Successfully</h2>
        <p className="font-sans text-xs text-charcoal/50 uppercase tracking-widest mb-6">
          Reference Code: <span className="font-mono font-bold text-primary">{successReceipt.referenceNumber}</span>
        </p>
        <div className="bg-secondary/15 rounded-sm p-5 text-left text-xs font-sans text-charcoal/80 space-y-3 mb-6">
          <p><strong>Guest Name:</strong> {fullName}</p>
          <p><strong>Email Address:</strong> {email}</p>
          <p><strong>Phone Number:</strong> {phone}</p>
          <p><strong>Enquiry Type:</strong> {enquiryType.toUpperCase()}</p>
          {enquiryType === "stay" && (
            <>
              <p><strong>Room Category:</strong> {roomType}</p>
              <p><strong>Check-In Date:</strong> {checkIn}</p>
              <p><strong>Check-Out Date:</strong> {checkOut}</p>
              <p><strong>Total Guests:</strong> {guests}</p>
            </>
          )}
          {enquiryType === "dining" && (
            <>
              <p><strong>Restaurant Outlet:</strong> {outlet}</p>
              <p><strong>Preferred Time:</strong> {preferredTime}</p>
              <p><strong>Covers:</strong> {guestsCount} guests</p>
            </>
          )}
          {enquiryType === "spa" && <p><strong>Spa Treatment:</strong> {treatment}</p>}
          {enquiryType === "transfer" && <p><strong>Vehicle Preference:</strong> {vehicle}</p>}
        </div>
        <p className="font-sans text-sm text-charcoal/70 leading-relaxed font-light mb-6">
          {successReceipt.message}
        </p>
        <button
          onClick={() => {
            setSuccessReceipt(null);
            setFullName("");
            setEmail("");
            setPhone("");
            setComments("");
            setCheckIn("");
            setCheckOut("");
          }}
          className="bg-primary hover:bg-accent text-ivory px-6 py-2.5 rounded-sm font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Enquiry Form */}
      <div className="lg:col-span-2 bg-white border border-sand rounded-sm p-6 lg:p-8 card-shadow">
        <h2 className="font-serif text-2xl font-bold text-primary mb-6">Reservation & Enquiry Form</h2>
        
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-sm p-4 text-xs font-sans text-red-800 flex gap-2 items-center mb-6">
            <AlertCircle size={16} />
            <span>{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-sm font-sans text-charcoal/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full name */}
            <div>
              <label className="block font-semibold text-primary mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className={`w-full border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-accent ${
                  errors.fullName ? "border-red-400 bg-red-50/10" : "border-sand"
                }`}
              />
              {errors.fullName && (
                <span className="text-xs text-red-600 mt-1 block">{errors.fullName}</span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold text-primary mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. rahul@example.com"
                className={`w-full border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-accent ${
                  errors.email ? "border-red-400 bg-red-50/10" : "border-sand"
                }`}
              />
              {errors.email && (
                <span className="text-xs text-red-600 mt-1 block">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div>
              <label className="block font-semibold text-primary mb-1">Phone Number *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 9876543210"
                className={`w-full border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-accent ${
                  errors.phone ? "border-red-400 bg-red-50/10" : "border-sand"
                }`}
              />
              {errors.phone && (
                <span className="text-xs text-red-600 mt-1 block">{errors.phone}</span>
              )}
            </div>

            {/* Enquiry type */}
            <div>
              <label className="block font-semibold text-primary mb-1">Enquiry Type *</label>
              <select
                value={enquiryType}
                onChange={(e) => setEnquiryType(e.target.value)}
                className="w-full border border-sand rounded-sm px-3 py-2 bg-white text-sm focus:outline-none focus:border-accent"
              >
                <option value="stay">Stay Booking & Tariff Enquiry</option>
                <option value="dining">Fine Dining Table Booking</option>
                <option value="spa">Aranya Spa Appointment</option>
                <option value="transfer">Airport / Station Transfer</option>
                <option value="event">Wedding or Conference Enquiry</option>
                <option value="general">General Enquiry</option>
              </select>
            </div>
          </div>

          {/* DYNAMIC FIELDS based on Enquiry Type */}
          {enquiryType === "stay" && (
            <div className="bg-secondary/15 rounded-sm p-4 space-y-4 border border-sand/40">
              <h3 className="font-serif text-sm font-bold text-primary uppercase tracking-wider">Stay Enquiry Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/80 mb-1">Preferred Room Type</label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full border border-sand rounded-sm px-3 py-2 bg-white text-xs text-charcoal focus:outline-none focus:border-accent"
                  >
                    <option value="">-- Select Room Category --</option>
                    {roomCategories.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} (Max {r.maximumOccupancy} Pax)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/80 mb-1">Number of Guests</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full border border-sand rounded-sm px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/80 mb-1">Check-in Date *</label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className={`w-full border rounded-sm px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-accent ${
                      errors.checkIn ? "border-red-400 bg-red-50/10" : "border-sand"
                    }`}
                  />
                  {errors.checkIn && (
                    <span className="text-xs text-red-600 mt-1 block">{errors.checkIn}</span>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/80 mb-1">Check-out Date *</label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className={`w-full border rounded-sm px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-accent ${
                      errors.checkOut ? "border-red-400 bg-red-50/10" : "border-sand"
                    }`}
                  />
                  {errors.checkOut && (
                    <span className="text-xs text-red-600 mt-1 block">{errors.checkOut}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {enquiryType === "dining" && (
            <div className="bg-secondary/15 rounded-sm p-4 space-y-4 border border-sand/40">
              <h3 className="font-serif text-sm font-bold text-primary uppercase tracking-wider">Restaurant Reservation Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/80 mb-1">Select Restaurant</label>
                  <select
                    value={outlet}
                    onChange={(e) => setOutlet(e.target.value)}
                    className="w-full border border-sand rounded-sm px-3 py-2 bg-white text-xs text-charcoal focus:outline-none focus:border-accent"
                  >
                    <option value="">-- Select Restaurant --</option>
                    {diningOutlets.map((o) => (
                      <option key={o.id} value={o.id}>{o.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/80 mb-1">Preferred Time</label>
                  <input
                    type="text"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    placeholder="e.g. 7:30 PM"
                    className="w-full border border-sand rounded-sm px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/80 mb-1">Number of Covers</label>
                  <input
                    type="number"
                    min={1}
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full border border-sand rounded-sm px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>
          )}

          {enquiryType === "spa" && (
            <div className="bg-secondary/15 rounded-sm p-4 space-y-4 border border-sand/40">
              <h3 className="font-serif text-sm font-bold text-primary uppercase tracking-wider">Spa Therapy Appointment</h3>
              <div>
                <label className="block text-xs font-semibold text-charcoal/80 mb-1">Select Treatment</label>
                <select
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  className="w-full border border-sand rounded-sm px-3 py-2 bg-white text-xs text-charcoal focus:outline-none focus:border-accent"
                >
                  <option value="">-- Select Treatment / Ritual --</option>
                  {spaTreatments.map((t) => (
                    <option key={t.id} value={t.id}>{t.name} ({t.duration})</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {enquiryType === "transfer" && (
            <div className="bg-secondary/15 rounded-sm p-4 space-y-4 border border-sand/40">
              <h3 className="font-serif text-sm font-bold text-primary uppercase tracking-wider">Transportation Service Booking</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/80 mb-1">Vehicle Category</label>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full border border-sand rounded-sm px-3 py-2 bg-white text-xs text-charcoal focus:outline-none focus:border-accent"
                  >
                    <option value="">-- Select Vehicle Class --</option>
                    {transferData.vehicles.map((v) => (
                      <option key={v.code} value={v.code}>{v.name} (Max {v.maxGuests} Pax)</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/80 mb-1">Flight Number (For delays tracking)</label>
                  <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. AI-582"
                    className="w-full border border-sand rounded-sm px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Comments */}
          <div>
            <label className="block font-semibold text-primary mb-1">Comments / Special Requests</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Please describe any dietary needs, early arrivals, or mobility issues..."
              rows={4}
              maxLength={500}
              className="w-full border border-sand rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-accent text-charcoal"
            />
            <span className="text-xs text-charcoal/40 mt-1 block">Max 500 characters</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-accent text-ivory py-3 rounded-sm font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 disabled:opacity-50 shadow-md"
          >
            {isSubmitting ? "Validating & Submitting..." : "Submit Reservation Request"}
          </button>
        </form>
      </div>

      {/* Sidebar Details */}
      <div className="flex flex-col gap-6">
        {/* Contact Info Card */}
        <div className="bg-white border border-sand rounded-sm p-6 card-shadow font-sans text-sm text-charcoal/80 font-light leading-relaxed">
          <h3 className="font-serif text-lg font-bold text-primary border-b border-sand pb-3 mb-4">
            Resort Helpdesks
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <MapPin className="text-accent shrink-0 mt-1" size={16} />
              <span>{resortDetails.address}</span>
            </div>
            <div className="flex gap-3 items-center">
              <Phone className="text-accent shrink-0" size={14} />
              <a href={`tel:${resortDetails.phone}`} className="hover:text-accent transition-colors">
                {resortDetails.phone}
              </a>
            </div>
            <div className="flex gap-3 items-center">
              <Mail className="text-accent shrink-0" size={14} />
              <a href={`mailto:${resortDetails.email}`} className="hover:text-accent transition-colors">
                {resortDetails.email}
              </a>
            </div>
          </div>
        </div>

        {/* Security Alert Card */}
        <div className="bg-red-50 border border-red-200 rounded-sm p-5 card-shadow flex gap-3 items-start text-xs text-red-900 leading-relaxed font-light">
          <ShieldAlert className="text-red-700 shrink-0 mt-0.5" size={20} />
          <div>
            <strong className="text-red-950 font-bold block mb-1">Billing Security Alert</strong>
            RKPR Resort will never ask for Card PINs, CVV codes, UPI PINs, or bank passwords. Ensure you only process payments via secure, verified gateways.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Contact Concierge
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-wide text-primary mb-6">
              Connect With Us
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
          </div>

          <Suspense fallback={<div className="text-center py-20 font-sans text-sm text-charcoal/60">Loading enquiry form...</div>}>
            <ContactFormContent />
          </Suspense>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
