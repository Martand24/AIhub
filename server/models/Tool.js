import mongoose from "mongoose";

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  website: String,
});

export default mongoose.model("Tool", toolSchema);
