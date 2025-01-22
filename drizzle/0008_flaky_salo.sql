DROP TABLE "wardrobe-care_profile_urls";--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" DROP CONSTRAINT "wardrobe-care_ngo_registration_id_unique";--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" DROP CONSTRAINT "wardrobe-care_ngo_registration_id_wardrobe-care_user_registration_number_fk";
--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ADD PRIMARY KEY ("registration_id");--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ALTER COLUMN "contact_person" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ALTER COLUMN "contact_person" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ALTER COLUMN "head_office_address" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ALTER COLUMN "website" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ALTER COLUMN "bio" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ALTER COLUMN "proof_of_registration_url" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ALTER COLUMN "proof_of_registration_url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ALTER COLUMN "registration_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ALTER COLUMN "tax_exemption_certificate_url" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ALTER COLUMN "tax_exemption_certificate_url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wardrobe-care_ngo" ADD CONSTRAINT "wardrobe-care_ngo_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "public"."wardrobe-care_user"("registration_number") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" DROP COLUMN IF EXISTS "terms_agreement";--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" DROP COLUMN IF EXISTS "updated_at";--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ADD CONSTRAINT "wardrobe-care_ngo_website_key" UNIQUE("website");--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ADD CONSTRAINT "wardrobe-care_ngo_proof_of_registration_url_key" UNIQUE("proof_of_registration_url");--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ADD CONSTRAINT "wardrobe-care_ngo_registration_id_key" UNIQUE("registration_id");--> statement-breakpoint
ALTER TABLE "wardrobe-care_ngo" ADD CONSTRAINT "wardrobe-care_ngo_tax_exemption_certificate_url_key" UNIQUE("tax_exemption_certificate_url");