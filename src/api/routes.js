import { Router } from "express";
import property from "./routes/property.js"

export default function routes(){
    const app = Router()
    property(app)


    return app
}

