import { pgTable, integer, varchar, real, foreignKey, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const properties = pgTable("properties", {
	id: integer().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	bed: integer().notNull(),
	bath: integer().notNull(),
	interior: real().notNull(),
	lot: real().notNull(),
	price: real(),
});

export const propertiesDetails = pgTable("properties_details", {
	id: integer().primaryKey().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	propertyId: integer("property_id"),
}, (table) => [
	foreignKey({
			columns: [table.propertyId],
			foreignColumns: [properties.id],
			name: "properties_details_property_id_properties_id_fk"
		}),
]);

export const propertiesImages = pgTable("properties_images", {
	id: integer().primaryKey().notNull(),
	label: varchar({ length: 255 }).notNull(),
	source: text().notNull(),
	propertyId: integer("property_id"),
}, (table) => [
	foreignKey({
			columns: [table.propertyId],
			foreignColumns: [properties.id],
			name: "properties_images_property_id_properties_id_fk"
		}),
]);
