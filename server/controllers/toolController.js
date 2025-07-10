import Tool from "../models/Tool.js";
import Review from "../models/Review.js";

export const getTools = async (req, res) => {
  const tools = await Tool.find();
  res.json(tools);
};

export const createTool = async (req, res) => {
  try {
    const {
      name,
      description,
      link,
      image,
      category,
      pricing,
      tags,
      creator,
      features,
      submittedBy,
    } = req.body;

    const newTool = await Tool.create({
      name,
      description,
      link,
      image,
      category,
      pricing,
      tags,
      creator,
      features,
      submittedBy,
    });

    res.status(201).json(newTool);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create tool" });
  }
};



export const getToolById =  async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ message: "Tool not found" });

    const reviews = await Review.find({ tool: req.params.id })
      .populate("user", "name")  
      .sort({ createdAt: -1 });

    res.json({ tool, reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
