import { drizzle } from "drizzle-orm/vercel-postgres";
import { Request, Response, NextFunction } from "express";
import {
  propertiesImageTable,
  propertiesTable,
  regions,
} from "../../../db/schema";
import { eq } from "drizzle-orm";
import { PropertyImageTable, PropertyTable, RegionTable } from "../../../types";
export default async function getRegion(req: Request, res: Response, next:NextFunction) {
  const db = drizzle();
  const params = parseInt(req.params.id);

  type Region = RegionTable["select"];
  type Property = PropertyTable["select"];
  type Image = PropertyImageTable["select"];
  try {


      const response = await db
  .select({
    region: regions,
    property: propertiesTable,
    image: propertiesImageTable,
  })
  .from(regions)
  .leftJoin(propertiesTable, eq(regions.id, propertiesTable.region_id))
  .leftJoin(propertiesImageTable, eq(propertiesTable.id, propertiesImageTable.property_id))
  .where(eq(regions.id, params));


  if (response.length === 0) {
    res.status(404).json({error:"Data tidak ada"})
    return next()
  }
   
  const result = response.reduce<
  Record<
    number,
    {
      region: Region;
      properties: Array<{
        property: Property;
        images: Image[];
      }>;
    }
  >
>((acc, row) => {
  const region = row.region;
  const property = row.property;
  const image = row.image;

  if (!region) return acc;

  if (!acc[region.id]) {
    acc[region.id] = { region, properties: [] };
  }

  if (property) {
    let propertyEntry = acc[region.id].properties.find(
      (p) => p.property.id === property.id
    );
    if (!propertyEntry) {
      propertyEntry = { property, images: [] };
      acc[region.id].properties.push(propertyEntry);
    }

    if (image) {
      propertyEntry.images.push(image);
    }
  }

  return acc;
}, {});


    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ data: error });
  }
}
