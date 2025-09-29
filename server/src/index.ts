import express , {Request,Response} from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();
const port = 3000;


app.use(express.json());
app.get("/",(req:Request,res:Response)=>{
res.json({message:"abebe beso bela man how can you relate man "})
})

app.listen(port, () => {
	console.log(`Backend  listening on port ${port}`);
});