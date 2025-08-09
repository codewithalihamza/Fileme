CREATE TYPE "public"."contact_status" AS ENUM('pending', 'in_progress', 'contacted');--> statement-breakpoint
CREATE TYPE "public"."heard_from" AS ENUM('linkedin', 'website', 'instagram', 'facebook', 'others');--> statement-breakpoint
CREATE TYPE "public"."referral_status" AS ENUM('pending', 'in_progress', 'completed', 'paid');--> statement-breakpoint
CREATE TYPE "public"."request_status" AS ENUM('pending', 'in_progress', 'unpaid', 'paid', 'completed');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('customer', 'admin', 'employees');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'disabled');--> statement-breakpoint
CREATE TABLE "contact_us" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text NOT NULL,
	"service" text NOT NULL,
	"message" text NOT NULL,
	"status" "contact_status" DEFAULT 'pending' NOT NULL,
	"heard_from" "heard_from" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" text PRIMARY KEY NOT NULL,
	"friend_name" text NOT NULL,
	"friend_email" text NOT NULL,
	"friend_phone" text NOT NULL,
	"referrer_name" text NOT NULL,
	"referrer_email" text NOT NULL,
	"referrer_phone" text NOT NULL,
	"service" text NOT NULL,
	"status" "referral_status" DEFAULT 'pending' NOT NULL,
	"total_earned" integer DEFAULT 0,
	"amount_sent" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "requests" (
	"id" text PRIMARY KEY NOT NULL,
	"status" "request_status" DEFAULT 'pending' NOT NULL,
	"paid_amount" integer DEFAULT 0,
	"service" text NOT NULL,
	"user_id" text NOT NULL,
	"assignee_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"password" text NOT NULL,
	"status" "user_status" DEFAULT 'active' NOT NULL,
	"role" "user_role" DEFAULT 'customer' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
ALTER TABLE "requests" ADD CONSTRAINT "requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "requests" ADD CONSTRAINT "requests_assignee_id_users_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "contact_us_email_idx" ON "contact_us" USING btree ("email");--> statement-breakpoint
CREATE INDEX "contact_us_phone_idx" ON "contact_us" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "contact_us_status_idx" ON "contact_us" USING btree ("status");--> statement-breakpoint
CREATE INDEX "referrals_referrer_email_idx" ON "referrals" USING btree ("referrer_email");--> statement-breakpoint
CREATE INDEX "referrals_status_idx" ON "referrals" USING btree ("status");--> statement-breakpoint
CREATE INDEX "requests_user_id_idx" ON "requests" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "requests_assignee_id_idx" ON "requests" USING btree ("assignee_id");--> statement-breakpoint
CREATE INDEX "requests_status_idx" ON "requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_phone_idx" ON "users" USING btree ("phone");