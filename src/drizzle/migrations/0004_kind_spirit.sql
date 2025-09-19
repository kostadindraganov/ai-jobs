ALTER TABLE "job_listings" ALTER COLUMN "wageCurrencyInterval" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."job_listings_wage_currency_interval";--> statement-breakpoint
CREATE TYPE "public"."job_listings_wage_currency_interval" AS ENUM('USD', 'EUR');--> statement-breakpoint
ALTER TABLE "job_listings" ALTER COLUMN "wageCurrencyInterval" SET DATA TYPE "public"."job_listings_wage_currency_interval" USING "wageCurrencyInterval"::"public"."job_listings_wage_currency_interval";