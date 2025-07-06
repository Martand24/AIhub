import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function Navbar() {
      const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold">AI HUB</Link>
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/submit" className="hover:underline">Submit Tool</Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-700 px-2 py-1 rounded"
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
          <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </nav>
  );
}