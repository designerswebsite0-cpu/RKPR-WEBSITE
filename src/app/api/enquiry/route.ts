import { NextResponse } from "next/server";
import { enquirySchema } from "../api_schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate with Zod
    const validationResult = enquirySchema.safeParse(body);

    if (!validationResult.success) {
      // Extract formatted error messages
      const errors = validationResult.error.flatten().fieldErrors;
      const firstErrors = Object.entries(errors).reduce((acc, [key, val]) => {
        if (val && val.length > 0) {
          acc[key] = val[0];
        }
        return acc;
      }, {} as Record<string, string>);

      return NextResponse.json(
        {
          success: false,
          errors: firstErrors,
          message: "Form validation failed. Please check the fields below.",
        },
        { status: 400 }
      );
    }

    // Success: Generate a unique inquiry receipt
    const uniqueId = Math.floor(100000 + Math.random() * 900000);
    const referenceNumber = `RKPR-2026-${uniqueId}`;

    return NextResponse.json(
      {
        success: true,
        referenceNumber,
        submittedAt: new Date().toISOString(),
        message: "Your enquiry has been successfully submitted to our reservation desk. A concierge member will review your details and contact you via email or phone within 2 hours.",
        details: validationResult.data,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
