export const paymentRules = {
  "acceptedMethods": [
    {
      "name": "UPI",
      "condition": "Online and at resort, immediate verification"
    },
    {
      "name": "Credit Card",
      "condition": "Visa, Mastercard, RuPay, and selected international cards"
    },
    {
      "name": "Debit Card",
      "condition": "Online and at resort, bank limits apply"
    },
    {
      "name": "Net Banking",
      "condition": "Major Indian banks supported"
    },
    {
      "name": "Secure Payment Link",
      "condition": "Issued only through official resort channels"
    },
    {
      "name": "Bank Transfer",
      "condition": "Requires manual verification, booking reference mandatory"
    },
    {
      "name": "Cash",
      "condition": "At resort only, subject to legal limits"
    }
  ],
  "advanceRequirements": {
    "standard": "A 30% advance is required to confirm. The balance is payable before or during check-in. Payment links expire in 6 hours.",
    "peakSeason": "100% advance is required for bookings between 20 December and 5 January, public holidays, festival weekends, and long weekends.",
    "groupAndEvents": "Initial booking deposit, milestone payments, and final settlement before event/arrival as per contract."
  },
  "securityDeposit": "Selected premium villas require a refundable security deposit of INR 5,000 at check-in. Group and event bookings may require higher deposits. Refunds are processed within 7 business days post-inspection.",
  "disclaimer": "RKPR Resort will never request an OTP, CVV, Card PIN, UPI PIN, or banking passwords through email, phone, SMS, or WhatsApp. Booking confirmations require verified payment status; screenshots are not accepted as proof.",
  "refundPolicy": "Approved refunds are processed within 7-10 business days and returned to the original payment method only."
};
