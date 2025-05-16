import React from "react";
import DataTable from "react-data-table-component";

// Mock data for the dashboard
const dashboardData = {
  totalStudents: 120,
  totalInstructors: 10,
  activeSchedules: 5,
  recentAttendance: [
    { id: 1, class: "CS101", date: "2025-05-11", present: 25, absent: 5 },
    { id: 2, class: "CS102", date: "2025-05-11", present: 30, absent: 2 },
  ],
  pendingAppeals: [
    {
      id: 1,
      student: "John Doe",
      class: "CS101",
      date: "2025-05-10",
      description:
        "My attendance wasn’t marked for Advanced Mathematics class on Monday despite being present the full session.",
      status: "Pending",
    },
    {
      id: 2,
      student: "Jane Smith",
      class: "CS102",
      date: "2025-05-11",
      description:
        "Unable to access the online assessment platform during the scheduled quiz time.",
      status: "Approved",
    },
  ],
};

// Reusable Card Component with dynamic border color
const Card = ({ title, value, borderColor }) => (
  <div
    className={`bg-white p-4 rounded-lg shadow-md border-t-2 ${borderColor}`}
  >
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

// Columns for Recent Attendance
const columns = [
  {
    name: "Class",
    selector: (row) => row.class || "N/A",
    sortable: true,
    center: true,
  },
  {
    name: "Date",
    selector: (row) => row.date || "N/A",
    sortable: true,
    center: true,
  },
  {
    name: "Present",
    selector: (row) => row.present || "0",
    sortable: true,
    center: true,
  },
  {
    name: "Absent",
    selector: (row) => row.absent || "0",
    sortable: true,
    center: true,
  },
];

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

// Dashboard Component
const AdminDashboard = () => {
  return (
    <div className="space-y-3 w-full max-w-[1800px] mx-auto">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl text-[#2D336B] font-bold">Dashboard</h1>
        </div>
      </div>

      {/* Summary Cards in One Row without Outer Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card
          title="Total Students"
          value={dashboardData.totalStudents}
          borderColor="border-green-500"
        />
        <Card
          title="Total Instructors"
          value={dashboardData.totalInstructors}
          borderColor="border-blue-500"
        />
        <Card
          title="Active Schedules"
          value={dashboardData.activeSchedules}
          borderColor="border-yellow-500"
        />
      </div>

      {/* Recent Attendance and Pending Appeals in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Recent Attendance */}
        <div className="bg-white p-4 rounded-lg shadow-md border-t-2 border-purple-500">
          <h2 className="text-xl font-semibold mb-4">Recent Attendance</h2>
          <DataTable
            columns={columns}
            data={dashboardData.recentAttendance}
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            responsive
            sortIcon={<span></span>}
          />
        </div>

        {/* Pending Appeals */}
        <div className="bg-white p-4 rounded-lg shadow-md border-t-2 border-red-500">
          <h2 className="text-xl font-semibold mb-4">Pending Appeals</h2>
          <div className="space-y-2">
            {dashboardData.pendingAppeals.length > 0 ? (
              dashboardData.pendingAppeals.map((appeal) => (
                <div
                  key={appeal.id}
                  className="relative p-3 bg-[#e2e8f0] rounded-md hover:bg-[#cbd5e1] cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-[#2D336B] truncate">
                      {appeal.student}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        appeal.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : appeal.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appeal.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-800 truncate">
                    {appeal.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{appeal.date}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 text-xs py-4">
                No appeals found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
