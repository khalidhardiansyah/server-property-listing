import { Router, Request, Response } from "express"
import { allProperty } from "../controller/property/propertyController"
const route = Router()


export default function property(app:Router){
app.use("/properties", route)

route.get('/',allProperty)
}