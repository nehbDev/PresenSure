import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

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
      navigate("/admin");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-b from-[#2D336B] to-[#F2F9FF] items-center justify-center">
      {/* Left Side - Illustration Section */}
      <div className="lg:w-1/4 flex items-center justify-center p-1 lg:p-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-1">Welcome Back</h1>
          <p className="text-base text-white opacity-90">Sign in to continue</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-1 lg:p-2">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs h-auto pt-8 pb-8">
          <h2 className="text-lg font-bold text-center text-[#2D336B] mb-4">
            PresenSure
          </h2>
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
    </div>
  );
}

export default LoginPage;