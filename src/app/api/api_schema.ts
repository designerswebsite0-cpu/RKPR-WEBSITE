import { z } from "zod";

// Zod schema for validating the contact enquiry form
export const enquirySchema = z.object({
  fullName: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only alphabetic characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\+?[0-9\s-]{10,15}$/, "Phone number must be a valid 10-15 digit number"),
  enquiryType: z.enum(["stay", "dining", "spa", "event", "transfer", "general"]),
  // Stay-specific fields
  roomType: z.string().optional(),
  checkIn: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid check-in date")
    .optional(),
  checkOut: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), "Invalid check-out date")
    .optional(),
  guests: z
    .number()
    .min(1, "At least 1 guest must be selected")
    .max(20, "Maximum guests for standard enquiry is 20")
    .optional(),
  // Dining-specific fields
  outlet: z.string().optional(),
  guestsCount: z.number().optional(),
  preferredTime: z.string().optional(),
  // Spa-specific fields
  treatment: z.string().optional(),
  // Transfer-specific fields
  vehicle: z.string().optional(),
  flightNumber: z.string().optional(),
  // Common details
  comments: z.string().max(500, "Comments must not exceed 500 characters").optional(),
}).refine(
  (data) => {
    // If checkIn and checkOut exist, checkIn must be in the future and checkOut must be after checkIn
    if (data.checkIn && data.checkOut) {
      const cin = new Date(data.checkIn);
      const cout = new Date(data.checkOut);
      return cout > cin;
    }
    return true;
  },
  {
    message: "Check-out date must be chronologically after the check-in date",
    path: ["checkOut"],
  }
).refine(
  (data) => {
    if (data.checkIn) {
      const cin = new Date(data.checkIn);
      const today = new Date("2026-07-17"); // System baseline time
      today.setHours(0, 0, 0, 0);
      return cin >= today;
    }
    return true;
  },
  {
    message: "Check-in date cannot be in the past",
    path: ["checkIn"],
  }
);
