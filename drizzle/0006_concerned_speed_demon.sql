DO $$ BEGIN
 CREATE TYPE "public"."donation_status" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'DELIVERED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "wardrobe-care_donation" ADD COLUMN "status" "donation_status" DEFAULT 'PENDING' NOT NULL;