import express,{Request,Response} from "express";
const app = express();
const port = 3000;
app.use(express.json)

app.get("/",(req:Request,res:Response) => {
    res.json({message:"Abebe beso bela man"})
})
app.listen(port ,()=>{
    console.log("BACKEND IS LIStENING IN THE PORT 3000")
})