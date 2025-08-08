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
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          phone: users.phone,
        },
        assignee: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(requests)
      .leftJoin(users, eq(requests.userId, users.id))
      .leftJoin(users, eq(requests.assigneeId, users.id))
      .where(eq(requests.id, id));

    if (requestData.length === 0) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    // Transform the data to match the expected format
    const request = {
      id: requestData[0].id,
      status: requestData[0].status,
      paidAmount: requestData[0].paidAmount,
      service: requestData[0].service,
      userId: requestData[0].userId,
      assigneeId: requestData[0].assigneeId,
      createdAt: requestData[0].createdAt,
      updatedAt: requestData[0].updatedAt,
      user: requestData[0].user,
      assignee: requestData[0].assignee,
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
