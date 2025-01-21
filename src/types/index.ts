import { propertiesDetailTable, propertiesImageTable, propertiesTable, regions } from "../db/schema";
export type PropertyTable =  {
    select: typeof propertiesTable.$inferSelect,
    insert: typeof propertiesTable.$inferInsert
}

export type PropertyImageTable =  {
    select: typeof propertiesImageTable.$inferSelect,
    insert: typeof propertiesImageTable.$inferInsert
}

export type PropertyDetailTable =  {
    select: typeof propertiesDetailTable.$inferSelect,
    insert: typeof propertiesDetailTable.$inferInsert
}


export type RegionTable =  {
    select: typeof regions.$inferSelect,
    insert: typeof regions.$inferInsert
}