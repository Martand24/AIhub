
import { useState } from "react";
import ToolCard from "../components/ToolCard";

const categories = ["All", "Chatbot", "Image", "Coding"];


const tools = [
  { name: "ChatGPT", description: "AI Chatbot", link: "https://chat.openai.com", category: "Chatbot" },
  { name: "MidJourney", description: "Image Generator", link: "https://www.midjourney.com/", category: "Image" },
  { name: "GitHub Copilot", description: "Coding Assistant", link: "https://github.com/features/copilot", category: "Coding" },
];

const Home = () => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, idx) => (
          <ToolCard key={idx} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default Home;
