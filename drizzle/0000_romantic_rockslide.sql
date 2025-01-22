DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN', 'NGO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('PENDING', 'VERIFIED', 'IN PROGRESS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wardrobe-care_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "wardrobe-care_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wardrobe-care_ngo" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"contact_person" varchar(255) NOT NULL,
	"head_office_address" varchar(255) NOT NULL,
	"website" varchar(255) NOT NULL,
	"bio" text NOT NULL,
	"proof_of_registration_url" text NOT NULL,
	"tax_exemption_certificate_url" text NOT NULL,
	"registration_id" varchar(255) NOT NULL,
	CONSTRAINT "wardrobe-care_ngo_id_unique" UNIQUE("id"),
	CONSTRAINT "wardrobe-care_ngo_contact_person_unique" UNIQUE("contact_person"),
	CONSTRAINT "wardrobe-care_ngo_registration_id_unique" UNIQUE("registration_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wardrobe-care_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wardrobe-care_user_ngo" (
	"reg_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	CONSTRAINT "wardrobe-care_user_ngo_reg_id_unique" UNIQUE("reg_id"),
	CONSTRAINT "wardrobe-care_user_ngo_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wardrobe-care_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"password" varchar(255),
	"role" "role" DEFAULT 'USER',
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wardrobe-care_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "wardrobe-care_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wardrobe-care_account" ADD CONSTRAINT "wardrobe-care_account_user_id_wardrobe-care_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."wardrobe-care_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wardrobe-care_session" ADD CONSTRAINT "wardrobe-care_session_user_id_wardrobe-care_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."wardrobe-care_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "wardrobe-care_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "wardrobe-care_session" USING btree ("user_id");