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

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
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

async function normalizeAdminPassword() {
  const users = await readJSON("users.json");
  const admin = users.find((user) => user.email === "admin@gmail.com");
  if (admin && !admin.password.startsWith("$2")) {
    admin.password = await bcrypt.hash(admin.password, 10);
    await writeJSON("users.json", users);
  }
}

normalizeAdminPassword()
  .then(() => {
    app.listen(PORT, () => console.log(`Sardor-Ekitob.uz API http://localhost:${PORT} da ishga tushdi`));
  })
  .catch((error) => {
    console.error("Serverni ishga tushirishda xatolik:", error);
    process.exit(1);
  });
