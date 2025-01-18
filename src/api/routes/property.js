import { Router } from "express"
const route = Router()


export default function property(app){
app.use("/properties", route)

route.get('/', (req, res)=>{
    return res.json({
        data:"halo ini property"
    })
})
}