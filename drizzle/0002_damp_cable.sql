DO $$ BEGIN
 CREATE TYPE "public"."donation_type" AS ENUM('DONATION', 'DISPOSAL');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."item_condition" AS ENUM('GOOD', 'NORMAL', 'BAD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wardrobe-care_donation" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"ngo_id" varchar(255),
	"donation_type" "donation_type" NOT NULL,
	"item" varchar(255) NOT NULL,
	"quantity" integer NOT NULL,
	"pickup_location" varchar(255) NOT NULL,
	"item_condition" "item_condition" NOT NULL,
	"pickup_date_time" timestamp with time zone NOT NULL,
	"additional_notes" text,
	"open_to_any_ngo" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wardrobe-care_donation" ADD CONSTRAINT "wardrobe-care_donation_user_id_wardrobe-care_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."wardrobe-care_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wardrobe-care_donation" ADD CONSTRAINT "wardrobe-care_donation_ngo_id_wardrobe-care_ngo_id_fk" FOREIGN KEY ("ngo_id") REFERENCES "public"."wardrobe-care_ngo"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wardrobe-care_ngo" ADD CONSTRAINT "wardrobe-care_ngo_registration_id_wardrobe-care_user_ngo_reg_id_fk" FOREIGN KEY ("registration_id") REFERENCES "public"."wardrobe-care_user_ngo"("reg_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
