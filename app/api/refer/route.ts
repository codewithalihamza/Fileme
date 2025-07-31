import { db } from "@/lib/db";
import { contacts, referrals } from "@/lib/schema";
import { and, eq, or } from "drizzle-orm";
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

    // Check if friend already exists in contacts with pending, in-progress, or unpaid status
    const existingContact = await db
      .select()
      .from(contacts)
      .where(
        and(
          or(
            eq(contacts.phone, friendPhone),
            eq(contacts.email, friendEmail || "")
          ),
          or(
            eq(contacts.status, "pending"),
            eq(contacts.status, "in-progress"),
            eq(contacts.status, "unpaid")
          )
        )
      );

    if (existingContact.length > 0) {
      return NextResponse.json(
        {
          error:
            "This person already has a submission in progress. You cannot refer them at this time.",
        },
        { status: 400 }
      );
    }

    // Check if this referral already exists
    const existingReferral = await db
      .select()
      .from(referrals)
      .where(
        and(
          eq(referrals.friendPhone, friendPhone),
          eq(referrals.referrerPhone, referrerPhone)
        )
      );

    if (existingReferral.length > 0) {
      return NextResponse.json(
        {
          error:
            "You have already referred this person. Please refer someone else.",
        },
        { status: 400 }
      );
    }

    // Insert new referral
    const newReferral = await db
      .insert(referrals)
      .values({
        friendName,
        friendEmail: friendEmail || null,
        friendPhone,
        referrerName,
        referrerEmail: referrerEmail || null,
        referrerPhone,
        service,
        accountDetails,
        status: "pending",
      })
      .returning();

    return NextResponse.json(
      {
        message: "Referral submitted successfully",
        data: newReferral[0],
      },
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
