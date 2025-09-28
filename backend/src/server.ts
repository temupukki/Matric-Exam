import express , {Request,Response} from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../../lib/auth";

const app = express();
const port = 3000;

// BetterAuth handler
app.all("/api/auth/*", toNodeHandler(auth));

// ✅ Simple GET route
app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from backend!" });
});


// Express JSON middleware (needed for POST)
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
