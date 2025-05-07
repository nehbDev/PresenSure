import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import DataTable from "react-data-table-component";
import DateAttendanceTable from "./DateAttendanceTable";
import AllRecordTable from "./AllRecordTable";

// Sample attendance data
const sampleAttendanceData = [
  {
    scheduleId: "SCH-2025-001",
    records: [
      {
        id: 1,
        studentName: "John Doe",
        attendance: [
          {
            day: "Friday",
            date: "2025-01-10",
            presenceVerified: true,
            faceVerified: true,
            timeIn: "08:00 AM",
            timeOut: "10:00 AM",
            mark: "Present",
          },
          {
            day: "Friday",
            date: "2025-01-10",
            presenceVerified: true,
            faceVerified: true,
            timeIn: "08:00 AM",
            timeOut: "10:00 AM",
            mark: "Present",
          },
          {
            day: "Friday",
            date: "2025-01-10",
            presenceVerified: true,
            faceVerified: true,
            timeIn: "08:00 AM",
            timeOut: "10:00 AM",
            mark: "Present",
          },
          {
            day: "Saturday",
            date: "2025-01-11",
            presenceVerified: true,
            faceVerified: false,
            timeIn: "08:15 AM",
            timeOut: "10:00 AM",
            mark: "Late",
          },
          {
            day: "Sunday",
            date: "2025-01-12",
            presenceVerified: false,
            faceVerified: false,
            timeIn: "",
            timeOut: "",
            mark: "Absent",
          },
        ],
      },
      {
        id: 2,
        studentName: "Jane Smith",
        attendance: [
          {
            day: "Friday",
            date: "2025-01-10",
            presenceVerified: true,
            faceVerified: false,
            timeIn: "08:15 AM",
            timeOut: "10:00 AM",
            mark: "Late",
          },
          {
            day: "Saturday",
            date: "2025-01-11",
            presenceVerified: true,
            faceVerified: true,
            timeIn: "08:00 AM",
            timeOut: "10:00 AM",
            mark: "Present",
          },
          {
            day: "Sunday",
            date: "2025-01-12",
            presenceVerified: false,
            faceVerified: false,
            timeIn: "",
            timeOut: "",
            mark: "Absent",
          },
        ],
      },
      {
        id: 3,
        studentName: "Mike Johnson",
        attendance: [
          {
            day: "Friday",
            date: "2025-01-10",
            presenceVerified: false,
            faceVerified: false,
            timeIn: "",
            timeOut: "",
            mark: "Absent",
          },
          {
            day: "Saturday",
            date: "2025-01-11",
            presenceVerified: true,
            faceVerified: true,
            timeIn: "08:00 AM",
            timeOut: "10:00 AM",
            mark: "Present",
          },
          {
            day: "Sunday",
            date: "2025-01-12",
            presenceVerified: true,
            faceVerified: false,
            timeIn: "08:00 AM",
            timeOut: "10:00 AM",
            mark: "Incomplete Verification",
          },
        ],
      },
    ],
  },
  {
    scheduleId: "SCH-2025-002",
    records: [
      {
        id: 1,
        studentName: "Alice Brown",
        attendance: [
          {
            day: "Saturday",
            date: "2025-01-11",
            presenceVerified: true,
            faceVerified: true,
            timeIn: "09:00 AM",
            timeOut: "11:00 AM",
            mark: "Present",
          },
          {
            day: "Sunday",
            date: "2025-01-12",
            presenceVerified: true,
            faceVerified: false,
            timeIn: "09:00 AM",
            timeOut: "11:00 AM",
            mark: "Incomplete Verification",
          },
        ],
      },
      {
        id: 2,
        studentName: "Bob Wilson",
        attendance: [
          {
            day: "Saturday",
            date: "2025-01-11",
            presenceVerified: true,
            faceVerified: false,
            timeIn: "09:00 AM",
            timeOut: "11:00 AM",
            mark: "Incomplete Verification",
          },
          {
            day: "Sunday",
            date: "2025-01-12",
            presenceVerified: true,
            faceVerified: true,
            timeIn: "09:00 AM",
            timeOut: "11:00 AM",
            mark: "Present",
          },
        ],
      },
      {
        id: 3,
        studentName: "Emma Davis",
        attendance: [
          {
            day: "Saturday",
            date: "2025-01-11",
            presenceVerified: false,
            faceVerified: false,
            timeIn: "",
            timeOut: "",
            mark: "Absent",
          },
          {
            day: "Sunday",
            date: "2025-01-12",
            presenceVerified: true,
            faceVerified: true,
            timeIn: "09:00 AM",
            timeOut: "11:00 AM",
            mark: "Present",
          },
        ],
      },
    ],
  },
  {
    scheduleId: "SCH-2025-003",
    records: [
      {
        id: 1,
        studentName: "Sarah Lee",
        attendance: [
          {
            day: "Sunday",
            date: "2025-01-12",
            presenceVerified: true,
            faceVerified: true,
            timeIn: "08:00 AM",
            timeOut: "10:00 AM",
            mark: "Present",
          },
          {
            day: "Monday",
            date: "2025-01-13",
            presenceVerified: true,
            faceVerified: false,
            timeIn: "08:10 AM",
            timeOut: "10:00 AM",
            mark: "Late",
          },
        ],
      },
      {
        id: 2,
        studentName: "Tom Clark",
        attendance: [
          {
            day: "Sunday",
            date: "2025-01-12",
            presenceVerified: false,
            faceVerified: false,
            timeIn: "",
            timeOut: "",
            mark: "Absent",
          },
          {
            day: "Monday",
            date: "2025-01-13",
            presenceVerified: true,
            faceVerified: true,
            timeIn: "08:00 AM",
            timeOut: "10:00 AM",
            mark: "Present",
          },
        ],
      },
      {
        id: 3,
        studentName: "Lisa Adams",
        attendance: [
          {
            day: "Sunday",
            date: "2025-01-12",
            presenceVerified: true,
            faceVerified: false,
            timeIn: "08:10 AM",
            timeOut: "10:00 AM",
            mark: "Late",
          },
          {
            day: "Monday",
            date: "2025-01-13",
            presenceVerified: false,
            faceVerified: false,
            timeIn: "",
            timeOut: "",
            mark: "Absent",
          },
        ],
      },
    ],
  },
];

