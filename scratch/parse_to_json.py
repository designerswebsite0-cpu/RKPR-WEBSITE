import os
import csv
import json
import re

# Input paths
extracted_root = r"c:\Users\rachi\Downloads\RKPR Website\scratch\extracted_rag"
output_dir = r"c:\Users\rachi\Downloads\RKPR Website\src\data"
os.makedirs(output_dir, exist_ok=True)

# Helper to clean up text
def clean_text(text):
    return text.strip().replace('\r', '')

print("Parsing RAG documents...")

# ----------------- PARSE MEDIA & IMAGE MANIFEST -----------------
images = []
manifest_path = os.path.join(extracted_root, "02_MEDIA_INDEXABLE", "Manifests", "image_manifest.txt")
if os.path.exists(manifest_path):
    with open(manifest_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            images.append({
                "id": row.get("image_id", row.get("asset_code", "")),
                "filename": "/" + row.get("filename", "").replace("\\", "/"),
                "category": row.get("category", ""),
                "title": row.get("title", row.get("caption", "")),
                "caption": row.get("caption", ""),
                "altText": row.get("alt_text", ""),
                "tags": [t.strip() for t in row.get("tags", "").split(",") if t.strip()],
                "relatedDocument": row.get("related_document", row.get("source_document", "")),
                "relatedRoom": row.get("related_room", ""),
                "relatedAmenity": row.get("related_amenity", ""),
                "sourceId": row.get("source_id", "")
            })

with open(os.path.join(output_dir, "media.ts"), "w", encoding="utf-8") as f:
    f.write(f"// Generated from image_manifest.csv\n")
    f.write(f"export interface ResortImage {{\n")
    f.write(f"  id: string;\n")
    f.write(f"  filename: string;\n")
    f.write(f"  category: string;\n")
    f.write(f"  title: string;\n")
    f.write(f"  caption: string;\n")
    f.write(f"  altText: string;\n")
    f.write(f"  tags: string[];\n")
    f.write(f"  relatedDocument: string;\n")
    f.write(f"  relatedRoom: string;\n")
    f.write(f"  relatedAmenity: string;\n")
    f.write(f"  sourceId: string;\n")
    f.write(f"}}\n\n")
    f.write(f"export const resortImages: ResortImage[] = {json.dumps(images, indent=2)};\n")

print(f"Media manifest parsed: {len(images)} images.")

# ----------------- ROOMS & RATES DATA -----------------
rooms_data = [
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
        "viewType": ["Landscaped garden view"],
        "amenities": [
            "High-speed Wi-Fi", "Air conditioning & ceiling fan", "43-inch Smart TV", "Minibar refrigerator",
            "Tea and coffee station", "Electronic in-room safe", "Writing desk", "Iron and ironing board",
            "Premium bath amenities", "Hair dryer", "Bathrobes & slippers", "Daily housekeeping", "Evening turndown on request"
        ],
        "breakfastIncluded": True,
        "extraBedAvailable": True,
        "smokingPolicy": "Non-smoking indoors. Smoking permitted only in designated outdoor zones, not on balconies.",
        "accessibilityFeatures": [
            "Four rooms designated wheelchair accessible", "Step-free access", "Wider entrance and bathroom doors",
            "Grab bars", "Lowered switches", "Roll-in shower", "Emergency pull cord"
        ],
        "connectingRoomAvailable": True,
        "privatePool": False,
        "jacuzzi": False,
        "rates": {
            "lowSeason": 9500,
            "highSeason": 12500,
            "currency": "INR",
            "taxesIncluded": True,
            "validFrom": "2026-01-01",
            "validUntil": "2026-12-31"
        },
        "location": "Garden Wings A and B, 1-3 minutes' walk from lobby and 2-4 minutes from Azure Terrace.",
        "photoHighlights": [
            {"code": "GDR-01", "caption": "King-bed room overview"},
            {"code": "GDR-02", "caption": "Twin-bed configuration"},
            {"code": "GDR-03", "caption": "Garden-facing balcony"},
            {"code": "GDR-04", "caption": "Standard bathroom"},
            {"code": "GDR-05", "caption": "Wheelchair-accessible bathroom"}
        ],
        "sourceIds": ["SRC-001", "SRC-015"]
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
        "viewType": ["Guaranteed valley view"],
        "amenities": [
            "High-speed Wi-Fi", "Air conditioning & ceiling fan", "50-inch Smart TV", "Capsule coffee machine",
            "Minibar refrigerator", "Electronic in-room safe", "Writing desk", "Lounge chair", "Iron and ironing board",
            "Freestanding soaking bathtub", "Double vanity", "Premium bath amenities", "Hair dryer", "Bathrobes & slippers"
        ],
        "breakfastIncluded": True,
        "extraBedAvailable": True,
        "smokingPolicy": "Non-smoking indoors and on balconies.",
        "accessibilityFeatures": ["Step-free elevator access is available", "Does not have a fully adapted roll-in shower"],
        "connectingRoomAvailable": True,
        "privatePool": False,
        "jacuzzi": False,
        "rates": {
            "lowSeason": 11500,
            "highSeason": 14500,
            "currency": "INR",
            "taxesIncluded": True,
            "validFrom": "2026-01-01",
            "validUntil": "2026-12-31"
        },
        "location": "Valley Wing, 4-6 minutes' walk from the lobby. Elevator access is available.",
        "photoHighlights": [
            {"code": "VPR-01", "caption": "King room with valley window"},
            {"code": "VPR-02", "caption": "Sunrise balcony view"},
            {"code": "VPR-03", "caption": "Twin-bed room"},
            {"code": "VPR-04", "caption": "Bathroom with bathtub"},
            {"code": "VPR-05", "caption": "Seating and work area"}
        ],
        "sourceIds": ["SRC-001", "SRC-015"]
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
        "viewType": ["Guaranteed panoramic mountain view"],
        "amenities": [
            "High-speed Wi-Fi", "Air conditioning & ceiling fan", "55-inch Smart TV in living room", "43-inch Smart TV in bedroom",
            "Separate living room", "Dining table for two", "Bluetooth speaker", "Capsule coffee machine", "Premium minibar",
            "Electronic safe", "Writing desk", "Indoor whirlpool jacuzzi for two", "Freestanding soaking bathtub", "Double vanity"
        ],
        "breakfastIncluded": True,
        "extraBedAvailable": True,
        "smokingPolicy": "Non-smoking indoors and on balconies.",
        "accessibilityFeatures": ["Elevator access and step-free route", "Bathroom has a raised jacuzzi edge, not suitable for roll-in shower"],
        "connectingRoomAvailable": False,
        "privatePool": False,
        "jacuzzi": True,
        "rates": {
            "lowSeason": 16500,
            "highSeason": 21000,
            "currency": "INR",
            "taxesIncluded": True,
            "validFrom": "2026-01-01",
            "validUntil": "2026-12-31"
        },
        "location": "Panorama Wing, 6-8 minutes' walk from the lobby and 4 minutes from the infinity pool.",
        "photoHighlights": [
            {"code": "MPS-01", "caption": "Bedroom and mountain outlook"},
            {"code": "MPS-02", "caption": "Separate living room"},
            {"code": "MPS-03", "caption": "Panoramic balcony"},
            {"code": "MPS-04", "caption": "Whirlpool jacuzzi"},
            {"code": "MPS-05", "caption": "Evening suite setup"}
        ],
        "sourceIds": ["SRC-001", "SRC-015"]
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
        "viewType": ["Internal landscaped courtyard and garden view"],
        "amenities": [
            "High-speed Wi-Fi", "Air conditioning & ceiling fan", "55-inch Smart TV", "Separate living area",
            "Children's reading corner", "Dining table for four", "Capsule coffee machine", "Larger minibar refrigerator",
            "Microwave on request (infant food only)", "Electronic safe", "One full bathroom (shower + tub)", "Separate powder room"
        ],
        "breakfastIncluded": True,
        "extraBedAvailable": False,
        "smokingPolicy": "Non-smoking indoors and on patios.",
        "accessibilityFeatures": ["Ground floor step-free access", "Bathroom door supports standard wheelchair but not fully certified accessible"],
        "connectingRoomAvailable": False,
        "privatePool": False,
        "jacuzzi": False,
        "rates": {
            "lowSeason": 19500,
            "highSeason": 24500,
            "currency": "INR",
            "taxesIncluded": True,
            "validFrom": "2026-01-01",
            "validUntil": "2026-12-31"
        },
        "location": "Family Courtyard, 3-5 minutes' walk from the kids' club, main pool, and Azure Terrace.",
        "photoHighlights": [
            {"code": "FCS-01", "caption": "King bedroom"},
            {"code": "FCS-02", "caption": "Children's bunk area"},
            {"code": "FCS-03", "caption": "Living and dining space"},
            {"code": "FCS-04", "caption": "Garden patio"},
            {"code": "FCS-05", "caption": "Main bathroom"}
        ],
        "sourceIds": ["SRC-001", "SRC-015"]
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
        "viewType": ["Valley-facing outlook with a screened private garden"],
        "amenities": [
            "High-speed Wi-Fi", "Air conditioning & ceiling fan", "55-inch Smart TV", "Private heated plunge pool (5m x 3m, 1.2m deep)",
            "Private deck with loungers & dining table", "Enclosed private garden", "Bluetooth speaker", "Capsule coffee machine",
            "Premium minibar", "Freestanding deep soaking tub", "Double vanity", "Couple bath amenities", "Romantic turndown on request"
        ],
        "breakfastIncluded": True,
        "extraBedAvailable": False,
        "smokingPolicy": "Non-smoking indoors. Smoking is not permitted on the private deck or near the pool.",
        "accessibilityFeatures": ["Villa access includes sloped pathway and two shallow steps", "Pool and bathroom not wheelchair adapted"],
        "connectingRoomAvailable": False,
        "privatePool": True,
        "jacuzzi": False,
        "rates": {
            "lowSeason": 26500,
            "highSeason": 33500,
            "currency": "INR",
            "taxesIncluded": True,
            "validFrom": "2026-01-01",
            "validUntil": "2026-12-31"
        },
        "location": "Private Villa Zone, 8-10 minutes' walk from the lobby. Complimentary buggy service available on request.",
        "photoHighlights": [
            {"code": "HPV-01", "caption": "Villa bedroom"},
            {"code": "HPV-02", "caption": "Private heated plunge pool"},
            {"code": "HPV-03", "caption": "Private deck and garden"},
            {"code": "HPV-04", "caption": "Bathroom soaking tub"},
            {"code": "HPV-05", "caption": "Romantic evening setup"}
        ],
        "sourceIds": ["SRC-001", "SRC-015"]
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
        "viewType": ["Panoramic mountain and valley view"],
        "amenities": [
            "High-speed Wi-Fi", "Air conditioning & ceiling fan", "65-inch Smart TV in living room", "TVs in both bedrooms",
            "Private temperature-controlled pool (8m x 4m)", "Outdoor whirlpool jacuzzi for four", "Large living & dining room",
            "Outdoor dining table for six", "Kitchenette for service use", "Full-size refrigerator", "Capsule coffee machine",
            "Premium minibar", "Two en-suite bathrooms (Master with tub)", "Guest powder room", "Electronic safes in both bedrooms"
        ],
        "breakfastIncluded": True,
        "extraBedAvailable": True,
        "smokingPolicy": "Non-smoking indoors, on the deck, and in the private garden.",
        "accessibilityFeatures": ["Buggy-accessible route with step-free entry", "Bathrooms/pool do not have certified accessibility features"],
        "connectingRoomAvailable": False,
        "privatePool": True,
        "jacuzzi": True,
        "rates": {
            "lowSeason": 42000,
            "highSeason": 52000,
            "currency": "INR",
            "taxesIncluded": True,
            "validFrom": "2026-01-01",
            "validUntil": "2026-12-31"
        },
        "location": "Upper Private Villa Zone, 10-12 minutes' walk from the lobby. Complimentary buggy service available throughout.",
        "photoHighlights": [
            {"code": "G2PV-01", "caption": "Exterior and private pool"},
            {"code": "G2PV-02", "caption": "Master king bedroom"},
            {"code": "G2PV-03", "caption": "Second bedroom twin setup"},
            {"code": "G2PV-04", "caption": "Living and dining room"},
            {"code": "G2PV-05", "caption": "Mountain-valley panorama"},
            {"code": "G2PV-06", "caption": "Outdoor jacuzzi"}
        ],
        "sourceIds": ["SRC-001", "SRC-015"]
    }
]

with open(os.path.join(output_dir, "rooms.ts"), "w", encoding="utf-8") as f:
    f.write(f"// Generated from Room Catalogue and Rate Card\n")
    f.write(f"export interface RoomCategory {{\n")
    f.write(f"  id: string;\n")
    f.write(f"  slug: string;\n")
    f.write(f"  name: string;\n")
    f.write(f"  inventory: number;\n")
    f.write(f"  shortDescription: string;\n")
    f.write(f"  fullDescription: string;\n")
    f.write(f"  size: string;\n")
    f.write(f"  bedType: string;\n")
    f.write(f"  maximumOccupancy: number;\n")
    f.write(f"  adultsAllowed: number;\n")
    f.write(f"  childrenAllowed: number;\n")
    f.write(f"  viewType: string[];\n")
    f.write(f"  amenities: string[];\n")
    f.write(f"  breakfastIncluded: boolean;\n")
    f.write(f"  extraBedAvailable: boolean;\n")
    f.write(f"  smokingPolicy: string;\n")
    f.write(f"  accessibilityFeatures: string[];\n")
    f.write(f"  connectingRoomAvailable: boolean;\n")
    f.write(f"  privatePool: boolean;\n")
    f.write(f"  jacuzzi: boolean;\n")
    f.write(f"  rates: {{\n")
    f.write(f"    lowSeason: number;\n")
    f.write(f"    highSeason: number;\n")
    f.write(f"    currency: string;\n")
    f.write(f"    taxesIncluded: boolean;\n")
    f.write(f"    validFrom: string;\n")
    f.write(f"    validUntil: string;\n")
    f.write(f"  }};\n")
    f.write(f"  location: string;\n")
    f.write(f"  photoHighlights: {{ code: string; caption: string }}[];\n")
    f.write(f"  sourceIds: string[];\n")
    f.write(f"}}\n\n")
    f.write(f"export const roomCategories: RoomCategory[] = {json.dumps(rooms_data, indent=2)};\n")

