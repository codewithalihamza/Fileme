"use server";

import { EMAIL_REGEX, PHONE_REGEX } from "@/lib/constants";
import { db } from "@/lib/db";
import { contactUs } from "@/lib/schema";
import { and, eq, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, service, message, heardFrom } =
      await request.json();

    // Basic validation
    if (!name || !phone || !service || !message || !heardFrom) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Phone validation (11 digits)
    const phoneRegex = PHONE_REGEX;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Email validation (if provided)
    if (email) {
      const emailRegex = EMAIL_REGEX;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        );
      }
    }

    // Validate heardFrom enum
    const validHeardFrom = [
      "linkedin",
      "website",
      "instagram",
      "facebook",
      "others",
    ];
    if (!validHeardFrom.includes(heardFrom)) {
      return NextResponse.json(
        { error: "Invalid heard from source" },
        { status: 400 }
      );
    }

    const existingSubmission = await db
      .select()
      .from(contactUs)
      .where(
        and(
          eq(contactUs.phone, phone),
          or(
            eq(contactUs.status, "pending"),
            eq(contactUs.status, "in_progress")
          ),
          eq(contactUs.service, service)
        )
      );

    if (existingSubmission.length > 0) {
      return NextResponse.json(
        {
          error:
            "You already have a submission in progress. Please wait for us to contact you or check your existing submission status.",
        },
        { status: 400 }
      );
    }

    // Insert new contact submission
    const newContact = await db
      .insert(contactUs)
      .values({
        name,
        email: email || null,
        phone,
        service,
        message,
        heardFrom,
        status: "pending",
      })
      .returning();

    return NextResponse.json(
      {
        message: "Contact form submitted successfully",
        data: newContact[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
