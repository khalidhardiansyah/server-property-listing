import { Router } from "express";
import property from "./routes/property";
import region from "./routes/region";

export default function routes(){
    const app = Router()
    property(app)
    region(app)


    return app
}

