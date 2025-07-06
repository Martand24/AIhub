import express from "express";
import { getReviews, addReview } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:toolId", getReviews);
router.post("/", protect, addReview);

export default router;
