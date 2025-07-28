import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_EMAIL = process.env.ADMIN_LOGIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_LOGIN_PASSWORD!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be at least 32 characters long");
}

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error(
    "ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment variables"
  );
}

const secret = new TextEncoder().encode(JWT_SECRET);

export interface AdminUser {
  email: string;
  role: "admin";
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

export function validateCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}
