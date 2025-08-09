import { db } from "@/lib/db";
import { requests, users } from "@/lib/schema";
import { desc, eq, ilike, or, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const service = searchParams.get("service") || "";

    const offset = (page - 1) * limit;

    // Build where conditions
    let whereConditions = [];

    if (search) {
      whereConditions.push(or(ilike(requests.service, `%${search}%`)));
    }

    if (status) {
      whereConditions.push(eq(requests.status, status as any));
    }

    if (service) {
      whereConditions.push(eq(requests.service, service));
    }

    // Get total count
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(requests)
      .where(whereConditions.length > 0 ? whereConditions[0] : undefined);

    // Get paginated results with user info only
    const results = await db
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
      })
      .from(requests)
      .leftJoin(users, eq(requests.userId, users.id))
      .where(whereConditions.length > 0 ? whereConditions[0] : undefined)
      .orderBy(desc(requests.createdAt))
      .limit(limit)
      .offset(offset);

    // Get assignee info for requests that have assignees
    const assigneeIds = results
      .map((result) => result.assigneeId)
      .filter((id) => id !== null) as string[];

    let assignees: any[] = [];
    if (assigneeIds.length > 0) {
      assignees = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          phone: users.phone,
        })
        .from(users)
        .where(sql`${users.id} IN (${assigneeIds.join(",")})`);
    }

    // Combine results with assignee info
    const resultsWithAssignees = results.map((result) => ({
      ...result,
      assignee: result.assigneeId
        ? assignees.find((assignee) => assignee.id === result.assigneeId) ||
          null
        : null,
    }));

    return NextResponse.json({
      data: resultsWithAssignees,
      pagination: {
        page,
        limit,
        total: totalCount[0].count,
        totalPages: Math.ceil(totalCount[0].count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { status, paidAmount, service, userId, assigneeId } =
      await request.json();

    if (!service || !userId) {
      return NextResponse.json(
        { error: "Service and user ID are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await db.select().from(users).where(eq(users.id, userId));

    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if assignee exists (if provided)
    if (assigneeId) {
      const assignee = await db
        .select()
        .from(users)
        .where(eq(users.id, assigneeId));

      if (assignee.length === 0) {
        return NextResponse.json(
          { error: "Assignee not found" },
          { status: 404 }
        );
      }
    }

    // Check if a request already exists for the same client, service, and non-completed status
    const existingRequest = await db
      .select()
      .from(requests)
      .where(
        sql`${requests.userId} = ${userId} AND ${requests.service} = ${service} AND ${requests.status} != 'completed'`
      );

    if (existingRequest.length > 0) {
      return NextResponse.json(
        {
          error:
            "Request already exists for this client and service. Please complete the existing request first or create a request for a different service.",
          existingRequest: existingRequest[0],
        },
        { status: 409 }
      );
    }

    // Create new request
    const newRequest = await db
      .insert(requests)
      .values({
        status: status || "pending",
        paidAmount: paidAmount?.toString() || null,
        service,
        userId,
        assigneeId: assigneeId || null,
      })
      .returning();

    return NextResponse.json({
      message: "Request created successfully",
      data: newRequest[0],
    });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status, paidAmount, assigneeId } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Request ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (status) updateData.status = status;
    if (paidAmount !== undefined)
      updateData.paidAmount = paidAmount?.toString() || null;
    if (assigneeId !== undefined) updateData.assigneeId = assigneeId;

    // Check if assignee exists (if provided)
    if (assigneeId) {
      const assignee = await db
        .select()
        .from(users)
        .where(eq(users.id, assigneeId));

      if (assignee.length === 0) {
        return NextResponse.json(
          { error: "Assignee not found" },
          { status: 404 }
        );
      }
    }

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

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Request ID is required" },
        { status: 400 }
      );
    }

    const deletedRequest = await db
      .delete(requests)
      .where(eq(requests.id, id))
      .returning();

    if (deletedRequest.length === 0) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Request deleted successfully",
      data: deletedRequest[0],
    });
  } catch (error) {
    console.error("Error deleting request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
