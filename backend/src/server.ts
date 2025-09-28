import express, { Request, Response } from "express";

const app = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Backend is working!" });
});
app.get("/hello",(req:Request,res:Response)=>{
    res.json("hello fellas my name is the dude whoknow evrthing man")
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// Keep process alive (optional, usually not needed)
process.stdin.resume();
