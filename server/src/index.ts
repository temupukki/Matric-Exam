import express , {Request,Response} from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();
const port = 3000;

app.all("/api/auth/*splat", toNodeHandler(auth)); // Express 5.x



app.use(express.json());
app.get("/",(req:Request,res:Response)=>{
res.json({message:"here is the updated one man"})
})
app.get("/ber",(req:Request,res:Response)=>{
    res.json({
        message:"kfet belew berun ye getawn man"
    })
})
app.listen(port, () => {
	console.log(`Backend  listening on port ${port}`);
});