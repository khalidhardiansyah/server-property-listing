import "dotenv/config";
import express from "express";
import routes from "./api/routes.js";
import { propertiesTable, propertiesDetailTable, propertiesImageTable } from "./db/schema.js";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { seed } from "drizzle-seed";
import { count } from "drizzle-orm";

// app.get('/', (req, res) =>{
//     res.send("Hello world!")
// })

async function startServer() {
    const db = drizzle();

    //   const prop = [{
    //     id:1,
    //     label:"gambar",
    //     source:'https://picsum.photos/seed/picsum/2500/1500',
    //     property_id:1
    //   },
    //   {
    //     id:2,
    //     label:"gambar",
    //     source:'https://picsum.photos/seed/picsum/2500/1500',
    //     property_id:1
    //   },
    //   {
    //     id:3,
    //     label:"gambar",
    //     source:'https://picsum.photos/seed/picsum/2500/1500',
    //     property_id:1
    //   },
    //   {
    //     id:4,
    //     label:"gambar",
    //     source:'https://picsum.photos/seed/picsum/2500/1500',
    //     property_id:1
    //   },
    //   {
    //     id:5,
    //     label:"gambar",
    //     source:'https://picsum.photos/seed/picsum/2500/1500',
    //     property_id:2
    //   },
    //   {
    //     id:6,
    //     label:"gambar",
    //     source:'https://picsum.photos/seed/picsum/2500/1500',
    //     property_id:2
    //   },
    //   {
    //     id:7,
    //     label:"gambar",
    //     source:'https://picsum.photos/seed/picsum/2500/1500',
    //     property_id:2
    //   },
    //   {
    //     id:8,
    //     label:"gambar",
    //     source:'https://picsum.photos/seed/picsum/2500/1500',
    //     property_id:2
    //   },
    // ];

    
    // for (let index = 0; index < prop.length; index++) {
    //     await db.insert(propertiesImageTable).values(prop[index]);
    //     console.log("berhasil dibuat");
    // }


    
    

    const app = express();

    const port = process.env.PORT;

    app.use(routes());

    app
        .listen(port, () => {
            console.log(`server berjalan di port ${port}`);
        })
        .on("error", (err) => {
            process.exit(1);
        });
}

startServer();

// app.listen(port, ()=>{
//     console.log(`server berjalan di port ${port}`);

// })
