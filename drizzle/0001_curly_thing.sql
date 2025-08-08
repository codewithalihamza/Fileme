ALTER TABLE "contact_us" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_us" ADD COLUMN "phone" text NOT NULL;--> statement-breakpoint
CREATE INDEX "contact_us_phone_idx" ON "contact_us" USING btree ("phone");