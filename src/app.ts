import "dotenv/config";
import express from "express";
import { Response, Request } from "express";
import routes from "./api/";
import { drizzle } from "drizzle-orm/vercel-postgres";
    const db = drizzle();
    const app = express();
    app.use(routes());
    app.get('/', (req:Request, res:Response)=>res.send({data:"Berhasil"}))

export default app;

