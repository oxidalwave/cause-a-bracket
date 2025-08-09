ALTER TABLE "bracket" ALTER COLUMN "category_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "bracket" ALTER COLUMN "descriptor_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "entry" ALTER COLUMN "category_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "match" ALTER COLUMN "bracket_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "match" ALTER COLUMN "left_entry_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "match" ALTER COLUMN "right_entry_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "vote" ALTER COLUMN "match_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "vote" ALTER COLUMN "entry_id" SET DATA TYPE integer;