import { useState, useEffect } from "react";

const dummyTool = {
  id: "tool1",
  name: "ChatGPT",
  description: "AI Chatbot for conversations.",
};

const ToolDetails = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const toolId = dummyTool.id;

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(`reviews-${toolId}`)) || [];
    setReviews(storedReviews);
  }, [toolId]);

  const submitReview = (e) => {
    e.preventDefault();
    const newReview = { rating, reviewText, createdAt: new Date().toISOString() };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${toolId}`, JSON.stringify(updatedReviews));
    setRating(0);
    setReviewText("");
  };

  const averageRating =
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / (reviews.length || 1);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{dummyTool.name}</h2>
      <p className="mb-4">{dummyTool.description}</p>
      <div className="mb-4">
        <p>Average Rating: ⭐ {averageRating.toFixed(1)} / 5</p>
      </div>
      <form onSubmit={submitReview} className="space-y-4 mb-6">
        <div>
          <label className="block mb-1 font-semibold">Your Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Review:</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Review
        </button>
      </form>
      <div>
        <h3 className="text-xl font-bold mb-2">Reviews:</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review, idx) => (
            <div key={idx} className="border rounded p-3 mb-2 dark:bg-gray-800">
              <p className="font-semibold">⭐ {review.rating} / 5</p>
              <p>{review.reviewText}</p>
              <p className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ToolDetails;
