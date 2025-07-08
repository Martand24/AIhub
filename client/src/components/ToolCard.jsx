
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ToolCard({ tool }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(tool._id));
  }, [tool._id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;
    if (favorites.includes(tool._id)) {
      updatedFavorites = favorites.filter((id) => id !== tool._id);
    } else {
      updatedFavorites = [...favorites, tool._id];
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition p-4 border-l-8"
      style={{ borderColor: 'linear-gradient(to bottom, #a855f7, #ec4899)' }}
    >
      <img
        src={tool.image && tool.image.trim() !== "" ? tool.image : "https://placehold.co/300x200?text=No+Image"}
        alt={tool.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/300x200?text=No+Image";
        }}
      />
      <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
      <p className="text-gray-600 mb-2">{tool.description.slice(0, 80)}...</p>
      <p className="text-sm text-gray-500 mb-2">
        <span className="font-medium">Category:</span> {tool.category} | 
        <span className="ml-1 font-medium">Pricing:</span> {tool.pricing}
      </p>
      <div className="flex justify-between items-center">
        <Link
          to={`/tools/${tool._id}`}
          className="text-blue-500 hover:underline font-medium"
        >
          View Details
        </Link>
        <button
          onClick={toggleFavorite}
          className={`px-3 py-1 rounded text-sm ${
            isFavorite ? "bg-red-500 text-white" : "bg-gray-300"
          }`}
        >
          {isFavorite ? "❤️ Saved" : "🤍 Save"}
        </button>
      </div>
    </motion.div>
  );
}
