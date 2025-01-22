import "dotenv/config";
import express from "express";
import { Response, Request } from "express";
import routes from "./api/";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { seed } from "drizzle-seed";
import { count } from "drizzle-orm";
import { regions } from "./db/schema";


async function startServer() {
    const db = drizzle();

    //   const prop = [{
    //     id:1,
    //     name:"Bantul",
    //     source:'https://picsum.photos/seed/picsum/2500/1500',
        
    //   },
    //   {
    //     id:2,
    //     name:"Yogyakarta",
    //     source:'https://picsum.photos/seed/picsum/2500/1500',
        
    //   },
    //   {
    //     id:3,
    //     name:"sleman",
    //     source:'https://picsum.photos/seed/picsum/2500/1500',
        
    //   },
    //   {
    //     id:4,
    //     name:"gunung kidu;",
    //     source:'https://picsum.photos/seed/picsum/2500/1500',
        
    //   },
    //   {
    //     id:5,
    //     name:"kulon progo",
    //     source:'https://picsum.photos/seed/picsum/2500/1500',
      
    //   },
     
    // ];

    
    // for (let index = 0; index < prop.length; index++) {
    //     await db.insert(regions).values(prop[index]);
    //     console.log("berhasil dibuat");
    // }


    
    

    const app = express();

    const port = process.env.PORT;

    app.use(routes());
    app.get('/', (req:Request, res:Response)=>res.send({data:"Berhasil"}))

    app
        .listen(port,() => {
            console.log(`server berjalan di port ${port}`);
        })
        .on("error", (err) => {
            process.exit(1);
        });
}

startServer();

