import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tools, setTools] = useState([]);

  useEffect(() => {

    const fetchTools = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tools/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTools(res.data);
      } catch (err) {
        console.error("Error fetching user tools", err);
      }
    };

    if (user) {
      fetchTools();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-3xl">
        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-8">
          <img
            src={user?.profileImage || "https://i.pravatar.cc/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-md"
          />
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{user?.name}</h2>
            <p className="text-gray-600 mb-1">{user?.email}</p>
            <p className="text-purple-500 font-semibold">AI Enthusiast & Tool Contributor</p>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Submitted Tools</h3>

        {tools.length === 0 ? (
          <p className="text-gray-600">You haven't submitted any tools yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <div
                key={tool._id}
                className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold text-gray-800">{tool.name}</h4>
                <p className="text-gray-600 mb-2">{tool.description}</p>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline text-sm"
                >
                  Visit Tool →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
