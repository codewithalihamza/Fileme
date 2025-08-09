import { config } from "dotenv";
import type { Config } from "drizzle-kit";
config({ path: ".env.local" }); // or .env
export default {
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
