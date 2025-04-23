import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaChalkboardTeacher,
  FaCalendar,
  FaClipboardList,
  FaExclamationCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

function AdminSidebar({ isCollapsed }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const linkStyles = ({ isActive }) =>
    `flex items-center text-gray-800 py-1.5 px-2 rounded transition-colors ${
      isActive
        ? "bg-[#AED6F1] text-[#34495E] font-semibold"
        : "hover:bg-[#AED6F1]"
    }`;

  return (
    <aside
      className={`bg-[#ffffff] h-screen fixed flex flex-col justify-between shadow-md transition-all duration-300 ease-in-out z-10 ${
        isCollapsed ? "w-16" : "w-48"
      }`}
    >
      <div className="h-14 bg-[#2D336B] flex items-center p-3">
        <div className="flex items-center">
          <div className="bg-white text-[#34495E] rounded-full w-8 h-8 flex items-center justify-center mr-2">
            <span className="text-base font-bold">PS</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-white">PresenSure</h1>
            </div>
          )}
        </div>
      </div>
      <div className="bg-[#f8f8f8] text-[#898a92] p-1.5 text-center">
        {!isCollapsed && <h4 className="text-xs">Main Menu</h4>}
      </div>

      <div className="flex-1 px-3">
        <nav className="space-y-1 text-sm">
          <NavLink
            to="/admin"
            className={linkStyles}
            title={isCollapsed ? "Dashboard" : ""}
          >
            <div className="w-5 flex justify-center">
              <MdDashboard className="w-4 h-4 text-[#34495E]" />
            </div>
            {!isCollapsed && <span className="ml-2">Dashboard</span>}
          </NavLink>
          <NavLink
            to="/schedule"
            className={linkStyles}
            title={isCollapsed ? "Schedule" : ""}
          >
            <div className="w-5 flex justify-center">
              <FaCalendar className="w-4 h-4 text-[#34495E]" />
            </div>
            {!isCollapsed && <span className="ml-2">Schedule</span>}
          </NavLink>
          <NavLink
            to="/students"
            className={linkStyles}
            title={isCollapsed ? "Students" : ""}
          >
            <div className="w-5 flex justify-center">
              <FaUser className="w-4 h-4 text-[#34495E]" />
            </div>
            {!isCollapsed && <span className="ml-2">Students</span>}
          </NavLink>
          <NavLink
            to="/instructors"
            className={linkStyles}
            title={isCollapsed ? "Instructors" : ""}
          >
            <div className="w-5 flex justify-center">
              <FaChalkboardTeacher className="w-4 h-4 text-[#34495E]" />
            </div>
            {!isCollapsed && <span className="ml-2">Instructors</span>}
          </NavLink>
          <NavLink
            to="/attendance"
            className={linkStyles}
            title={isCollapsed ? "Attendance Record" : ""}
          >
            <div className="w-5 flex justify-center">
              <FaClipboardList className="w-4 h-4 text-[#34495E]" />
            </div>
            {!isCollapsed && <span className="ml-2">Attendance Record</span>}
          </NavLink>
          <NavLink
            to="/appeals"
            className={linkStyles}
            title={isCollapsed ? "Student Appeals" : ""}
          >
            <div className="w-5 flex justify-center">
              <FaExclamationCircle className="w-4 h-4 text-[#34495E]" />
            </div>
            {!isCollapsed && <span className="ml-2">Student Appeals</span>}
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}

export default AdminSidebar;
