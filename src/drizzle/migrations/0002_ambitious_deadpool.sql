ALTER TABLE "job_listings" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."job_listings_type";--> statement-breakpoint
CREATE TYPE "public"."job_listings_type" AS ENUM('internship', 'part-time', 'full-time', 'contract');--> statement-breakpoint
ALTER TABLE "job_listings" ALTER COLUMN "type" SET DATA TYPE "public"."job_listings_type" USING "type"::"public"."job_listings_type";