import express from "express";
import { createNews, deleteNews, getNews, getNewsById, updateNews } from "../controllers/newsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getNews);
router.get("/:id", getNewsById);
router.post("/", authMiddleware, adminMiddleware, createNews);
router.put("/:id", authMiddleware, adminMiddleware, updateNews);
router.delete("/:id", authMiddleware, adminMiddleware, deleteNews);

export default router;
