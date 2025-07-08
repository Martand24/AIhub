import Review from "../models/Review.js";

export const getReviews = async (req, res) => {
  const reviews = await Review.find({ toolId: req.params.toolId });
  res.json(reviews);
};

export const addReview = async (req, res) => {
  try {
    const { rating, reviewText } = req.body;

    const review = new Review({
      tool: req.params.toolId,
      user: req.user.id,  // comes from JWT in auth middleware
      rating,
      reviewText,
    });

    await review.save();

    // Populate user's name after save
    const populatedReview = await review.populate("user", "name");

    res.status(201).json(populatedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

