import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch, FaCalendarPlus, FaPlusCircle } from "react-icons/fa";
import ViewScheduleModal from "../../components/modal/ViewScheduleModal";
import BulkScheduleModal from "../../components/modal/BulkScheduleModal";
import ManualScheduleModal from "../../components/modal/ManualScheduleModal";
import EditScheduleModal from "../../components/modal/EditScheduleModal";

function SchedulesPage() {
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
    },
    {
      id: 2,
      scheduleId: "SCH-2025-002",
      subjectCode: "CS201",
      description: "Data Structures",
      days: "TTh",
      time: "10:00 AM - 11:30 AM",
      room: "LAB-102",
      instructor: "Dr. John Reyes",
      totalStudents: 25,
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
    setData((prevData) => prevData.filter((schedule) => schedule.id !== scheduleId));
  };

  // Define columns for DataTable
  const columns = [
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
            className="flex items-center justify-center min-w-[3rem] bg-[#F59E0B] text-white px-2 py-1 text-xs rounded hover:bg-[#3e5a77] transition-colors"
            onClick={() => {
              setSelectedSchedule(row);
              setIsViewModalOpen(true);
            }}
          >
            View
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "100px",
      center: true,
      right: true, // Ensure column is aligned to the rightmost edge
    },
  ];

  // Filter data
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

  // Custom styles for DataTable (Copied from StudentsPage)
  const customStyles = {
    table: {
      style: {
        borderCollapse: "separate",
        borderSpacing: "0 0.5rem",
        width: "100%", // Ensure table stretches to container width
      },
    },
    headRow: {
      style: {
        backgroundColor: "#A9B5DF",
        border: "1px solid #e5e7eb",
        marginBottom: "0.5rem",
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
      },
    },
    cells: {
      style: {
        padding: "0.25rem",
        textAlign: "center",
        fontSize: "0.75rem",
        display: "flex",
        marginRight: "0.5rem", // Add space between columns
      },
    },
    rows: {
      style: {
        backgroundColor: "#f1f5f9",
        border: "1px solid #e5e7eb",
        borderRadius: "0.25rem",
        marginBottom: "0.5rem",
        minHeight: "2rem",
        "&:hover": {
          backgroundColor: "#e2e8f0",
        },
        "&:last-child": {
          marginBottom: "0",
        },
      },
    },
  };

  return (
    <div className="space-y-3">
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl text-[#2D336B] font-bold">Schedules</h1>
        </div>
        <div className="flex items-center space-x-3 text-[#ffffff]">
          <button
            className="flex items-center bg-[#2563EB] border border-[#2D336B] px-3 py-1.5 text-sm rounded-md hover:border-[#ffffff] transition-all duration-300 hover:scale-95"
            onClick={() => setIsBulkModalOpen(true)}
          >
            <FaCalendarPlus className="mr-1 h-4 w-4" />
            Bulk Schedule
          </button>
          <button
            className="flex items-center bg-[#059669] border border-[#2D336B] px-3 py-1.5 text-sm rounded-md hover:border-[#ffffff] transition-all duration-300 hover:scale-95"
            onClick={() => setIsManualModalOpen(true)}
          >
            <FaPlusCircle className="mr-1 h-4 w-4" />
            Add Schedule
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <div className="flex flex-wrap gap-3 text-xs">
            {/* Instructor Dropdown */}
            <div className="relative w-36 min-w-[9rem]">
              <select
                value={selectedInstructor}
                onChange={(e) => setSelectedInstructor(e.target.value)}
                className="appearance-none border-2 border-[#2D336B] rounded-md px-2 py-1 pr-8 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
              >
                <option value="">All Instructors</option>
                {[...new Set(data.map((item) => item.instructor))].sort().map((instructor) => (
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
                className="appearance-none border-2 border-[#2D336B] rounded-md px-2 py-1 pr-8 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
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
                className="border-2 border-[#2D336B] rounded-md pl-8 pr-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
              />
              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500 w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={customStyles}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
        />
      </div>

      {/* Render the Modals */}
      <ViewScheduleModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        schedule={selectedSchedule}
        onEdit={() => {
          setIsViewModalOpen(false);
          setIsEditModalOpen(true);
        }}
        onRemove={handleRemoveSchedule}
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
    </div>
  );
}

export default SchedulesPage;