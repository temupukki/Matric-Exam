import express , {Request,Response} from "express";
const app = express();
app.use(express.json());
app.get("/" , (req:Request, res:Response)=>{
    res.json("this is my home of express and something else is happening here man")

})



app.listen(3000 , ()=>{
    console.log("Backend is running in the local host 300 manye ")

}

);