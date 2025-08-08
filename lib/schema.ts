import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  decimal,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// Enums
export const userRoleEnum = pgEnum("user_role", [
  "customer",
  "admin",
  "employees",
]);
export const contactStatusEnum = pgEnum("contact_status", [
  "pending",
  "in_progress",
  "contacted",
]);
export const heardFromEnum = pgEnum("heard_from", [
  "linkedin",
  "website",
  "instagram",
  "facebook",
  "others",
]);
export const referralStatusEnum = pgEnum("referral_status", [
  "pending",
  "in_progress",
  "completed",
  "paid",
]);
export const requestStatusEnum = pgEnum("request_status", [
  "pending",
  "in_progress",
  "unpaid",
  "paid",
  "completed",
]);

// User table
export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull().unique(),
    password: text("password").notNull(),
    role: userRoleEnum("role").default("customer").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
    phoneIdx: index("users_phone_idx").on(table.phone),
  })
);

// ContactUs table
export const contactUs = pgTable(
  "contact_us",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone").notNull(),
    service: text("service").notNull(),
    message: text("message").notNull(),
    status: contactStatusEnum("status").default("pending").notNull(),
    heardFrom: heardFromEnum("heard_from").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("contact_us_email_idx").on(table.email),
    phoneIdx: index("contact_us_phone_idx").on(table.phone),
    statusIdx: index("contact_us_status_idx").on(table.status),
  })
);

// Referrals table
export const referrals = pgTable(
  "referrals",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    friendName: text("friend_name").notNull(),
    friendEmail: text("friend_email").notNull(),
    friendPhone: text("friend_phone").notNull(),
    referrerName: text("referrer_name").notNull(),
    referrerEmail: text("referrer_email").notNull(),
    referrerPhone: text("referrer_phone").notNull(),
    service: text("service").notNull(),
    status: referralStatusEnum("status").default("pending").notNull(),
    totalEarned: decimal("total_earned", { precision: 10, scale: 2 }).default(
      "0"
    ),
    amountSent: decimal("amount_sent", { precision: 10, scale: 2 }).default(
      "0"
    ),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    referrerEmailIdx: index("referrals_referrer_email_idx").on(
      table.referrerEmail
    ),
    statusIdx: index("referrals_status_idx").on(table.status),
  })
);

// Request table
export const requests = pgTable(
  "requests",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    status: requestStatusEnum("status").default("pending").notNull(),
    paidAmount: decimal("paid_amount", { precision: 10, scale: 2 }).default(
      "0"
    ),
    service: text("service").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    assigneeId: text("assignee_id").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("requests_user_id_idx").on(table.userId),
    assigneeIdIdx: index("requests_assignee_id_idx").on(table.assigneeId),
    statusIdx: index("requests_status_idx").on(table.status),
  })
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  requests: many(requests, { relationName: "userRequests" }),
  assignedRequests: many(requests, { relationName: "assignedRequests" }),
}));

export const contactUsRelations = relations(contactUs, ({}) => ({}));

export const referralsRelations = relations(referrals, ({}) => ({}));

export const requestsRelations = relations(requests, ({ one }) => ({
  user: one(users, {
    fields: [requests.userId],
    references: [users.id],
    relationName: "userRequests",
  }),
  assignee: one(users, {
    fields: [requests.assigneeId],
    references: [users.id],
    relationName: "assignedRequests",
  }),
}));

// Types for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type ContactUs = typeof contactUs.$inferSelect;
export type NewContactUs = typeof contactUs.$inferInsert;
export type Referral = typeof referrals.$inferSelect;
export type NewReferral = typeof referrals.$inferInsert;
export type Request = typeof requests.$inferSelect;
export type NewRequest = typeof requests.$inferInsert;
