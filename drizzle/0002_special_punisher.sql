DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN', 'NGO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "wardrobe-care_user" ADD COLUMN "role" "role" DEFAULT 'USER';