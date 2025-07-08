import Tool from "../models/Tool.js";

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


export const getToolById = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }
    res.json(tool);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
