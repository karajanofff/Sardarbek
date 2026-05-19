import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nextId, readJSON, writeJSON } from "../utils/fileDB.js";

const signToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

const publicUser = (user) => {
  const { password, ...safe } = user;
  return safe;
};

async function comparePassword(password, storedPassword) {
  if (storedPassword?.startsWith("$2")) {
    return bcrypt.compare(password, storedPassword);
  }
  return password === storedPassword;
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Barcha maydonlarni to'ldiring" });
    }

    const users = await readJSON("users.json");
    const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.status(409).json({ message: "Bu email allaqachon ro'yxatdan o'tgan" });
    }

    const newUser = {
      id: nextId(users),
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: "user",
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await writeJSON("users.json", users);

    res.status(201).json({ token: signToken(newUser), user: publicUser(newUser) });
  } catch (error) {
    res.status(500).json({ message: "Ro'yxatdan o'tishda xatolik", error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const users = await readJSON("users.json");
    const user = users.find((item) => item.email.toLowerCase() === String(email).toLowerCase());

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Email yoki parol noto'g'ri" });
    }

    if (!user.password.startsWith("$2")) {
      user.password = await bcrypt.hash(password, 10);
      await writeJSON("users.json", users);
    }

    res.json({ token: signToken(user), user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ message: "Kirishda xatolik", error: error.message });
  }
}

export async function profile(req, res) {
  res.json(req.user);
}
