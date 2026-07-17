// Generated from Room Catalogue and Rate Card
export interface RoomCategory {
  id: string;
  slug: string;
  name: string;
  inventory: number;
  shortDescription: string;
  fullDescription: string;
  size: string;
  bedType: string;
  maximumOccupancy: number;
  adultsAllowed: number;
  childrenAllowed: number;
  viewType: string[];
  amenities: string[];
  breakfastIncluded: boolean;
  extraBedAvailable: boolean;
  smokingPolicy: string;
  accessibilityFeatures: string[];
  connectingRoomAvailable: boolean;
  privatePool: boolean;
  jacuzzi: boolean;
  rates: {
    lowSeason: number;
    highSeason: number;
    currency: string;
    taxesIncluded: boolean;
    validFrom: string;
    validUntil: string;
  };
  location: string;
  photoHighlights: { code: string; caption: string }[];
  sourceIds: string[];
}

export const roomCategories: RoomCategory[] = [
  {
    "id": "GDR",
    "slug": "garden-deluxe-room",
    "name": "Garden Deluxe Room",
    "inventory": 24,
    "shortDescription": "An elegant entry-level luxury room located in the resort's low-rise garden wings, opening toward landscaped lawns.",
    "fullDescription": "An elegant entry-level luxury room located in the resort's low-rise garden wings. The room opens toward landscaped lawns, flowering plants, and shaded walking paths. It is quiet, convenient, and suitable for guests who value easy access to the lobby and dining areas.",
    "size": "42 sq m / 452 sq ft",
    "bedType": "One king bed (Twin beds available on request)",
    "maximumOccupancy": 3,
    "adultsAllowed": 2,
    "childrenAllowed": 1,
    "viewType": [
      "Landscaped garden view"
    ],
    "amenities": [
      "High-speed Wi-Fi",
      "Air conditioning & ceiling fan",
      "43-inch Smart TV",
      "Minibar refrigerator",
      "Tea and coffee station",
      "Electronic in-room safe",
      "Writing desk",
      "Iron and ironing board",
      "Premium bath amenities",
      "Hair dryer",
      "Bathrobes & slippers",
      "Daily housekeeping",
      "Evening turndown on request"
    ],
    "breakfastIncluded": true,
    "extraBedAvailable": true,
    "smokingPolicy": "Non-smoking indoors. Smoking permitted only in designated outdoor zones, not on balconies.",
    "accessibilityFeatures": [
      "Four rooms designated wheelchair accessible",
      "Step-free access",
      "Wider entrance and bathroom doors",
      "Grab bars",
      "Lowered switches",
      "Roll-in shower",
      "Emergency pull cord"
    ],
    "connectingRoomAvailable": true,
    "privatePool": false,
    "jacuzzi": false,
    "rates": {
      "lowSeason": 9500,
      "highSeason": 12500,
      "currency": "INR",
      "taxesIncluded": true,
      "validFrom": "2026-01-01",
      "validUntil": "2026-12-31"
    },
    "location": "Garden Wings A and B, 1-3 minutes' walk from lobby and 2-4 minutes from Azure Terrace.",
    "photoHighlights": [
      {
        "code": "GDR-01",
        "caption": "King-bed room overview"
      },
      {
        "code": "GDR-02",
        "caption": "Twin-bed configuration"
      },
      {
        "code": "GDR-03",
        "caption": "Garden-facing balcony"
      },
      {
        "code": "GDR-04",
        "caption": "Standard bathroom"
      },
      {
        "code": "GDR-05",
        "caption": "Wheelchair-accessible bathroom"
      }
    ],
    "sourceIds": [
      "SRC-001",
      "SRC-015"
    ]
  },
  {
    "id": "VPR",
    "slug": "valley-view-premium-room",
    "name": "Valley View Premium Room",
    "inventory": 20,
    "shortDescription": "Spacious premium room on higher floors along the valley edge, featuring private balconies with broad valley views.",
    "fullDescription": "A spacious premium room positioned on higher floors and along the resort's valley edge. Large windows and a private balcony provide broad valley views, especially during sunrise and early morning mist. Recommended for guests asking specifically for valley views.",
    "size": "48 sq m / 517 sq ft",
    "bedType": "One king bed (Six rooms offer twin beds)",
    "maximumOccupancy": 4,
    "adultsAllowed": 3,
    "childrenAllowed": 2,
    "viewType": [
      "Guaranteed valley view"
    ],
    "amenities": [
      "High-speed Wi-Fi",
      "Air conditioning & ceiling fan",
      "50-inch Smart TV",
      "Capsule coffee machine",
      "Minibar refrigerator",
      "Electronic in-room safe",
      "Writing desk",
      "Lounge chair",
      "Iron and ironing board",
      "Freestanding soaking bathtub",
      "Double vanity",
      "Premium bath amenities",
      "Hair dryer",
      "Bathrobes & slippers"
    ],
    "breakfastIncluded": true,
    "extraBedAvailable": true,
    "smokingPolicy": "Non-smoking indoors and on balconies.",
    "accessibilityFeatures": [
      "Step-free elevator access is available",
      "Does not have a fully adapted roll-in shower"
    ],
    "connectingRoomAvailable": true,
    "privatePool": false,
    "jacuzzi": false,
    "rates": {
      "lowSeason": 11500,
      "highSeason": 14500,
      "currency": "INR",
      "taxesIncluded": true,
      "validFrom": "2026-01-01",
      "validUntil": "2026-12-31"
    },
    "location": "Valley Wing, 4-6 minutes' walk from the lobby. Elevator access is available.",
    "photoHighlights": [
      {
        "code": "VPR-01",
        "caption": "King room with valley window"
      },
      {
        "code": "VPR-02",
        "caption": "Sunrise balcony view"
      },
      {
        "code": "VPR-03",
        "caption": "Twin-bed room"
      },
      {
        "code": "VPR-04",
        "caption": "Bathroom with bathtub"
      },
      {
        "code": "VPR-05",
        "caption": "Seating and work area"
      }
    ],
    "sourceIds": [
      "SRC-001",
      "SRC-015"
    ]
  },
  {
    "id": "MPS",
    "slug": "mountain-panorama-suite",
    "name": "Mountain Panorama Suite",
    "inventory": 10,
    "shortDescription": "One-bedroom suite with a separate living room, expansive balcony, and private indoor whirlpool jacuzzi for two.",
    "fullDescription": "A one-bedroom suite with a separate living room, expansive balcony, and uninterrupted mountain-facing orientation. It is designed for guests who want additional space, premium bathing facilities, and a dramatic natural outlook.",
    "size": "68 sq m / 732 sq ft",
    "bedType": "One king bed in bedroom, sofa bed in living room",
    "maximumOccupancy": 4,
    "adultsAllowed": 3,
    "childrenAllowed": 2,
    "viewType": [
      "Guaranteed panoramic mountain view"
    ],
    "amenities": [
      "High-speed Wi-Fi",
      "Air conditioning & ceiling fan",
      "55-inch Smart TV in living room",
      "43-inch Smart TV in bedroom",
      "Separate living room",
      "Dining table for two",
      "Bluetooth speaker",
      "Capsule coffee machine",
      "Premium minibar",
      "Electronic safe",
      "Writing desk",
      "Indoor whirlpool jacuzzi for two",
      "Freestanding soaking bathtub",
      "Double vanity"
    ],
    "breakfastIncluded": true,
    "extraBedAvailable": true,
    "smokingPolicy": "Non-smoking indoors and on balconies.",
    "accessibilityFeatures": [
      "Elevator access and step-free route",
      "Bathroom has a raised jacuzzi edge, not suitable for roll-in shower"
    ],
    "connectingRoomAvailable": false,
    "privatePool": false,
    "jacuzzi": true,
    "rates": {
      "lowSeason": 16500,
      "highSeason": 21000,
      "currency": "INR",
      "taxesIncluded": true,
      "validFrom": "2026-01-01",
      "validUntil": "2026-12-31"
    },
    "location": "Panorama Wing, 6-8 minutes' walk from the lobby and 4 minutes from the infinity pool.",
    "photoHighlights": [
      {
        "code": "MPS-01",
        "caption": "Bedroom and mountain outlook"
      },
      {
        "code": "MPS-02",
        "caption": "Separate living room"
      },
      {
        "code": "MPS-03",
        "caption": "Panoramic balcony"
      },
      {
        "code": "MPS-04",
        "caption": "Whirlpool jacuzzi"
      },
      {
        "code": "MPS-05",
        "caption": "Evening suite setup"
      }
    ],
    "sourceIds": [
      "SRC-001",
      "SRC-015"
    ]
  },
  {
    "id": "FCS",
    "slug": "family-courtyard-suite",
    "name": "Family Courtyard Suite",
    "inventory": 8,
    "shortDescription": "Spacious family suite featuring a king bedroom, semi-private children's bunk area, and a ground-floor garden patio.",
    "fullDescription": "A family-oriented suite with a king bedroom, a semi-private children's sleeping area, a living space, and a ground-floor garden patio. The layout balances family togetherness with practical separation for children. Bunk bed recommended for children aged 6-11.",
    "size": "78 sq m / 840 sq ft",
    "bedType": "One king bed, one bunk bed (suitable for 2 children), one sofa bed",
    "maximumOccupancy": 5,
    "adultsAllowed": 4,
    "childrenAllowed": 3,
    "viewType": [
      "Internal landscaped courtyard and garden view"
    ],
    "amenities": [
      "High-speed Wi-Fi",
      "Air conditioning & ceiling fan",
      "55-inch Smart TV",
      "Separate living area",
      "Children's reading corner",
      "Dining table for four",
      "Capsule coffee machine",
      "Larger minibar refrigerator",
      "Microwave on request (infant food only)",
      "Electronic safe",
      "One full bathroom (shower + tub)",
      "Separate powder room"
    ],
    "breakfastIncluded": true,
    "extraBedAvailable": false,
    "smokingPolicy": "Non-smoking indoors and on patios.",
    "accessibilityFeatures": [
      "Ground floor step-free access",
      "Bathroom door supports standard wheelchair but not fully certified accessible"
    ],
    "connectingRoomAvailable": false,
    "privatePool": false,
    "jacuzzi": false,
    "rates": {
      "lowSeason": 19500,
      "highSeason": 24500,
      "currency": "INR",
      "taxesIncluded": true,
      "validFrom": "2026-01-01",
      "validUntil": "2026-12-31"
    },
    "location": "Family Courtyard, 3-5 minutes' walk from the kids' club, main pool, and Azure Terrace.",
    "photoHighlights": [
      {
        "code": "FCS-01",
        "caption": "King bedroom"
      },
      {
        "code": "FCS-02",
        "caption": "Children's bunk area"
      },
      {
        "code": "FCS-03",
        "caption": "Living and dining space"
      },
      {
        "code": "FCS-04",
        "caption": "Garden patio"
      },
      {
        "code": "FCS-05",
        "caption": "Main bathroom"
      }
    ],
    "sourceIds": [
      "SRC-001",
      "SRC-015"
    ]
  },
  {
    "id": "HPV",
    "slug": "honeymoon-pool-villa",
    "name": "Honeymoon Pool Villa",
    "inventory": 6,
    "shortDescription": "Secluded adult-only sanctuary with a private heated plunge pool, deck, and screened private garden.",
    "fullDescription": "A secluded one-bedroom villa created for couples. It combines a private heated plunge pool (5m x 3m, 1.2m deep), intimate garden, outdoor deck, and a spacious bathroom with a romantic soaking tub. Children are not accommodated in this category.",
    "size": "92 sq m / 990 sq ft",
    "bedType": "One king bed only",
    "maximumOccupancy": 2,
    "adultsAllowed": 2,
    "childrenAllowed": 0,
    "viewType": [
      "Valley-facing outlook with a screened private garden"
    ],
    "amenities": [
      "High-speed Wi-Fi",
      "Air conditioning & ceiling fan",
      "55-inch Smart TV",
      "Private heated plunge pool (5m x 3m, 1.2m deep)",
      "Private deck with loungers & dining table",
      "Enclosed private garden",
      "Bluetooth speaker",
      "Capsule coffee machine",
      "Premium minibar",
      "Freestanding deep soaking tub",
      "Double vanity",
      "Couple bath amenities",
      "Romantic turndown on request"
    ],
    "breakfastIncluded": true,
    "extraBedAvailable": false,
    "smokingPolicy": "Non-smoking indoors. Smoking is not permitted on the private deck or near the pool.",
    "accessibilityFeatures": [
      "Villa access includes sloped pathway and two shallow steps",
      "Pool and bathroom not wheelchair adapted"
    ],
    "connectingRoomAvailable": false,
    "privatePool": true,
    "jacuzzi": false,
    "rates": {
      "lowSeason": 26500,
      "highSeason": 33500,
      "currency": "INR",
      "taxesIncluded": true,
      "validFrom": "2026-01-01",
      "validUntil": "2026-12-31"
    },
    "location": "Private Villa Zone, 8-10 minutes' walk from the lobby. Complimentary buggy service available on request.",
    "photoHighlights": [
      {
        "code": "HPV-01",
        "caption": "Villa bedroom"
      },
      {
        "code": "HPV-02",
        "caption": "Private heated plunge pool"
      },
      {
        "code": "HPV-03",
        "caption": "Private deck and garden"
      },
      {
        "code": "HPV-04",
        "caption": "Bathroom soaking tub"
      },
      {
        "code": "HPV-05",
        "caption": "Romantic evening setup"
      }
    ],
    "sourceIds": [
      "SRC-001",
      "SRC-015"
    ]
  },
  {
    "id": "G2PV",
    "slug": "grand-two-bedroom-pool-villa",
    "name": "Grand Two-Bedroom Pool Villa",
    "inventory": 4,
    "shortDescription": "The resort's largest accommodation, featuring two en-suite bedrooms, private temperature-controlled pool, and outdoor jacuzzi.",
    "fullDescription": "The resort's largest accommodation, featuring two private bedrooms, a spacious living and dining room, a private temperature-controlled swimming pool (8m x 4m, 1.2m-1.4m deep), furnished deck, and an outdoor whirlpool jacuzzi for four. Designed for families and small groups.",
    "size": "165 sq m / 1,776 sq ft",
    "bedType": "Bedroom 1: one king bed. Bedroom 2: one king or two twin beds. Sofa bed in living room.",
    "maximumOccupancy": 7,
    "adultsAllowed": 6,
    "childrenAllowed": 3,
    "viewType": [
      "Panoramic mountain and valley view"
    ],
    "amenities": [
      "High-speed Wi-Fi",
      "Air conditioning & ceiling fan",
      "65-inch Smart TV in living room",
      "TVs in both bedrooms",
      "Private temperature-controlled pool (8m x 4m)",
      "Outdoor whirlpool jacuzzi for four",
      "Large living & dining room",
      "Outdoor dining table for six",
      "Kitchenette for service use",
      "Full-size refrigerator",
      "Capsule coffee machine",
      "Premium minibar",
      "Two en-suite bathrooms (Master with tub)",
      "Guest powder room",
      "Electronic safes in both bedrooms"
    ],
    "breakfastIncluded": true,
    "extraBedAvailable": true,
    "smokingPolicy": "Non-smoking indoors, on the deck, and in the private garden.",
    "accessibilityFeatures": [
      "Buggy-accessible route with step-free entry",
      "Bathrooms/pool do not have certified accessibility features"
    ],
    "connectingRoomAvailable": false,
    "privatePool": true,
    "jacuzzi": true,
    "rates": {
      "lowSeason": 42000,
      "highSeason": 52000,
      "currency": "INR",
      "taxesIncluded": true,
      "validFrom": "2026-01-01",
      "validUntil": "2026-12-31"
    },
    "location": "Upper Private Villa Zone, 10-12 minutes' walk from the lobby. Complimentary buggy service available throughout.",
    "photoHighlights": [
      {
        "code": "G2PV-01",
        "caption": "Exterior and private pool"
      },
      {
        "code": "G2PV-02",
        "caption": "Master king bedroom"
      },
      {
        "code": "G2PV-03",
        "caption": "Second bedroom twin setup"
      },
      {
        "code": "G2PV-04",
        "caption": "Living and dining room"
      },
      {
        "code": "G2PV-05",
        "caption": "Mountain-valley panorama"
      },
      {
        "code": "G2PV-06",
        "caption": "Outdoor jacuzzi"
      }
    ],
    "sourceIds": [
      "SRC-001",
      "SRC-015"
    ]
  }
];
