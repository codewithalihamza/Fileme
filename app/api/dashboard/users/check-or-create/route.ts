import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Check if user already exists by phone number
    const existingUser = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        role: users.role,
      })
      .from(users)
      .where(eq(users.phone, phone));

    if (existingUser.length > 0) {
      // User exists, return the existing user
      return NextResponse.json({
        user: existingUser[0],
        isNew: false,
        message: "User found",
      });
    }

    // User doesn't exist, create a new one
    const hashedPassword = await bcrypt.hash("12345678", 12);

    const newUser = await db
      .insert(users)
      .values({
        name,
        phone,
        email: email || null,
        password: hashedPassword,
        role: "customer",
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        role: users.role,
      });

    return NextResponse.json({
      user: newUser[0],
      isNew: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error checking/creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
