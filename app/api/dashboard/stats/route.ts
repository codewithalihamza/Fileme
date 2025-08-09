import { db } from "@/lib/db";
import { contactUs, referrals, requests } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get pending contacts count
    const pendingContacts = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactUs)
      .where(eq(contactUs.status, "pending"));

    // Get pending referrals count
    const pendingReferrals = await db
      .select({ count: sql<number>`count(*)` })
      .from(referrals)
      .where(eq(referrals.status, "pending"));

    // Get pending requests count
    const pendingRequests = await db
      .select({ count: sql<number>`count(*)` })
      .from(requests)
      .where(eq(requests.status, "pending"));

    const stats = {
      pendingContacts: pendingContacts[0].count,
      pendingReferrals: pendingReferrals[0].count,
      pendingRequests: pendingRequests[0].count,
    };

    return NextResponse.json({
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