print("Rooms and Rates parsed.")

# ----------------- PARSE RESTAURANT MENU DATA -----------------
dining_outlets = [
    {
        "id": "azure-terrace",
        "slug": "azure-terrace",
        "name": "Azure Terrace",
        "description": "Azure Terrace is our all-day dining restaurant, offering a spacious setting with indoor and terrace seating. Guests can enjoy a rich selection of Indian, Asian, and international cuisine, along with a comprehensive breakfast buffet and a la carte options.",
        "mealPeriods": [
            {"name": "Breakfast", "timing": "7:00 AM - 10:30 AM", "lastOrder": "10:15 AM"},
            {"name": "Lunch", "timing": "12:30 PM - 3:30 PM", "lastOrder": "3:15 PM"},
            {"name": "Dinner", "timing": "7:00 PM - 10:30 PM", "lastOrder": "10:15 PM"}
        ],
        "cuisine": "Indian, Asian and International",
        "dressCode": "Smart Casual",
        "reservationRequired": False,
        "dietaryNotes": "Vegetarian, Vegan, Jain, and Gluten-free options are available. Dedicated Kids' Menu is available.",
        "roomService": "Available 24 hours (Midnight menu operates from 11:00 PM to 6:30 AM).",
        "images": ["/Images/Dining/DIN-01_Azure_Terrace_-_all-day_dining_restauran.jpg", "/Images/Dining/DIN-08_Azure_Terrace_terrace_seating.jpg"]
    },
    {
        "id": "ember-spice",
        "slug": "ember-spice",
        "name": "Ember & Spice",
        "description": "Ember & Spice is our dinner-only specialty restaurant, highlighting authentic Indian grills and regional tandoor delicacies. It is the perfect choice for an adult-focused dinner experiencing slow-cooked clay-oven specialties and rich curries.",
        "mealPeriods": [
            {"name": "Dinner", "timing": "7:00 PM - 11:00 PM", "lastOrder": "10:30 PM"}
        ],
        "cuisine": "Indian Grills and Regional Tandoor",
        "dressCode": "Smart Casual / Semi-formal",
        "reservationRequired": True,
        "dietaryNotes": "Jain and Vegetarian dishes available. Closed on Mondays.",
        "roomService": "Respective menu items available in-room during operating hours.",
        "images": ["/Images/Dining/DIN-02_Ember__Spice_-_dinner_restaurant_India.jpg"]
    },
    {
        "id": "the-cedar-lounge",
        "slug": "the-cedar-lounge",
        "name": "The Cedar Lounge",
        "description": "Located adjacent to our main lobby, The Cedar Lounge is a relaxing sanctuary for artisanal coffees, loose-leaf teas, fresh pastries, and light savory bites throughout the day. It features our signature RKPR High Tea experience.",
        "mealPeriods": [
            {"name": "All-Day", "timing": "8:00 AM - 11:00 PM", "lastOrder": "10:45 PM"}
        ],
        "cuisine": "Teas, Coffee, Desserts and Light Meals",
        "dressCode": "Casual",
        "reservationRequired": False,
        "dietaryNotes": "Signature High Tea (3:00 PM - 6:00 PM) for two guests.",
        "roomService": "Selected menu items available for midnight room service.",
        "images": ["/Images/Dining/DIN-03_The_Cedar_Lounge_-_lobby_lounge.jpg"]
    },
    {
        "id": "summit-bar",
        "slug": "summit-bar",
        "name": "Summit Bar",
        "description": "Summit Bar offers an indoor lounge and an outdoor sunset deck overlooking the valley. Unwind with curated signature cocktails, a premium collection of single malts and wines, and a selection of hot bar snacks.",
        "mealPeriods": [
            {"name": "Bar & Evening", "timing": "4:00 PM - 11:30 PM", "lastOrder": "Drinks: 11:15 PM, Food: 10:45 PM"}
        ],
        "cuisine": "Cocktails, Spirits, Wine and Bar Snacks",
        "dressCode": "Smart Casual",
        "reservationRequired": False,
        "dietaryNotes": "Alcohol served to guests aged 21 and above in accordance with local regulations. Outdoor deck usage is weather dependent.",
        "roomService": "Cocktails and snacks available via room service.",
        "images": ["/Images/Dining/DIN-04_Summit_Bar_-_indoor_bar_and_sunset_deck.jpg", "/Images/Dining/DIN-10_Cocktail_presentation_-_Summit_Bar.jpg"]
    }
]

