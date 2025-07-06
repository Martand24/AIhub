import express from "express";
import { getTools, createTool } from "../controllers/toolController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTools);
router.post("/", protect, createTool);

export default router;
