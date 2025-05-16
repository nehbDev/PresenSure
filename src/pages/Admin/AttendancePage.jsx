import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch, FaAngleRight } from "react-icons/fa";
import ScheduleAttendanceTable from "../../components/table/ScheduleAttendanceTable";

function AttendancePage() {
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
      room: "LAB-101",
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

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [selectedDays, setSelectedDays] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [viewScheduleAttendance, setViewScheduleAttendance] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleEditSchedule = (updatedSchedule) => {
    setData((prevData) =>
      prevData.map((schedule) =>
        schedule.id === updatedSchedule.id ? updatedSchedule : schedule
      )
    );
    setIsEditModalOpen(false);
  };

  const handleRemoveSchedule = (scheduleId) => {
    setData((prevData) =>
      prevData.filter((schedule) => schedule.id !== scheduleId)
    );
  };

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
            className="flex items-center justify-center bg-[#2D336B] text-white p-1 text-xs rounded-full hover:bg-[#A9B5DF] transition-colors"
            onClick={() => setViewScheduleAttendance(row)}
          >
            <FaAngleRight className="w-4 h-4" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      style: {
        justifyContent: "center",
      },
      width: "100px",
    },
  ];

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

  return (
    <div className="space-y-3 w-full max-w-[1800px] mx-auto">
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between border-t-2  border-purple-500">
        <div className="flex items-center">
          <h1 className="text-xl text-[#2D336B] font-bold">
            Attendance Record
          </h1>
        </div>
      </div>

      <div className="px-3">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <div className="flex items-center">
                {viewScheduleAttendance ? (
                  <>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setViewScheduleAttendance(null);
                        setSelectedDate(null);
                      }}
                      className="ml-1 text-xs font-medium text-[#2D336B] hover:text-[#A9B5DF] md:ml-2"
                    >
                      Attendance Record
                    </a>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {selectedDate ? (
                        <>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedDate(null);
                            }}
                            className="ml-1 text-xs font-medium text-[#2D336B] hover:text-[#A9B5DF] md:ml-2"
                          >
                            {viewScheduleAttendance.subjectCode}
                          </a>
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-1 text-xs font-medium text-gray-500 md:ml-2">
                            {selectedDate}
                          </span>
                        </>
                      ) : (
                        <span className="ml-1 text-xs font-medium text-gray-500 md:ml-2">
                          {viewScheduleAttendance.subjectCode}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <span className="ml-1 text-xs font-medium text-gray-500 md:ml-2">
                    Attendance Record
                  </span>
                )}
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {viewScheduleAttendance ? (
        <ScheduleAttendanceTable
          schedule={viewScheduleAttendance}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center">
              <h1 className="text-xl text-[#2D336B] font-bold">Schedules</h1>
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
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
            columns={columns}
            data={filteredData}
            customStyles={customStyles}
            pagination
            highlightOnHover
            pointerOnHover
            responsive
            sortIcon={<span></span>}
          />
        </div>
      )}
    </div>
  );
}

export default AttendancePage;