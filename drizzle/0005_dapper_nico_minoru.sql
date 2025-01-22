ALTER TABLE "wardrobe-care_donation" DROP CONSTRAINT "wardrobe-care_donation_ngo_id_wardrobe-care_ngo_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wardrobe-care_donation" ADD CONSTRAINT "wardrobe-care_donation_ngo_id_wardrobe-care_user_ngo_user_id_fk" FOREIGN KEY ("ngo_id") REFERENCES "public"."wardrobe-care_user_ngo"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
