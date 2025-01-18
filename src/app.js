import 'dotenv/config'
import express from 'express'
import routes from './api/routes.js'


// app.get('/', (req, res) =>{
//     res.send("Hello world!")
// })



async function startServer() {
    const app = express()

    const port = process.env.PORT

    app.use(routes())

    app.listen(port, ()=>{
        console.log(`server berjalan di port ${port}`);
        
    }).on('error', err=>{
        process.exit(1)
    })
}

startServer();


// app.listen(port, ()=>{
//     console.log(`server berjalan di port ${port}`);
    
// })