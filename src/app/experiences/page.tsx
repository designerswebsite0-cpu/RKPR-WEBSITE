"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { activities } from "@/data/activities";
import { Search, Compass, Clock, MapPin, ShieldAlert, Award, Calendar, RefreshCw } from "lucide-react";

export default function Experiences() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Wellness", "Walks & Nature", "Adventure & Sports", "Kids' Activities", "Pool Activities", "Evening Entertainment"];

  const filteredActivities = activities.filter((act) => {
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = act.name.toLowerCase().includes(q);
      const matchRules = act.rules.toLowerCase().includes(q);
      if (!matchName && !matchRules) return false;
    }

    // Category filter
    if (selectedCategory !== "all" && act.category !== selectedCategory) {
      return false;
    }

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
              Resort Exploration
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-wide text-primary mb-6">
              Resort Activities & Experiences
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-base text-charcoal/80 font-light leading-relaxed">
              Fill your days with unforgettable moments. From early-morning sunrise yoga and birdwatching walks to archery sessions and evening bonfire gatherings. We offer scheduled events tailored for all age groups.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white border border-sand rounded-sm p-6 mb-10 shadow-lg card-shadow">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="relative w-full lg:w-1/3">
                <Search className="absolute left-3 top-3.5 text-charcoal/40" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search activities, schedules, rules..."
                  className="w-full pl-10 pr-4 py-3 border border-sand rounded-sm text-sm focus:outline-none focus:border-accent text-charcoal"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 w-full lg:w-2/3 justify-start lg:justify-end">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border rounded-sm transition-all duration-300 ${
                      selectedCategory === cat
                        ? "bg-primary border-primary text-ivory"
                        : "border-sand text-charcoal/70 hover:bg-sand/20"
                    }`}
                  >
                    {cat === "all" ? "All Experiences" : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6 text-xs font-sans text-charcoal/50 flex justify-between items-center">
            <span>Found {filteredActivities.length} activities</span>
            <span className="flex items-center gap-1">
              <Compass size={12} className="text-accent" /> Guides & Instructors Included
            </span>
          </div>

          {/* Activity Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((act) => {
              // Get image path based on activity code
              const actImages = {
                "sunrise-yoga": "/Images/Spa/SPA-07_Sunrise_Yoga_Session.png",
                "estate-nature-walk": "/Images/Spa/SPA-08_Guided_Nature_Walk.png",
                "leisure-cycling-loop": "/Images/Spa/SPA-09_Mountain_Cycling.png",
                "sunrise-hill-trek": "/Images/Spa/SPA-10_Guided_Hiking.png",
                "bonfire-evening": "/Images/Spa/SPA-11_Resort_Bonfire_Evening.png",
                "aqua-aerobics": "/Images/Spa/SPA-12_Aqua_Aerobics.png",
                "cultural-dance-program": "/Images/Spa/SPA-13_Cultural_Dance_Performance.png",
                "live-acoustic-music": "/Images/Spa/SPA-14_Live_Music_Lounge_Bar.png"
              }[act.id] || "/Images/Amenities/AM-01_Infinity_Swimming_Pool_with_Valley_Outlo.png";

              return (
                <div
                  key={act.id}
                  className="bg-white border border-sand rounded-sm overflow-hidden flex flex-col justify-between card-shadow hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div>
                    <div className="relative h-48 w-full">
                      <Image
                        src={actImages}
                        alt={act.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-4 right-4 bg-primary text-ivory text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm">
                        {act.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-serif text-lg font-bold text-primary mb-3">{act.name}</h3>
                      <div className="space-y-2 text-xs font-sans text-charcoal/80 mb-4 font-light">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-accent" />
                          <span><strong>Schedule:</strong> {act.schedule} ({act.duration})</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-accent" />
                          <span><strong>Capacity:</strong> Max {act.capacity} guests | Age: {act.minimumAge}+ years</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Award size={12} className="text-accent" />
                          <span><strong>Charge:</strong> {act.charge}</span>
                        </div>
                      </div>
                      <p className="font-sans text-xs text-charcoal/70 leading-relaxed font-light mb-2">
                        <strong>Guidelines:</strong> {act.rules}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-sand/55 bg-secondary/5 flex flex-col gap-3">
                    <div className="text-[10px] font-sans text-charcoal/50 leading-relaxed">
                      <strong>Weather Dependency:</strong> {act.weatherDependency}
                    </div>
                    {act.bookingRequired ? (
                      <Link
                        href={`/contact?enquiryType=activity&activity=${act.id}`}
                        className="bg-primary hover:bg-accent text-ivory text-center py-2 rounded-sm font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md"
                      >
                        Book Activity (Requires {act.bookingDeadline})
                      </Link>
                    ) : (
                      <span className="text-xs text-accent font-semibold text-center py-2 bg-sand rounded-sm uppercase tracking-wider block font-sans">
                        Walk-In / No Pre-Booking
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredActivities.length === 0 && (
            <div className="text-center py-20 border border-dashed border-sand rounded-sm bg-white card-shadow">
              <p className="font-serif text-xl text-primary font-bold mb-2">No Activities Found</p>
              <p className="font-sans text-sm text-charcoal/60 font-light mb-6">
                Try searching for other keywords or clearing the category filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-primary hover:bg-accent text-ivory px-6 py-2.5 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Weather Warning */}
          <div className="mt-16 bg-primary-dark/5 border border-primary/10 rounded-sm p-6 flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto">
            <ShieldAlert className="text-accent shrink-0" size={24} />
            <p className="font-sans text-xs text-charcoal/75 leading-relaxed font-light">
              <strong>Seasonal Safety Notice:</strong> Outdoor activities, hill treks, cycling tours, and pool sessions are subject to weather conditions. During heavy monsoon showers (typically July to September) or thick morning mist, activities may be modified or moved indoors for guest safety.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
