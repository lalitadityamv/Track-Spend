CREATE TABLE IF NOT EXISTS "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	
	"name" text NOT NULL,
	"user_id" text NOT NULL
);
ALTER TABLE "accounts" ADD COLUMN "plaid id" text;
