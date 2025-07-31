import { createId } from "@paralleldrive/cuid2";
import { decimal, pgTable, text, timestamp } from "drizzle-orm/pg-core";

// Contact submissions table
export const contacts = pgTable("contacts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  message: text("message").notNull(),
  status: text("status", {
    enum: ["pending", "in-progress", "completed", "unpaid", "paid"],
  })
    .default("pending")
    .notNull(),
  paidAmount: decimal("paid_amount", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Referral submissions table
export const referrals = pgTable("referrals", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  friendName: text("friend_name").notNull(),
  friendEmail: text("friend_email"),
  friendPhone: text("friend_phone").notNull(),
  referrerName: text("referrer_name").notNull(),
  referrerEmail: text("referrer_email"),
  referrerPhone: text("referrer_phone").notNull(),
  service: text("service").notNull(),
  accountDetails: text("account_details").notNull(),
  status: text("status", {
    enum: ["pending", "in-progress", "completed", "paid"],
  })
    .default("pending")
    .notNull(),
  totalEarned: decimal("total_earned", { precision: 10, scale: 2 }).default(
    "0"
  ),
  amountSent: decimal("amount_sent", { precision: 10, scale: 2 }).default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Types for TypeScript
export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
export type Referral = typeof referrals.$inferSelect;
export type NewReferral = typeof referrals.$inferInsert;
