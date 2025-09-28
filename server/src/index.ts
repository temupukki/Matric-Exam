import express, { Request, Response } from "express";


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Abebe beso bela man" });
});

app.get("/mans", (req: Request, res: Response) => {
    res.json("who knows who knows man");
});

app.listen(port, () => {
    console.log(`BACKEND IS LISTENING ON PORT ${port}`);
}).on('error', (err) => {
    console.error('Server error:', err);
});