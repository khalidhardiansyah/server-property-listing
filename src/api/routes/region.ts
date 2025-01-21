import { Router } from "express";
import getAllRegions from "../controller/region/getAllRegions";
import getRegion from "../controller/region/getRegions";

const route = Router()
export default function region(app:Router) {
    app.use("/regions", route )

    route.get('/', getAllRegions)
    route.get('/:id', getRegion )

}