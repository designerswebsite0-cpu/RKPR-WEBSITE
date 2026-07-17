export interface EventVenue {
  id: string;
  name: string;
  dimensions: string;
  capacities: Record<string, number>;
  pricing: string;
  description: string;
  sourceIds: string[];
}

export const eventData = {
  "venues": [
    {
      "id": "grand-orchid-ballroom",
      "name": "Grand Orchid Ballroom",
      "dimensions": "30m \u00d7 20m",
      "capacities": {
        "Theatre": 500,
        "Banquet": 320,
        "Classroom": 220,
        "UShape": 160
      },
      "pricing": "From INR 2,50,000 per day",
      "description": "Our premier indoor venue featuring elegant chandeliers, high ceilings, and expansive floor space. Perfect for large weddings, grand banquets, and corporate conferences.",
      "sourceIds": [
        "SRC-010",
        "SRC-015"
      ]
    },
    {
      "id": "valley-lawn",
      "name": "Valley Lawn",
      "dimensions": "70m \u00d7 45m",
      "capacities": {
        "Receptions / Recreative Events": 800
      },
      "pricing": "By quotation",
      "description": "A magnificent outdoor lawn with panoramic valley views, suitable for destination weddings, cocktail receptions, and evening celebrations under the stars.",
      "sourceIds": [
        "SRC-010"
      ]
    },
    {
      "id": "cedar-conference-hall",
      "name": "Cedar Conference Hall",
      "dimensions": "18m \u00d7 12m",
      "capacities": {
        "Theatre / Conferences": 120
      },
      "pricing": "By quotation",
      "description": "An air-conditioned hall equipped with modern audio-visual technology, suitable for conferences, seminars, workshops, and mid-sized corporate presentations.",
      "sourceIds": [
        "SRC-010"
      ]
    },
    {
      "id": "executive-boardroom",
      "name": "Executive Boardroom",
      "dimensions": "Variable",
      "capacities": {
        "Boardroom Table": 20
      },
      "pricing": "From INR 5,000 for 2 hours",
      "description": "A private boardroom featuring secure high-speed connectivity and modern video-conferencing systems, tailored for board meetings and executive interviews.",
      "sourceIds": [
        "SRC-006",
        "SRC-010"
      ]
    }
  ],
  "weddingPackages": [
    {
      "name": "Silver Celebration Package",
      "price": "From INR 4,500 per person",
      "inclusions": [
        "Standard event venue rental",
        "Selected multi-cuisine buffet menu",
        "Basic venue decoration",
        "Banquet service staff",
        "Basic audio setup"
      ]
    },
    {
      "name": "Gold Signature Package",
      "price": "From INR 6,500 per person",
      "inclusions": [
        "Premium event venue rental",
        "Expanded multi-cuisine buffet menu",
        "Premium floral and stage decoration",
        "Dedicated event coordinator",
        "Professional audio-visual setup"
      ]
    },
    {
      "name": "Platinum Destination Wedding Package",
      "price": "From INR 9,500 per person",
      "inclusions": [
        "Exclusive venue access",
        "Gourmet custom menu selections & live counters",
        "Extensive theme-based luxury decoration",
        "Complete audio-visual & stage lighting package",
        "Welcome drinks and wedding cake",
        "Complimentary suite stay for the couple"
      ]
    }
  ],
  "corporatePackages": [
    {
      "name": "Half-Day Meeting Package",
      "price": "From INR 3,200 per person",
      "inclusions": [
        "Meeting room rental (up to 4 hours)",
        "Audio-visual essentials",
        "One high-tea / coffee break",
        "Working lunch buffet"
      ]
    },
    {
      "name": "Full-Day Conference Package",
      "price": "From INR 4,800 per person",
      "inclusions": [
        "Conference hall rental (up to 8 hours)",
        "Full audio-visual setup",
        "Two tea / coffee breaks with snacks",
        "Gourmet lunch buffet"
      ]
    },
    {
      "name": "Residential Conference Package",
      "price": "From INR 12,500 per person, per night",
      "inclusions": [
        "Room stay on sharing basis",
        "Conference hall rental & all-day AV",
        "All meals (breakfast, lunch, dinner, tea breaks)",
        "Complimentary group recreational activity session"
      ]
    }
  ],
  "policies": {
    "decor": "Only approved decorators or authorised external vendors are allowed. Open flames are prohibited except for approved ceremonial arrangements (like mandap fire). No permanent fixtures may be attached to walls or ceilings.",
    "music": "Indoor amplified music is permitted until 10:30 PM. Outdoor music must comply with local regulations, and sound levels are monitored closely by the events team.",
    "alcohol": "Service of alcoholic beverages is permitted only through licensed resort bars. Outside alcohol is strictly prohibited unless specifically approved in writing.",
    "vendors": "External vendors require prior approval, insurance where applicable, and scheduled access setup times.",
    "parking": "Complimentary parking is available for all event guests. Valet service is available for major events. Coach parking can be arranged with prior notice."
  }
};
