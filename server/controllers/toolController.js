import Tool from "../models/Tool.js";

export const getTools = async (req, res) => {
  const tools = await Tool.find();
  res.json(tools);
};

export const createTool = async (req, res) => {
  const tool = await Tool.create(req.body);
  res.json(tool);
};
