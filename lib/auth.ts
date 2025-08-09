import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be at least 32 characters long");
}

const secret = new TextEncoder().encode(JWT_SECRET);

export interface AdminUser {
  email: string;
  role: "admin" | "employees";
  userId: string;
}

export async function createToken(user: AdminUser): Promise<string> {
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);

  return token;
}

export async function verifyToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as AdminUser;
  } catch (error) {
    return null;
  }
}
