"use server";
import { EMAIL_REGEX, PHONE_REGEX } from "@/lib/constants";
import { db } from "@/lib/db";
import { contactUs, referrals, requests, users } from "@/lib/schema";
import { and, eq, ne, or } from "drizzle-orm";
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
    } = await request.json();

    // Basic validation
    if (
      !friendName ||
      !friendEmail ||
      !friendPhone ||
      !referrerName ||
      !referrerEmail ||
      !referrerPhone ||
      !service
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Phone validation (11 digits)
    const phoneRegex = PHONE_REGEX;
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

    // Email validation
    const emailRegex = EMAIL_REGEX;
    if (!emailRegex.test(friendEmail)) {
      return NextResponse.json(
        { error: "Invalid friend's email format" },
        { status: 400 }
      );
    }
    if (!emailRegex.test(referrerEmail)) {
      return NextResponse.json(
        { error: "Invalid referrer's email format" },
        { status: 400 }
      );
    }

    // Check if friend already has an active submission in contactUs table for the same service
    const existingContact = await db
      .select()
      .from(contactUs)
      .where(
        and(
          eq(contactUs.phone, friendPhone),
          eq(contactUs.service, service),
          or(
            eq(contactUs.status, "pending"),
            eq(contactUs.status, "in_progress")
          )
        )
      );

    if (existingContact.length > 0) {
      return NextResponse.json(
        {
          error:
            "This person already has a submission in progress for this service. You cannot refer them at this time.",
        },
        { status: 400 }
      );
    }

    // Check if friend already has an active request for the same service (by matching phone with user phone)
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.phone, friendPhone));

    if (existingUser.length > 0) {
      const existingRequest = await db
        .select()
        .from(requests)
        .where(
          and(
            eq(requests.userId, existingUser[0].id),
            eq(requests.service, service),
            ne(requests.status, "completed")
          )
        );

      if (existingRequest.length > 0) {
        return NextResponse.json(
          {
            error:
              "This person already has a submission in progress for this service. You cannot refer them at this time.",
          },
          { status: 400 }
        );
      }
    }

    // Check if this specific referral already exists (same referrer referring same friend)
    const existingReferral = await db
      .select()
      .from(referrals)
      .where(
        and(
          eq(referrals.friendPhone, friendPhone),
          eq(referrals.service, service),
          ne(referrals.status, "paid")
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
        friendEmail,
        friendPhone,
        referrerName,
        referrerEmail,
        referrerPhone,
        service,
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
