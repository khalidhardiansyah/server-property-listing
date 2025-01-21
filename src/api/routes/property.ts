import { Router, Request, Response } from "express"
import { getAllProperty } from "../controller/property/getAllProperty"
import  getProperty from "../controller/property/getProperty"
const route = Router()


export default function property(app:Router){
app.use("/properties", route)

route.get('/',getAllProperty)
route.get('/:id', getProperty)
}