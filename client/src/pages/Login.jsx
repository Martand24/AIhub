import GoogleLoginButton from "../components/GoogleLoginButton";
import { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center relative overflow-hidden ">
  <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 opacity-50 blur-2xl"></div>

  <div className="relative z-10 bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400">
          Login to AI HUB to explore tools
        </p>


        <GoogleLoginButton />

        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          OR
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
    to="/signup"
    className="text-blue-600 dark:text-blue-400 hover:underline"
  >
    Sign Up
  </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
