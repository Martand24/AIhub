import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function Navbar() {
      const [darkMode, setDarkMode] = useState(false);
      const [user, setUser] = useState(null);
      const navigate =useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(()=>{
    const storedUser = localStorage.getItem("user");
    if (storedUser){
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleProfileClick= ()=> {
    navigate("/profile");
  }

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
          {
            user? (
              <img src={user.profileImage || "https://i.pravatar.cc/150"} alt="Profile" className='w-10 h-10 border-2 rounded-full border-white cursor-pointer' onClick={handleProfileClick}></img>
            ): <Link to="/login" className='hover:underline'>Login</Link>
          }
          {/* <Link to="/login" className="hover:underline">Login</Link> */}
        </div>
      </div>
    </nav>
  );
}