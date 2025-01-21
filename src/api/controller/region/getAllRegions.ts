import { drizzle } from "drizzle-orm/vercel-postgres";
import { Request, Response } from "express";
import { regions } from "../../../db/schema";
export default async function getAllRegions(req:Request, res:Response):Promise<void>{
    const db = drizzle()
   try {
    const response = await db.select().from(regions)
    res.status(200).json({data:response})
   } catch (error) {
    res.status(400).json({data:error})
    
   }
}