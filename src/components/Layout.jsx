
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import InstructorSidebar from "./InstructorSidebar";
import Header from "./Header";

function Layout() {
  const userRole = localStorage.getItem("userRole");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Collapse sidebar on small screens by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F2F9FF]">
      {userRole === "instructor" ? (
        <InstructorSidebar isCollapsed={isSidebarCollapsed} />
      ) : (
        <AdminSidebar isCollapsed={isSidebarCollapsed} />
      )}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-16" : "ml-48"
        }`}
      >
        <Header isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
