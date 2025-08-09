import { db } from "@/lib/db";
import { requests, users } from "@/lib/schema";
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
        { error: "Request ID is required" },
        { status: 400 }
      );
    }

    // First, get the request data
    const requestData = await db
      .select({
        id: requests.id,
        status: requests.status,
        paidAmount: requests.paidAmount,
        service: requests.service,
        userId: requests.userId,
        assigneeId: requests.assigneeId,
        createdAt: requests.createdAt,
        updatedAt: requests.updatedAt,
      })
      .from(requests)
      .where(eq(requests.id, id));

    if (requestData.length === 0) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    const requestRecord = requestData[0];

    // Get user data
    const userData = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
      })
      .from(users)
      .where(eq(users.id, requestRecord.userId));

    // Get assignee data if assigneeId exists
    let assigneeData = null;
    if (requestRecord.assigneeId) {
      const assigneeResult = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
        })
        .from(users)
        .where(eq(users.id, requestRecord.assigneeId));

      assigneeData = assigneeResult.length > 0 ? assigneeResult[0] : null;
    }

    // Transform the data to match the expected format
    const request = {
      id: requestRecord.id,
      status: requestRecord.status,
      paidAmount: requestRecord.paidAmount,
      service: requestRecord.service,
      userId: requestRecord.userId,
      assigneeId: requestRecord.assigneeId,
      createdAt: requestRecord.createdAt,
      updatedAt: requestRecord.updatedAt,
      user: userData.length > 0 ? userData[0] : null,
      assignee: assigneeData,
    };

    return NextResponse.json({
      data: request,
    });
  } catch (error) {
    console.error("Error fetching request:", error);
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
        { error: "Request ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    // Only allow specific fields to be updated
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.paidAmount !== undefined)
      updateData.paidAmount = updates.paidAmount;
    if (updates.service !== undefined) updateData.service = updates.service;
    if (updates.userId !== undefined) updateData.userId = updates.userId;
    if (updates.assigneeId !== undefined)
      updateData.assigneeId = updates.assigneeId;

    const updatedRequest = await db
      .update(requests)
      .set(updateData)
      .where(eq(requests.id, id))
      .returning();

    if (updatedRequest.length === 0) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Request updated successfully",
      data: updatedRequest[0],
    });
  } catch (error) {
    console.error("Error updating request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
