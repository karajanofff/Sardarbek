import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bcrypt from "bcryptjs";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { readJSON, writeJSON } from "./utils/fileDB.js";

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function isAllowedOrigin(origin) {
  if (!origin || allowedOrigins.includes(origin)) {
    return true;
  }

  try {
    const { hostname } = new URL(origin);
    return hostname.endsWith(".onrender.com");
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS origin ruxsat etilmagan"));
    },
    credentials: true
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Sardor-Ekitob.uz API ishlayapti" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint topilmadi" });
});

async function ensureDemoAccounts() {
  const users = await readJSON("users.json");

  const demoAccounts = [
    {
      name: "Administrator",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
      createdAt: "2026-01-01T09:00:00.000Z"
    },
    {
      name: "Demo User",
      email: "user@gmail.com",
      password: "user123",
      role: "user",
      createdAt: "2026-05-07T07:01:55.441Z"
    }
  ];

  let changed = false;

  for (const account of demoAccounts) {
    const user = users.find((item) => item.email.toLowerCase() === account.email);
    if (!user) {
      users.push({
        id: String(users.length ? Math.max(...users.map((item) => Number(item.id) || 0)) + 1 : 1),
        name: account.name,
        email: account.email,
        password: await bcrypt.hash(account.password, 10),
        role: account.role,
        createdAt: account.createdAt
      });
      changed = true;
      continue;
    }

    const passwordMatches = user.password?.startsWith("$2")
      ? await bcrypt.compare(account.password, user.password)
      : user.password === account.password;

    if (!passwordMatches || user.role !== account.role || user.name !== account.name) {
      user.name = account.name;
      user.password = await bcrypt.hash(account.password, 10);
      user.role = account.role;
      changed = true;
    }
  }

  if (changed) {
    await writeJSON("users.json", users);
  }
}

ensureDemoAccounts()
  .then(() => {
    app.listen(PORT, () => console.log(`Sardor-Ekitob.uz API http://localhost:${PORT} da ishga tushdi`));
  })
  .catch((error) => {
    console.error("Serverni ishga tushirishda xatolik:", error);
    process.exit(1);
  });
