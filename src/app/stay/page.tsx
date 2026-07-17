"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { roomCategories } from "@/data/rooms";
import { Waves, Sparkles, Accessibility, Users, ArrowRight, GitCompare, Info } from "lucide-react";

export default function StayListing() {
  const [filterPool, setFilterPool] = useState(false);
  const [filterJacuzzi, setFilterJacuzzi] = useState(false);
  const [filterFamily, setFilterFamily] = useState(false);
  const [filterAccessible, setFilterAccessible] = useState(false);

  // Filter logic
  const filteredRooms = roomCategories.filter((room) => {
    if (filterPool && !room.privatePool) return false;
    if (filterJacuzzi && !room.jacuzzi) return false;
    if (filterFamily && room.maximumOccupancy < 4) return false;
    if (filterAccessible && (!room.accessibilityFeatures || room.accessibilityFeatures.length === 0 || room.id !== "GDR")) return false; // GDR is the wheelchair accessible room
    return true;
  });

  return (
    <>
      <Header />
      
      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Accommodations
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-wide text-primary mb-6">
              Our Luxury Rooms & Villas
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-base text-charcoal/80 font-light leading-relaxed">
              Discover our sanctuary of 88 guest-certified keys, ranging from elegant garden rooms to expansive en-suite pool villas. Every category is meticulously detailed with approved RAG capacities and seasonal rate schedules.
            </p>
          </div>

          {/* Comparison Page CTA banner */}
          <div className="mb-12 bg-secondary/30 border border-sand rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6 card-shadow">
            <div className="flex gap-4 items-start">
              <GitCompare className="text-accent shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-serif text-lg font-bold text-primary">Compare Features Side-by-Side</h3>
                <p className="font-sans text-sm text-charcoal/70 font-light mt-1">
                  Evaluate inventories, sizes, occupancies, bed types, private pools, jacuzzis, and seasonal rates.
                </p>
              </div>
            </div>
            <Link
              href="/compare-rooms"
              className="bg-primary hover:bg-accent text-ivory px-6 py-3 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 whitespace-nowrap"
            >
              Compare All Rooms
            </Link>
          </div>

          {/* Filtering Section */}
          <div className="mb-10 bg-white border border-sand rounded-sm p-5 card-shadow">
            <h3 className="font-serif text-base font-bold text-primary mb-4">Filter Accommodations</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => setFilterPool(!filterPool)}
                className={`flex items-center justify-center gap-2 py-3 border rounded-sm font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                  filterPool
                    ? "bg-primary border-primary text-ivory"
                    : "border-sand text-charcoal/70 hover:bg-sand/20"
                }`}
              >
                <Waves size={16} />
                <span>Private Pool</span>
              </button>
              <button
                onClick={() => setFilterJacuzzi(!filterJacuzzi)}
                className={`flex items-center justify-center gap-2 py-3 border rounded-sm font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                  filterJacuzzi
                    ? "bg-primary border-primary text-ivory"
                    : "border-sand text-charcoal/70 hover:bg-sand/20"
                }`}
              >
                <Sparkles size={16} />
                <span>Private Jacuzzi</span>
              </button>
              <button
                onClick={() => setFilterFamily(!filterFamily)}
                className={`flex items-center justify-center gap-2 py-3 border rounded-sm font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                  filterFamily
                    ? "bg-primary border-primary text-ivory"
                    : "border-sand text-charcoal/70 hover:bg-sand/20"
                }`}
              >
                <Users size={16} />
                <span>Family Friendly (4+ Guests)</span>
              </button>
              <button
                onClick={() => setFilterAccessible(!filterAccessible)}
                className={`flex items-center justify-center gap-2 py-3 border rounded-sm font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                  filterAccessible
                    ? "bg-primary border-primary text-ivory"
                    : "border-sand text-charcoal/70 hover:bg-sand/20"
                }`}
              >
                <Accessibility size={16} />
                <span>Accessible Rooms</span>
              </button>
            </div>
            {(filterPool || filterJacuzzi || filterFamily || filterAccessible) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    setFilterPool(false);
                    setFilterJacuzzi(false);
                    setFilterFamily(false);
                    setFilterAccessible(false);
                  }}
                  className="text-xs font-sans text-accent hover:text-primary transition-colors underline font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Results Info */}
          <div className="mb-6 flex justify-between items-center text-xs font-sans text-charcoal/60">
            <span>Showing {filteredRooms.length} of {roomCategories.length} categories</span>
            <span className="flex items-center gap-1">
              <Info size={12} className="text-accent" /> Check-in: 2:00 PM | Check-out: 11:00 AM
            </span>
          </div>

          {/* Listing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white border border-sand rounded-sm overflow-hidden flex flex-col justify-between card-shadow hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="relative h-64">
                    <Image
                      src={
                        room.id === "GDR"
                          ? "/Images/Rooms/GDR-01_Garden_Deluxe_Room_-_king-bed_room_overv.jpg"
                          : room.id === "VPR"
                          ? "/Images/Rooms/VPR-01_Valley_View_Premium_Room_-_bedroom.jpg"
                          : room.id === "MPS"
                          ? "/Images/Rooms/MPS-01_Mountain_Panorama_Suite_-_suite_overview.jpg"
                          : room.id === "FCS"
                          ? "/Images/Rooms/FCS-01_Family_Courtyard_Suite_-_family_room.jpg"
                          : room.id === "HPV"
                          ? "/Images/Rooms/HPV-01_Honeymoon_Pool_Villa_-_pool_villa_exteri.jpg"
                          : "/Images/Rooms/G2PV-01_Grand_Two-Bedroom_Pool_Villa_-_exterior.jpg"
                      }
                      alt={room.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary/95 text-ivory text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm">
                      {room.inventory} Keys
                    </div>
                    {room.privatePool && (
                      <span className="absolute top-4 left-4 bg-accent text-ivory text-[9px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-sm flex items-center gap-1 shadow-md">
                        <Waves size={10} /> Pool
                      </span>
                    )}
                    {room.jacuzzi && (
                      <span className="absolute top-11 left-4 bg-primary text-ivory text-[9px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-sm flex items-center gap-1 shadow-md">
                        <Sparkles size={10} /> Jacuzzi
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-primary mb-2">{room.name}</h3>
                    <p className="font-sans text-xs text-charcoal/65 mb-4">
                      Size: {room.size} | Occupancy: {room.maximumOccupancy} Guests
                    </p>
                    <p className="font-sans text-sm text-charcoal/80 leading-relaxed font-light mb-6">
                      {room.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-sand/55 bg-secondary/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-charcoal/50 block">Rates starting at</span>
                    <span className="font-serif text-lg font-bold text-accent">INR {room.rates.lowSeason.toLocaleString()}</span>
                    <span className="text-xs text-charcoal/60"> / Night</span>
                  </div>
                  <Link
                    href={`/stay/${room.slug}`}
                    className="flex items-center gap-1 text-xs uppercase tracking-widest font-bold text-primary hover:text-accent transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredRooms.length === 0 && (
            <div className="text-center py-20 border border-dashed border-sand rounded-sm bg-white card-shadow">
              <p className="font-serif text-xl text-primary font-bold mb-2">No Room Matches Found</p>
              <p className="font-sans text-sm text-charcoal/60 font-light mb-6">
                Try clearing some filter criteria to browse other suites and villas.
              </p>
              <button
                onClick={() => {
                  setFilterPool(false);
                  setFilterJacuzzi(false);
                  setFilterFamily(false);
                  setFilterAccessible(false);
                }}
                className="bg-primary hover:bg-accent text-ivory px-6 py-2.5 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
