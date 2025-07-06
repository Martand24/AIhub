import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
export default function ToolCard({ tool }) {
      const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(tool.name));
  }, [tool.name]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;
    if (favorites.includes(tool.name)) {
      updatedFavorites = favorites.filter((name) => name !== tool.name);
    } else {
      updatedFavorites = [...favorites, tool.name];
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition p-4">
      <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
      <p className="text-gray-600 mb-4">{tool.description.slice(0, 100)}...</p>
      <Link to={`/tool/${tool.id}`} className="text-blue-500 hover:underline">View Details</Link>
      <button
        onClick={toggleFavorite}
        className={`mt-2 ml-20 px-3 py-1 rounded ${
          isFavorite ? "bg-red-500 text-white" : "bg-gray-300"
        }`}
      >
        {isFavorite ? "❤️ Saved" : "🤍 Save"}
      </button>
    </div>
  );
}