const ScheduleAttendanceTable = ({
  schedule,
  selectedDate,
  setSelectedDate,
}) => {
  const [animate, setAnimate] = useState(false);
  const [displayMode, setDisplayMode] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMark, setSelectedMark] = useState("");

  // Handle animation on mount
  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 0);
  }, []);

  const handleGenerateReport = () => {
    console.log("Generating report for schedule:", schedule.subjectCode);
    alert(
      `Report generated for ${schedule.subjectCode}! Check the console for details.`
    );
  };

  // Handle row click for student attendance
  const handleRowClick = (row) => {
    const entry = row.attendance.find((e) => e.date === selectedDate) || {};
    alert(
      `Selected Student: ${row.studentName}\n` +
        `Date: ${selectedDate}\n` +
        `Presence Verified: ${entry.presenceVerified ? "Yes" : "No"}\n` +
        `Face Verified: ${entry.faceVerified ? "Yes" : "No"}\n` +
        `Time In: ${entry.timeIn || "N/A"}\n` +
        `Time Out: ${entry.timeOut || "N/A"}\n` +
        `Mark: ${entry.mark || "N/A"}`
    );
  };

  // Fetch records for the schedule
  const records =
    sampleAttendanceData.find((data) => data.scheduleId === schedule.scheduleId)
      ?.records || [];

  // Filter records based on search term and selected mark for the Default View
  const filteredRecords = records.filter((record) => {
    const matchesSearch = record.studentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const entry = record.attendance.find((e) => e.date === selectedDate);
    const matchesMark = selectedMark
      ? entry && entry.mark === selectedMark
      : true;
    return matchesSearch && matchesMark;
  });

  // Student attendance table columns (default view)
  const studentColumns = [
    {
      name: "Student Name",
      selector: (row) => row.studentName || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Presence Verified",
      selector: (row) => {
        const entry = row.attendance.find((e) => e.date === selectedDate);
        return entry ? (entry.presenceVerified ? "Yes" : "No") : "N/A";
      },
      center: true,
    },
    {
      name: "Face Verified",
      selector: (row) => {
        const entry = row.attendance.find((e) => e.date === selectedDate);
        return entry ? (entry.faceVerified ? "Yes" : "No") : "N/A";
      },
      center: true,
    },
    {
      name: "Time In",
      selector: (row) => {
        const entry = row.attendance.find((e) => e.date === selectedDate);
        return entry ? entry.timeIn || "N/A" : "N/A";
      },
      center: true,
    },
    {
      name: "Time Out",
      selector: (row) => {
        const entry = row.attendance.find((e) => e.date === selectedDate);
        return entry ? entry.timeOut || "N/A" : "N/A";
      },
      center: true,
    },
    {
      name: "Mark",
      selector: (row) => {
        const entry = row.attendance.find((e) => e.date === selectedDate);
        return entry ? entry.mark || "N/A" : "N/A";
      },
      center: true,
    },
  ];

  const customStyles = {
    table: {
      style: {
        width: "100%",
        backgroundColor: "#f1f5f9",
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#A9B5DF",
        borderBottom: "1px solid #e5e7eb",
      },
    },
    headCells: {
      style: {
        padding: "0.25rem",
        justifyContent: "center",
        fontWeight: "bold",
        color: "#2D336B",
        fontSize: "0.75rem",
        display: "flex",
      },
    },
    cells: {
      style: {
        padding: "0.25rem",
        justifyContent: "center",
        fontSize: "0.75rem",
        display: "flex",
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    rows: {
      style: {
        backgroundColor: "#f1f5f9",
        borderBottom: "1px solid #e5e7eb",
        "&:hover": {
          backgroundColor: "#e2e8f0",
        },
      },
    },
  };

  // Unique marks for the dropdown
  const markOptions = ["Present", "Absent", "Late", "Incomplete Verification"];

  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="bg-white p-5 rounded-lg shadow-md space-y-4 mb-4">
        <div className="flex flex-col gap-4">
          <div className="flex-1 space-y-1">
            <h3 className="text-base font-bold text-gray-700">
              {schedule.subjectCode} - {schedule.description}
            </h3>
            <p className="text-xs font-medium text-gray-700">
              Schedule ID: {schedule.scheduleId}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Days", value: schedule.days },
              { label: "Time", value: schedule.time },
              { label: "Room", value: schedule.room },
              { label: "Instructor", value: schedule.instructor },
              { label: "Total Students", value: schedule.totalStudents },
            ].map((item, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  animate
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                } delay-${(index + 2) * 100}`}
              >
                <div className="text-xs font-bold text-gray-700">
                  {item.label}:
                </div>
                <div className="text-xs text-gray-900">
                  {item.value || "N/A"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex gap-2 px-4 mb-4">
          <button
            onClick={() => setDisplayMode("default")}
            className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors border-3 border-[#2D336B]
      ${
        displayMode === "default"
          ? "bg-[#2D336B] text-white"
          : "bg-white text-[#2D336B] hover:bg-[#A9B5DF]"
      }`}
          >
            Default View
          </button>
          <button
            onClick={() => setDisplayMode("all")}
            className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors border-3 border-[#2D336B]
      ${
        displayMode === "all"
          ? "bg-[#2D336B] text-white"
          : "bg-white text-[#2D336B] hover:bg-[#A9B5DF]"
      }`}
          >
            All Records View
          </button>
        </div>
        {displayMode === "default" ? (
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="bg-white p-5 rounded-lg shadow-md space-y-4 mb-4 lg:w-1/5">
              <DateAttendanceTable
                scheduleId={schedule.scheduleId}
                records={records}
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
              />
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md space-y-4 mb-4 lg:w-4/5">
              <h3 className="text-md font-bold text-[#2D336B] mb-2">
                Student Attendance
              </h3>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex flex-wrap gap-3 text-xs">
                  <div className="relative w-44 min-w-[9rem]">
                    <input
                      type="text"
                      placeholder="Search by student name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-1 border-[#2D336B] rounded-md pl-8 pr-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
                    />
                    <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-500 w-3 h-3" />
                    </div>
                  </div>
                  <div className="relative w-36 min-w-[9rem]">
                    <select
                      value={selectedMark}
                      onChange={(e) => setSelectedMark(e.target.value)}
                      className="appearance-none border-1 border-[#2D336B] rounded-md px-2 py-1 pr-8 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
                    >
                      <option value="">All Status</option>
                      {markOptions.map((mark) => (
                        <option key={mark} value={mark}>
                          {mark}
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
                </div>
                <div className="flex flex-wrap gap-3 text-xs">
                  <button
                    onClick={handleGenerateReport}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
              {selectedDate ? (
                <DataTable
                  columns={studentColumns}
                  data={filteredRecords}
                  customStyles={customStyles}
                  pagination
                  highlightOnHover
                  pointerOnHover
                  sortIcon={<span></span>}
                  onRowClicked={handleRowClick}
                  noDataComponent={
                    <div className="text-center text-gray-500 p-4">
                      No student attendance records for {selectedDate}.
                    </div>
                  }
                />
              ) : (
                <div className="text-center text-gray-500 p-4">
                  Please select a date to view attendance records.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full">
            <AllRecordTable
              records={records}
              onRowClicked={handleRowClick}
              customStyles={customStyles}
              onGenerateReport={handleGenerateReport}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleAttendanceTable;
