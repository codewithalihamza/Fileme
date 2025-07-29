import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      friendName,
      friendEmail,
      friendPhone,
      referrerName,
      referrerEmail,
      referrerPhone,
      service,
      accountDetails,
    } = await request.json();

    // Basic validation
    if (
      !friendName ||
      !friendPhone ||
      !referrerName ||
      !referrerPhone ||
      !service ||
      !accountDetails
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Phone validation (11 digits)
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(friendPhone)) {
      return NextResponse.json(
        { error: "Invalid friend's phone number format" },
        { status: 400 }
      );
    }
    if (!phoneRegex.test(referrerPhone)) {
      return NextResponse.json(
        { error: "Invalid referrer's phone number format" },
        { status: 400 }
      );
    }

    // Email validation (if provided)
    if (friendEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(friendEmail)) {
        return NextResponse.json(
          { error: "Invalid friend's email format" },
          { status: 400 }
        );
      }
    }
    if (referrerEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(referrerEmail)) {
        return NextResponse.json(
          { error: "Invalid referrer's email format" },
          { status: 400 }
        );
      }
    }

    // Console log the referral data
    console.log("=== REFERRAL FORM SUBMISSION ===");
    console.log("Friend Details:");
    console.log("  Name:", friendName);
    console.log("  Email:", friendEmail || "Not provided");
    console.log("  Phone:", friendPhone);
    console.log("");
    console.log("Referrer Details:");
    console.log("  Name:", referrerName);
    console.log("  Email:", referrerEmail || "Not provided");
    console.log("  Phone:", referrerPhone);
    console.log("");
    console.log("Service Details:");
    console.log("  Service:", service);
    console.log("");
    console.log("Payment Details:");
    console.log("  Account Details:", accountDetails);
    console.log("==================================");

    return NextResponse.json(
      { message: "Referral submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Referral form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
