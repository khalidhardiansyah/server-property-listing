import { Request, Response,} from "express";
import { propertiesTable, propertiesImageTable } from "../../../db/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq } from "drizzle-orm";
import { PropertyImageTable, PropertyTable } from "../../../types";
export default async function getProperty(req:Request, res:Response){
    try {
        const db = drizzle()
        const params = parseInt(req.params.id)
        type Property = PropertyTable["select"]
        type Image = PropertyImageTable["select"]
        // if (isNaN(params)) {
        //     res.status(406).json({
        //         error: "parameter bukan angka"
        //     })
        // }
        

        const response = await db.select({
            property:propertiesTable,
            images:propertiesImageTable
        }).from(propertiesTable).where(eq(propertiesTable.id, params)).innerJoin(propertiesImageTable, eq(propertiesTable.id, propertiesImageTable.property_id))
     
        const result = response.reduce<Record<number,{property:Property; images:Image[]}>>((acc, row)=>{
            const property = row.property;
            const image = row.images;
            if (!acc[property.id]) {
                acc[property.id] = {property, images:[]};
            }
            if (image) {
                acc[property.id].images.push(image)
            }

            return acc
        },{})


        res.status(200).json({
            property: result
        })
       
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}