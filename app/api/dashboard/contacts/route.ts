import { db } from "@/lib/db";
import { contactUs } from "@/lib/schema";
import { desc, eq, like, or, sql } from "drizzle-orm";
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
      whereConditions.push(
        or(
          like(contactUs.name, `%${search}%`),
          like(contactUs.phone, `%${search}%`)
        )
      );
    }

    if (status) {
      whereConditions.push(eq(contactUs.status, status as any));
    }

    if (service) {
      whereConditions.push(eq(contactUs.service, service));
    }

    // Get total count
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactUs)
      .where(whereConditions.length > 0 ? whereConditions[0] : undefined);

    // Get paginated results
    const results = await db
      .select()
      .from(contactUs)
      .where(whereConditions.length > 0 ? whereConditions[0] : undefined)
      .orderBy(desc(contactUs.createdAt))
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
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
