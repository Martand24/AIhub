import axios from 'axios';
import { useState, useEffect } from "react";
import ToolCard from "../components/ToolCard";
const categories = ["All", "Chatbot", "Image", "Coding"];


// const tools = [
//   { name: "ChatGPT", description: "AI Chatbot", link: "https://chat.openai.com", category: "Chatbot" },
//   { name: "MidJourney", description: "Image Generator", link: "https://www.midjourney.com/", category: "Image" },
//   { name: "GitHub Copilot", description: "Coding Assistant", link: "https://github.com/features/copilot", category: "Coding" },
// ];

const Home = () => {
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true);
  const[error, setError] = useState("");

  useEffect(() => {
    const fetchTools = async() => {
        try{
          const res=await axios.get(`${import.meta.env.VITE_API_URL}/tools`);
          setTools(res.data);
          setLoading(false);
        }
        catch (err){
          setError("Failed to load tools");
          setLoading(false);
        }
    };
    fetchTools();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Discover AI Tools</h2>
      <input
        type="text"
        placeholder="Search tools..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <div className="flex gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {loading && <p>Loading tools...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {
        loading?
        Array.from({length: 6}).map((_, idx) => {
                        <div
                key={idx}
                className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-72 animate-pulse"
              ></div>
        }):filteredTools.map((tool, idx) => (
          <ToolCard key={idx} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default Home;
