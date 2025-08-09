import { db } from "@/lib/db";
import { referrals } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Referral ID is required" },
        { status: 400 }
      );
    }

    const referral = await db
      .select()
      .from(referrals)
      .where(eq(referrals.id, id))
      .limit(1);

    if (referral.length === 0) {
      return NextResponse.json(
        { error: "Referral not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      referral: referral[0],
    });
  } catch (error) {
    console.error("Error fetching referral:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Referral ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    // Only allow specific fields to be updated
    if (updates.friendName !== undefined)
      updateData.friendName = updates.friendName;
    if (updates.friendEmail !== undefined)
      updateData.friendEmail = updates.friendEmail;
    if (updates.friendPhone !== undefined)
      updateData.friendPhone = updates.friendPhone;
    if (updates.referrerName !== undefined)
      updateData.referrerName = updates.referrerName;
    if (updates.referrerEmail !== undefined)
      updateData.referrerEmail = updates.referrerEmail;
    if (updates.referrerPhone !== undefined)
      updateData.referrerPhone = updates.referrerPhone;
    if (updates.service !== undefined) updateData.service = updates.service;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.totalEarned !== undefined)
      updateData.totalEarned = updates.totalEarned;
    if (updates.amountSent !== undefined)
      updateData.amountSent = updates.amountSent;

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
      referral: updatedReferral[0],
    });
  } catch (error) {
    console.error("Error updating referral:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
