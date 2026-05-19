import jwt from "jsonwebtoken";
import { readJSON } from "../utils/fileDB.js";

const JWT_SECRET = process.env.JWT_SECRET || "sardorbek-demo-secret";

export async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Avtorizatsiya talab qilinadi" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const users = await readJSON("users.json");
    const user = users.find((item) => item.id === decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Foydalanuvchi topilmadi" });
    }

    const { password, ...safeUser } = user;
    req.user = safeUser;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token noto'g'ri yoki muddati tugagan" });
  }
}
