import { db } from "@/lib/db";
import { referrals } from "@/lib/schema";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get total referrals count
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(referrals);

    // Get total earnings (sum of totalEarned)
    const totalEarnings = await db
      .select({
        sum: sql<number>`COALESCE(SUM(CAST(total_earned AS DECIMAL)), 0)`,
      })
      .from(referrals);

    // Get total paid out (sum of amountSent)
    const totalPaidOut = await db
      .select({
        sum: sql<number>`COALESCE(SUM(CAST(amount_sent AS DECIMAL)), 0)`,
      })
      .from(referrals);

    const stats = {
      total: totalCount[0].count,
      totalEarnings: totalEarnings[0].sum,
      totalPaidOut: totalPaidOut[0].sum,
    };

    return NextResponse.json({
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching referral stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
