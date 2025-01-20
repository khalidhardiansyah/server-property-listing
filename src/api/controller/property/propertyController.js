import { drizzle } from "drizzle-orm/vercel-postgres";
import { propertiesDetailTable, propertiesImageTable, propertiesTable } from "../../../db/schema.js";
import { eq } from "drizzle-orm";

const allProperty = async (req, res)=>{
    try {
        const db = drizzle()
        const response = await db.select({
            properties:propertiesTable,
            images:propertiesImageTable,
            details:propertiesDetailTable,
        }).from(propertiesTable).leftJoin(propertiesImageTable, eq(propertiesTable.id, propertiesImageTable.property_id))
                                .leftJoin(propertiesDetailTable, eq(propertiesTable.id, propertiesDetailTable.property_id))
        
        
        const result = response.reduce((acc, row) =>{
            const property = row.properties;
            const image = row.images
            const detail = row.details

            if (!acc[property.id]) {
                acc[property.id] ={
                    property, images:[], details:[]
                }
            }
            if (image) {
                acc[property.id].images.push(image)
            }
            if (detail) {
                acc[property.id].details.push(detail)
            }
            
            return acc

        },{})        
            res.status(200).json({
            properties:result
        })
    } catch (error) {
        res.status(500).json("response")
        
    }
}


export {
    allProperty
}