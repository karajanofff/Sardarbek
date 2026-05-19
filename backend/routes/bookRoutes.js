import express from "express";
import { createBook, deleteBook, getBookById, getBooks, updateBook } from "../controllers/bookController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", authMiddleware, adminMiddleware, createBook);
router.put("/:id", authMiddleware, adminMiddleware, updateBook);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBook);

export default router;
