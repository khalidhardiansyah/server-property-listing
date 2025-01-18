import { relations } from "drizzle-orm/relations";
import { properties, propertiesDetails, propertiesImages } from "./schema";

export const propertiesDetailsRelations = relations(propertiesDetails, ({one}) => ({
	property: one(properties, {
		fields: [propertiesDetails.propertyId],
		references: [properties.id]
	}),
}));

export const propertiesRelations = relations(properties, ({many}) => ({
	propertiesDetails: many(propertiesDetails),
	propertiesImages: many(propertiesImages),
}));

export const propertiesImagesRelations = relations(propertiesImages, ({one}) => ({
	property: one(properties, {
		fields: [propertiesImages.propertyId],
		references: [properties.id]
	}),
}));