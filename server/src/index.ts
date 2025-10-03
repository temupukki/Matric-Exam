import express, { Request, Response } from "express";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import prisma from "./lib/prisma";
const app = express();
const port = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  })
);
app.all("/api/auth/*", toNodeHandler(auth)); 
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  })
);
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "The backend is running in the online man !" });
});

app.get("/api/me",async (req:Request,res:Response)=>{
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })
  return res.json(session);
})
app.post("/pay", async (req, res) => {
  try {
    const {email,pack,evidence } = req.body;

    const user = await prisma.payment.create({
      data: {
        email,
        pack,
        evidence
      },
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({});
  }
});
app.listen(port, () => {
  console.log(`Backend  listening on port ${port}`);
});
