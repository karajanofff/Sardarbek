import express from "express";
import { getStats, getUsers } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/stats", authMiddleware, adminMiddleware, getStats);
router.get("/users", authMiddleware, adminMiddleware, getUsers);

export default router;
