import { useState } from "react";
import DataTable from "react-data-table-component";
import {
  FaSearch,
  FaUsers,
  FaUserPlus,
  FaAngleRight,
  FaPlusCircle,
  FaCalendarPlus,
} from "react-icons/fa";
import ViewScheduleModal from "../../components/modal/ViewScheduleModal";
import BulkScheduleModal from "../../components/modal/BulkScheduleModal";
import ManualScheduleModal from "../../components/modal/ManualScheduleModal";
import EditScheduleModal from "../../components/modal/EditScheduleModal";
import MakeupScheduleModal from "../../components/modal/MakeupScheduleModal";

function SchedulesPage() {
  // Get user role from localStorage
  const userRole = localStorage.getItem("userRole") || "guest";

  // Simulate user data mapping (in a real app, fetch from backend)
  const userData = {
    "admin@example.com": { name: "Admin User", role: "admin" },
    "instructor@example.com": { name: "Dr. John Reyes", role: "instructor" },
  };

  // Get current user email (simulate; in real app, store email in localStorage)
  const userEmail =
    userRole === "instructor" ? "instructor@example.com" : "admin@example.com";
  const user = userData[userEmail] || { name: "Unknown", role: "guest" };

  // Sample schedule data
  const initialData = [
    {
      id: 1,
      scheduleId: "SCH-2025-001",
      subjectCode: "IT101",
      description: "Introduction to Programming",
      days: "MWF",
      time: "08:00 AM - 09:30 AM",
      room: "LAB-101",
      instructor: "Prof. Anna Smith",
      totalStudents: 30,
      students: ["C-2000-001", "C-2000-002"],
    },
    {
      id: 2,
      scheduleId: "SCH-2025-002",
      subjectCode: "CS201",
      description: "Data Structures",
      days: "TTh",
      time: "10:00 AM - 11:30 AM",
      room: "LAB-101",
      instructor: "Dr. John Reyes",
      totalStudents: 25,
      students: ["C-2000-003"],
    },
    {
      id: 3,
      scheduleId: "SCH-2025-003",
      subjectCode: "IT202",
      description: "Database Systems",
      days: "MWF",
      time: "01:00 PM - 02:30 PM",
      room: "RM-305",
      instructor: "Prof. Maria Cruz",
      totalStudents: 28,
      students: ["C-2000-001", "C-2000-002", "C-2000-003"],
    },
  ];

  // State
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [selectedDays, setSelectedDays] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMakeupModalOpen, setIsMakeupModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // Handle Edit Schedule
  const handleEditSchedule = (updatedSchedule) => {
    setData((prevData) =>
      prevData.map((schedule) =>
        schedule.id === updatedSchedule.id ? updatedSchedule : schedule
      )
    );
    setIsEditModalOpen(false);
  };

  // Handle Remove Schedule
  const handleRemoveSchedule = (scheduleId) => {
    setData((prevData) =>
      prevData.filter((schedule) => schedule.id !== scheduleId)
    );
  };

  // Determine current day for filtering today's schedule and display
  const getCurrentDay = () => {
    const today = new Date().getDay();
    const dayMap = {
      0: { schedule: "", display: "Sunday" },
      1: { schedule: "MWF", display: "Monday" },
      2: { schedule: "TTh", display: "Tuesday" },
      3: { schedule: "MWF", display: "Wednesday" },
      4: { schedule: "TTh", display: "Thursday" },
      5: { schedule: "MWF", display: "Friday" },
      6: { schedule: "", display: "Saturday" },
    };
    return dayMap[today] || { schedule: "", display: "Unknown" };
  };

  // Get schedule pattern and display day
  const { schedule: currentSchedule, display: currentDayName } = getCurrentDay();

  // Filter data for today's schedule (only for instructors)
  const todaySchedule =
    userRole === "instructor"
      ? data.filter((item) => {
          return item.days === currentSchedule;
        })
      : [];

  // Define columns for DataTable
  const allColumns = [
    {
      name: "Subject Code",
      selector: (row) => row.subjectCode || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Description",
      selector: (row) => row.description || "N/A",
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: "Days",
      selector: (row) => row.days || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Time",
      selector: (row) => row.time || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Room",
      selector: (row) => row.room || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Instructor",
      selector: (row) => row.instructor || "N/A",
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center justify-center space-x-1 w-full">
          <button
            className="flex items-center justify-center bg-[#2D336B] text-white p-1 text-xs rounded-full hover:bg-[#A9B5DF] transition-colors"
            onClick={() => {
              setSelectedSchedule(row);
              setIsViewModalOpen(true);
            }}
          >
            <FaAngleRight className="w-4 h-4" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "100px",
      center: true,
      right: true,
    },
  ];

  // Filter columns for Today's Schedule (hide Days and Instructor for instructors)
  const todayColumns = allColumns.filter((column) => {
    return column.name !== "Days" && column.name !== "Instructor";
  });

  // Filter columns for All Schedules (hide Instructor for instructors)
  const allScheduleColumns = allColumns.filter((column) => {
    if (userRole === "instructor") {
      return column.name !== "Instructor";
    }
    return true;
  });

  // Filter data for all schedules
  const filteredData = data.filter((item) => {
    const matchesSearch =
      (item.subjectCode || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.description || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.instructor || "").toLowerCase().includes(search.toLowerCase());
    const matchesDays = selectedDays ? item.days === selectedDays : true;
    const matchesInstructor = selectedInstructor
      ? item.instructor === selectedInstructor
      : true;
    return matchesSearch && matchesDays && matchesInstructor;
  });

  // Custom styles for DataTable
  const customStyles = {
    table: {
      style: {
        width: "100%",
        backgroundColor: "#f1f5f9",
        border: "1px solid #e5e7eb",
        borderRadius: "0.25rem",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#A9B5DF",
        borderRadius: "0.25rem 0.25rem 0 0",
        borderBottom: "1px solid #e5e7eb",
      },
    },
    headCells: {
      style: {
        padding: "0.25rem",
        textAlign: "center",
        fontWeight: "bold",
        color: "#2D336B",
        fontSize: "0.75rem",
        display: "flex",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        padding: "0.25rem",
        textAlign: "center",
        fontSize: "0.75rem",
        display: "flex",
        justifyContent: "center",
      },
    },
    rows: {
      style: {
        backgroundColor: "#f1f5f9",
        borderBottom: "1px solid #e5e7eb",
        "&:hover": {
          backgroundColor: "#e2e8f0",
        },
        "&:last-child": {
          borderBottom: "none",
          borderRadius: "0 0 0.25rem 0.25rem",
        },
        "&:first-child": {
          borderRadius: "0",
        },
        "&:not(:first-child):not(:last-child)": {
          borderRadius: "0",
        },
      },
    },
  };

  // Handle closing ViewScheduleModal with callback
  const handleCloseViewModal = (callback) => {
    setIsViewModalOpen(false);
    if (callback && typeof callback === "function") {
      setTimeout(callback, 0); // Ensure callback runs after state update
    }
  };

  return (
    <div className="space-y-3 w-full max-w-[1800px] mx-auto">
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between border-t-2 border-yellow-500">
        <div className="flex items-center">
          <h1 className="text-xl text-[#2D336B] font-bold">Schedules</h1>
        </div>
        {userRole !== "instructor" && (
          <div className="flex items-center space-x-3 text-[#ffffff]">
            <button
              className="flex items-center bg-white border-2 border-blue-700 px-3 py-1.5 text-blue-700 text-sm rounded-md hover:bg-blue-700 transition-colors hover:text-white"
              onClick={() => setIsBulkModalOpen(true)}
            >
              <FaCalendarPlus className="mr-1 h-4 w-4" />
              Bulk Schedule
            </button>
            <button
              className="flex items-center bg-white border-2 border-green-700 px-3 py-1.5 text-green-700 text-sm rounded-md hover:bg-green-700 transition-colors hover:text-white"
              onClick={() => setIsManualModalOpen(true)}
            >
              <FaPlusCircle className="mr-1 h-4 w-4" />
              Add Schedule
            </button>
          </div>
        )}
      </div>

      {/* Today's Schedule Table (Visible only for instructors) */}
      {userRole === "instructor" && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg text-[#2D336B] font-bold mb-3">
            Today's Schedule / {currentDayName}
          </h2>
          {todaySchedule.length > 0 ? (
            <DataTable
              columns={todayColumns}
              data={todaySchedule}
              customStyles={customStyles}
              highlightOnHover
              pointerOnHover
              responsive
              sortIcon={<span></span>}
            />
          ) : (
            <p className="text-sm text-gray-500 text-center">
              No schedules for today.
            </p>
          )}
        </div>
      )}

      {/* All Schedules Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-3 text-xs">
            {/* Instructor Dropdown */}
            <div className="relative w-36 min-w-[9rem]">
              <select
                value={selectedInstructor}
                onChange={(e) => setSelectedInstructor(e.target.value)}
                className="appearance-none border-1 border-[#2D336B] rounded-md px-2 py-1 pr-8 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
              >
                <option value="">All Instructors</option>
                {[...new Set(data.map((item) => item.instructor))]
                  .sort()
                  .map((instructor) => (
                    <option key={instructor} value={instructor}>
                      {instructor}
                    </option>
                  ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg
                  className="w-3 h-3 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 011.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0l-4.24-4.25a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Days Dropdown */}
            <div className="relative w-36 min-w-[9rem]">
              <select
                value={selectedDays}
                onChange={(e) => setSelectedDays(e.target.value)}
                className="appearance-none border-1 border-[#2D336B] rounded-md px-2 py-1 pr-8 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
              >
                <option value="">All Days</option>
                <option value="MWF">MWF</option>
                <option value="TTh">TTh</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg
                  className="w-3 h-3 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 011.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0l-4.24-4.25a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-44 min-w-[9rem]">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-1 border-[#2D336B] rounded-md pl-8 pr-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
              />
              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500 w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        <DataTable
          columns={allScheduleColumns}
          data={filteredData}
          customStyles={customStyles}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          sortIcon={<span></span>}
        />
      </div>

      {/* Render the Modals */}
      <ViewScheduleModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal} // Updated to use the new handler
        schedule={selectedSchedule}
        onEdit={() => {
          setIsViewModalOpen(false);
          setIsEditModalOpen(true);
        }}
        onRemove={handleRemoveSchedule}
        onScheduleMakeup={() => setIsMakeupModalOpen(true)}
        userRole={userRole}
      />
      <BulkScheduleModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
      />
      <ManualScheduleModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />
      <EditScheduleModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        schedule={selectedSchedule}
        onSave={handleEditSchedule}
      />
      <MakeupScheduleModal
        isOpen={isMakeupModalOpen}
        onClose={() => setIsMakeupModalOpen(false)}
        onScheduleMakeup={(makeupData) => {
          console.log("Makeup scheduled:", makeupData);
          setIsMakeupModalOpen(false);
        }}
        schedule={selectedSchedule}
      />
    </div>
  );
}

export default SchedulesPage;