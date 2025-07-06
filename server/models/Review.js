import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  toolId: { type: mongoose.Schema.Types.ObjectId, ref: "Tool" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true },
  reviewText: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Review", reviewSchema);
