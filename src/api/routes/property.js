import { Router } from "express"
import { allProperty } from "../controller/property/propertyController.js"
const route = Router()


export default function property(app){
app.use("/properties", route)

route.get('/', allProperty)
}