import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Clean the DATABASE_URL to remove any trailing characters
const cleanDatabaseUrl = process.env.DATABASE_URL.replace(/[%]$/, "");

const sql = neon(cleanDatabaseUrl);

export const db = drizzle(sql, { schema });
