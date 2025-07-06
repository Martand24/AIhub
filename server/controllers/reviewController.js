import Review from "../models/Review.js";

export const getReviews = async (req, res) => {
  const reviews = await Review.find({ toolId: req.params.toolId });
  res.json(reviews);
};

export const addReview = async (req, res) => {
  const review = await Review.create({
    ...req.body,
    userId: req.user.id,
  });
  res.json(review);
};
