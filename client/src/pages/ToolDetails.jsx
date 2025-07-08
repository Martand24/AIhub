

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ToolDetails = () => {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const [tool, setTool] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/tools/${id}`);
        setTool(res.data.tool);
        setReviews(res.data.reviews);
      } catch (err) {
        console.error("Failed to fetch tool data", err);
        setError("Failed to load tool data");
      }
    };
    fetchData();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [id, API_URL]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/tools/${id}`);
      setReviews(res.data.reviews);
    } catch (err) {
      console.error("Failed to refresh reviews", err);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to submit a review.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/reviews/${id}`,
        { rating, reviewText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review submitted!");
      await fetchReviews();  // Auto-refresh reviews
      setRating(0);
      setReviewText("");
    } catch (err) {
      console.error(err);
      setError("Failed to submit review");
    }
  };

  const averageRating =
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / (reviews.length || 1);

  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!tool) return <div className="p-6 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-6 flex justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full p-8">
        {/* Tool Info */}
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={tool.image}
            alt={tool.name}
            className="w-48 h-48 object-cover rounded-xl border shadow-lg"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{tool.name}</h2>
            <p className="text-gray-700 mb-3">{tool.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              <span className="font-semibold">Category:</span> {tool.category} •{" "}
              <span className="font-semibold">Pricing:</span> {tool.pricing}
            </p>
            {tool.creator && (
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-semibold">Creator:</span> {tool.creator}
              </p>
            )}
            {tool.tags?.length > 0 && (
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-semibold">Tags:</span> {tool.tags.join(", ")}
              </p>
            )}
            {tool.features && (
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-semibold">Features:</span> {tool.features}
              </p>
            )}
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition mt-2"
            >
              Visit Tool ↗
            </a>
            <p className="mt-4 text-lg font-semibold">
              Average Rating:{" "}
              <span className="text-yellow-500">
                {"⭐".repeat(Math.round(averageRating))}
              </span>{" "}
              ({averageRating.toFixed(1)} / 5)
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Review Form */}
        {user ? (
          <form onSubmit={submitReview} className="space-y-4 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Leave a Review</h3>
            <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Rate This Tool:</h2>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="text-3xl focus:outline-none"
          >
            <span className={star <= rating ? "text-yellow-500" : "text-gray-400"}>
              ★
            </span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-gray-700 text-lg">
        {rating > 0 ? `You rated: ${rating} star(s)` : "Click to rate"}
      </p>
    </div>
            <div>
              <label className="block mb-1 font-semibold">Your Review:</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full border p-2 rounded"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-gray-700 mb-8">
            🔒 Please log in to submit a review.
          </p>
        )}

        {/* Reviews */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">All Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet.</p>
          ) : (
            reviews.map((review, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-4 mb-4 shadow-sm bg-gray-50"
              >
                <p className="font-semibold text-yellow-500">
                  {"⭐".repeat(review.rating)} ({review.rating} / 5)
                </p>
                <p className="text-gray-700 mb-2">{review.reviewText}</p>
                <p className="text-xs text-gray-500">
                  By <span className="font-semibold">{review.user?.name || "Anonymous"}</span> •{" "}
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolDetails;
