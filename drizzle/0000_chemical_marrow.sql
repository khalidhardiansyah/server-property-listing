CREATE TABLE "properties_details" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"property_id" integer
);
--> statement-breakpoint
CREATE TABLE "properties_images" (
	"id" integer PRIMARY KEY NOT NULL,
	"label" varchar(255) NOT NULL,
	"source" text NOT NULL,
	"property_id" integer
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"bed" integer NOT NULL,
	"bath" integer NOT NULL,
	"interior" real NOT NULL,
	"lot" real NOT NULL,
	"price" real
);
--> statement-breakpoint
ALTER TABLE "properties_details" ADD CONSTRAINT "properties_details_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties_images" ADD CONSTRAINT "properties_images_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;