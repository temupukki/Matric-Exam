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

app.get("/api/me", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});
app.post("/api/pay", async (req, res) => {
  try {
    const { email, pack,evidence } = req.body;

    const user = await prisma.payment.create({
      data: {
        email,
        pack,
        evidence,
      },
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({});
  }
});

app.get("/api/paid", async (req: Request, res: Response) => {
  try {
    const payments = await prisma.payment.findMany(); // 👈 match your schema
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});
app.get("/api/user", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany(); // 👈 match your schema
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
app.patch("/api/user/:id/role", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validate role exists
    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }

    // Validate role value
    const validRoles = ["USER", "ADMIN", "NATURAL", "SOCIAL", "BOTH"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        error: "Invalid role",
        validRoles: validRoles,
      });
    }

    // Check if user exists first
    const existingUser = await prisma.user.findUnique({
      where: { id: String(id) },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update role in DB
    const updatedUser = await prisma.user.update({
      where: { id: String(id) },
      data: {
        role,
        updatedAt: new Date(), // Ensure updatedAt is refreshed
      },
    });

    res.json({
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Error updating role:", error);

    // Handle Prisma specific errors

    res.status(500).json({ error: "Failed to update role" });
  }
});
app.post("/api/support", async (req, res) => {
  try {
    const { name, email, category, issueType, subject, description, urgency } =
      req.body;

    const user = await prisma.supportTicket.create({
      data: {
        name,
        email,
        category,
        issueType,
        subject,
        description,
        urgency,
      },
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({});
  }
});
app.get("/api/questions", async (req: Request, res: Response) => {
  try {
    const questions = await prisma.supportTicket.findMany(); // 👈 match your schema
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Customer Questions" });
  }
});


app.post("/api/support", async (req, res) => {
  try {
    const { name, email, category, issueType, subject, description, urgency } =
      req.body;

    const user = await prisma.supportTicket.create({
      data: {
        name,
        email,
        category,
        issueType,
        subject,
        description,
        urgency,
      },
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({});
  }
});

app.patch("/api/question/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["open", "in-progress", "resolved", "closed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedTicket = await prisma.supportTicket.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(), 
      },
    });

    res.json(updatedTicket);
  } catch (err) {
    console.error("Error updating ticket:", err);

    res.status(500).json({ error: "Failed to update ticket" });
  }
});

app.listen(port, () => {
  console.log(`Backend  listening on port ${port}`);
});
