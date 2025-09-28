import express from "express";
import dotenv from "dotenv";

// Load .env from root folder (one level up from backend)
dotenv.config({ path: "../.env" });

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
console.log("ENV TEST:", process.env.BETTER_AUTH_URL); // just to test

app.get("/", (req, res) => {
  res.send("Backend is reading env from root!");
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
process.stdin.resume();
