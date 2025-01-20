import { relations } from "drizzle-orm";
import { integer, pgTable, real, text, varchar } from "drizzle-orm/pg-core";

export const propertiesTable = pgTable("properties", {
    id:integer('id').primaryKey(),
    name:varchar('name',{length:255}).notNull(),
    bed:integer('bed').notNull(),
    bath:integer('bath').notNull(),
    interior:real('interior').notNull(),
    lot:real('lot').notNull(),
    price: real("price"),
})


export const propertiesImageTable = pgTable("properties_images",{
    id:integer('id').primaryKey(),
    label:varchar('label',{
        length:255
    }).notNull(),
    source:text('source').notNull(),
    property_id: integer('property_id').references(()=>propertiesTable.id)
})

export const propertiesDetailTable = pgTable("properties_details",{
    id:integer('id').primaryKey(),
    title:varchar('title',{
        length:255
    }).notNull(),
    description:text('description').notNull(),
    property_id: integer('property_id').references(()=>propertiesTable.id)
})



// relation table property w
export const propertiesRelation = relations(propertiesTable, ({many})=>({
    images:many(propertiesImageTable),
    detail:many(propertiesDetailTable)
}))

// relation propertiesImages
export const propertiesImagesRelation = relations(propertiesImageTable, ({one})=>({
    property: one(propertiesTable, {
        fields: [propertiesImageTable.property_id],
        references:[propertiesTable.id]
    })
}))


// relation propertyDetail
export const propertiesDetailsRelation = relations(propertiesDetailTable, ({one})=>({
    property: one(propertiesTable, {
        fields: [propertiesDetailTable.property_id],
        references:[propertiesTable.id]
    })
}))


