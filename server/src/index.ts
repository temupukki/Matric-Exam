import express, { Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";

const app = express();
const port = 3000;

app.all("/api/auth/*", toNodeHandler(auth)); // Express 5.x

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
   
    credentials: true,
  })
);
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "here is the updated one man" });
});
// Test route to check if server is working
app.get("/api/test", (req, res) => {
  res.json({
    message: "Server is working with Better Auth!",
    timestamp: new Date().toISOString(),
    authEndpoints: {
      signup: "POST /api/auth/signup/email",
      signin: "POST /api/auth/signin/email",
      session: "GET /api/auth/session",
      google: "GET /api/auth/oauth/google",
    },
  });
});

app.listen(port, () => {
  console.log(`Backend  listening on port ${port}`);
});
