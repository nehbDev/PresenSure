import { FaBars } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Header({ isCollapsed, setIsCollapsed }) {
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // NEW: State to store user role
  const [userRole, setUserRole] = useState("");

  // NEW: Fetch user role from localStorage on mount
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "admin") {
      setUserRole("Administrator");
    } else if (role === "instructor") {
      setUserRole("Instructor");
    } else {
      setUserRole("User"); // Fallback role
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-14 bg-[#2D336B] text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-gray-200 mr-2"
          aria-label="Toggle Sidebar"
        >
          <FaBars className="w-6 h-6" />
        </button>
      </div>
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center cursor-pointer hover:bg-[#3e4a8a] rounded p-2 transition-colors"
          onClick={toggleDropdown}
        >
          <div className="bg-white text-[#34495E] rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <span className="text-lg font-bold">JD</span>
          </div>
          <div>
            <p className="font-semibold text-sm">John Doe</p>
            <p className="text-xs text-white">{userRole}</p>
          </div>
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-[#2D336B] text-white rounded-md shadow-lg z-20 animate-fadeIn">
            <button
              onClick={() => {
                navigate("/profile");
                setIsDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-[#3e4a8a] rounded-t-md transition-colors"
            >
              View Profile
            </button>
            <button
              onClick={() => {
                navigate("/change-password");
                setIsDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-[#3e4a8a] transition-colors"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-[#3e4a8a] rounded-b-md transition-colors text-red-400 hover:text-red-300"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;