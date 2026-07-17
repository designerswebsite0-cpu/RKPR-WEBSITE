export interface Offer {
  id: string;
  slug: string;
  name: string;
  bookingCode: string;
  status: string;
  applicableGuestType: string;
  startDate: string;
  expiryDate: string;
  price: string;
  priceNumeric: number;
  eligibleRooms: string[];
  minimumStay: string;
  inclusions: string[];
  exclusions: string[];
  blackoutDates: string[];
  cancellationTerms: string;
  seasonalWarning?: string;
  bookingRequirement?: string;
}

export const offers: Offer[] = [
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
    "eligibleRooms": [
      "Valley View Premium Room",
      "Mountain Panorama Suite",
      "Honeymoon Pool Villa"
    ],
    "minimumStay": "Two consecutive nights",
    "inclusions": [
      "Accommodation for two guests",
      "Daily breakfast at Azure Terrace",
      "Welcome drink and in-room welcome amenities",
      "One romantic room decoration setup",
      "One candlelight dinner for two at a designated venue",
      "One 60-minute couple massage at Aranya Wellness Spa",
      "One non-alcoholic sparkling beverage",
      "Complimentary late check-out until 1:00 PM (subject to availability)"
    ],
    "exclusions": [
      "Airport or railway transfers",
      "Alcoholic beverages",
      "Premium menu supplements",
      "Additional spa treatments",
      "Activities not specifically listed",
      "Room upgrades beyond the booked category"
    ],
    "blackoutDates": [
      "24 December 2026 to 2 January 2027",
      "Long-weekend dates notified by the resort",
      "Private buyout and wedding dates"
    ],
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
    "eligibleRooms": [
      "Family Courtyard Suite",
      "Grand Two-Bedroom Pool Villa"
    ],
    "minimumStay": "Three consecutive nights",
    "inclusions": [
      "Accommodation for two adults and two children below 12",
      "Daily breakfast at Azure Terrace",
      "One family dinner at Azure Terrace",
      "One guided nature walk for the family",
      "One scheduled family activity session",
      "Complimentary Kids' Club access during operating hours",
      "One child-friendly snack platter per stay",
      "One family photograph taken by resort staff using the guest's device"
    ],
    "exclusions": [
      "Professional photography",
      "Adventure activities requiring specialist equipment",
      "Babysitting",
      "Transport",
      "Additional children or adults",
      "Paid Kids' Club workshops"
    ],
    "blackoutDates": [
      "24 December 2026 to 2 January 2027",
      "Easter weekend",
      "Diwali holiday period",
      "Resort-designated peak weekends"
    ],
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
    "eligibleRooms": [
      "Garden Deluxe Room",
      "Valley View Premium Room",
      "Mountain Panorama Suite"
    ],
    "minimumStay": "Three consecutive nights",
    "inclusions": [
      "Accommodation",
      "Daily breakfast",
      "One wellness consultation",
      "Two 60-minute spa treatments per guest",
      "Daily scheduled yoga session",
      "Guided meditation session",
      "One wellness-focused dinner",
      "Herbal tea service once daily",
      "Complimentary access to steam, sauna and fitness facilities during operating hours"
    ],
    "exclusions": [
      "Medical treatment or diagnosis",
      "Prescription medication",
      "Specialised therapy not listed",
      "Alcoholic beverages",
      "Transfers",
      "Personal training beyond scheduled sessions"
    ],
    "blackoutDates": [
      "24 December 2026 to 2 January 2027",
      "Resort wedding and full-buyout dates"
    ],
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
    "eligibleRooms": [
      "Garden Deluxe Room",
      "Valley View Premium Room",
      "Mountain Panorama Suite",
      "Family Courtyard Suite"
    ],
    "minimumStay": "Two consecutive nights",
    "inclusions": [
      "Accommodation for two guests",
      "Daily breakfast",
      "One high-tea service per stay",
      "One indoor recreational activity session",
      "One 30-minute head or foot massage per adult",
      "Complimentary room upgrade to the next category when available at check-in",
      "Flexible late check-out until 1:00 PM (subject to availability)"
    ],
    "exclusions": [
      "Outdoor activities cancelled because of weather",
      "Transfers",
      "Additional spa time",
      "Room-category upgrade guarantee",
      "Meals other than those listed"
    ],
    "blackoutDates": [
      "Independence Day weekend",
      "Ganesh Chaturthi weekend",
      "Other resort-designated high-demand dates"
    ],
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
    "eligibleRooms": [
      "Garden Deluxe Room",
      "Valley View Premium Room",
      "Mountain Panorama Suite"
    ],
    "minimumStay": "Seven consecutive nights",
    "inclusions": [
      "Accommodation",
      "Daily breakfast",
      "High-speed guest Wi-Fi",
      "One laundry bundle of up to ten standard garments",
      "Complimentary Business Centre access",
      "Two hours of Meeting Room use per stay (subject to availability)",
      "Daily tea or coffee service in the room",
      "Airport transfer discount of 15% when booked with the package"
    ],
    "exclusions": [
      "Printing and colour-copy charges",
      "Additional Meeting Room hours",
      "Food and beverages beyond listed inclusions",
      "Premium laundry and dry cleaning",
      "Computer hardware or technical support"
    ],
    "blackoutDates": [
      "24 December 2026 to 2 January 2027",
      "Resort full-buyout dates"
    ],
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
    "eligibleRooms": [
      "Honeymoon Pool Villa",
      "Grand Two-Bedroom Pool Villa"
    ],
    "minimumStay": "Two consecutive nights",
    "inclusions": [
      "Pool villa accommodation",
      "Daily breakfast",
      "Celebration room decoration",
      "One celebration cake up to 1 kg",
      "One private dinner setup for two guests",
      "One floating breakfast (subject to weather and safety conditions)",
      "One 60-minute spa treatment per adult",
      "Complimentary non-alcoholic welcome beverage"
    ],
    "exclusions": [
      "Professional photography or videography",
      "Floral designs beyond the standard setup",
      "Alcoholic beverages",
      "Entertainment performers",
      "Fireworks",
      "Additional event guests"
    ],
    "blackoutDates": [
      "24 December 2026 to 2 January 2027",
      "Wedding buyout dates",
      "Public-holiday weekends subject to management restriction"
    ],
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
    "eligibleRooms": [
      "All room and villa categories except categories blocked for maintenance or private events"
    ],
    "minimumStay": "Three consecutive nights, with all nights falling between Sunday and Thursday",
    "inclusions": [
      "Accommodation",
      "Daily breakfast",
      "Standard complimentary resort amenities"
    ],
    "exclusions": [
      "Friday and Saturday nights",
      "Transfers",
      "Spa treatments",
      "Paid activities",
      "Food and beverage beyond breakfast"
    ],
    "blackoutDates": [
      "All public-holiday periods",
      "24 December 2026 to 2 January 2027",
      "Resort-designated peak dates"
    ],
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
    "eligibleRooms": [
      "All publicly available room and villa categories"
    ],
    "minimumStay": "One night",
    "bookingRequirement": "Reservation must be confirmed at least 45 days before arrival",
    "inclusions": [
      "Accommodation according to selected rate plan",
      "Benefits stated in the selected rate plan"
    ],
    "exclusions": [
      "Package benefits not listed in the selected rate plan",
      "Transfers",
      "Spa and activities"
    ],
    "blackoutDates": [
      "May be restricted on 24 December to 2 January and other high-demand periods"
    ],
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
    "eligibleRooms": [
      "Garden Deluxe Room",
      "Valley View Premium Room",
      "Mountain Panorama Suite",
      "Family Courtyard Suite"
    ],
    "minimumStay": "Two consecutive nights",
    "inclusions": [
      "Accommodation for two guests",
      "Daily breakfast",
      "One-way Bengaluru Airport transfer in a Premium Sedan",
      "Welcome refreshments during the road journey",
      "Standard toll and parking charges",
      "Flight-delay monitoring when a correct flight number is supplied"
    ],
    "exclusions": [
      "Return airport transfer",
      "Night transfer surcharge for pickups between 11:00 PM and 5:00 AM",
      "Additional vehicle required for excessive luggage",
      "Luxury vehicle upgrade",
      "Waiting charges beyond the included allowance"
    ],
    "blackoutDates": [
      "24 December 2026 to 2 January 2027",
      "Dates when contracted transport capacity is unavailable"
    ],
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
    "eligibleRooms": [
      "Mixed room inventory subject to availability. Pool villas are quoted separately."
    ],
    "minimumStay": "Two nights and a minimum booking of ten rooms per night",
    "inclusions": [
      "Accommodation as quoted",
      "Daily breakfast",
      "One group dinner",
      "One meeting or activity space for up to two hours",
      "One scheduled group activity",
      "Dedicated group coordinator"
    ],
    "exclusions": [
      "Exclusive resort buyout",
      "Audio-visual equipment beyond standard setup",
      "Alcoholic beverages",
      "Custom entertainment",
      "Decorations",
      "Transfers unless quoted"
    ],
    "blackoutDates": [
      "Christmas and New Year period",
      "Major public-holiday weekends",
      "Existing wedding or buyout dates"
    ],
    "cancellationTerms": "25% deposit at confirmation; further 50% due 30 days before arrival; balance due 14 days before arrival. Deposit is non-refundable within 45 days of arrival; 100% charge applies within 14 days or for no-show."
  }
];
