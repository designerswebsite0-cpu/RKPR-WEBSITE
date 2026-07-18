import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { roomCategories } from "@/data/rooms";
import { ArrowLeft, Waves, Sparkles, Accessibility, Calendar, CheckCircle, ShieldAlert } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static routes for all room categories
export async function generateStaticParams() {
  return roomCategories.map((room) => ({
    slug: room.slug,
  }));
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const room = roomCategories.find((r) => r.slug === resolvedParams.slug);
  if (!room) return {};

  return {
    title: `${room.name} | Accommodation`,
    description: room.shortDescription,
  };
}

export default async function RoomDetails({ params }: Props) {
  const resolvedParams = await params;
  const room = roomCategories.find((r) => r.slug === resolvedParams.slug);

  if (!room) {
    notFound();
  }

  // Get matching images based on room category
  const roomImages = {
    GDR: [
      "/Images/Rooms/GDR-01_Garden_Deluxe_Room_-_king-bed_room_overv.jpg",
      "/Images/Rooms/GDR-02_Garden_Deluxe_Room_-_bathroom.jpg",
      "/Images/Rooms/GDR-03_Garden_Deluxe_Room_-_private_balcony.jpg",
      "/Images/Rooms/GDR-04_Garden_Deluxe_Room_-_landscaped_garden_v.jpg",
    ],
    VPR: [
      "/Images/Rooms/VPR-01_Valley_View_Premium_Room_-_bedroom.jpg",
      "/Images/Rooms/VPR-02_Valley_View_Premium_Room_-_valley_view.jpg",
      "/Images/Rooms/VPR-03_Valley_View_Premium_Room_-_bathroom_with.jpg",
      "/Images/Rooms/VPR-04_Valley_View_Premium_Room_-_balcony.jpg",
    ],
    MPS: [
      "/Images/Rooms/MPS-01_Mountain_Panorama_Suite_-_suite_overview.jpg",
      "/Images/Rooms/MPS-02_Mountain_Panorama_Suite_-_mountain_view.jpg",
      "/Images/Rooms/MPS-03_Mountain_Panorama_Suite_-_private_indoor.jpg",
    ],
    FCS: [
      "/Images/Rooms/FCS-01_Family_Courtyard_Suite_-_family_room.jpg",
      "/Images/Rooms/FCS-02_Family_Courtyard_Suite_-_garden_patio.jpg",
    ],
    HPV: [
      "/Images/Rooms/HPV-01_Honeymoon_Pool_Villa_-_pool_villa_exteri.jpg",
      "/Images/Rooms/HPV-02_Honeymoon_Pool_Villa_-_bedroom.jpg",
      "/Images/Rooms/HPV-03_Honeymoon_Pool_Villa_-_bathroom.jpg",
    ],
    G2PV: [
      "/Images/Rooms/G2PV-01_Grand_Two-Bedroom_Pool_Villa_-_exterior.jpg",
      "/Images/Rooms/G2PV-02_Grand_Two-Bedroom_Pool_Villa_-_private_p.jpg",
      "/Images/Rooms/G2PV-03_Grand_Two-Bedroom_Pool_Villa_-_living_ro.jpg",
    ],
  }[room.id] || [];

  return (
    <>
      <Header />

      <main className="flex-1 bg-ivory pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back Button */}
          <Link
            href="/stay"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-accent hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span>Back to Accommodations</span>
          </Link>

          {/* Title Header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-xs font-sans font-bold text-accent uppercase tracking-widest">
                Category: {room.id}
              </span>
              <span className="text-xs text-charcoal/40">|</span>
              <span className="text-xs font-sans text-charcoal/60 uppercase tracking-widest">
                Inventory: {room.inventory} Rooms Available
              </span>
            </div>
            <h1 className="font-serif text-3xl lg:text-5xl font-bold tracking-wide text-primary">
              {room.name}
            </h1>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="relative h-[300px] md:h-[450px] rounded-sm overflow-hidden card-shadow">
              <Image
                src={roomImages[0] || "/placeholder.jpg"}
                alt={`${room.name} Master View`}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {roomImages.slice(1, 5).map((img, i) => (
                <div key={i} className="relative h-[140px] md:h-[213px] rounded-sm overflow-hidden card-shadow">
                  <Image
                    src={img}
                    alt={`${room.name} Detail View ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
              {roomImages.length < 3 && (
                <div className="bg-secondary/20 border border-dashed border-sand rounded-sm flex items-center justify-center text-center p-6 text-xs text-charcoal/40 font-mono">
                  Additional Photos Pending Approved Release
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            {/* Main Details */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-primary mb-4">Description</h2>
                <p className="font-sans text-base text-charcoal/80 leading-relaxed font-light">
                  {room.fullDescription}
                </p>
              </div>

              {/* Special Features (Plunge Pool / Jacuzzi details) */}
              {(room.privatePool || room.jacuzzi || room.connectingRoomAvailable) && (
                <div className="bg-secondary/20 border border-sand rounded-sm p-6">
                  <h3 className="font-serif text-lg font-bold text-primary mb-4">Villa & Suite Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans text-charcoal/80 font-light">
                    {room.privatePool && (
                      <div className="flex gap-3">
                        <Waves className="text-accent shrink-0 mt-1" size={18} />
                        <div>
                          <h4 className="font-bold text-primary">Private Swimming Pool</h4>
                          <p className="mt-1">
                            {room.id === "HPV"
                              ? "Private heated plunge pool (5m x 3m, 1.2m depth) located within your enclosed private garden sanctuary."
                              : "Large private temperature-controlled swimming pool (8m x 4m, 1.2m-1.4m depth) with a spacious wooden sun deck."}
                          </p>
                        </div>
                      </div>
                    )}
                    {room.jacuzzi && (
                      <div className="flex gap-3">
                        <Sparkles className="text-accent shrink-0 mt-1" size={18} />
                        <div>
                          <h4 className="font-bold text-primary">Whirlpool Jacuzzi</h4>
                          <p className="mt-1">
                            {room.id === "MPS"
                              ? "Private indoor whirlpool jacuzzi tub for two guests overlooking the majestic mountain panorama."
                              : "Outdoor whirlpool jacuzzi for four guests integrated into the pool deck, offering sweeping valley views."}
                          </p>
                        </div>
                      </div>
                    )}
                    {room.connectingRoomAvailable && (
                      <div className="flex gap-3">
                        <CheckCircle className="text-accent shrink-0 mt-1" size={18} />
                        <div>
                          <h4 className="font-bold text-primary">Connecting Configuration</h4>
                          <p className="mt-1">
                            {room.id === "GDR"
                              ? "Selected rooms form 4 connecting pairs (King room connecting with a Twin configuration), ideal for families."
                              : "Selected rooms form 3 connecting pairs (Valley View connected with another Valley View room)."}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Amenities */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-primary mb-4">Standard In-Room Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-sans text-charcoal/85 font-light">
                  {room.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-accent shrink-0" size={16} />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accessibility Features */}
              {room.accessibilityFeatures && room.accessibilityFeatures.length > 0 && (
                <div className="border-t border-sand pt-6">
                  <h3 className="font-serif text-lg font-bold text-primary flex items-center gap-2 mb-3">
                    <Accessibility className="text-accent" size={20} />
                    <span>Accessibility Features</span>
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-sans text-charcoal/70 font-light list-disc list-inside">
                    {room.accessibilityFeatures.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar Rate & Spec Card */}
            <div className="flex flex-col gap-6">
              {/* Spec Details Card */}
              <div className="bg-white border border-sand rounded-sm p-6 card-shadow">
                <h3 className="font-serif text-lg font-bold text-primary border-b border-sand pb-3 mb-4">
                  Quick Specifications
                </h3>
                <div className="space-y-4 text-sm font-sans text-charcoal/80 font-light">
                  <div className="flex justify-between">
                    <span className="font-semibold">Room Size:</span>
                    <span>{room.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Bedding:</span>
                    <span className="text-right max-w-[150px]">{room.bedType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Max Occupancy:</span>
                    <span>{room.maximumOccupancy} guests</span>
                  </div>
                  <div className="flex justify-between text-xs text-charcoal/50 border-t border-sand/50 pt-3">
                    <span>Adult Limit: {room.adultsAllowed}</span>
                    <span>Children Limit: {room.childrenAllowed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Location:</span>
                    <span className="text-right max-w-[150px] text-xs">{room.location}</span>
                  </div>
                </div>
              </div>

              {/* Pricing details Card */}
              <div className="bg-primary text-ivory rounded-sm p-6 card-shadow">
                <h3 className="font-serif text-lg font-bold text-accent-light border-b border-ivory/10 pb-3 mb-4 flex items-center gap-2">
                  <Calendar size={18} /> Official 2026 Tariffs
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs text-sand/70 uppercase tracking-wider block">Low Season</span>
                      <span className="text-[10px] text-sand/50">(1 Apr - 30 Sep)</span>
                    </div>
                    <span className="font-serif text-xl font-bold text-accent-light">
                      INR {room.rates.lowSeason.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-ivory/10 pt-3">
                    <div>
                      <span className="text-xs text-sand/70 uppercase tracking-wider block">High Season</span>
                      <span className="text-[10px] text-sand/50">(1 Oct - 31 Mar)</span>
                    </div>
                    <span className="font-serif text-xl font-bold text-accent-light">
                      INR {room.rates.highSeason.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-[10px] font-sans text-sand/60 leading-relaxed border-t border-ivory/10 pt-3">
                    * Rates are per room per night, inclusive of breakfast for base occupancy. Subject to applicable taxes. Peak season supplements (20 Dec - 5 Jan) of 15-30% may apply.
                  </div>
                </div>
                <Link
                  href={`/contact?enquiryType=stay&roomType=${room.id}`}
                  className="bg-accent hover:bg-accent-light text-ivory text-center py-3 rounded-sm font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 block w-full shadow-md"
                >
                  Send Booking Enquiry
                </Link>
              </div>

              {/* RAG metadata compliance details */}
              <div className="bg-sand/20 border border-sand rounded-sm p-4 text-xs font-sans text-charcoal/50 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 font-bold text-primary">
                  <ShieldAlert size={12} />
                  <span>RAG Governance Audit Records</span>
                </div>
                <div>Source Reference IDs: {room.sourceIds.join(", ")}</div>
                <div>Tariff Class: 2026 Rate Card Approved</div>
                <div>Smoking Policy: {room.smokingPolicy}</div>
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
