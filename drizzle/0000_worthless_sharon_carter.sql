CREATE TABLE "contacts" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text NOT NULL,
	"service" text NOT NULL,
	"message" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"paid_amount" numeric(10, 2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" text PRIMARY KEY NOT NULL,
	"friend_name" text NOT NULL,
	"friend_email" text,
	"friend_phone" text NOT NULL,
	"referrer_name" text NOT NULL,
	"referrer_email" text,
	"referrer_phone" text NOT NULL,
	"service" text NOT NULL,
	"account_details" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"total_earned" numeric(10, 2) DEFAULT '0',
	"amount_sent" numeric(10, 2) DEFAULT '0',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
