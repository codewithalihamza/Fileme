import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { and, desc, eq, ilike, inArray, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";
    const limit = parseInt(searchParams.get("limit") || "10");

    // Build where conditions
    let whereConditions = [];

    if (search) {
      whereConditions.push(
        or(ilike(users.name, `%${search}%`), ilike(users.phone, `%${search}%`))
      );
    }

    if (role) {
      const roles = role.split(",").map((r) => r.trim());
      if (roles.length === 1) {
        whereConditions.push(eq(users.role, roles[0] as any));
      } else {
        whereConditions.push(inArray(users.role, roles as any));
      }
    }

    // Get search results (excluding password)
    const results = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        role: users.role,
      })
      .from(users)
      .where(
        whereConditions.length > 0
          ? whereConditions.reduce((acc, condition) => and(acc, condition))
          : undefined
      )
      .orderBy(desc(users.createdAt))
      .limit(limit);

    return NextResponse.json({
      data: results,
    });
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
