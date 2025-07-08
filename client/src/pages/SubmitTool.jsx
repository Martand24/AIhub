 import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubmitTool = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    description: "",
    link: "",
    image: "",
    category: "",
    pricing: "Free",
    tags: "",
    creator: "",
    features: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token) {
      setError("You must be logged in to submit a tool.");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/tools`,
        { ...form, tags: form.tags.split(",").map((t) => t.trim()), submittedBy: user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Tool submitted successfully!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit tool");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Submit Your AI Tool
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Tool Name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="creator"
              placeholder="Creator / Company"
              value={form.creator}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <select
              name="pricing"
              value={form.pricing}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="Free">Free</option>
              <option value="Freemium">Freemium</option>
              <option value="Paid">Paid</option>
            </select>
            <input
              type="text"
              name="image"
              placeholder="Tool Image URL"
              value={form.image}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma-separated)"
              value={form.tags}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full border p-2 rounded"
            required
          ></textarea>
          <textarea
            name="features"
            placeholder="Key Features (optional)"
            value={form.features}
            onChange={handleChange}
            rows="2"
            className="w-full border p-2 rounded"
          ></textarea>
          <input
            type="text"
            name="link"
            placeholder="Official Website Link"
            value={form.link}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            🚀 Submit Tool
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitTool;
