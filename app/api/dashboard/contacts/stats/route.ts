import { db } from "@/lib/db";
import { contactUs } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get total contacts count
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactUs);

    // Get pending contacts count
    const pendingCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactUs)
      .where(eq(contactUs.status, "pending"));

    // Get in_progress contacts count (completed)
    const inProgressCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactUs)
      .where(eq(contactUs.status, "in_progress"));

    // Get contacted contacts count
    const contactedCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactUs)
      .where(eq(contactUs.status, "contacted"));

    const stats = {
      total: totalCount[0].count,
      pending: pendingCount[0].count,
      completed: inProgressCount[0].count,
      contacted: contactedCount[0].count,
    };

    return NextResponse.json({
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching contact stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
