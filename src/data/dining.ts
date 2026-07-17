export interface DiningOutlet {
  id: string;
  slug: string;
  name: string;
  description: string;
  mealPeriods: { name: string; timing: string; lastOrder: string }[];
  cuisine: string;
  dressCode: string;
  reservationRequired: boolean;
  dietaryNotes: string;
  roomService: string;
  images: string[];
}

export const diningOutlets: DiningOutlet[] = [
  {
    "id": "azure-terrace",
    "slug": "azure-terrace",
    "name": "Azure Terrace",
    "description": "Azure Terrace is our all-day dining restaurant, offering a spacious setting with indoor and terrace seating. Guests can enjoy a rich selection of Indian, Asian, and international cuisine, along with a comprehensive breakfast buffet and a la carte options.",
    "mealPeriods": [
      {
        "name": "Breakfast",
        "timing": "7:00 AM - 10:30 AM",
        "lastOrder": "10:15 AM"
      },
      {
        "name": "Lunch",
        "timing": "12:30 PM - 3:30 PM",
        "lastOrder": "3:15 PM"
      },
      {
        "name": "Dinner",
        "timing": "7:00 PM - 10:30 PM",
        "lastOrder": "10:15 PM"
      }
    ],
    "cuisine": "Indian, Asian and International",
    "dressCode": "Smart Casual",
    "reservationRequired": false,
    "dietaryNotes": "Vegetarian, Vegan, Jain, and Gluten-free options are available. Dedicated Kids' Menu is available.",
    "roomService": "Available 24 hours (Midnight menu operates from 11:00 PM to 6:30 AM).",
    "images": [
      "/Images/Dining/DIN-01_Azure_Terrace_-_all-day_dining_restauran.jpg",
      "/Images/Dining/DIN-08_Azure_Terrace_terrace_seating.jpg"
    ]
  },
  {
    "id": "ember-spice",
    "slug": "ember-spice",
    "name": "Ember & Spice",
    "description": "Ember & Spice is our dinner-only specialty restaurant, highlighting authentic Indian grills and regional tandoor delicacies. It is the perfect choice for an adult-focused dinner experiencing slow-cooked clay-oven specialties and rich curries.",
    "mealPeriods": [
      {
        "name": "Dinner",
        "timing": "7:00 PM - 11:00 PM",
        "lastOrder": "10:30 PM"
      }
    ],
    "cuisine": "Indian Grills and Regional Tandoor",
    "dressCode": "Smart Casual / Semi-formal",
    "reservationRequired": true,
    "dietaryNotes": "Jain and Vegetarian dishes available. Closed on Mondays.",
    "roomService": "Respective menu items available in-room during operating hours.",
    "images": [
      "/Images/Dining/DIN-02_Ember__Spice_-_dinner_restaurant_India.jpg"
    ]
  },
  {
    "id": "the-cedar-lounge",
    "slug": "the-cedar-lounge",
    "name": "The Cedar Lounge",
    "description": "Located adjacent to our main lobby, The Cedar Lounge is a relaxing sanctuary for artisanal coffees, loose-leaf teas, fresh pastries, and light savory bites throughout the day. It features our signature RKPR High Tea experience.",
    "mealPeriods": [
      {
        "name": "All-Day",
        "timing": "8:00 AM - 11:00 PM",
        "lastOrder": "10:45 PM"
      }
    ],
    "cuisine": "Teas, Coffee, Desserts and Light Meals",
    "dressCode": "Casual",
    "reservationRequired": false,
    "dietaryNotes": "Signature High Tea (3:00 PM - 6:00 PM) for two guests.",
    "roomService": "Selected menu items available for midnight room service.",
    "images": [
      "/Images/Dining/DIN-03_The_Cedar_Lounge_-_lobby_lounge.jpg"
    ]
  },
  {
    "id": "summit-bar",
    "slug": "summit-bar",
    "name": "Summit Bar",
    "description": "Summit Bar offers an indoor lounge and an outdoor sunset deck overlooking the valley. Unwind with curated signature cocktails, a premium collection of single malts and wines, and a selection of hot bar snacks.",
    "mealPeriods": [
      {
        "name": "Bar & Evening",
        "timing": "4:00 PM - 11:30 PM",
        "lastOrder": "Drinks: 11:15 PM, Food: 10:45 PM"
      }
    ],
    "cuisine": "Cocktails, Spirits, Wine and Bar Snacks",
    "dressCode": "Smart Casual",
    "reservationRequired": false,
    "dietaryNotes": "Alcohol served to guests aged 21 and above in accordance with local regulations. Outdoor deck usage is weather dependent.",
    "roomService": "Cocktails and snacks available via room service.",
    "images": [
      "/Images/Dining/DIN-04_Summit_Bar_-_indoor_bar_and_sunset_deck.jpg",
      "/Images/Dining/DIN-10_Cocktail_presentation_-_Summit_Bar.jpg"
    ]
  }
];
