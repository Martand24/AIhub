import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  tool: { type: mongoose.Schema.Types.ObjectId, ref: "Tool" , required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  reviewText: {type : String, required : true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Review", reviewSchema);
