import { db } from "@/lib/db";
import { referrals } from "@/lib/schema";
import { desc, eq, ilike, or, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const offset = (page - 1) * limit;

    // Build where conditions
    let whereConditions = [];

    if (search) {
      whereConditions.push(
        or(
          ilike(referrals.friendName, `%${search}%`),
          ilike(referrals.friendPhone, `%${search}%`),
          ilike(referrals.referrerName, `%${search}%`),
          ilike(referrals.referrerPhone, `%${search}%`)
        )
      );
    }

    if (status) {
      whereConditions.push(eq(referrals.status, status as any));
    }

    // Get total count
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(referrals)
      .where(whereConditions.length > 0 ? whereConditions[0] : undefined);

    // Get paginated results
    const results = await db
      .select()
      .from(referrals)
      .where(whereConditions.length > 0 ? whereConditions[0] : undefined)
      .orderBy(desc(referrals.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      data: results,
      pagination: {
        page,
        limit,
        total: totalCount[0].count,
        totalPages: Math.ceil(totalCount[0].count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status, totalEarned, amountSent } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Referral ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (status) {
      updateData.status = status;
    }

    if (totalEarned !== undefined) {
      updateData.totalEarned = totalEarned;
    }

    if (amountSent !== undefined) {
      updateData.amountSent = amountSent;
    }

    const updatedReferral = await db
      .update(referrals)
      .set(updateData)
      .where(eq(referrals.id, id))
      .returning();

    if (updatedReferral.length === 0) {
      return NextResponse.json(
        { error: "Referral not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Referral updated successfully",
      data: updatedReferral[0],
    });
  } catch (error) {
    console.error("Error updating referral:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
