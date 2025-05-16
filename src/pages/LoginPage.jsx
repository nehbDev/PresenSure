import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import logo from "../assets/images/log0.webp"; // Import the logo

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simulate authentication logic
    if (email === "admin@example.com" && password === "password123") {
      console.log("Login successful! Role: Admin");
      localStorage.setItem("userRole", "admin");
      navigate("/admin");
    } else if (
      email === "instructor@example.com" &&
      password === "password321"
    ) {
      console.log("Login successful! Role: Instructor");
      localStorage.setItem("userRole", "instructor");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#2D336B] to-[#F2F9FF]">
      {/* Login Form */}
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-xs h-auto pt-5 pb-8">
        <div className="flex justify-center mb-3">
          <img
            src={logo}
            alt="PresenSure Logo"
            className="h-40 w-40" // Adjust size as needed
          />
        </div>
        <hr className="border-t border-3 rounded-lg border-[#2D336B] mb-4" /> 
        {error && (
          <p className="text-red-400 text-xs text-center mb-3 animate-pulse">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-[#2D336B] mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <FaEnvelope className="w-4 h-4 text-gray-400" />
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-8 p-1.5 border border-[#2D336B] rounded-md bg-white text-xs text-[#2D336B] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#34495E] transition-all duration-300"
                placeholder="Enter your Email Address"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-[#2D336B] mb-1"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <FaLock className="w-4 h-4 text-gray-400" />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-8 p-1.5 border border-[#2D336B] rounded-md bg-white text-xs text-[#2D336B] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#34495E] transition-all duration-300"
                placeholder="Enter your Password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#2D336B] text-white p-1.5 rounded-md font-semibold text-xs hover:bg-[#3e4a8a] transition-all duration-300 hover:scale-95"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;