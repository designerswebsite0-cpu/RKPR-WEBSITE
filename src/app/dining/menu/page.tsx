"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { menuItems } from "@/data/menu";
import { diningOutlets } from "@/data/dining";
import { Search, ShieldAlert } from "lucide-react";

export default function DiningMenu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOutlet, setSelectedOutlet] = useState("all");
  const [dietaryFilter, setDietaryFilter] = useState({
    vegetarian: false,
    vegan: false,
    jain: false,
    glutenFree: false,
  });

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inName = item.name.toLowerCase().includes(q);
      const inDesc = item.description.toLowerCase().includes(q);
      if (!inName && !inDesc) return false;
    }

    // 2. Outlet
    if (selectedOutlet !== "all" && item.outlet !== selectedOutlet) {
      return false;
    }

    // 3. Dietary Filters
    if (dietaryFilter.vegetarian && !item.isVegetarian) return false;
    if (dietaryFilter.vegan && !item.isVegan) return false;
    if (dietaryFilter.jain && !item.isJain) return false;
    if (dietaryFilter.glutenFree && !item.isGlutenFree) return false;

    return true;
  });

  const handleDietaryToggle = (key: keyof typeof dietaryFilter) => {
    setDietaryFilter((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Banner */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-widest font-semibold text-accent mb-2 block">
              Gastronomic Sanctuary
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-wide text-primary mb-6">
              Artisanal Culinary Menus
            </h1>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="font-sans text-sm text-charcoal/80 font-light leading-relaxed">
              Explore our complete dining registry. Every dish is prepared by our culinary team using locally sourced ingredients. Submittals and pricing are approved by our revenue auditor as of July 2026.
            </p>
          </div>

          {/* Search and Filters Section */}
          <div className="bg-white border border-sand rounded-sm p-6 mb-10 shadow-lg card-shadow">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search input */}
              <div className="relative w-full lg:w-1/3">
                <Search className="absolute left-3 top-3.5 text-charcoal/40" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dishes, ingredients..."
                  className="w-full pl-10 pr-4 py-3 border border-sand rounded-sm text-sm focus:outline-none focus:border-accent text-charcoal"
                />
              </div>

              {/* Outlet selector */}
              <div className="flex flex-wrap gap-2 w-full lg:w-2/3 justify-start lg:justify-end">
                <button
                  onClick={() => setSelectedOutlet("all")}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border rounded-sm transition-all duration-300 ${
                    selectedOutlet === "all"
                      ? "bg-primary border-primary text-ivory"
                      : "border-sand text-charcoal/70 hover:bg-sand/20"
                  }`}
                >
                  All Outlets
                </button>
                {diningOutlets.map((outlet) => (
                  <button
                    key={outlet.id}
                    onClick={() => setSelectedOutlet(outlet.id)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border rounded-sm transition-all duration-300 ${
                      selectedOutlet === outlet.id
                        ? "bg-primary border-primary text-ivory"
                        : "border-sand text-charcoal/70 hover:bg-sand/20"
                    }`}
                  >
                    {outlet.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Checkboxes */}
            <div className="border-t border-sand/60 mt-6 pt-4 flex flex-wrap gap-6 items-center">
              <span className="font-sans text-xs font-bold text-primary uppercase tracking-wider">
                Dietary Preferences:
              </span>
              <label className="flex items-center gap-2 cursor-pointer font-sans text-sm text-charcoal/80">
                <input
                  type="checkbox"
                  checked={dietaryFilter.vegetarian}
                  onChange={() => handleDietaryToggle("vegetarian")}
                  className="accent-primary h-4 w-4 rounded-sm border-sand"
                />
                <span>Vegetarian (V)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-sans text-sm text-charcoal/80">
                <input
                  type="checkbox"
                  checked={dietaryFilter.vegan}
                  onChange={() => handleDietaryToggle("vegan")}
                  className="accent-primary h-4 w-4 rounded-sm border-sand"
                />
                <span>Vegan (VG)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-sans text-sm text-charcoal/80">
                <input
                  type="checkbox"
                  checked={dietaryFilter.jain}
                  onChange={() => handleDietaryToggle("jain")}
                  className="accent-primary h-4 w-4 rounded-sm border-sand"
                />
                <span>Jain Option (J)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-sans text-sm text-charcoal/80">
                <input
                  type="checkbox"
                  checked={dietaryFilter.glutenFree}
                  onChange={() => handleDietaryToggle("glutenFree")}
                  className="accent-primary h-4 w-4 rounded-sm border-sand"
                />
                <span>Gluten-Free (GF)</span>
              </label>
            </div>
          </div>

          {/* Results stats */}
          <div className="mb-6 text-xs font-sans text-charcoal/50 flex justify-between items-center">
            <span>Found {filteredItems.length} menu items</span>
            <span>Menu prices are in Indian Rupees (INR)</span>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const outletObj = diningOutlets.find((o) => o.id === item.outlet);
              return (
                <div
                  key={item.id}
                  className="bg-white border border-sand rounded-sm overflow-hidden flex flex-col justify-between card-shadow hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div>
                    {item.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute top-4 right-4 bg-accent text-ivory text-[9px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-sm shadow-md">
                          Signature Dish
                        </span>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-serif text-lg font-bold text-primary">{item.name}</h3>
                        <div className="flex gap-1 items-center shrink-0">
                          {item.isVegetarian && <span className="w-2.5 h-2.5 rounded-full bg-green-600" title="Vegetarian" />}
                          {!item.isVegetarian && <span className="w-2.5 h-2.5 rounded-full bg-red-600" title="Non-Vegetarian" />}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="text-[9px] font-sans font-bold text-charcoal/40 uppercase tracking-wider">
                          {outletObj?.name}
                        </span>
                        <span className="text-[9px] text-charcoal/30">•</span>
                        <span className="text-[9px] font-sans text-accent uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>

                      <p className="font-sans text-xs text-charcoal/70 leading-relaxed font-light mb-4">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className={`text-[9px] font-sans px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-semibold ${
                              tag === "V"
                                ? "bg-green-50 text-green-700"
                                : tag === "NV"
                                ? "bg-red-50 text-red-700"
                                : tag === "VG" || tag === "VG-A"
                                ? "bg-emerald-50 text-emerald-700"
                                : tag === "J" || tag === "J-A"
                                ? "bg-yellow-50 text-yellow-700"
                                : tag === "GF" || tag === "GFA"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-sand/35 text-charcoal/70"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-sand/55 bg-secondary/5 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-charcoal/40 font-light">Price</span>
                    <span className="font-serif text-base font-bold text-primary">{item.price}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20 border border-dashed border-sand rounded-sm bg-white card-shadow">
              <p className="font-serif text-xl text-primary font-bold mb-2">No Menu Items Found</p>
              <p className="font-sans text-sm text-charcoal/60 font-light mb-6">
                Try searching for other ingredients or resetting the dietary filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedOutlet("all");
                  setDietaryFilter({
                    vegetarian: false,
                    vegan: false,
                    jain: false,
                    glutenFree: false,
                  });
                }}
                className="bg-primary hover:bg-accent text-ivory px-6 py-2.5 rounded-sm font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Legal Notice */}
          <div className="mt-16 bg-primary-dark/5 border border-primary/10 rounded-sm p-6 flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto">
            <ShieldAlert className="text-accent shrink-0" size={24} />
            <p className="font-sans text-xs text-charcoal/75 leading-relaxed font-light">
              <strong>Alcohol Licensing Notice:</strong> Summit Bar spirits are served in accordance with Karnataka Excise Department rules. Alcohol is strictly served to guests aged 21 and above. Government-issued photo identification is required for age verification. Taxes are extra as applicable.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
