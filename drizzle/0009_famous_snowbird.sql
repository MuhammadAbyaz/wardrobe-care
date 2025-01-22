DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('PENDING', 'VERIFIED', 'IN PROGRESS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ADD COLUMN "status" "status" DEFAULT 'IN PROGRESS';