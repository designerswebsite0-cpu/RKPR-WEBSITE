export interface SpaTreatment {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  coupleOption: boolean;
  minimumAge: number;
  bookingRequired: boolean;
  seasonalAvailability: string;
  cancellationDeadline: string;
}

export interface CoupleRitual {
  id: string;
  name: string;
  includes: string;
  duration: string;
  price: number;
  minimumAge: number;
  bookingDeadline: string;
  cancellationDeadline: string;
}

export interface SpaFacility {
  name: string;
  timings: string;
  capacity: string;
  minimumAge: number;
  bookingRequired: string;
  usageLimit: string;
  dressCode: string;
  charge?: string;
  safetyNotes: string;
}

export const spaTreatments: SpaTreatment[] = [
  {
    "id": "aranya-signature-massage-60",
    "name": "Aranya Signature Massage (60 Min)",
    "description": "Medium-pressure full-body massage combining Swedish, Balinese and stretching techniques.",
    "duration": "60 min",
    "price": 4200,
    "coupleOption": true,
    "minimumAge": 16,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "6 hours"
  },
  {
    "id": "aranya-signature-massage-90",
    "name": "Aranya Signature Massage (90 Min)",
    "description": "Extended full-body ritual with scalp massage.",
    "duration": "90 min",
    "price": 5800,
    "coupleOption": true,
    "minimumAge": 16,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "6 hours"
  },
  {
    "id": "swedish-relaxation-massage",
    "name": "Swedish Relaxation Massage",
    "description": "Gentle flowing massage for relaxation and circulation.",
    "duration": "60 min",
    "price": 3800,
    "coupleOption": true,
    "minimumAge": 16,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "6 hours"
  },
  {
    "id": "deep-tissue-massage-60",
    "name": "Deep Tissue Massage (60 Min)",
    "description": "Firm pressure focused on muscular tension and sports recovery.",
    "duration": "60 min",
    "price": 4500,
    "coupleOption": false,
    "minimumAge": 18,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "6 hours"
  },
  {
    "id": "deep-tissue-massage-90",
    "name": "Deep Tissue Massage (90 Min)",
    "description": "Extended recovery treatment for back, shoulders and legs.",
    "duration": "90 min",
    "price": 6100,
    "coupleOption": false,
    "minimumAge": 18,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "6 hours"
  },
  {
    "id": "balinese-massage",
    "name": "Balinese Massage",
    "description": "Pressure-point massage with stretching and aromatic oil.",
    "duration": "60 min",
    "price": 4300,
    "coupleOption": true,
    "minimumAge": 16,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "6 hours"
  },
  {
    "id": "aromatherapy-massage",
    "name": "Aromatherapy Massage",
    "description": "Gentle massage using a selected essential-oil blend.",
    "duration": "60 min",
    "price": 4100,
    "coupleOption": true,
    "minimumAge": 16,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "6 hours"
  },
  {
    "id": "hot-stone-therapy",
    "name": "Hot Stone Therapy",
    "description": "Heated basalt stones with medium-pressure massage.",
    "duration": "75 min",
    "price": 5600,
    "coupleOption": true,
    "minimumAge": 18,
    "bookingRequired": true,
    "seasonalAvailability": "October - March preferred",
    "cancellationDeadline": "12 hours"
  },
  {
    "id": "ayurvedic-abhyanga",
    "name": "Ayurvedic Abhyanga",
    "description": "Warm herbal oil massage performed with rhythmic strokes.",
    "duration": "60 min",
    "price": 4600,
    "coupleOption": true,
    "minimumAge": 16,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "6 hours"
  },
  {
    "id": "shirodhara-ritual",
    "name": "Shirodhara Ritual",
    "description": "Warm oil stream over the forehead followed by scalp massage.",
    "duration": "60 min",
    "price": 5200,
    "coupleOption": false,
    "minimumAge": 18,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "12 hours"
  },
  {
    "id": "head-neck-shoulder",
    "name": "Head, Neck and Shoulder Therapy",
    "description": "Focused seated or table massage for upper-body tension.",
    "duration": "30 min",
    "price": 2200,
    "coupleOption": false,
    "minimumAge": 13,
    "bookingRequired": false,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "4 hours"
  },
  {
    "id": "foot-reflexology",
    "name": "Foot Reflexology",
    "description": "Pressure-point foot and lower-leg treatment.",
    "duration": "45 min",
    "price": 2900,
    "coupleOption": true,
    "minimumAge": 13,
    "bookingRequired": false,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "4 hours"
  },
  {
    "id": "himalayan-salt-scrub",
    "name": "Himalayan Salt Body Scrub",
    "description": "Mineral exfoliation followed by moisturising body lotion.",
    "duration": "45 min",
    "price": 3400,
    "coupleOption": false,
    "minimumAge": 16,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "6 hours"
  },
  {
    "id": "detox-body-wrap",
    "name": "Detox Body Wrap",
    "description": "Herbal body wrap with scalp massage and shower.",
    "duration": "75 min",
    "price": 5100,
    "coupleOption": false,
    "minimumAge": 18,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "12 hours"
  },
  {
    "id": "radiance-facial",
    "name": "Radiance Facial",
    "description": "Cleansing, exfoliation, mask and facial massage.",
    "duration": "60 min",
    "price": 4200,
    "coupleOption": false,
    "minimumAge": 16,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "6 hours"
  },
  {
    "id": "mens-recovery-facial",
    "name": "Men\u2019s Recovery Facial",
    "description": "Deep cleansing and hydrating treatment designed for men\u2019s skin.",
    "duration": "60 min",
    "price": 4200,
    "coupleOption": false,
    "minimumAge": 16,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "6 hours"
  },
  {
    "id": "teen-clarifying-facial",
    "name": "Teen Clarifying Facial",
    "description": "Gentle facial for teenage skin; parental consent required.",
    "duration": "45 min",
    "price": 3200,
    "coupleOption": false,
    "minimumAge": 13,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "6 hours"
  },
  {
    "id": "prenatal-comfort-massage",
    "name": "Prenatal Comfort Massage",
    "description": "Side-position massage for eligible pregnancies after the first trimester.",
    "duration": "60 min",
    "price": 4500,
    "coupleOption": false,
    "minimumAge": 18,
    "bookingRequired": true,
    "seasonalAvailability": "All year",
    "cancellationDeadline": "12 hours"
  }
];
export const coupleRituals: CoupleRitual[] = [
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
];
export const spaFacilities: SpaFacility[] = [
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
    "dressCode": "Swimwear required",
    "charge": "Complimentary for guests with a spa treatment on the same day; INR 900 per guest for facility-only access",
    "safetyNotes": "Not suitable for guests with open wounds, infectious conditions, uncontrolled hypertension or certain heart conditions"
  }
];
