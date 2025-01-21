import { drizzle } from "drizzle-orm/vercel-postgres";
import { Request, Response } from "express";
import {
  propertiesTable,
  propertiesImageTable,
  propertiesDetailTable,
} from "../../../db/schema";
import { eq } from "drizzle-orm";
import { PropertyDetailTable, PropertyImageTable, PropertyTable } from "../../../types";

const getAllProperty = async (req: Request, res: Response): Promise<void> => {
  type Property = PropertyTable["select"];
  type Image = PropertyImageTable["select"];
  type Detail = PropertyDetailTable["select"];
  try {
    const db = drizzle();
    const response = await db
      .select({
        properties: propertiesTable,
        images: propertiesImageTable,
        details: propertiesDetailTable,
      })
      .from(propertiesTable)
      .innerJoin(
        propertiesImageTable,
        eq(propertiesTable.id, propertiesImageTable.property_id)
      )
      .innerJoin(
        propertiesDetailTable,
        eq(propertiesTable.id, propertiesDetailTable.property_id)
      );

    const result: Record<
      number,
      {
        property: Property;
        images: Image[];
        details: Detail[];
      }
    > = response.reduce<
      Record<number, { property: Property; images: Image[]; details: Detail[] }>
    >((acc, row) => {
      const property = row.properties;
      const image = row.images;
      const detail = row.details;

      if (!acc[property.id]) {
        acc[property.id] = {
          property,
          images: [],
          details: [],
        };
      }
      if (image) {
        acc[property.id].images.push(image);
      }
      if (detail) {
        acc[property.id].details.push(detail);
      }

      return acc;
    }, {});
    res.status(200).json({
      properties: result,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export { getAllProperty };
