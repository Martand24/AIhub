import mongoose from "mongoose";

// const toolSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: String,
//   category: String,
//   website: String,
// });
const toolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String },             // ✅ New Field
    category: { type: String, required: true },
    pricing: { type: String, default: "Free" },  // ✅ New Field
    tags: [{ type: String }],            // ✅ New Field
    creator: { type: String },           // ✅ New Field
    features: { type: String },          // ✅ New Field
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // ✅ New Field
  },
  { timestamps: true }
);

export default mongoose.model("Tool", toolSchema);
