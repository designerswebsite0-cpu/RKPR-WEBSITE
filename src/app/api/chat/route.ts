import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const query = (message || "").toLowerCase();

    let reply = "";
    let status = "bot";

    // 1. Emergency or Safety triggers (Immediate Handoff)
    if (
      query.includes("emergency") ||
      query.includes("fire") ||
      query.includes("hurt") ||
      query.includes("injured") ||
      query.includes("accident") ||
      query.includes("lost child") ||
      query.includes("missing") ||
      query.includes("medical") ||
      query.includes("doctor")
    ) {
      reply =
        "🚨 [EMERGENCY TRANSFER] I am immediately transferring this channel to our on-property Security and Duty Manager. For any urgent medical issue, please call our emergency helpline directly at +91 90080 24000 or dial 100 from your room phone. A staff member will assist you in person within moments.";
      status = "human_escalation";
    }
    // 2. Booking modifications, refunds, payment disputes (Human Handoff)
    else if (
      query.includes("refund") ||
      query.includes("cancel my booking") ||
      query.includes("change my dates") ||
      query.includes("dispute") ||
      query.includes("charge on my card") ||
      query.includes("wrong amount") ||
      query.includes("double charge") ||
      query.includes("wrong price")
    ) {
      reply =
        "👤 [HUMAN HANDOFF] For security and account verification, requests for booking changes, cancellations, refunds, or payment disputes require a human manager. I am routing this request to our Duty Manager. Please provide your booking reference number and registered guest name so they can assist you immediately.";
      status = "human_escalation";
    }
    // 3. Anger / Distress (Immediate Escalation)
    else if (
      query.includes("angry") ||
      query.includes("bad service") ||
      query.includes("terrible") ||
      query.includes("complain") ||
      query.includes("sue") ||
      query.includes("review") ||
      query.includes("unsatisfied") ||
      query.includes("worst")
    ) {
      reply =
        "👤 [DUTY MANAGER ESCALATION] I sincerely apologize for your dissatisfaction. I am immediately escalating this conversation to our Front Office Manager on duty. A senior team member will review this chat and contact you directly to resolve the matter.";
      status = "human_escalation";
    }
    // 4. Room Tariffs & Room Types
    else if (query.includes("room") || query.includes("tariff") || query.includes("rate") || query.includes("price") || query.includes("stay") || query.includes("villa")) {
      if (query.includes("deluxe")) {
        reply =
          "Our Garden Deluxe Room (42 sq m) is priced at INR 9,500/night in Low Season (1 Apr - 30 Sep) and INR 12,500/night in High Season (1 Oct - 31 Mar). It accommodates up to 2 adults + 1 child. It features landscaped garden views, step-free access, and a king bed.";
      } else if (query.includes("premium") || query.includes("valley")) {
        reply =
          "Our Valley View Premium Room (48 sq m) features private balconies with guaranteed valley views. Rates are INR 11,500/night in Low Season and INR 14,500/night in High Season. Occupancy limit: 3 adults or 2 adults + 2 children.";
      } else if (query.includes("panorama") || query.includes("mountain") || query.includes("suite")) {
        if (query.includes("family") || query.includes("courtyard")) {
          reply =
            "Our Family Courtyard Suite (78 sq m) accommodates up to 4 adults or 2 adults + 3 children, featuring a king bed, semi-private kids' bunk area, and garden patio. Rates are INR 19,500/night in Low Season and INR 24,500/night in High Season.";
        } else {
          reply =
            "Our Mountain Panorama Suite (68 sq m) features a separate living room, panoramic balcony, and private indoor whirlpool jacuzzi for two. Rates are INR 16,500/night in Low Season and INR 21,000/night in High Season. Occupancy limit: 3 adults or 2 adults + 2 children.";
        }
      } else if (query.includes("honeymoon") || query.includes("pool villa")) {
        if (query.includes("two-bedroom") || query.includes("two bedroom") || query.includes("grand")) {
          reply =
            "Our Grand Two-Bedroom Pool Villa (165 sq m) is our premier accommodation. It features two en-suite bedrooms, private temperature-controlled pool (8m x 4m), and an outdoor jacuzzi for four. Rates are INR 42,000/night in Low Season and INR 52,000/night in High Season. Occupancy limit: 6 adults or 4 adults + 3 children.";
        } else {
          reply =
            "Our Honeymoon Pool Villa (92 sq m) is a secluded adult-only sanctuary with a private heated plunge pool (5m x 3m) and private garden. Rates are INR 26,500/night in Low Season and INR 33,500/night in High Season. Occupancy limit: 2 adults only (no children accommodated).";
        }
      } else {
        reply =
          "RKPR Resort offers 6 room and villa categories: \n1. Garden Deluxe Room (INR 9,500 - 12,500/night)\n2. Valley View Premium Room (INR 11,500 - 14,500/night)\n3. Mountain Panorama Suite (INR 16,500 - 21,000/night)\n4. Family Courtyard Suite (INR 19,500 - 24,500/night)\n5. Honeymoon Pool Villa (INR 26,500 - 33,500/night - Adults Only)\n6. Grand Two-Bedroom Pool Villa (INR 42,000 - 52,000/night)\nRates include breakfast. Peak dates may carry a 15-30% supplement. Which room type would you like to know more about?";
      }
    }
    // 5. Spa Timings & Details
    else if (query.includes("spa") || query.includes("massage") || query.includes("wellness") || query.includes("aranya spa")) {
      if (query.includes("hour") || query.includes("time") || query.includes("timing") || query.includes("open")) {
        reply =
          "Aranya Wellness Spa operating hours are:\n- Weekdays (Monday-Friday): 9:00 AM - 9:00 PM (Last 60-min treatment starts at 7:45 PM; 90-min at 7:15 PM).\n- Weekends & Public Holidays: 8:00 AM - 10:00 PM (Last 60-min treatment starts at 8:45 PM; 90-min at 8:15 PM).";
      } else if (query.includes("price") || query.includes("cost") || query.includes("menu")) {
        reply =
          "Popular treatments at Aranya Wellness Spa include:\n- Aranya Signature Massage (60/90 Min): INR 4,200 / 5,800\n- Swedish Relaxation Massage (60 Min): INR 3,800\n- Deep Tissue Massage (60/90 Min): INR 4,500 / 6,100\n- Couple Ritual (Mountain Serenity for Two, 90 Min): INR 11,800\nComplete details are in our Spa and Activities guide. All treatments require booking.";
      } else {
        reply =
          "Our Aranya Wellness Spa is a sanctuary of Ayurvedic and modern therapies. It features 18+ treatments, private couple suites, steam, sauna, and hydrotherapy jacuzzi facilities. We open weekdays 9:00 AM - 9:00 PM, and weekends 8:00 AM - 10:00 PM.";
      }
    }
    // 6. Kids' Club Details
    else if (query.includes("kids' club") || query.includes("kids club") || query.includes("child") || query.includes("children")) {
      if (query.includes("time") || query.includes("timing") || query.includes("hour") || query.includes("close")) {
        reply =
          "Our Kids' Club is open daily from 9:00 AM to 7:00 PM, with last entry at 6:30 PM. (On declared long weekends or festivals, hours may extend to 8:00 PM upon staff confirmation).";
      } else {
        reply =
          "Our Kids' Club (for ages 4-12) is located in the Family Courtyard. It features daily activities like arts & crafts (INR 350), treasure hunts (complimentary), and junior chef workshops (INR 900). Daily hours: 9:00 AM - 7:00 PM.";
      }
    }
    // 7. Infinity Pool Details
    else if (query.includes("pool") || query.includes("swimming")) {
      if (query.includes("heat") || query.includes("temperature")) {
        reply =
          "Our main infinity pool is outdoor and temperature-moderated with a beautiful valley outlook. The temperature is passively moderated and varies with weather and operational settings; it is not classified as heated. (Note: private plunge pools in our Honeymoon Pool Villas and Grand Two-Bedroom Pool Villas are temperature-controlled/heated).";
      } else {
        reply =
          "RKPR Resort features an outdoor, temperature-moderated Infinity Swimming Pool open daily from 7:00 AM to 9:00 PM. Swimwear is required. The children's pool is open 7:00 AM to 7:00 PM under adult supervision.";
      }
    }
    // 8. Laundry Details
    else if (query.includes("laundry") || query.includes("wash") || query.includes("dry clean") || query.includes("iron")) {
      reply =
        "Our Laundry Services include:\n- Wash & Fold: INR 250 per kg\n- Pressing/Ironing only: INR 150 per item\n- Dry Cleaning Shirt/Blouse: INR 300\n- Dry Cleaning Trousers/Skirt: INR 350\n- Dry Cleaning Suit (2-piece): INR 900\n- Dry Cleaning Saree: INR 600\nExpress Service (within 4 hours) carries a +50% surcharge. Standard turnaround is same-day if collected before 9:00 AM.";
    }
    // 9. Dining Outlets & Menus
    else if (query.includes("restaurant") || query.includes("eat") || query.includes("food") || query.includes("menu") || query.includes("dining")) {
      if (query.includes("azure") || query.includes("all-day")) {
        reply =
          "Azure Terrace is our all-day dining restaurant. Breakfast: 7:00 AM - 10:30 AM (Continental & South Indian Buffets: INR 1,200). Lunch: 12:30 PM - 3:30 PM. Dinner: 7:00 PM - 10:30 PM. It serves Indian, Asian, and International cuisines.";
      } else if (query.includes("ember") || query.includes("spice") || query.includes("grill")) {
        reply =
          "Ember & Spice specializes in Indian grills and regional tandoor. It is open for dinner only (7:00 PM - 11:00 PM) and is closed on Mondays. Reservations are required.";
      } else if (query.includes("cedar") || query.includes("lounge")) {
        reply =
          "The Cedar Lounge is our lobby lounge open 8:00 AM - 11:00 PM, serving teas, coffee (INR 350-450), and light meals. Signature High Tea is served from 3:00 PM to 6:00 PM for INR 1,800 (for two guests).";
      } else if (query.includes("summit") || query.includes("bar") || query.includes("drink")) {
        reply =
          "Summit Bar features an indoor lounge and outdoor sunset deck overlooking the valley. Open 4:00 PM - 11:30 PM. Signature Cocktails (e.g. Valley Sunset) are priced at INR 850 - 1,000. Alcohol is served to guests aged 21 and above.";
      } else {
        reply =
          "RKPR Resort features four dining outlets:\n1. Azure Terrace (All-Day dining, Indian/Asian/Intl)\n2. Ember & Spice (Dinner grids & tandoor, closed Mondays)\n3. The Cedar Lounge (Coffee, tea, desserts, 8 AM - 11 PM)\n4. Summit Bar (Cocktails, wine, bar snacks, 4 PM - 11:30 PM)\nWhich restaurant or menu would you like to explore?";
      }
    }
    // 10. Security disclaimer
    else if (query.includes("pin") || query.includes("otp") || query.includes("cvv") || query.includes("password") || query.includes("bank")) {
      reply =
        "🔒 SECURITY WARNING: RKPR Resort will NEVER request an OTP, CVV, Card PIN, UPI PIN, or banking passwords through email, phone, SMS, or WhatsApp. Do not share these credentials with anyone. All official bookings are processed through secure, verified gateways.";
    }
    // 11. Transfers & Transport
    else if (query.includes("transfer") || query.includes("airport") || query.includes("cab") || query.includes("taxi") || query.includes("pickup") || query.includes("transport")) {
      reply =
        "We offer airport and station transfers from Bengaluru Airport (BLR, 190 km, 4.5 - 5.5 hours drive). Fares:\n- Premium Sedan: INR 8,500 one-way / INR 16,000 round-trip\n- Premium SUV: INR 11,500 one-way / INR 21,500 round-trip\n- Luxury MUV: INR 13,500 one-way / INR 25,000 round-trip\nNight pickups (11:00 PM - 5:00 AM) carry a surcharge. Local sightseeing packages start at INR 3,200 (4 hrs / 40 km). Pre-booking is required.";
    }
    // 12. Location & Attractions
    else if (query.includes("location") || query.includes("address") || query.includes("attraction") || query.includes("nearby") || query.includes("where")) {
      reply =
        "RKPR Resort is located at: Survey No. 48/2, K. Gudi Road, near Biligiriranga Hills, Chamarajanagar District, Karnataka 571441, India. Nearby attractions include BR Hills and BRT Wildlife Sanctuary (18 km), Biligiri Ranganatha Swamy Temple (21 km), K. Gudi Forest Area (28 km), and Shivanasamudra Falls (58 km).";
    }
    // 13. Policies (Check-in/out, child age, etc.)
    else if (query.includes("policy") || query.includes("checkin") || query.includes("checkout") || query.includes("pet") || query.includes("smoke") || query.includes("visitor")) {
      reply =
        "Our primary policies are:\n- Check-in: 2:00 PM | Check-out: 11:00 AM\n- Child bands: Infants 0-5 dine & stay free (no extra bed); children 6-11 use rollaway beds; adults are 12+ years.\n- Smoking: Strictly non-smoking inside rooms, villas, balconies, and decks. Designated smoking zones are available outdoors.\n- Pets: Pets are not permitted, except certified service animals with prior documentation.";
    }
    // Default reply
    else {
      reply =
        "I want to make sure I give you accurate information from our official registry. I can assist you with details about our accommodations, room tariffs, dining menus, Aranya Wellness Spa timings, recreation activities, event venues, airport transfers, and guest policies. Could you please specify which of these details you are interested in?";
    }

    return NextResponse.json({ reply, status });
  } catch (error) {
    return NextResponse.json(
      { reply: "I apologize, but I encountered an error processing your query. Please call us at +91 98765 43210." },
      { status: 500 }
    );
  }
}