# Fully-populated array of menu items based on the raw text
menu_items = [
    # Azure Terrace Breakfast
    {
        "id": "continental-breakfast-buffet",
        "name": "Continental Breakfast Buffet",
        "description": "Live counters: eggs to order, pastries, cereals, fresh fruit, breads.",
        "tags": ["V", "GFA"],
        "price": "INR 1,200",
        "priceNumeric": "1200",
        "outlet": "azure-terrace",
        "category": "Breakfast",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "south-indian-breakfast-buffet",
        "name": "South Indian Breakfast Buffet",
        "description": "Idli, vada, dosa, upma, sambar and chutneys.",
        "tags": ["V", "VG-A", "GF"],
        "price": "INR 1,200",
        "priceNumeric": "1200",
        "outlet": "azure-terrace",
        "category": "Breakfast",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": True
    },
    {
        "id": "masala-dosa",
        "name": "Masala Dosa",
        "description": "Crisp rice-lentil crepe, spiced potato filling, sambar, coconut chutney.",
        "tags": ["V", "VG", "GF"],
        "price": "INR 650",
        "priceNumeric": "650",
        "outlet": "azure-terrace",
        "category": "Breakfast",
        "isVegetarian": True,
        "isVegan": True,
        "isJain": False,
        "isGlutenFree": True,
        "image": "/Images/Dining/DIN-05_Masala_Dosa_-_signature_dish_photo.jpg"
    },
    {
        "id": "idli-vada-combo",
        "name": "Idli-Vada Combo",
        "description": "Steamed rice cakes and lentil doughnuts with sambar and chutney.",
        "tags": ["V", "VG", "GF"],
        "price": "INR 550",
        "priceNumeric": "550",
        "outlet": "azure-terrace",
        "category": "Breakfast",
        "isVegetarian": True,
        "isVegan": True,
        "isJain": False,
        "isGlutenFree": True
    },
    {
        "id": "classic-eggs-benedict",
        "name": "Classic Eggs Benedict",
        "description": "Poached eggs, hollandaise, English muffin, choice of ham or spinach.",
        "tags": ["NV/V", "E", "D", "G"],
        "price": "INR 750",
        "priceNumeric": "750",
        "outlet": "azure-terrace",
        "category": "Breakfast",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "avocado-toast",
        "name": "Avocado Toast",
        "description": "Multigrain sourdough, smashed avocado, cherry tomato, chilli flakes.",
        "tags": ["V", "VG-A", "G"],
        "price": "INR 700",
        "priceNumeric": "700",
        "outlet": "azure-terrace",
        "category": "Breakfast",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "fresh-juice-smoothie-bar",
        "name": "Fresh Juice & Smoothie Bar",
        "description": "Seasonal fruit or vegetable juice / smoothie, made to order.",
        "tags": ["V", "VG", "GF"],
        "price": "INR 350",
        "priceNumeric": "350",
        "outlet": "azure-terrace",
        "category": "Breakfast",
        "isVegetarian": True,
        "isVegan": True,
        "isJain": False,
        "isGlutenFree": True
    },
    {
        "id": "artisanal-pancake-stack",
        "name": "Artisanal Pancake Stack",
        "description": "Buttermilk pancakes, maple syrup, seasonal berries.",
        "tags": ["V", "E", "D", "G"],
        "price": "INR 600",
        "priceNumeric": "600",
        "outlet": "azure-terrace",
        "category": "Breakfast",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    # Azure Terrace Lunch & Dinner A La Carte
    {
        "id": "butter-chicken",
        "name": "Butter Chicken",
        "description": "Tandoor-roasted chicken in a tomato-butter gravy, served with naan.",
        "tags": ["NV", "D", "G", "Medium"],
        "price": "INR 1,100",
        "priceNumeric": "1100",
        "outlet": "azure-terrace",
        "category": "A La Carte",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False,
        "image": "/Images/Dining/DIN-06_Butter_Chicken_-_signature_dish_photo.jpg"
    },
    {
        "id": "paneer-tikka-masala",
        "name": "Paneer Tikka Masala",
        "description": "Chargrilled cottage cheese in a spiced tomato-cashew gravy.",
        "tags": ["V", "J", "D", "N", "Medium"],
        "price": "INR 950",
        "priceNumeric": "950",
        "outlet": "azure-terrace",
        "category": "A La Carte",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": True,
        "isGlutenFree": False
    },
    {
        "id": "dal-makhani",
        "name": "Dal Makhani",
        "description": "Slow-cooked black lentils, butter and cream. Vegan version available without butter/cream.",
        "tags": ["V", "VG-A", "D"],
        "price": "INR 650",
        "priceNumeric": "650",
        "outlet": "azure-terrace",
        "category": "A La Carte",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "hakka-noodles-vegetable",
        "name": "Hakka Noodles - Vegetable",
        "description": "Wok-tossed noodles with seasonal vegetables, soy and garlic.",
        "tags": ["V", "VG", "G", "S"],
        "price": "INR 750",
        "priceNumeric": "750",
        "outlet": "azure-terrace",
        "category": "A La Carte",
        "isVegetarian": True,
        "isVegan": True,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "hakka-noodles-chicken",
        "name": "Hakka Noodles - Chicken",
        "description": "Wok-tossed noodles with chicken, soy and garlic.",
        "tags": ["NV", "G", "S"],
        "price": "INR 900",
        "priceNumeric": "900",
        "outlet": "azure-terrace",
        "category": "A La Carte",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "margherita-pizza",
        "name": "Margherita Pizza",
        "description": "Wood-fired, San Marzano tomato, buffalo mozzarella, basil.",
        "tags": ["V", "D", "G"],
        "price": "INR 850",
        "priceNumeric": "850",
        "outlet": "azure-terrace",
        "category": "A La Carte",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "grilled-salmon",
        "name": "Grilled Salmon",
        "description": "Herb-butter grilled salmon, seasonal vegetables, lemon beurre blanc.",
        "tags": ["NV", "F", "D", "Mild"],
        "price": "INR 1,650",
        "priceNumeric": "1650",
        "outlet": "azure-terrace",
        "category": "A La Carte",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "vegan-buddha-bowl",
        "name": "Vegan Buddha Bowl",
        "description": "Quinoa, roasted vegetables, chickpeas, tahini dressing.",
        "tags": ["V", "VG", "GF"],
        "price": "INR 800",
        "priceNumeric": "800",
        "outlet": "azure-terrace",
        "category": "A La Carte",
        "isVegetarian": True,
        "isVegan": True,
        "isJain": False,
        "isGlutenFree": True
    },
    {
        "id": "tandoori-platter-mixed-grill",
        "name": "Tandoori Platter (Mixed Grill)",
        "description": "Chicken tikka, seekh kebab, tandoori prawns, mint chutney.",
        "tags": ["NV", "D", "Sh", "Spicy"],
        "price": "INR 1,450",
        "priceNumeric": "1450",
        "outlet": "azure-terrace",
        "category": "A La Carte",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False,
        "image": "/Images/Dining/DIN-07_Tandoori_Platter_-_signature_dish_photo.jpg"
    },
    {
        "id": "jain-thali",
        "name": "Jain Thali",
        "description": "Seasonal Jain-style vegetable curries, dal, rice, roti, salad - no onion or garlic.",
        "tags": ["V", "J", "VG-A"],
        "price": "INR 1,050",
        "priceNumeric": "1050",
        "outlet": "azure-terrace",
        "category": "A La Carte",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": True,
        "isGlutenFree": False
    },
    {
        "id": "kids-menu-combo",
        "name": "Kids' Menu Combo",
        "description": "Choice of mini pizza, pasta or chicken fingers with fries and juice.",
        "tags": ["V/NV", "G", "D"],
        "price": "INR 600",
        "priceNumeric": "600",
        "outlet": "azure-terrace",
        "category": "A La Carte",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    # Ember & Spice Dinner Only
    {
        "id": "tandoori-platter-trio",
        "name": "Tandoori Platter Trio",
        "description": "Chicken tikka, paneer tikka and tandoori prawns on a sizzling plate.",
        "tags": ["NV", "D", "Sh", "Spicy"],
        "price": "INR 1,650",
        "priceNumeric": "1650",
        "outlet": "ember-spice",
        "category": "Dinner Grills & Tandoor",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "awadhi-galouti-kebab",
        "name": "Awadhi Galouti Kebab",
        "description": "Minced lamb kebab with 20+ spices, warqi paratha.",
        "tags": ["NV", "D", "G", "Medium"],
        "price": "INR 1,300",
        "priceNumeric": "1300",
        "outlet": "ember-spice",
        "category": "Dinner Grills & Tandoor",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "rogan-josh",
        "name": "Rogan Josh",
        "description": "Slow-braised lamb curry in a Kashmiri chilli and yoghurt gravy.",
        "tags": ["NV", "D", "Spicy"],
        "price": "INR 1,400",
        "priceNumeric": "1400",
        "outlet": "ember-spice",
        "category": "Dinner Grills & Tandoor",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "dal-bukhara",
        "name": "Dal Bukhara",
        "description": "Overnight slow-cooked black lentils finished with cream.",
        "tags": ["V", "D"],
        "price": "INR 700",
        "priceNumeric": "700",
        "outlet": "ember-spice",
        "category": "Dinner Grills & Tandoor",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "hyderabadi-biryani-vegetable",
        "name": "Hyderabadi Biryani - Vegetable",
        "description": "Layered basmati rice, seasonal vegetables, saffron, mint raita.",
        "tags": ["V", "VG-A", "Medium"],
        "price": "INR 950",
        "priceNumeric": "950",
        "outlet": "ember-spice",
        "category": "Dinner Grills & Tandoor",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "hyderabadi-biryani-chicken",
        "name": "Hyderabadi Biryani - Chicken",
        "description": "Layered basmati rice, marinated chicken, saffron, mint raita.",
        "tags": ["NV", "D", "Medium"],
        "price": "INR 1,150",
        "priceNumeric": "1150",
        "outlet": "ember-spice",
        "category": "Dinner Grills & Tandoor",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "hyderabadi-biryani-mutton",
        "name": "Hyderabadi Biryani - Mutton",
        "description": "Layered basmati rice, slow-cooked mutton, saffron, mint raita.",
        "tags": ["NV", "D", "Spicy"],
        "price": "INR 1,450",
        "priceNumeric": "1450",
        "outlet": "ember-spice",
        "category": "Dinner Grills & Tandoor",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "kerala-fish-curry",
        "name": "Kerala Fish Curry",
        "description": "Coconut-based curry with local river fish and curry leaf tempering.",
        "tags": ["NV", "GF", "F", "Spicy"],
        "price": "INR 1,350",
        "priceNumeric": "1350",
        "outlet": "ember-spice",
        "category": "Dinner Grills & Tandoor",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": True
    },
    {
        "id": "sarson-ka-saag-with-makki-roti",
        "name": "Sarson ka Saag with Makki Roti",
        "description": "Mustard-greens curry with maize flatbread and white butter.",
        "tags": ["V", "GF", "D"],
        "price": "INR 800",
        "priceNumeric": "800",
        "outlet": "ember-spice",
        "category": "Dinner Grills & Tandoor",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": True
    },
    {
        "id": "tandoori-vegetable-skewers",
        "name": "Tandoori Vegetable Skewers",
        "description": "Chargrilled seasonal vegetables marinated in yoghurt and spices.",
        "tags": ["V", "J-A", "GF", "D", "Medium"],
        "price": "INR 750",
        "priceNumeric": "750",
        "outlet": "ember-spice",
        "category": "Dinner Grills & Tandoor",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": True
    },
    # The Cedar Lounge
    {
        "id": "rkpr-signature-high-tea",
        "name": "RKPR Signature High Tea (for two)",
        "description": "Assorted finger sandwiches, scones, pastries, choice of tea or coffee.",
        "tags": ["V", "D", "G", "E"],
        "price": "INR 1,800",
        "priceNumeric": "1800",
        "outlet": "the-cedar-lounge",
        "category": "Tea, Coffee & Desserts",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "assorted-loose-leaf-teas",
        "name": "Assorted Loose-Leaf Teas",
        "description": "Darjeeling, Assam, Nilgiri, chamomile, peppermint, green tea.",
        "tags": ["V", "VG", "GF"],
        "price": "INR 400",
        "priceNumeric": "400",
        "outlet": "the-cedar-lounge",
        "category": "Tea, Coffee & Desserts",
        "isVegetarian": True,
        "isVegan": True,
        "isJain": False,
        "isGlutenFree": True
    },
    {
        "id": "artisanal-coffee",
        "name": "Artisanal Coffee",
        "description": "Espresso-based coffee from the capsule/barista counter.",
        "tags": ["V", "GF", "D on request"],
        "price": "INR 350-450",
        "priceNumeric": "350",
        "outlet": "the-cedar-lounge",
        "category": "Tea, Coffee & Desserts",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": True
    },
    {
        "id": "club-sandwich",
        "name": "Club Sandwich",
        "description": "Triple-decker chicken or vegetable club with fries.",
        "tags": ["NV/V", "G", "D", "E"],
        "price": "INR 700",
        "priceNumeric": "700",
        "outlet": "the-cedar-lounge",
        "category": "Tea, Coffee & Desserts",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "soup-of-the-day",
        "name": "Soup of the Day",
        "description": "Chef's seasonal soup with artisanal bread.",
        "tags": ["V", "VG-A", "G on request"],
        "price": "INR 450",
        "priceNumeric": "450",
        "outlet": "the-cedar-lounge",
        "category": "Tea, Coffee & Desserts",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "new-york-cheesecake",
        "name": "New York Cheesecake",
        "description": "Classic baked cheesecake with berry compote.",
        "tags": ["V", "D", "E", "G"],
        "price": "INR 550",
        "priceNumeric": "550",
        "outlet": "the-cedar-lounge",
        "category": "Tea, Coffee & Desserts",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "tiramisu",
        "name": "Tiramisu",
        "description": "Espresso-soaked sponge, mascarpone, cocoa.",
        "tags": ["V", "D", "E", "G"],
        "price": "INR 550",
        "priceNumeric": "550",
        "outlet": "the-cedar-lounge",
        "category": "Tea, Coffee & Desserts",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "mango-cream-delice",
        "name": "Mango Cream Delice",
        "description": "Seasonal mango mousse, sponge, tropical fruit.",
        "tags": ["V", "GFA", "D", "E"],
        "price": "INR 550",
        "priceNumeric": "550",
        "outlet": "the-cedar-lounge",
        "category": "Tea, Coffee & Desserts",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "assorted-pastry-basket",
        "name": "Assorted Pastry Basket",
        "description": "Chef's daily selection of pastries and cookies.",
        "tags": ["V", "D", "E", "G", "N"],
        "price": "INR 650",
        "priceNumeric": "650",
        "outlet": "the-cedar-lounge",
        "category": "Tea, Coffee & Desserts",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    # Summit Bar - Signature Cocktails
    {
        "id": "valley-sunset",
        "name": "Valley Sunset",
        "description": "Bourbon, honey, orange bitters, smoked garnish.",
        "tags": ["Contains alcohol"],
        "price": "INR 950",
        "priceNumeric": "950",
        "outlet": "summit-bar",
        "category": "Signature Cocktails",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "br-hills-mule",
        "name": "BR Hills Mule",
        "description": "Vodka, house ginger beer, lime, mint.",
        "tags": ["Contains alcohol"],
        "price": "INR 850",
        "priceNumeric": "850",
        "outlet": "summit-bar",
        "category": "Signature Cocktails",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "cedar-smoke-old-fashioned",
        "name": "Cedar Smoke Old Fashioned",
        "description": "Whisky, demerara, aromatic bitters, cedar smoke.",
        "tags": ["Contains alcohol"],
        "price": "INR 1,000",
        "priceNumeric": "1000",
        "outlet": "summit-bar",
        "category": "Signature Cocktails",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "forest-berry-fizz",
        "name": "Forest Berry Fizz",
        "description": "Gin, mixed berry shrub, soda, lemon.",
        "tags": ["Contains alcohol"],
        "price": "INR 900",
        "priceNumeric": "900",
        "outlet": "summit-bar",
        "category": "Signature Cocktails",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "aranya-espresso-martini",
        "name": "Aranya Espresso Martini",
        "description": "Vodka, coffee liqueur, fresh espresso.",
        "tags": ["Contains alcohol", "D optional"],
        "price": "INR 950",
        "priceNumeric": "950",
        "outlet": "summit-bar",
        "category": "Signature Cocktails",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    # Summit Bar - Mocktails
    {
        "id": "virgin-valley-cooler",
        "name": "Virgin Valley Cooler",
        "description": "Fresh cucumber, mint, lime, soda.",
        "tags": ["V", "VG", "GF"],
        "price": "INR 450",
        "priceNumeric": "450",
        "outlet": "summit-bar",
        "category": "Mocktails",
        "isVegetarian": True,
        "isVegan": True,
        "isJain": False,
        "isGlutenFree": True
    },
    {
        "id": "sunrise-spritz",
        "name": "Sunrise Spritz",
        "description": "Orange, passionfruit, ginger ale.",
        "tags": ["V", "VG", "GF"],
        "price": "INR 450",
        "priceNumeric": "450",
        "outlet": "summit-bar",
        "category": "Mocktails",
        "isVegetarian": True,
        "isVegan": True,
        "isJain": False,
        "isGlutenFree": True
    },
    {
        "id": "berry-basil-smash",
        "name": "Berry Basil Smash",
        "description": "Mixed berries, basil, lemonade.",
        "tags": ["V", "VG", "GF"],
        "price": "INR 450",
        "priceNumeric": "450",
        "outlet": "summit-bar",
        "category": "Mocktails",
        "isVegetarian": True,
        "isVegan": True,
        "isJain": False,
        "isGlutenFree": True
    },
    # Summit Bar - Spirits, Wine & Bar Snacks
    {
        "id": "single-malt-whisky",
        "name": "Single Malt Whisky (30 ml)",
        "description": "Selection from India, Scotland and Japan.",
        "tags": ["Contains alcohol"],
        "price": "INR 650-1,800",
        "priceNumeric": "650",
        "outlet": "summit-bar",
        "category": "Spirits, Wine & Bar Snacks",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "house-wine",
        "name": "House Wine (glass / bottle)",
        "description": "Curated red, white and sparkling by the glass or bottle.",
        "tags": ["Contains alcohol"],
        "price": "INR 650 / 3,200",
        "priceNumeric": "650",
        "outlet": "summit-bar",
        "category": "Spirits, Wine & Bar Snacks",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "craft-beer",
        "name": "Craft Beer",
        "description": "Local and imported bottled and draught beer.",
        "tags": ["Contains alcohol", "G"],
        "price": "INR 450-650",
        "priceNumeric": "450",
        "outlet": "summit-bar",
        "category": "Spirits, Wine & Bar Snacks",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "loaded-nachos",
        "name": "Loaded Nachos",
        "description": "Corn chips, cheese sauce, jalapeno, salsa, sour cream.",
        "tags": ["V", "D", "G"],
        "price": "INR 650",
        "priceNumeric": "650",
        "outlet": "summit-bar",
        "category": "Spirits, Wine & Bar Snacks",
        "isVegetarian": True,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "chicken-wings",
        "name": "Chicken Wings (6 pc)",
        "description": "Choice of tandoori dry-rub or spicy buffalo glaze.",
        "tags": ["NV", "Spicy"],
        "price": "INR 750",
        "priceNumeric": "750",
        "outlet": "summit-bar",
        "category": "Spirits, Wine & Bar Snacks",
        "isVegetarian": False,
        "isVegan": False,
        "isJain": False,
        "isGlutenFree": False
    },
    {
        "id": "peri-peri-fries",
        "name": "Peri-Peri Fries",
        "description": "Crisp fries tossed in peri-peri seasoning.",
        "tags": ["V", "VG", "GF"],
        "price": "INR 400",
        "priceNumeric": "400",
        "outlet": "summit-bar",
        "category": "Spirits, Wine & Bar Snacks",
        "isVegetarian": True,
        "isVegan": True,
        "isJain": False,
        "isGlutenFree": True
    }
]

with open(os.path.join(output_dir, "dining.ts"), "w", encoding="utf-8") as f:
    f.write(f"export interface DiningOutlet {{\n")
    f.write(f"  id: string;\n")
    f.write(f"  slug: string;\n")
    f.write(f"  name: string;\n")
    f.write(f"  description: string;\n")
    f.write(f"  mealPeriods: {{ name: string; timing: string; lastOrder: string }}[];\n")
    f.write(f"  cuisine: string;\n")
    f.write(f"  dressCode: string;\n")
    f.write(f"  reservationRequired: boolean;\n")
    f.write(f"  dietaryNotes: string;\n")
    f.write(f"  roomService: string;\n")
    f.write(f"  images: string[];\n")
    f.write(f"}}\n\n")
    f.write(f"export const diningOutlets: DiningOutlet[] = {json.dumps(dining_outlets, indent=2)};\n")

with open(os.path.join(output_dir, "menu.ts"), "w", encoding="utf-8") as f:
    f.write(f"export interface MenuItem {{\n")
    f.write(f"  id: string;\n")
    f.write(f"  name: string;\n")
    f.write(f"  description: string;\n")
    f.write(f"  tags: string[];\n")
    f.write(f"  price: string;\n")
    f.write(f"  priceNumeric: string;\n")
    f.write(f"  outlet: string;\n")
    f.write(f"  category: string;\n")
    f.write(f"  isVegetarian: boolean;\n")
    f.write(f"  isVegan: boolean;\n")
    f.write(f"  isJain: boolean;\n")
    f.write(f"  isGlutenFree: boolean;\n")
    f.write(f"  image?: string;\n")
    f.write(f"}}\n\n")
    f.write(f"export const menuItems: MenuItem[] = {json.dumps(menu_items, indent=2)};\n")

print(f"Dining and Menu written: {len(menu_items)} menu items.")

# ----------------- PARSE SPA & WELLNESS DATA -----------------
spa_treatments = [
    {
        "id": "aranya-signature-massage-60",
        "name": "Aranya Signature Massage (60 Min)",
        "description": "Medium-pressure full-body massage combining Swedish, Balinese and stretching techniques.",
        "duration": "60 min",
        "price": 4200,
        "coupleOption": True,
        "minimumAge": 16,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "6 hours"
    },
    {
        "id": "aranya-signature-massage-90",
        "name": "Aranya Signature Massage (90 Min)",
        "description": "Extended full-body ritual with scalp massage.",
        "duration": "90 min",
        "price": 5800,
        "coupleOption": True,
        "minimumAge": 16,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "6 hours"
    },
    {
        "id": "swedish-relaxation-massage",
        "name": "Swedish Relaxation Massage",
        "description": "Gentle flowing massage for relaxation and circulation.",
        "duration": "60 min",
        "price": 3800,
        "coupleOption": True,
        "minimumAge": 16,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "6 hours"
    },
    {
        "id": "deep-tissue-massage-60",
        "name": "Deep Tissue Massage (60 Min)",
        "description": "Firm pressure focused on muscular tension and sports recovery.",
        "duration": "60 min",
        "price": 4500,
        "coupleOption": False,
        "minimumAge": 18,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "6 hours"
    },
    {
        "id": "deep-tissue-massage-90",
        "name": "Deep Tissue Massage (90 Min)",
        "description": "Extended recovery treatment for back, shoulders and legs.",
        "duration": "90 min",
        "price": 6100,
        "coupleOption": False,
        "minimumAge": 18,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "6 hours"
    },
    {
        "id": "balinese-massage",
        "name": "Balinese Massage",
        "description": "Pressure-point massage with stretching and aromatic oil.",
        "duration": "60 min",
        "price": 4300,
        "coupleOption": True,
        "minimumAge": 16,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "6 hours"
    },
    {
        "id": "aromatherapy-massage",
        "name": "Aromatherapy Massage",
        "description": "Gentle massage using a selected essential-oil blend.",
        "duration": "60 min",
        "price": 4100,
        "coupleOption": True,
        "minimumAge": 16,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "6 hours"
    },
    {
        "id": "hot-stone-therapy",
        "name": "Hot Stone Therapy",
        "description": "Heated basalt stones with medium-pressure massage.",
        "duration": "75 min",
        "price": 5600,
        "coupleOption": True,
        "minimumAge": 18,
        "bookingRequired": True,
        "seasonalAvailability": "October - March preferred",
        "cancellationDeadline": "12 hours"
    },
    {
        "id": "ayurvedic-abhyanga",
        "name": "Ayurvedic Abhyanga",
        "description": "Warm herbal oil massage performed with rhythmic strokes.",
        "duration": "60 min",
        "price": 4600,
        "coupleOption": True,
        "minimumAge": 16,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "6 hours"
    },
    {
        "id": "shirodhara-ritual",
        "name": "Shirodhara Ritual",
        "description": "Warm oil stream over the forehead followed by scalp massage.",
        "duration": "60 min",
        "price": 5200,
        "coupleOption": False,
        "minimumAge": 18,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "12 hours"
    },
    {
        "id": "head-neck-shoulder",
        "name": "Head, Neck and Shoulder Therapy",
        "description": "Focused seated or table massage for upper-body tension.",
        "duration": "30 min",
        "price": 2200,
        "coupleOption": False,
        "minimumAge": 13,
        "bookingRequired": False,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "4 hours"
    },
    {
        "id": "foot-reflexology",
        "name": "Foot Reflexology",
        "description": "Pressure-point foot and lower-leg treatment.",
        "duration": "45 min",
        "price": 2900,
        "coupleOption": True,
        "minimumAge": 13,
        "bookingRequired": False,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "4 hours"
    },
    {
        "id": "himalayan-salt-scrub",
        "name": "Himalayan Salt Body Scrub",
        "description": "Mineral exfoliation followed by moisturising body lotion.",
        "duration": "45 min",
        "price": 3400,
        "coupleOption": False,
        "minimumAge": 16,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "6 hours"
    },
    {
        "id": "detox-body-wrap",
        "name": "Detox Body Wrap",
        "description": "Herbal body wrap with scalp massage and shower.",
        "duration": "75 min",
        "price": 5100,
        "coupleOption": False,
        "minimumAge": 18,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "12 hours"
    },
    {
        "id": "radiance-facial",
        "name": "Radiance Facial",
        "description": "Cleansing, exfoliation, mask and facial massage.",
        "duration": "60 min",
        "price": 4200,
        "coupleOption": False,
        "minimumAge": 16,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "6 hours"
    },
    {
        "id": "mens-recovery-facial",
        "name": "Men’s Recovery Facial",
        "description": "Deep cleansing and hydrating treatment designed for men’s skin.",
        "duration": "60 min",
        "price": 4200,
        "coupleOption": False,
        "minimumAge": 16,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "6 hours"
    },
    {
        "id": "teen-clarifying-facial",
        "name": "Teen Clarifying Facial",
        "description": "Gentle facial for teenage skin; parental consent required.",
        "duration": "45 min",
        "price": 3200,
        "coupleOption": False,
        "minimumAge": 13,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "6 hours"
    },
    {
        "id": "prenatal-comfort-massage",
        "name": "Prenatal Comfort Massage",
        "description": "Side-position massage for eligible pregnancies after the first trimester.",
        "duration": "60 min",
        "price": 4500,
        "coupleOption": False,
        "minimumAge": 18,
        "bookingRequired": True,
        "seasonalAvailability": "All year",
        "cancellationDeadline": "12 hours"
    }
]

couple_rituals = [
    {
        "id": "mountain-serenity-for-two",
        "name": "Mountain Serenity for Two",
        "includes": "Signature massage, herbal tea and private relaxation time.",
        "duration": "90 min",
        "price": 11800,
        "minimumAge": 18,
        "bookingDeadline": "12 hours before",
        "cancellationDeadline": "12 hours"
    },
    {
        "id": "royal-couple-ritual",
        "name": "Royal Couple Ritual",
        "includes": "Body scrub, aromatherapy massage and rose bath.",
        "duration": "150 min",
        "price": 18500,
        "minimumAge": 18,
        "bookingDeadline": "24 hours before",
        "cancellationDeadline": "12 hours"
    },
    {
        "id": "sunset-couple-escape",
        "name": "Sunset Couple Escape",
        "includes": "60-minute massage followed by private jacuzzi use and refreshments.",
        "duration": "120 min",
        "price": 14200,
        "minimumAge": 18,
        "bookingDeadline": "12 hours before",
        "cancellationDeadline": "12 hours"
    }
]

spa_facilities = [
    {
        "name": "Sauna",
        "timings": "9:00 AM - 8:30 PM",
        "capacity": "6 guests",
        "minimumAge": 16,
        "bookingRequired": "No for hotel guests; spa reception may manage entry during busy periods",
        "usageLimit": "Maximum 15 minutes per session",
        "dressCode": "Swimwear required",
        "safetyNotes": "Not recommended for pregnant guests, guests with uncontrolled blood pressure, heart conditions, fever or dehydration"
    },
    {
        "name": "Steam Room",
        "timings": "9:00 AM - 8:30 PM",
        "capacity": "8 guests",
        "minimumAge": 16,
        "bookingRequired": "No",
        "usageLimit": "Maximum 15 minutes per session",
        "dressCode": "Swimwear required",
        "safetyNotes": "Guests should hydrate before and after use and exit immediately if dizzy or uncomfortable"
    },
    {
        "name": "Hydrotherapy Jacuzzi",
        "timings": "9:00 AM - 8:30 PM",
        "capacity": "6 guests",
        "minimumAge": 16,
        "bookingRequired": "Recommended between 5:00 PM and 8:00 PM",
        "usageLimit": "Maximum 20 minutes per session",
        "charge": "Complimentary for guests with a spa treatment on the same day; INR 900 per guest for facility-only access",
        "safetyNotes": "Not suitable for guests with open wounds, infectious conditions, uncontrolled hypertension or certain heart conditions"
    }
]

with open(os.path.join(output_dir, "spa.ts"), "w", encoding="utf-8") as f:
    f.write(f"export interface SpaTreatment {{\n")
    f.write(f"  id: string;\n")
    f.write(f"  name: string;\n")
    f.write(f"  description: string;\n")
    f.write(f"  duration: string;\n")
    f.write(f"  price: number;\n")
    f.write(f"  coupleOption: boolean;\n")
    f.write(f"  minimumAge: number;\n")
    f.write(f"  bookingRequired: boolean;\n")
    f.write(f"  seasonalAvailability: string;\n")
    f.write(f"  cancellationDeadline: string;\n")
    f.write(f"}}\n\n")
    f.write(f"export interface CoupleRitual {{\n")
    f.write(f"  id: string;\n")
    f.write(f"  name: string;\n")
    f.write(f"  includes: string;\n")
    f.write(f"  duration: string;\n")
    f.write(f"  price: number;\n")
    f.write(f"  minimumAge: number;\n")
    f.write(f"  bookingDeadline: string;\n")
    f.write(f"  cancellationDeadline: string;\n")
    f.write(f"}}\n\n")
    f.write(f"export interface SpaFacility {{\n")
    f.write(f"  name: string;\n")
    f.write(f"  timings: string;\n")
    f.write(f"  capacity: string;\n")
    f.write(f"  minimumAge: number;\n")
    f.write(f"  bookingRequired: string;\n")
    f.write(f"  usageLimit: string;\n")
    f.write(f"  dressCode: string;\n")
    f.write(f"  charge?: string;\n")
    f.write(f"  safetyNotes: string;\n")
    f.write(f"}}\n\n")
    f.write(f"export const spaTreatments: SpaTreatment[] = {json.dumps(spa_treatments, indent=2)};\n")
    f.write(f"export const coupleRituals: CoupleRitual[] = {json.dumps(couple_rituals, indent=2)};\n")
    f.write(f"export const spaFacilities: SpaFacility[] = {json.dumps(spa_facilities, indent=2)};\n")

print("Spa data parsed.")

# ----------------- PARSE ACTIVITIES DATA -----------------
activities_data = [
    # Wellness
    {
        "id": "sunrise-yoga",
        "name": "Sunrise Yoga",
        "category": "Wellness",
        "schedule": "Daily, 6:30 AM",
        "duration": "60 min",
        "charge": "Complimentary",
        "price": 0,
        "bookingRequired": True,
        "bookingDeadline": "By 9:00 PM previous day",
        "capacity": 20,
        "minimumAge": 12,
        "seasonalAvailability": "All year",
        "weatherDependency": "Moves indoors during rain",
        "rules": "Wear flexible clothing; inform instructor of injuries."
    },
    {
        "id": "sunset-yoga",
        "name": "Sunset Yoga",
        "category": "Wellness",
        "schedule": "Mon, Wed, Fri, 5:30 PM",
        "duration": "60 min",
        "charge": "INR 700",
        "price": 700,
        "bookingRequired": True,
        "bookingDeadline": "2 hours before",
        "capacity": 16,
        "minimumAge": 12,
        "seasonalAvailability": "All year",
        "weatherDependency": "Indoor backup available",
        "rules": "Avoid heavy meals for 90 minutes before class."
    },
    {
        "id": "guided-meditation",
        "name": "Guided Meditation",
        "category": "Wellness",
        "schedule": "Tue, Thu, Sat, 7:30 AM",
        "duration": "45 min",
        "charge": "Complimentary",
        "price": 0,
        "bookingRequired": False,
        "bookingDeadline": "1 hour before (recommended)",
        "capacity": 18,
        "minimumAge": 12,
        "seasonalAvailability": "All year",
        "weatherDependency": "No",
        "rules": "Silence required; late entry not permitted after 10 minutes."
    },
    {
        "id": "aqua-yoga",
        "name": "Aqua Yoga",
        "category": "Wellness",
        "schedule": "Tue, Thu, Sun, 8:00 AM",
        "duration": "45 min",
        "charge": "INR 800",
        "price": 800,
        "bookingRequired": True,
        "bookingDeadline": "By 7:00 PM previous day",
        "capacity": 12,
        "minimumAge": 16,
        "seasonalAvailability": "March - November",
        "weatherDependency": "Cancelled during rain or unsafe pool conditions",
        "rules": "Basic water confidence required; swimwear mandatory."
    },
    {
        "id": "breathwork-workshop",
        "name": "Breathwork Workshop",
        "category": "Wellness",
        "schedule": "Saturday, 4:00 PM",
        "duration": "60 min",
        "charge": "INR 900",
        "price": 900,
        "bookingRequired": True,
        "bookingDeadline": "4 hours before",
        "capacity": 15,
        "minimumAge": 16,
        "seasonalAvailability": "All year",
        "weatherDependency": "No",
        "rules": "Not suitable for guests with uncontrolled respiratory or cardiac conditions without clearance."
    },
    # Walks & Nature
    {
        "id": "estate-nature-walk",
        "name": "Estate Nature Walk",
        "category": "Walks & Nature",
        "schedule": "Daily, 7:30 AM",
        "duration": "60 min",
        "charge": "Complimentary",
        "price": 0,
        "bookingRequired": True,
        "bookingDeadline": "By 9:00 PM previous day",
        "capacity": 18,
        "minimumAge": 6,
        "seasonalAvailability": "All year",
        "weatherDependency": "Light rain permitted; cancelled in storms",
        "rules": "Closed shoes required; children under 12 with adult."
    },
    {
        "id": "birdwatching-trail",
        "name": "Birdwatching Trail",
        "category": "Walks & Nature",
        "schedule": "Tue, Thu, Sat, 6:15 AM",
        "duration": "90 min",
        "charge": "INR 650",
        "price": 650,
        "bookingRequired": True,
        "bookingDeadline": "By 8:00 PM previous day",
        "capacity": 12,
        "minimumAge": 10,
        "seasonalAvailability": "October - May best",
        "weatherDependency": "Cancelled in heavy rain or fog",
        "rules": "Binoculars provided in limited quantity; quiet conduct required."
    },
    {
        "id": "sunset-view-walk",
        "name": "Sunset View Walk",
        "category": "Walks & Nature",
        "schedule": "Daily, 5:00 PM",
        "duration": "60 min",
        "charge": "Complimentary",
        "price": 0,
        "bookingRequired": False,
        "bookingDeadline": "2 hours before (recommended)",
        "capacity": 20,
        "minimumAge": 6,
        "seasonalAvailability": "All year",
        "weatherDependency": "Cancelled in heavy rain",
        "rules": "Stay with guide; uneven pathway in sections."
    },
    {
        "id": "forest-interpretation-walk",
        "name": "Forest Interpretation Walk",
        "category": "Walks & Nature",
        "schedule": "Wed and Sun, 8:30 AM",
        "duration": "120 min",
        "charge": "INR 1,200",
        "price": 1200,
        "bookingRequired": True,
        "bookingDeadline": "By 6:00 PM previous day",
        "capacity": 10,
        "minimumAge": 12,
        "seasonalAvailability": "October - June",
        "weatherDependency": "Cancelled in heavy rain",
        "rules": "Moderate fitness, long trousers and closed shoes required."
    },
    {
        "id": "photography-nature-trail",
        "name": "Photography Nature Trail",
        "category": "Walks & Nature",
        "schedule": "Friday, 7:00 AM",
        "duration": "120 min",
        "charge": "INR 1,500",
        "price": 1500,
        "bookingRequired": True,
        "bookingDeadline": "12 hours before",
        "capacity": 8,
        "minimumAge": 14,
        "seasonalAvailability": "All year",
        "weatherDependency": "Rescheduled in rain",
        "rules": "Guests carry their own camera; guide covers locations and composition."
    },
    # Cycling & Adventure
    {
        "id": "leisure-cycling-loop",
        "name": "Leisure Cycling Loop",
        "category": "Adventure & Sports",
        "schedule": "Daily, 8:30 AM and 4:00 PM",
        "duration": "60 min",
        "charge": "INR 750",
        "price": 750,
        "bookingRequired": True,
        "bookingDeadline": "2 hours before",
        "capacity": 10,
        "minimumAge": 12,
        "seasonalAvailability": "All year",
        "weatherDependency": "Cancelled in heavy rain",
        "rules": "Helmet mandatory; participant must know how to cycle."
    },
    {
        "id": "guided-mountain-cycling",
        "name": "Guided Mountain Cycling",
        "category": "Adventure & Sports",
        "schedule": "Mon, Wed, Sat, 7:00 AM",
        "duration": "150 min",
        "charge": "INR 2,200",
        "price": 2200,
        "bookingRequired": True,
        "bookingDeadline": "By 6:00 PM previous day",
        "capacity": 8,
        "minimumAge": 16,
        "seasonalAvailability": "October - May",
        "weatherDependency": "Cancelled in rain, fog or unsafe trail conditions",
        "rules": "Good fitness required; waiver and briefing mandatory."
    },
    {
        "id": "beginner-archery",
        "name": "Beginner Archery",
        "category": "Adventure & Sports",
        "schedule": "Daily, 10:30 AM and 4:30 PM",
        "duration": "45 min",
        "charge": "INR 650",
        "price": 650,
        "bookingRequired": False,
        "bookingDeadline": "1 hour before (recommended)",
        "capacity": 12,
        "minimumAge": 10,
        "seasonalAvailability": "All year",
        "weatherDependency": "Suspended in heavy rain or strong wind",
        "rules": "Instructor supervision mandatory; closed shoes required."
    },
    {
        "id": "zipline-experience",
        "name": "Zipline Experience",
        "category": "Adventure & Sports",
        "schedule": "Daily, 10:00 AM - 4:00 PM slots",
        "duration": "30 min",
        "charge": "INR 1,200",
        "price": 1200,
        "bookingRequired": True,
        "bookingDeadline": "2 hours before",
        "capacity": 8,
        "minimumAge": 12,
        "seasonalAvailability": "October - June",
        "weatherDependency": "Closed in rain, lightning or high wind",
        "rules": "Weight range 35-100 kg; safety gear and waiver mandatory."
    },
    {
        "id": "high-rope-course",
        "name": "High-Rope Course",
        "category": "Adventure & Sports",
        "schedule": "Tue, Thu, Sat, 11:00 AM",
        "duration": "75 min",
        "charge": "INR 1,600",
        "price": 1600,
        "bookingRequired": True,
        "bookingDeadline": "By 8:00 PM previous day",
        "capacity": 10,
        "minimumAge": 14,
        "seasonalAvailability": "October - June",
        "weatherDependency": "Closed in rain or high wind",
        "rules": "Minimum height 140 cm; safety harness mandatory."
    },
    {
        "id": "climbing-wall",
        "name": "Climbing Wall",
        "category": "Adventure & Sports",
        "schedule": "Daily, 3:00 PM - 5:00 PM slots",
        "duration": "30 min",
        "charge": "INR 700",
        "price": 700,
        "bookingRequired": False,
        "bookingDeadline": "1 hour before (recommended)",
        "capacity": 6,
        "minimumAge": 10,
        "seasonalAvailability": "All year",
        "weatherDependency": "Closed during rain",
        "rules": "Closed shoes required; instructor belay compulsory."
    },
    {
        "id": "sunrise-hill-trek",
        "name": "Sunrise Hill Trek",
        "category": "Adventure & Sports",
        "schedule": "Tue and Sat, 5:30 AM",
        "duration": "240 min",
        "charge": "INR 2,400",
        "price": 2400,
        "bookingRequired": True,
        "bookingDeadline": "By 5:00 PM previous day",
        "capacity": 12,
        "minimumAge": 16,
        "seasonalAvailability": "October - May",
        "weatherDependency": "Cancelled in rain, fog or unsafe trail conditions",
        "rules": "Moderate-high fitness; trekking shoes, water and signed waiver required."
    },
    # Kids
    {
        "id": "arts-and-crafts",
        "name": "Arts and Crafts",
        "category": "Kids' Activities",
        "schedule": "Daily, 11:00 AM",
        "duration": "60 min",
        "charge": "INR 350",
        "price": 350,
        "bookingRequired": True,
        "bookingDeadline": "1 hour before",
        "capacity": 15,
        "minimumAge": 5,
        "maximumAge": 12,
        "seasonalAvailability": "All year",
        "weatherDependency": "No",
        "rules": "Aprons provided; washable materials used."
    },
    {
        "id": "treasure-hunt",
        "name": "Treasure Hunt",
        "category": "Kids' Activities",
        "schedule": "Mon, Wed, Fri, 4:00 PM",
        "duration": "60 min",
        "charge": "Complimentary",
        "price": 0,
        "bookingRequired": True,
        "bookingDeadline": "2 hours before",
        "capacity": 20,
        "minimumAge": 6,
        "maximumAge": 12,
        "seasonalAvailability": "All year",
        "weatherDependency": "Moves indoors in rain",
        "rules": "Closed shoes required outdoors."
    },
    {
        "id": "junior-chef-workshop",
        "name": "Junior Chef Workshop",
        "category": "Kids' Activities",
        "schedule": "Tue and Sat, 3:00 PM",
        "duration": "90 min",
        "charge": "INR 900",
        "price": 900,
        "bookingRequired": True,
        "bookingDeadline": "By 10:00 AM same day",
        "capacity": 12,
        "minimumAge": 7,
        "maximumAge": 12,
        "seasonalAvailability": "All year",
        "weatherDependency": "No",
        "rules": "Allergy information required; closed shoes mandatory."
    },
    {
        "id": "storytelling-circle",
        "name": "Storytelling Circle",
        "category": "Kids' Activities",
        "schedule": "Thu and Sun, 5:00 PM",
        "duration": "45 min",
        "charge": "Complimentary",
        "price": 0,
        "bookingRequired": False,
        "bookingDeadline": "No",
        "capacity": 25,
        "minimumAge": 4,
        "maximumAge": 10,
        "seasonalAvailability": "All year",
        "weatherDependency": "No",
        "rules": "Parent presence recommended for children under 6."
    },
    {
        "id": "kids-movie-night",
        "name": "Kids’ Movie Night",
        "category": "Kids' Activities",
        "schedule": "Friday and Saturday, 7:00 PM",
        "duration": "120 min",
        "charge": "Complimentary",
        "price": 0,
        "bookingRequired": True,
        "bookingDeadline": "5:00 PM same day",
        "capacity": 24,
        "minimumAge": 5,
        "maximumAge": 12,
        "seasonalAvailability": "All year",
        "weatherDependency": "No",
        "rules": "Parent or guardian must remain on property."
    },
    {
        "id": "mini-nature-explorer",
        "name": "Mini Nature Explorer",
        "category": "Kids' Activities",
        "schedule": "Sunday, 9:30 AM",
        "duration": "60 min",
        "charge": "INR 450",
        "price": 450,
        "bookingRequired": True,
        "bookingDeadline": "By 8:00 PM previous day",
        "capacity": 12,
        "minimumAge": 6,
        "maximumAge": 12,
        "seasonalAvailability": "October - June",
        "weatherDependency": "Cancelled in heavy rain",
        "rules": "Closed shoes, hat and water bottle required."
    },
    # Pool
    {
        "id": "family-pool-games",
        "name": "Family Pool Games",
        "category": "Pool Activities",
        "schedule": "Daily, 3:30 PM",
        "duration": "45 min",
        "charge": "Complimentary",
        "price": 0,
        "bookingRequired": False,
        "bookingDeadline": "No",
        "capacity": 20,
        "minimumAge": 6,
        "seasonalAvailability": "March - November",
        "weatherDependency": "Cancelled in rain or unsafe pool conditions",
        "rules": "Children under 12 with adult; swimwear required."
    },
    {
        "id": "aqua-aerobics",
        "name": "Aqua Aerobics",
        "category": "Pool Activities",
        "schedule": "Mon, Wed, Fri, 8:00 AM",
        "duration": "45 min",
        "charge": "INR 700",
        "price": 700,
        "bookingRequired": True,
        "bookingDeadline": "By 7:00 PM previous day",
        "capacity": 16,
        "minimumAge": 16,
        "seasonalAvailability": "March - November",
        "weatherDependency": "Cancelled in rain",
        "rules": "Basic water confidence required."
    },
    {
        "id": "beginner-swimming-lesson",
        "name": "Beginner Swimming Lesson",
        "category": "Pool Activities",
        "schedule": "Daily by appointment",
        "duration": "45 min",
        "charge": "INR 1,200",
        "price": 1200,
        "bookingRequired": True,
        "bookingDeadline": "4 hours before",
        "capacity": 4,
        "minimumAge": 6,
        "seasonalAvailability": "March - November",
        "weatherDependency": "Cancelled in unsafe conditions",
        "rules": "Instructor assessment required; guardian present for children."
    },
    {
        "id": "private-swimming-lesson",
        "name": "Private Swimming Lesson",
        "category": "Pool Activities",
        "schedule": "Daily by appointment",
        "duration": "45 min",
        "charge": "INR 2,000",
        "price": 2000,
        "bookingRequired": True,
        "bookingDeadline": "4 hours before",
        "capacity": 1,
        "minimumAge": 6,
        "seasonalAvailability": "March - November",
        "weatherDependency": "Cancelled in unsafe conditions",
        "rules": "Swimwear and shower required."
    },
    # Entertainment
    {
        "id": "bonfire-evening",
        "name": "Bonfire Evening",
        "category": "Evening Entertainment",
        "schedule": "Daily, 7:30 PM",
        "duration": "90 min",
        "charge": "Complimentary",
        "price": 0,
        "bookingRequired": False,
        "bookingDeadline": "5:00 PM same day (recommended)",
        "capacity": 80,
        "minimumAge": 0,
        "seasonalAvailability": "October - March (selected dates otherwise)",
        "weatherDependency": "Cancelled or moved indoors during rain, strong wind or fire restrictions",
        "rules": "Children supervised; guests must remain behind safety boundary."
    },
    {
        "id": "live-acoustic-music",
        "name": "Live Acoustic Music",
        "category": "Evening Entertainment",
        "schedule": "Wed, Fri, Sat, 8:00 PM",
        "duration": "120 min",
        "charge": "Complimentary",
        "price": 0,
        "bookingRequired": False,
        "bookingDeadline": "No",
        "capacity": 100,
        "minimumAge": 0,
        "seasonalAvailability": "All year",
        "weatherDependency": "Moves indoors in rain",
        "rules": "Seating first-come, first-served."
    },
    {
        "id": "cultural-dance-program",
        "name": "Cultural Dance Program",
        "category": "Evening Entertainment",
        "schedule": "Tuesday and Sunday, 7:30 PM",
        "duration": "60 min",
        "charge": "Complimentary",
        "price": 0,
        "bookingRequired": False,
        "bookingDeadline": "4:00 PM same day (recommended)",
        "capacity": 120,
        "minimumAge": 0,
        "seasonalAvailability": "October - May (reduced schedule off-season)",
        "weatherDependency": "Indoor backup available",
        "rules": "Guests should arrive 10 minutes early."
    },
    {
        "id": "movie-under-the-stars",
        "name": "Movie Under the Stars",
        "category": "Evening Entertainment",
        "schedule": "Thursday, 8:00 PM",
        "duration": "Film length",
        "charge": "Complimentary",
        "price": 0,
        "bookingRequired": False,
        "bookingDeadline": "6:00 PM same day (recommended)",
        "capacity": 60,
        "minimumAge": 0,
        "seasonalAvailability": "October - May",
        "weatherDependency": "Moves indoors in rain",
        "rules": "Blankets provided in limited quantity."
    },
    {
        "id": "stargazing-session",
        "name": "Stargazing Session",
        "category": "Evening Entertainment",
        "schedule": "Monday and Saturday, 9:00 PM",
        "duration": "60 min",
        "charge": "INR 650",
        "price": 650,
        "bookingRequired": True,
        "bookingDeadline": "6:00 PM same day",
        "capacity": 20,
        "minimumAge": 8,
        "seasonalAvailability": "October - April",
        "weatherDependency": "Cancelled with cloud cover, rain or fog",
        "rules": "Warm clothing recommended; low-light discipline required."
    },
    {
        "id": "archery",
        "name": "Archery",
        "category": "Adventure & Sports",
        "schedule": "By appointment (30 min)",
        "duration": "30 min",
        "charge": "INR 500",
        "price": 500,
        "bookingRequired": True,
        "bookingDeadline": "1 hour before",
        "capacity": 2,
        "minimumAge": 10,
        "seasonalAvailability": "All year",
        "weatherDependency": "Weather permitting",
        "rules": "Closed shoes required; instructor supervision mandatory."
    },
    {
        "id": "kayaking",
        "name": "Kayaking",
        "category": "Adventure & Sports",
        "schedule": "By appointment",
        "duration": "Variable",
        "charge": "INR 800",
        "price": 800,
        "bookingRequired": True,
        "bookingDeadline": "4 hours before",
        "capacity": 2,
        "minimumAge": 12,
        "seasonalAvailability": "All year",
        "weatherDependency": "Weather permitting",
        "rules": "Life jacket mandatory; basic swimming ability required."
    }
]

with open(os.path.join(output_dir, "activities.ts"), "w", encoding="utf-8") as f:
    f.write(f"export interface Activity {{\n")
    f.write(f"  id: string;\n")
    f.write(f"  name: string;\n")
    f.write(f"  category: string;\n")
    f.write(f"  schedule: string;\n")
    f.write(f"  duration: string;\n")
    f.write(f"  charge: string;\n")
    f.write(f"  price: number;\n")
    f.write(f"  bookingRequired: boolean;\n")
    f.write(f"  bookingDeadline: string;\n")
    f.write(f"  capacity: number;\n")
    f.write(f"  minimumAge: number;\n")
    f.write(f"  maximumAge?: number;\n")
    f.write(f"  seasonalAvailability: string;\n")
    f.write(f"  weatherDependency: string;\n")
    f.write(f"  rules: string;\n")
    f.write(f"}}\n\n")
    f.write(f"export const activities: Activity[] = {json.dumps(activities_data, indent=2)};\n")

print("Activities data parsed.")

# ----------------- PARSE OFFERS & PACKAGES -----------------
offers_data = [
    {
        "id": "romantic-escape",
        "slug": "romantic-escape",
        "name": "Romantic Escape Package",
        "bookingCode": "ROMANCE26",
        "status": "Active",
        "applicableGuestType": "Couples and honeymoon guests",
        "startDate": "2026-01-01",
        "expiryDate": "2026-12-20",
        "price": "From INR 38,500 for two nights, double occupancy",
        "priceNumeric": 38500,
        "eligibleRooms": ["Valley View Premium Room", "Mountain Panorama Suite", "Honeymoon Pool Villa"],
        "minimumStay": "Two consecutive nights",
        "inclusions": [
            "Accommodation for two guests", "Daily breakfast at Azure Terrace", "Welcome drink and in-room welcome amenities",
            "One romantic room decoration setup", "One candlelight dinner for two at a designated venue",
            "One 60-minute couple massage at Aranya Wellness Spa", "One non-alcoholic sparkling beverage",
            "Complimentary late check-out until 1:00 PM (subject to availability)"
        ],
        "exclusions": [
            "Airport or railway transfers", "Alcoholic beverages", "Premium menu supplements",
            "Additional spa treatments", "Activities not specifically listed", "Room upgrades beyond the booked category"
        ],
        "blackoutDates": ["24 December 2026 to 2 January 2027", "Long-weekend dates notified by the resort", "Private buyout and wedding dates"],
        "cancellationTerms": "Free cancellation until 7 days before arrival; 50% charge for cancellation 3-7 days before arrival; 100% charge for cancellation within 72 hours of arrival or no-show."
    },
    {
        "id": "family-adventure",
        "slug": "family-adventure",
        "name": "Family Adventure Package",
        "bookingCode": "FAMILY26",
        "status": "Active",
        "applicableGuestType": "Families with children",
        "startDate": "2026-01-01",
        "expiryDate": "2026-11-30",
        "price": "From INR 49,000 for three nights for two adults and two children below 12",
        "priceNumeric": 49000,
        "eligibleRooms": ["Family Courtyard Suite", "Grand Two-Bedroom Pool Villa"],
        "minimumStay": "Three consecutive nights",
        "inclusions": [
            "Accommodation for two adults and two children below 12", "Daily breakfast at Azure Terrace",
            "One family dinner at Azure Terrace", "One guided nature walk for the family", "One scheduled family activity session",
            "Complimentary Kids' Club access during operating hours", "One child-friendly snack platter per stay",
            "One family photograph taken by resort staff using the guest's device"
        ],
        "exclusions": ["Professional photography", "Adventure activities requiring specialist equipment", "Babysitting", "Transport", "Additional children or adults", "Paid Kids' Club workshops"],
        "blackoutDates": ["24 December 2026 to 2 January 2027", "Easter weekend", "Diwali holiday period", "Resort-designated peak weekends"],
        "cancellationTerms": "Free cancellation until 10 days before arrival; 50% charge for cancellation 5-10 days before arrival; 100% charge within 5 days of arrival or no-show."
    },
    {
        "id": "wellness-renewal",
        "slug": "wellness-renewal",
        "name": "Wellness Renewal Retreat",
        "bookingCode": "WELLNESS26",
        "status": "Active",
        "applicableGuestType": "Individual travellers and couples aged 18 and above",
        "startDate": "2026-01-15",
        "expiryDate": "2026-12-15",
        "price": "From INR 56,000 for three nights, single occupancy; INR 72,000 for two guests",
        "priceNumeric": 56000,
        "eligibleRooms": ["Garden Deluxe Room", "Valley View Premium Room", "Mountain Panorama Suite"],
        "minimumStay": "Three consecutive nights",
        "inclusions": [
            "Accommodation", "Daily breakfast", "One wellness consultation", "Two 60-minute spa treatments per guest",
            "Daily scheduled yoga session", "Guided meditation session", "One wellness-focused dinner", "Herbal tea service once daily",
            "Complimentary access to steam, sauna and fitness facilities during operating hours"
        ],
        "exclusions": ["Medical treatment or diagnosis", "Prescription medication", "Specialised therapy not listed", "Alcoholic beverages", "Transfers", "Personal training beyond scheduled sessions"],
        "blackoutDates": ["24 December 2026 to 2 January 2027", "Resort wedding and full-buyout dates"],
        "cancellationTerms": "Free cancellation until 14 days before arrival; 50% charge for cancellation 7-14 days before arrival; 100% charge within 7 days of arrival or no-show. Spa appointments missed without notice are treated as consumed."
    },
    {
        "id": "monsoon-hideaway",
        "slug": "monsoon-hideaway",
        "name": "Monsoon Hideaway",
        "bookingCode": "MONSOON26",
        "status": "Active",
        "applicableGuestType": "Couples, families and individual leisure guests",
        "startDate": "2026-06-01",
        "expiryDate": "2026-09-30",
        "price": "From INR 26,500 for two nights, double occupancy",
        "priceNumeric": 26500,
        "eligibleRooms": ["Garden Deluxe Room", "Valley View Premium Room", "Mountain Panorama Suite", "Family Courtyard Suite"],
        "minimumStay": "Two consecutive nights",
        "inclusions": [
            "Accommodation for two guests", "Daily breakfast", "One high-tea service per stay", "One indoor recreational activity session",
            "One 30-minute head or foot massage per adult", "Complimentary room upgrade to the next category when available at check-in",
            "Flexible late check-out until 1:00 PM (subject to availability)"
        ],
        "exclusions": ["Outdoor activities cancelled because of weather", "Transfers", "Additional spa time", "Room-category upgrade guarantee", "Meals other than those listed"],
        "blackoutDates": ["Independence Day weekend", "Ganesh Chaturthi weekend", "Other resort-designated high-demand dates"],
        "cancellationTerms": "Free cancellation until 5 days before arrival; 50% charge for cancellation 2-5 days before arrival; 100% charge within 48 hours of arrival or no-show.",
        "seasonalWarning": "Outdoor activities may be cancelled, shortened or moved indoors because of rain, slippery terrain, wind or local safety advisories. No refund applies when a safe indoor substitute is provided."
    },
    {
        "id": "work-from-hills",
        "slug": "work-from-hills",
        "name": "Work-from-the-Hills Package",
        "bookingCode": "WORKHILLS26",
        "status": "Active",
        "applicableGuestType": "Remote workers, consultants and extended-stay business travellers",
        "startDate": "2026-02-01",
        "expiryDate": "2026-12-20",
        "price": "From INR 78,000 for seven nights, single occupancy",
        "priceNumeric": 78000,
        "eligibleRooms": ["Garden Deluxe Room", "Valley View Premium Room", "Mountain Panorama Suite"],
        "minimumStay": "Seven consecutive nights",
        "inclusions": [
            "Accommodation", "Daily breakfast", "High-speed guest Wi-Fi", "One laundry bundle of up to ten standard garments",
            "Complimentary Business Centre access", "Two hours of Meeting Room use per stay (subject to availability)",
            "Daily tea or coffee service in the room", "Airport transfer discount of 15% when booked with the package"
        ],
        "exclusions": ["Printing and colour-copy charges", "Additional Meeting Room hours", "Food and beverages beyond listed inclusions", "Premium laundry and dry cleaning", "Computer hardware or technical support"],
        "blackoutDates": ["24 December 2026 to 2 January 2027", "Resort full-buyout dates"],
        "cancellationTerms": "Free cancellation until 14 days before arrival; 50% charge for cancellation 7-14 days before arrival; 100% charge within 7 days of arrival or no-show. Early departure is charged for the full confirmed package duration."
    },
    {
        "id": "pool-villa-celebration",
        "slug": "pool-villa-celebration",
        "name": "Pool Villa Celebration Package",
        "bookingCode": "CELEBRATE26",
        "status": "Active",
        "applicableGuestType": "Birthday, anniversary and private celebration guests",
        "startDate": "2026-01-01",
        "expiryDate": "2026-12-20",
        "price": "From INR 68,000 for two nights, double occupancy",
        "priceNumeric": 68000,
        "eligibleRooms": ["Honeymoon Pool Villa", "Grand Two-Bedroom Pool Villa"],
        "minimumStay": "Two consecutive nights",
        "inclusions": [
            "Pool villa accommodation", "Daily breakfast", "Celebration room decoration", "One celebration cake up to 1 kg",
            "One private dinner setup for two guests", "One floating breakfast (subject to weather and safety conditions)",
            "One 60-minute spa treatment per adult", "Complimentary non-alcoholic welcome beverage"
        ],
        "exclusions": ["Professional photography or videography", "Floral designs beyond the standard setup", "Alcoholic beverages", "Entertainment performers", "Fireworks", "Additional event guests"],
        "blackoutDates": ["24 December 2026 to 2 January 2027", "Wedding buyout dates", "Public-holiday weekends subject to management restriction"],
        "cancellationTerms": "Free cancellation until 14 days before arrival; 50% charge for cancellation 7-14 days before arrival; 100% charge within 7 days of arrival or no-show. Custom decoration costs may become non-refundable once materials are ordered."
    },
    {
        "id": "stay-more-save-more",
        "slug": "stay-more-save-more",
        "name": "Sunday-to-Thursday Stay More, Save More",
        "bookingCode": "MIDWEEK26",
        "status": "Active",
        "applicableGuestType": "All leisure guests",
        "startDate": "2026-01-05",
        "expiryDate": "2026-12-17",
        "price": "20% discount on the prevailing flexible room rate",
        "priceNumeric": 0,
        "eligibleRooms": ["All room and villa categories except categories blocked for maintenance or private events"],
        "minimumStay": "Three consecutive nights, with all nights falling between Sunday and Thursday",
        "inclusions": ["Accommodation", "Daily breakfast", "Standard complimentary resort amenities"],
        "exclusions": ["Friday and Saturday nights", "Transfers", "Spa treatments", "Paid activities", "Food and beverage beyond breakfast"],
        "blackoutDates": ["All public-holiday periods", "24 December 2026 to 2 January 2027", "Resort-designated peak dates"],
        "cancellationTerms": "Free cancellation until 7 days before arrival; 100% charge within 7 days of arrival or no-show. Offer is not valid for shortened stays below three nights."
    },
    {
        "id": "advance-purchase",
        "slug": "advance-purchase",
        "name": "Advance Purchase Offer",
        "bookingCode": "ADVANCE45",
        "status": "Active",
        "applicableGuestType": "All guests booking sufficiently in advance",
        "startDate": "2026-01-01",
        "expiryDate": "2026-12-31",
        "price": "15% discount on the applicable room-only or breakfast-inclusive rate",
        "priceNumeric": 0,
        "eligibleRooms": ["All publicly available room and villa categories"],
        "minimumStay": "One night",
        "bookingRequirement": "Reservation must be confirmed at least 45 days before arrival",
        "inclusions": ["Accommodation according to selected rate plan", "Benefits stated in the selected rate plan"],
        "exclusions": ["Package benefits not listed in the selected rate plan", "Transfers", "Spa and activities"],
        "blackoutDates": ["May be restricted on 24 December to 2 January and other high-demand periods"],
        "cancellationTerms": "Full payment is required at booking. Reservation is non-refundable and non-amendable. No refund applies for cancellation, date change, early departure or no-show."
    },
    {
        "id": "airport-arrival",
        "slug": "airport-arrival",
        "name": "Airport Arrival Package",
        "bookingCode": "ARRIVE26",
        "status": "Active",
        "applicableGuestType": "Domestic and international guests arriving through Bengaluru Airport",
        "startDate": "2026-01-01",
        "expiryDate": "2026-12-20",
        "price": "From INR 42,000 for two nights, double occupancy",
        "priceNumeric": 42000,
        "eligibleRooms": ["Garden Deluxe Room", "Valley View Premium Room", "Mountain Panorama Suite", "Family Courtyard Suite"],
        "minimumStay": "Two consecutive nights",
        "inclusions": [
            "Accommodation for two guests", "Daily breakfast", "One-way Bengaluru Airport transfer in a Premium Sedan",
            "Welcome refreshments during the road journey", "Standard toll and parking charges",
            "Flight-delay monitoring when a correct flight number is supplied"
        ],
        "exclusions": ["Return airport transfer", "Night transfer surcharge for pickups between 11:00 PM and 5:00 AM", "Additional vehicle required for excessive luggage", "Luxury vehicle upgrade", "Waiting charges beyond the included allowance"],
        "blackoutDates": ["24 December 2026 to 2 January 2027", "Dates when contracted transport capacity is unavailable"],
        "cancellationTerms": "Free cancellation until 7 days before arrival; 50% charge for cancellation 3-7 days before arrival; 100% charge within 72 hours of arrival or no-show. Transport cancellation terms apply once the driver has been dispatched."
    },
    {
        "id": "group-retreat",
        "slug": "group-retreat",
        "name": "Group Retreat Package",
        "bookingCode": "GROUP10",
        "status": "Active by quotation",
        "applicableGuestType": "Family groups, leisure groups and small corporate retreats",
        "startDate": "2026-01-01",
        "expiryDate": "2026-12-20",
        "price": "Custom quotation; indicative rates begin at INR 3,25,000 for ten rooms for two nights",
        "priceNumeric": 325000,
        "eligibleRooms": ["Mixed room inventory subject to availability. Pool villas are quoted separately."],
        "minimumStay": "Two nights and a minimum booking of ten rooms per night",
        "inclusions": ["Accommodation as quoted", "Daily breakfast", "One group dinner", "One meeting or activity space for up to two hours", "One scheduled group activity", "Dedicated group coordinator"],
        "exclusions": ["Exclusive resort buyout", "Audio-visual equipment beyond standard setup", "Alcoholic beverages", "Custom entertainment", "Decorations", "Transfers unless quoted"],
        "blackoutDates": ["Christmas and New Year period", "Major public-holiday weekends", "Existing wedding or buyout dates"],
        "cancellationTerms": "25% deposit at confirmation; further 50% due 30 days before arrival; balance due 14 days before arrival. Deposit is non-refundable within 45 days of arrival; 100% charge applies within 14 days or for no-show."
    }
]

with open(os.path.join(output_dir, "offers.ts"), "w", encoding="utf-8") as f:
    f.write(f"export interface Offer {{\n")
    f.write(f"  id: string;\n")
    f.write(f"  slug: string;\n")
    f.write(f"  name: string;\n")
    f.write(f"  bookingCode: string;\n")
    f.write(f"  status: string;\n")
    f.write(f"  applicableGuestType: string;\n")
    f.write(f"  startDate: string;\n")
    f.write(f"  expiryDate: string;\n")
    f.write(f"  price: string;\n")
    f.write(f"  priceNumeric: number;\n")
    f.write(f"  eligibleRooms: string[];\n")
    f.write(f"  minimumStay: string;\n")
    f.write(f"  inclusions: string[];\n")
    f.write(f"  exclusions: string[];\n")
    f.write(f"  blackoutDates: string[];\n")
    f.write(f"  cancellationTerms: string;\n")
    f.write(f"  seasonalWarning?: string;\n")
    f.write(f"  bookingRequirement?: string;\n")
    f.write(f"}}\n\n")
    f.write(f"export const offers: Offer[] = {json.dumps(offers_data, indent=2)};\n")

print("Offers and Packages parsed.")

# ----------------- PARSE EVENTS & VENUES DATA -----------------
events_data = {
    "venues": [
        {
            "id": "grand-orchid-ballroom",
            "name": "Grand Orchid Ballroom",
            "dimensions": "30m × 20m",
            "capacities": {
                "Theatre": 500,
                "Banquet": 320,
                "Classroom": 220,
                "UShape": 160
            },
            "pricing": "From INR 2,50,000 per day",
            "description": "Our premier indoor venue featuring elegant chandeliers, high ceilings, and expansive floor space. Perfect for large weddings, grand banquets, and corporate conferences.",
            "sourceIds": ["SRC-010", "SRC-015"]
        },
        {
            "id": "valley-lawn",
            "name": "Valley Lawn",
            "dimensions": "70m × 45m",
            "capacities": {
                "Receptions / Recreative Events": 800
            },
            "pricing": "By quotation",
            "description": "A magnificent outdoor lawn with panoramic valley views, suitable for destination weddings, cocktail receptions, and evening celebrations under the stars.",
            "sourceIds": ["SRC-010"]
        },
        {
            "id": "cedar-conference-hall",
            "name": "Cedar Conference Hall",
            "dimensions": "18m × 12m",
            "capacities": {
                "Theatre / Conferences": 120
            },
            "pricing": "By quotation",
            "description": "An air-conditioned hall equipped with modern audio-visual technology, suitable for conferences, seminars, workshops, and mid-sized corporate presentations.",
            "sourceIds": ["SRC-010"]
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
            "sourceIds": ["SRC-006", "SRC-010"]
        }
    ],
    "weddingPackages": [
        {
            "name": "Silver Celebration Package",
            "price": "From INR 4,500 per person",
            "inclusions": ["Standard event venue rental", "Selected multi-cuisine buffet menu", "Basic venue decoration", "Banquet service staff", "Basic audio setup"]
        },
        {
            "name": "Gold Signature Package",
            "price": "From INR 6,500 per person",
            "inclusions": ["Premium event venue rental", "Expanded multi-cuisine buffet menu", "Premium floral and stage decoration", "Dedicated event coordinator", "Professional audio-visual setup"]
        },
        {
            "name": "Platinum Destination Wedding Package",
            "price": "From INR 9,500 per person",
            "inclusions": ["Exclusive venue access", "Gourmet custom menu selections & live counters", "Extensive theme-based luxury decoration", "Complete audio-visual & stage lighting package", "Welcome drinks and wedding cake", "Complimentary suite stay for the couple"]
        }
    ],
    "corporatePackages": [
        {
            "name": "Half-Day Meeting Package",
            "price": "From INR 3,200 per person",
            "inclusions": ["Meeting room rental (up to 4 hours)", "Audio-visual essentials", "One high-tea / coffee break", "Working lunch buffet"]
        },
        {
            "name": "Full-Day Conference Package",
            "price": "From INR 4,800 per person",
            "inclusions": ["Conference hall rental (up to 8 hours)", "Full audio-visual setup", "Two tea / coffee breaks with snacks", "Gourmet lunch buffet"]
        },
        {
            "name": "Residential Conference Package",
            "price": "From INR 12,500 per person, per night",
            "inclusions": ["Room stay on sharing basis", "Conference hall rental & all-day AV", "All meals (breakfast, lunch, dinner, tea breaks)", "Complimentary group recreational activity session"]
        }
    ],
    "policies": {
        "decor": "Only approved decorators or authorised external vendors are allowed. Open flames are prohibited except for approved ceremonial arrangements (like mandap fire). No permanent fixtures may be attached to walls or ceilings.",
        "music": "Indoor amplified music is permitted until 10:30 PM. Outdoor music must comply with local regulations, and sound levels are monitored closely by the events team.",
        "alcohol": "Service of alcoholic beverages is permitted only through licensed resort bars. Outside alcohol is strictly prohibited unless specifically approved in writing.",
        "vendors": "External vendors require prior approval, insurance where applicable, and scheduled access setup times.",
        "parking": "Complimentary parking is available for all event guests. Valet service is available for major events. Coach parking can be arranged with prior notice."
    }
}

with open(os.path.join(output_dir, "events.ts"), "w", encoding="utf-8") as f:
    f.write(f"export interface EventVenue {{\n")
    f.write(f"  id: string;\n")
    f.write(f"  name: string;\n")
    f.write(f"  dimensions: string;\n")
    f.write(f"  capacities: Record<string, number>;\n")
    f.write(f"  pricing: string;\n")
    f.write(f"  description: string;\n")
    f.write(f"  sourceIds: string[];\n")
    f.write(f"}}\n\n")
    f.write(f"export const eventData = {json.dumps(events_data, indent=2)};\n")

print("Events data parsed.")

# ----------------- PARSE TRANSFERS DATA -----------------
transfers_data = {
    "nearestAirport": {
        "name": "Kempegowda International Airport, Bengaluru (BLR)",
        "distance": "190 km",
        "travelTime": "4 hours 15 minutes to 5 hours 30 minutes (varies with traffic, route, weather and stops)"
    },
    "vehicles": [
        {
            "code": "SED-01",
            "name": "Premium Sedan",
            "maxGuests": 3,
            "luggage": "2 large + 2 cabin bags",
            "oneWay": 8500,
            "roundTrip": 16000,
            "nightCharge": 1000
        },
        {
            "code": "SUV-01",
            "name": "Premium SUV",
            "maxGuests": 5,
            "luggage": "4 large + 3 cabin bags",
            "oneWay": 11500,
            "roundTrip": 21500,
            "nightCharge": 1250
        },
        {
            "code": "MUV-01",
            "name": "Luxury MUV",
            "maxGuests": 6,
            "luggage": "5 large + 4 cabin bags",
            "oneWay": 13500,
            "roundTrip": 25000,
            "nightCharge": 1500
        },
        {
            "code": "VAN-01",
            "name": "Tempo Traveller",
            "maxGuests": 12,
            "luggage": "10 large + 8 cabin bags",
            "oneWay": 21000,
            "roundTrip": 39000,
            "nightCharge": 2500
        },
        {
            "code": "LUX-01",
            "name": "Luxury Sedan",
            "maxGuests": 3,
            "luggage": "2 large + 2 cabin bags",
            "oneWay": 22000,
            "roundTrip": 41000,
            "nightCharge": 3000
        },
        {
            "code": "LUX-02",
            "name": "Luxury SUV",
            "maxGuests": 4,
            "luggage": "4 large + 2 cabin bags",
            "oneWay": 29000,
            "roundTrip": 54000,
            "nightCharge": 4000
        }
    ],
    "railwayTransfers": {
        "station": "Mysuru Junction Railway Station (MYS)",
        "distance": "95 km",
        "travelTime": "2 hours 15 minutes to 3 hours",
        "rates": {
            "Premium Sedan": {"oneWay": 5500},
            "Premium SUV": {"oneWay": 7500},
            "Luxury MUV": {"oneWay": 8500},
            "Tempo Traveller": {"oneWay": 13500}
        },
        "nightChargeNote": "Surcharge of INR 750-1,500 applies depending on vehicle category"
    },
    "busTransfers": {
        "station": "Mysuru Suburban Bus Station",
        "distance": "93 km",
        "travelTime": "2 hours 15 minutes to 3 hours",
        "rates": {
            "Premium Sedan": {"oneWay": 5300},
            "Premium SUV": {"oneWay": 7300},
            "Luxury MUV": {"oneWay": 8300},
            "Tempo Traveller": {"oneWay": 13200}
        }
    },
    "localSightseeing": {
        "rates": [
            {"vehicle": "Sedan", "package": "4 hours / 40 km", "price": 3200, "extraKm": 24},
            {"vehicle": "Sedan", "package": "8 hours / 80 km", "price": 5500, "extraKm": 24},
            {"vehicle": "SUV", "package": "4 hours / 40 km", "price": 4200, "extraKm": 31},
            {"vehicle": "SUV", "package": "8 hours / 80 km", "price": 7200, "extraKm": 31}
        ]
    },
    "helicopterTransfer": {
        "price": "From INR 3,50,000 one way",
        "capacity": "Up to 5 guests",
        "bookingDeadline": "Minimum 72 hours; 7 days recommended",
        "details": "Charter helicopter transfers are available from Bengaluru subject to daylight, weather, aviation approvals, and landing clearance. Baggage limit is typically 10-15 kg per guest depending on the aircraft."
    },
    "policies": {
        "nightPeriod": "Pickup or drop scheduled between 11:00 PM and 5:00 AM.",
        "cancellation": {
            "standard": "Free cancellation 24+ hours before; 50% charge 12-24 hours before; 100% within 12 hours.",
            "luxuryAndGroup": "Free cancellation 48+ hours before; 50% charge 24-48 hours (luxury only); 100% within 24 hours."
        },
        "waitingCharges": "First 60 mins (domestic flight) or 90 mins (international flight) are complimentary. Further waiting charged at INR 600/hr (sedan/SUV/MUV), INR 900/hr (van), and INR 1,500/hr (luxury vehicles).",
        "inclusions": "One-way fare includes vehicle, driver, fuel, tolls, and airport parking for the standard pickup window.",
        "exclusions": "Luggage beyond vehicle capacity, night transfers surcharge, child seats (INR 750/seat), and retention during stay."
    }
}

with open(os.path.join(output_dir, "transfers.ts"), "w", encoding="utf-8") as f:
    f.write(f"export const transferData = {json.dumps(transfers_data, indent=2)};\n")

print("Transfers data parsed.")

# ----------------- PARSE ATTRACTIONS DATA -----------------
attractions_data = [
    {
        "id": "br-hills",
        "name": "Biligiriranga Hills and BRT Landscape",
        "distance": "18 km",
        "travelTime": "35-45 minutes",
        "description": "Scenic mountain and forest landscape known for forest drives, viewpoints, wildlife habitats, and indigenous Soliga cultural heritage.",
        "entryFee": "No general entry fee; forest activities and guided tours are chargeable",
        "bestTime": "October - March (cool conditions) or July - September (monsoon lushness)",
        "dressCode": "Comfortable clothes and closed walking shoes",
        "warning": "Monsoon brings rain, fog, and leeches. Temporary forest restrictions may apply.",
        "coordinates": "BR Hills, Karnataka",
        "accessibility": "Limited; viewpoints involve uneven stairs and paths."
    },
    {
        "id": "br-temple",
        "name": "Biligiri Ranganatha Swamy Temple",
        "distance": "21 km",
        "travelTime": "40-50 minutes",
        "description": "Historic hilltop temple dedicated to Lord Ranganatha, offering spectacular vistas of the surrounding BRT wildlife sanctuary.",
        "entryFee": "Free (donations are optional)",
        "bestTime": "October - March (early morning preferred)",
        "dressCode": "Modest clothing required; footwear must be removed before entering",
        "warning": "Festival days bring massive crowds; road access might be regulated.",
        "coordinates": "BRT Temple Hilltop",
        "accessibility": "Hilltop steps make it challenging for guests with limited mobility."
    },
    {
        "id": "k-gudi-forest",
        "name": "K. Gudi Forest Area",
        "distance": "28 km",
        "travelTime": "50-60 minutes",
        "description": "Recognised forest-junction and wildlife zone, famous for safari experiences, birdlife, and guided jungle trails controlled by forest authorities.",
        "entryFee": "Based on forest activity and vehicle type",
        "bestTime": "October - May (mornings and late afternoons)",
        "dressCode": "Neutral-colored clothing and closed shoes",
        "warning": "Subject to cancellations due to fire risk, heavy rain, or wildlife movement.",
        "coordinates": "K. Gudi Junction",
        "accessibility": "Very limited; high vehicle steps and forest terrain."
    },
    {
        "id": "shivanasamudra-falls",
        "name": "Shivanasamudra Falls",
        "distance": "58 km",
        "travelTime": "1 hour 25 mins to 1 hour 45 mins",
        "description": "A magnificent twin waterfall system (Gaganachukki and Bharachukki) formed by the River Kaveri plunging down rocky cliffs.",
        "entryFee": "Viewpoints are free; parking charges apply",
        "bestTime": "July - October (monsoon/post-monsoon for high flow)",
        "dressCode": "Comfortable walking shoes with good grip",
        "warning": "Wet rocks are slippery and extremely dangerous. Swimming is strictly prohibited.",
        "coordinates": "Shivanasamudra, Karnataka",
        "accessibility": "Main viewpoints have paved paths, but stairs are common."
    },
    {
        "id": "talakadu",
        "name": "Talakadu",
        "distance": "70 km",
        "travelTime": "1 hour 40 mins to 2 hours",
        "description": "A historic temple town buried under sand dunes on the banks of the River Kaveri, featuring excavated stone temples.",
        "entryFee": "Free entry; local parking fees apply",
        "bestTime": "October - March (avoid hot midday hours)",
        "dressCode": "Comfortable walking wear",
        "warning": "Riverbanks can have strong currents; river access is regulated during monsoons.",
        "coordinates": "Talakadu, Karnataka",
        "accessibility": "Deep sandy pathways make wheelchair navigation difficult."
    },
    {
        "id": "mysuru-palace",
        "name": "Mysuru Palace",
        "distance": "95 km",
        "travelTime": "2 hours 15 mins to 3 hours",
        "description": "The grand royal palace of the Wodeyar dynasty, boasting spectacular Indo-Saracenic architecture, domes, and weekend light illuminations.",
        "entryFee": "Indian Adults: ~INR 70, Foreigners: ~INR 200 (approximate)",
        "bestTime": "October - February (Sunday/holiday evenings for illumination)",
        "dressCode": "Modest attire",
        "warning": "Photography is restricted inside the palace museum sections.",
        "coordinates": "Mysuru Palace, Mysuru",
        "accessibility": "Paved flat paths, but museum sections contain steps."
    }
]

itineraries = [
    {
        "title": "Half-Day: Biligiriranga Hills Experience",
        "duration": "5 hours",
        "bestFor": "Couples, families, and first-time visitors",
        "timeline": [
            {"time": "6:30 AM", "action": "Depart RKPR Resort"},
            {"time": "7:15 AM", "action": "Scenic BR Hills drive and viewpoint stops"},
            {"time": "8:15 AM", "action": "Visit Biligiri Ranganatha Swamy Temple"},
            {"time": "9:30 AM", "action": "Local tea break or short nature walk"},
            {"time": "11:30 AM", "action": "Return to the resort"}
        ],
        "mobilityNote": "Temple steps and uneven forest viewpoints can be challenging."
    },
    {
        "title": "Full-Day: Waterfalls and Temple Town",
        "duration": "10.5 hours",
        "bestFor": "Scenic touring, nature lovers, and cultural sightseeing",
        "timeline": [
            {"time": "7:30 AM", "action": "Depart RKPR Resort"},
            {"time": "9:00 AM", "action": "Explore Shivanasamudra Falls viewpoints"},
            {"time": "11:30 AM", "action": "Drive to historic Talakadu"},
            {"time": "12:30 PM", "action": "Lunch at pre-approved restaurant or packed resort lunch"},
            {"time": "1:30 PM", "action": "Explore sand-covered temples and Kaveri riverfront"},
            {"time": "4:00 PM", "action": "Begin return journey"},
            {"time": "6:00 PM", "action": "Arrive back at resort"}
        ],
        "mobilityNote": "Sandy paths and slippery rocks require careful walking."
    }
]

with open(os.path.join(output_dir, "attractions.ts"), "w", encoding="utf-8") as f:
    f.write(f"export interface Attraction {{\n")
    f.write(f"  id: string;\n")
    f.write(f"  name: string;\n")
    f.write(f"  distance: string;\n")
    f.write(f"  travelTime: string;\n")
    f.write(f"  description: string;\n")
    f.write(f"  entryFee: string;\n")
    f.write(f"  bestTime: string;\n")
    f.write(f"  dressCode: string;\n")
    f.write(f"  warning: string;\n")
    f.write(f"  coordinates: string;\n")
    f.write(f"  accessibility: string;\n")
    f.write(f"}}\n\n")
    f.write(f"export const attractions: Attraction[] = {json.dumps(attractions_data, indent=2)};\n")
    f.write(f"export const travelItineraries = {json.dumps(itineraries, indent=2)};\n")

print("Attractions data parsed.")

# ----------------- PARSE POLICIES & PAYMENTS DATA -----------------
policies_data = {
    "checkInTime": "2:00 PM",
    "checkOutTime": "11:00 AM",
    "earlyCheckIn": "Subject to availability. Additional charges apply for arrivals before 10:00 AM.",
    "lateCheckOut": "Subject to availability. Additional charges apply.",
    "childBands": "Infant: 0-5 years (complimentary in existing bedding); Child: 6-11 years (rollaway at applicable charge); Adult: 12 years and above.",
    "pets": "Pets are strictly not permitted, except certified service animals (requires advance documentation).",
    "smoking": "Indoor guest rooms, villas, balconies, patios, and decks are completely non-smoking. Designated outdoor smoking areas are available.",
    "visitors": "Visitors must register with valid government-issued photo ID at the Front Office and follow resort guest visitor rules.",
    "parking": "Complimentary self-parking and valet parking are available for registered resident guests."
}

payments_data = {
    "acceptedMethods": [
        {"name": "UPI", "condition": "Online and at resort, immediate verification"},
        {"name": "Credit Card", "condition": "Visa, Mastercard, RuPay, and selected international cards"},
        {"name": "Debit Card", "condition": "Online and at resort, bank limits apply"},
        {"name": "Net Banking", "condition": "Major Indian banks supported"},
        {"name": "Secure Payment Link", "condition": "Issued only through official resort channels"},
        {"name": "Bank Transfer", "condition": "Requires manual verification, booking reference mandatory"},
        {"name": "Cash", "condition": "At resort only, subject to legal limits"}
    ],
    "advanceRequirements": {
        "standard": "A 30% advance is required to confirm. The balance is payable before or during check-in. Payment links expire in 6 hours.",
        "peakSeason": "100% advance is required for bookings between 20 December and 5 January, public holidays, festival weekends, and long weekends.",
        "groupAndEvents": "Initial booking deposit, milestone payments, and final settlement before event/arrival as per contract."
    },
    "securityDeposit": "Selected premium villas require a refundable security deposit of INR 5,000 at check-in. Group and event bookings may require higher deposits. Refunds are processed within 7 business days post-inspection.",
    "disclaimer": "RKPR Resort will never request an OTP, CVV, Card PIN, UPI PIN, or banking passwords through email, phone, SMS, or WhatsApp. Booking confirmations require verified payment status; screenshots are not accepted as proof.",
    "refundPolicy": "Approved refunds are processed within 7-10 business days and returned to the original payment method only."
}

with open(os.path.join(output_dir, "policies.ts"), "w", encoding="utf-8") as f:
    f.write(f"export const guestPolicies = {json.dumps(policies_data, indent=2)};\n")

with open(os.path.join(output_dir, "payments.ts"), "w", encoding="utf-8") as f:
    f.write(f"export const paymentRules = {json.dumps(payments_data, indent=2)};\n")

print("Policies and Payments parsed.")

# ----------------- PARSE TIMINGS DIRECTORY -----------------
timings_directory = [
    {"department": "Front Office", "opening": "24 hours", "closing": "24 hours", "notes": "Extension 100"},
    {"department": "Concierge", "opening": "24 hours", "closing": "24 hours", "notes": "Extension 101"},
    {"department": "Reservations", "opening": "8:00 AM", "closing": "8:00 PM", "notes": "Extension 102. Extended to 10 PM in peak periods"},
    {"department": "Transport Desk", "opening": "24 hours", "closing": "24 hours", "notes": "Extension 460. Pre-booking required"},
    {"department": "EV Charging", "opening": "24 hours", "closing": "24 hours", "notes": "Extension 440. Subject to power"},
    {"department": "Medical Assistance", "opening": "24 hours", "closing": "24 hours", "notes": "Extension 430. First aid room beside lobby"},
    {"department": "Azure Terrace - Breakfast", "opening": "7:00 AM", "closing": "10:30 AM", "notes": "Last entry 10:15 AM"},
    {"department": "Azure Terrace - Lunch", "opening": "12:30 PM", "closing": "3:30 PM", "notes": "Last order 3:15 PM"},
    {"department": "Azure Terrace - Dinner", "opening": "7:00 PM", "closing": "10:30 PM", "notes": "Last order 10:15 PM"},
    {"department": "Ember & Spice (Dinner)", "opening": "7:00 PM", "closing": "11:00 PM", "notes": "Last order 10:30 PM. Closed on Mondays"},
    {"department": "The Cedar Lounge", "opening": "8:00 AM", "closing": "11:00 PM", "notes": "High Tea served 3:00 PM - 6:00 PM"},
    {"department": "Summit Bar", "opening": "4:00 PM", "closing": "11:30 PM", "notes": "Drinks last order 11:15 PM, Food 10:45 PM"},
    {"department": "Aranya Wellness Spa", "opening": "9:00 AM (Weekdays)", "closing": "9:00 PM (Weekdays)", "notes": "Weekends: 8:00 AM - 10:00 PM. Last treatment starts 75-90 mins before closing."},
    {"department": "Fitness Centre", "opening": "6:00 AM", "closing": "10:00 PM", "notes": "For guests aged 16 and above"},
    {"department": "Infinity Swimming Pool", "opening": "7:00 AM", "closing": "9:00 PM", "notes": "Last entry 8:45 PM. Swimwear required"},
    {"department": "Children's Pool", "opening": "7:00 AM", "closing": "7:00 PM", "notes": "Supervised by adults only"},
    {"department": "Kids' Club", "opening": "9:00 AM", "closing": "7:00 PM", "notes": "Last entry 6:30 PM. For ages 4-12."},
    {"department": "Indoor Games Room", "opening": "9:00 AM", "closing": "10:00 PM", "notes": "Pool, table tennis, board games"},
    {"department": "Business Centre", "opening": "8:00 AM", "closing": "10:00 PM", "notes": "Computers, printer and internet"}
]

with open(os.path.join(output_dir, "navigation.ts"), "w", encoding="utf-8") as f:
    f.write(f"export const mainNavigation = [\n")
    f.write(f"  {{ name: 'Home', href: '/' }},\n")
    f.write(f"  {{ name: 'Stay', href: '/stay' }},\n")
    f.write(f"  {{ name: 'Dining', href: '/dining' }},\n")
    f.write(f"  {{ name: 'Spa & Wellness', href: '/spa-wellness' }},\n")
    f.write(f"  {{ name: 'Experiences', href: '/experiences' }},\n")
    f.write(f"  {{ name: 'Amenities', href: '/amenities' }},\n")
    f.write(f"  {{ name: 'Offers', href: '/offers' }},\n")
    f.write(f"  {{ name: 'Events', href: '/events' }},\n")
    f.write(f"  {{ name: 'Transfers', href: '/transfers' }},\n")
    f.write(f"  {{ name: 'Location', href: '/location' }},\n")
    f.write(f"  {{ name: 'Contact', href: '/contact' }}\n")
    f.write(f"];\n")

with open(os.path.join(output_dir, "directory.ts"), "w", encoding="utf-8") as f:
    f.write(f"export interface DirectoryEntry {{\n")
    f.write(f"  department: string;\n")
    f.write(f"  opening: string;\n")
    f.write(f"  closing: string;\n")
    f.write(f"  notes: string;\n")
    f.write(f"}}\n\n")
    f.write(f"export const resortDirectory: DirectoryEntry[] = {json.dumps(timings_directory, indent=2)};\n")

print("Timings directory and Navigation compiled.")

# ----------------- PARSE FAQ DATA -----------------
faq_items = []
faq_file_path = os.path.join(extracted_root, "01_GUEST_KNOWLEDGE", "Policies_Directory", "Resort_FAQ.txt")
if os.path.exists(faq_file_path):
    with open(faq_file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Simple regex parsing for Q: A: pairs
    qa_pairs = re.findall(r"Q:\s*(.*?)\s*A:\s*(.*?)(?=\n+Q:|$)", content, re.DOTALL)
    for q, a in qa_pairs:
        q_cleaned = q.strip().replace("\n", " ")
        a_cleaned = a.strip().replace("\n", " ")
        
        category = "General"
        q_lower = q_cleaned.lower()
        if "room" in q_lower or "stay" in q_lower or "villa" in q_lower or "check-in" in q_lower or "check-out" in q_lower:
            category = "Rooms & Bookings"
        elif "eat" in q_lower or "food" in q_lower or "dining" in q_lower or "restaurant" in q_lower or "breakfast" in q_lower or "menu" in q_lower:
            category = "Dining"
        elif "spa" in q_lower or "massage" in q_lower or "treatment" in q_lower:
            category = "Spa & Wellness"
        elif "activity" in q_lower or "activities" in q_lower or "walk" in q_lower or "yoga" in q_lower or "bonfire" in q_lower:
            category = "Activities"
        elif "airport" in q_lower or "transfer" in q_lower or "vehicle" in q_lower or "flight" in q_lower:
            category = "Transport"
        elif "pay" in q_lower or "deposit" in q_lower or "billing" in q_lower or "refund" in q_lower:
            category = "Payments & Billing"
        elif "wheelchair" in q_lower or "accessible" in q_lower or "accessibility" in q_lower:
            category = "Accessibility"
        elif "kids" in q_lower or "child" in q_lower or "pet" in q_lower or "visitor" in q_lower or "smoke" in q_lower:
            category = "Policies"
        
        faq_items.append({
            "question": q_cleaned,
            "answer": a_cleaned,
            "category": category
        })

with open(os.path.join(output_dir, "faq.ts"), "w", encoding="utf-8") as f:
    f.write(f"export interface FAQItem {{\n")
    f.write(f"  question: string;\n")
    f.write(f"  answer: string;\n")
    f.write(f"  category: string;\n")
    f.write(f"}}\n\n")
    f.write(f"export const faqItems: FAQItem[] = {json.dumps(faq_items, indent=2)};\n")

print(f"FAQ parsed: {len(faq_items)} items.")

# ----------------- PARSE OFFICIAL CONTACT & RESORT DETAILS -----------------
resort_details = {
    "name": "RKPR Resort",
    "address": "Survey No. 48/2, K. Gudi Road, near Biligiriranga Hills, Yelandur Taluk, Chamarajanagar District, Karnataka 571441, India",
    "coordinates": {"lat": 11.9896, "lng": 77.1428},
    "phone": "+91 98765 43210",
    "email": "reservations@rkprresort.com",
    "website": "www.rkprresort.com",
    "emergencyLine": "+91 90080 24000",
    "transportDesk": "+91 90080 24024"
}

with open(os.path.join(output_dir, "contact.ts"), "w", encoding="utf-8") as f:
    f.write(f"export const resortDetails = {json.dumps(resort_details, indent=2)};\n")

print("Contact and Resort details written.")
print("ALL RAG PARSING COMPLETE!")
