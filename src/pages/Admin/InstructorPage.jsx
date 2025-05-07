import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch, FaUsers, FaUserPlus, FaAngleRight } from "react-icons/fa";
import ViewInstructorModal from "../../components/modal/ViewInstructorModal";
import BulkRegistrationModal from "../../components/modal/BulkRegistrationInstructorModal";
import ManualRegistrationModal from "../../components/modal/ManualRegistrationInstructorModal";
import EditInstructorModal from "../../components/modal/EditInstructorModal";

function InstructorPage() {
  // Sample data for instructors
  const initialData = [
    {
      id: 1,
      instructorId: "I-2025-001",
      firstname: "Anna",
      middle_initial: "L",
      lastname: "Gomez",
      email: "anna.gomez@example.com",
      password: "password123",
      sex: "Female",
      department: "CCS",
      role: "instructor",
    },
    {
      id: 2,
      instructorId: "I-2025-002",
      firstname: "Mark",
      middle_initial: "R",
      lastname: "Tan",
      email: "mark.tan@example.com",
      password: "password456",
      sex: "Male",
      department: "CCS",
      role: "instructor",
    },
    {
      id: 3,
      instructorId: "I-2025-003",
      firstname: "Clara",
      middle_initial: "S",
      lastname: "Lopez",
      email: "clara.lopez@example.com",
      password: "password789",
      sex: "Female",
      department: "CEA",
      role: "instructor",
    },
  ];

  // State
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  // Handle Edit Instructor
  const handleEditInstructor = (updatedInstructor) => {
    setData((prevData) =>
      prevData.map((instructor) =>
        instructor.id === updatedInstructor.id ? updatedInstructor : instructor
      )
    );
    setIsEditModalOpen(false);
  };

  // Handle Remove Instructor
  const handleRemoveInstructor = (instructorId) => {
    setData((prevData) =>
      prevData.filter((instructor) => instructor.id !== instructorId)
    );
  };

  // Define columns for DataTable
  const columns = [
    {
      name: "Instructor ID",
      selector: (row) => row.instructorId || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Full Name",
      selector: (row) =>
        `${row.firstname} ${row.middle_initial}. ${row.lastname}`,
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Department",
      selector: (row) => row.department || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center justify-center space-x-1 w-full">
          <button
            className="flex items-center justify-center bg-[#2D336B] text-white p-1 text-xs rounded-full hover:bg-[#A9B5DF] transition-colors"
            onClick={() => {
              setSelectedInstructor(row);
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

  // Filter data
  const filteredData = data.filter((item) => {
    const fullName = `${item.firstname} ${item.middle_initial}. ${item.lastname}`;
    const matchesSearch =
      fullName.toLowerCase().includes(search.toLowerCase()) ||
      (item.instructorId || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.email || "").toLowerCase().includes(search.toLowerCase());
    const matchesDepartment = selectedDepartment
      ? item.department === selectedDepartment
      : true;
    return matchesSearch && matchesDepartment;
  });

  // Custom styles for DataTable (Copied from StudentsPage)
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
        borderRadius: "0.25rem 0.25rem 0 0", // Rounded top corners only
        borderBottom: "1px solid #e5e7eb", // Separator between header and rows
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
          borderRadius: "0 0 0.25rem 0.25rem", // Bottom corners rounded
        },
        "&:first-child": {
          borderRadius: "0", // No top radius since header covers it
        },
        "&:not(:first-child):not(:last-child)": {
          borderRadius: "0", // No radius for middle rows
        },
      },
    },
  };

  return (
    <div className="space-y-3">
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl text-[#2D336B] font-bold">Instructors</h1>
        </div>
        <div className="flex items-center space-x-3 text-[#ffffff]">
          <button
            className="flex items-center bg-white border-2 border-blue-700 px-3 py-1.5 text-blue-700 text-sm rounded-md hover:bg-blue-700 transition-colors hover:text-white"
            onClick={() => setIsBulkModalOpen(true)}
          >
            <FaUsers className="mr-1 h-4 w-4" />
            Bulk Registration
          </button>
          <button
            className="flex items-center bg-white border-2 border-green-700 px-3 py-1.5 text-green-700 text-sm rounded-md hover:bg-green-700 transition-colors hover:text-white"
            onClick={() => setIsManualModalOpen(true)}
          >
            <FaUserPlus className="mr-1 h-4 w-4" />
            Manual Registration
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-3 text-xs">
            {/* Department Dropdown */}
            <div className="relative w-36 min-w-[9rem]">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="appearance-none border-1 border-[#2D336B] rounded-md px-2 py-1 pr-8 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
              >
                <option value="">All Departments</option>
                {[...new Set(data.map((item) => item.department))]
                  .sort()
                  .map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
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

      {/* Render the Modals */}
      <ViewInstructorModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        instructor={selectedInstructor}
        onEdit={() => {
          setIsViewModalOpen(false);
          setIsEditModalOpen(true);
        }}
        onRemove={handleRemoveInstructor}
      />
      <BulkRegistrationModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
      />
      <ManualRegistrationModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />
      <EditInstructorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        instructor={selectedInstructor}
        onSave={handleEditInstructor}
      />
    </div>
  );
}

export default InstructorPage;