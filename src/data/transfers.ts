export const transferData = {
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
      "Premium Sedan": {
        "oneWay": 5500
      },
      "Premium SUV": {
        "oneWay": 7500
      },
      "Luxury MUV": {
        "oneWay": 8500
      },
      "Tempo Traveller": {
        "oneWay": 13500
      }
    },
    "nightChargeNote": "Surcharge of INR 750-1,500 applies depending on vehicle category"
  },
  "busTransfers": {
    "station": "Mysuru Suburban Bus Station",
    "distance": "93 km",
    "travelTime": "2 hours 15 minutes to 3 hours",
    "rates": {
      "Premium Sedan": {
        "oneWay": 5300
      },
      "Premium SUV": {
        "oneWay": 7300
      },
      "Luxury MUV": {
        "oneWay": 8300
      },
      "Tempo Traveller": {
        "oneWay": 13200
      }
    }
  },
  "localSightseeing": {
    "rates": [
      {
        "vehicle": "Sedan",
        "package": "4 hours / 40 km",
        "price": 3200,
        "extraKm": 24
      },
      {
        "vehicle": "Sedan",
        "package": "8 hours / 80 km",
        "price": 5500,
        "extraKm": 24
      },
      {
        "vehicle": "SUV",
        "package": "4 hours / 40 km",
        "price": 4200,
        "extraKm": 31
      },
      {
        "vehicle": "SUV",
        "package": "8 hours / 80 km",
        "price": 7200,
        "extraKm": 31
      }
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
};
