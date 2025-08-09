import { db } from "@/lib/db";
import { requests } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get total requests count
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(requests);

    // Get pending requests count
    const pendingCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(requests)
      .where(eq(requests.status, "pending"));

    // Get in_progress requests count
    const inProgressCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(requests)
      .where(eq(requests.status, "in_progress"));

    // Get completed requests count
    const completedCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(requests)
      .where(eq(requests.status, "completed"));

    // Get total revenue (sum of paidAmount)
    const totalRevenue = await db
      .select({
        sum: sql<number>`COALESCE(SUM(CAST(paid_amount AS DECIMAL)), 0)`,
      })
      .from(requests);

    const stats = {
      total: totalCount[0].count,
      pending: pendingCount[0].count,
      inProgress: inProgressCount[0].count,
      completed: completedCount[0].count,
      totalRevenue: totalRevenue[0].sum,
    };

    return NextResponse.json({
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching request stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
