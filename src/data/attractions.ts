export interface Attraction {
  id: string;
  name: string;
  distance: string;
  travelTime: string;
  description: string;
  entryFee: string;
  bestTime: string;
  dressCode: string;
  warning: string;
  coordinates: string;
  accessibility: string;
}

export const attractions: Attraction[] = [
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
];
export const travelItineraries = [
  {
    "title": "Half-Day: Biligiriranga Hills Experience",
    "duration": "5 hours",
    "bestFor": "Couples, families, and first-time visitors",
    "timeline": [
      {
        "time": "6:30 AM",
        "action": "Depart RKPR Resort"
      },
      {
        "time": "7:15 AM",
        "action": "Scenic BR Hills drive and viewpoint stops"
      },
      {
        "time": "8:15 AM",
        "action": "Visit Biligiri Ranganatha Swamy Temple"
      },
      {
        "time": "9:30 AM",
        "action": "Local tea break or short nature walk"
      },
      {
        "time": "11:30 AM",
        "action": "Return to the resort"
      }
    ],
    "mobilityNote": "Temple steps and uneven forest viewpoints can be challenging."
  },
  {
    "title": "Full-Day: Waterfalls and Temple Town",
    "duration": "10.5 hours",
    "bestFor": "Scenic touring, nature lovers, and cultural sightseeing",
    "timeline": [
      {
        "time": "7:30 AM",
        "action": "Depart RKPR Resort"
      },
      {
        "time": "9:00 AM",
        "action": "Explore Shivanasamudra Falls viewpoints"
      },
      {
        "time": "11:30 AM",
        "action": "Drive to historic Talakadu"
      },
      {
        "time": "12:30 PM",
        "action": "Lunch at pre-approved restaurant or packed resort lunch"
      },
      {
        "time": "1:30 PM",
        "action": "Explore sand-covered temples and Kaveri riverfront"
      },
      {
        "time": "4:00 PM",
        "action": "Begin return journey"
      },
      {
        "time": "6:00 PM",
        "action": "Arrive back at resort"
      }
    ],
    "mobilityNote": "Sandy paths and slippery rocks require careful walking."
  }
];
