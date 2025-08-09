ALTER TABLE "referrals" ALTER COLUMN "total_earned" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "referrals" ALTER COLUMN "total_earned" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "referrals" ALTER COLUMN "amount_sent" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "referrals" ALTER COLUMN "amount_sent" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "paid_amount" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "requests" ALTER COLUMN "paid_amount" DROP DEFAULT;