
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
    <div className="flex min-h-screen bg-gradient-to-b from-[#F2F9FF] to-[#c7ccfd]">
      {userRole === "instructor" ? (
        <InstructorSidebar isCollapsed={isSidebarCollapsed} />
      ) : (
        <AdminSidebar isCollapsed={isSidebarCollapsed} />
      )}
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0"> {/* Added min-w-0 to prevent overflow */}
        <Header isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
        
        {/* Content container with proper spacing */}
        <main 
          className={`flex-1 p-4 transition-all duration-300 ${
            isSidebarCollapsed ? "ml-16" : "ml-48"
          }`}
        >
          {/* Add overflow control */}
          <div className="max-w-full overflow-x-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
