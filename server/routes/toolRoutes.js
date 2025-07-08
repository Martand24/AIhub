import express from "express";
import { getToolById, getTools, createTool } from "../controllers/toolController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/:id", getToolById);
router.get("/", getTools);
router.post("/", protect, createTool);

export default router;
