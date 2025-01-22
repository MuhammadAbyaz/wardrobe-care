CREATE TABLE IF NOT EXISTS "wardrobe-care_ngo" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"contact_person" varchar(255) NOT NULL,
	"head_office_address" text NOT NULL,
	"website" varchar(255) NOT NULL,
	"bio" text NOT NULL,
	"terms_agreement" boolean DEFAULT false NOT NULL,
	"proof_of_registration_url" varchar(255),
	"registration_id" varchar(255) NOT NULL,
	"tax_exemption_certificate_url" varchar(255),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wardrobe-care_profile_urls" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"profile_id" uuid,
	"url" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wardrobe-care_ngo" ADD CONSTRAINT "wardrobe-care_ngo_registration_id_wardrobe-care_user_registration_number_fk" FOREIGN KEY ("registration_id") REFERENCES "public"."wardrobe-care_user"("registration_number") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wardrobe-care_profile_urls" ADD CONSTRAINT "wardrobe-care_profile_urls_profile_id_wardrobe-care_ngo_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."wardrobe-care_ngo"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
