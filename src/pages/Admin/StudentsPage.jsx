import { useState } from "react";
import DataTable from "react-data-table-component";
import {
  FaSearch,
  FaUsers,
  FaUserPlus,
  FaAngleRight,
} from "react-icons/fa";
import ViewStudentModal from "../../components/modal/ViewStudentModal";
import BulkRegistrationModal from "../../components/modal/BulkRegistrationModal";
import ManualRegistrationModal from "../../components/modal/ManualRegistrationModal";
import EditStudentModal from "../../components/modal/EditStudentModal";

function StudentsPage() {
  const userRole = localStorage.getItem("userRole") || "guest";


  // Sample data with course field, unique IDs
  const initialData = [


    {
      id: 1,
      studentId: "C-2000-001",
      firstname: "Juan",
      middle_initial: "A",
      lastname: "Dela Cruz",
      email: "juan.delacruz@example.com",
      password: "password123",
      year_and_section: "1A",
      course: "BSIT",
      sex: "Male",
      department: "CCS",
      student_photo: "https://via.placeholder.com/100",
      role: "student",
      status: "regular",
    },
    {
      id: 2,
      studentId: "C-2000-002",
      firstname: "Maria",
      middle_initial: "B",
      lastname: "Santos",
      email: "maria.santos@example.com",
      password: "password456",
      year_and_section: "2B",
      course: "BSCS",
      sex: "Female",
      department: "CCS",
      student_photo: "https://via.placeholder.com/100",
      role: "student",
      status: "irregular",
    },
    {
      id: 3,
      studentId: "C-2000-003",
      firstname: "Pedro",
      middle_initial: "C",
      lastname: "Reyes",
      email: "pedro.reyes@example.com",
      password: "password789",
      year_and_section: "3A",
      course: "BSIT",
      sex: "Male",
      department: "CCS",
      student_photo: "https://via.placeholder.com/100",
      role: "student",
      status: "regular",
    },
  ];

  // State
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYearLevel, setSelectedYearLevel] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Handle Edit Student
  const handleEditStudent = (updatedStudent) => {
    setData((prevData) =>
      prevData.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setIsEditModalOpen(false);
  };

  // Handle Remove Student
  const handleRemoveStudent = (studentId) => {
    setData((prevData) =>
      prevData.filter((student) => student.id !== studentId)
    );
  };

  // Define columns for DataTable
  const columns = [
    {
      name: "Student ID",
      selector: (row) => row.studentId || "N/A",
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
      name: "Course",
      selector: (row) => row.course || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Block",
      selector: (row) => row.year_and_section || "N/A",
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
      name: "Year Level",
      selector: (row) => {
        const year = row.year_and_section ? row.year_and_section[0] : "N/A";
        return year === "N/A"
          ? "N/A"
          : `${year}${year === "1" ? "st" : year === "2" ? "nd" : "rd"} Year`;
      },
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
              setSelectedStudent(row);
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
      (item.studentId || "").toLowerCase().includes(search.toLowerCase());
    const matchesCourse = selectedCourse
      ? item.course === selectedCourse
      : true;
    const matchesYearLevel = selectedYearLevel
      ? `${item.year_and_section ? item.year_and_section[0] : "N/A"}${
          item.year_and_section && item.year_and_section[0] === "1"
            ? "st"
            : item.year_and_section && item.year_and_section[0] === "2"
            ? "nd"
            : "rd"
        } Year` === selectedYearLevel
      : true;
    const matchesBlock = selectedBlock
      ? item.year_and_section === selectedBlock
      : true;
    const matchesDepartment = selectedDepartment
      ? item.department === selectedDepartment
      : true;
    return (
      matchesSearch &&
      matchesCourse &&
      matchesYearLevel &&
      matchesBlock &&
      matchesDepartment
    );
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
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between border-t-2 border-green-500">
        <div className="flex items-center">
          <h1 className="text-xl text-[#2D336B] font-bold">Students</h1>
        </div>
        {userRole !== "instructor" && (
        <div className="flex items-center space-x-3 text-[#ffffff]">
          <button
            className="flex items-center bg-white border-2 border-blue-700 px-3 py-1.5 text-blue-700 text-sm rounded-md hover:bg-blue-700 not-[]:transition-colors hover:text-white"
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
        )}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-3 text-xs">
            {/* Course Dropdown */}
            <div className="relative w-36 min-w-[9rem]">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="appearance-none border-1 border-[#2D336B] rounded-md px-2 py-1 pr-8 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
              >
                <option value="">All Courses</option>
                {["BSIT", "BSCS"].sort().map((course) => (
                  <option key={course} value={course}>
                    {course}
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

            {/* Year Level Dropdown */}
            <div className="relative w-36 min-w-[9rem]">
              <select
                value={selectedYearLevel}
                onChange={(e) => setSelectedYearLevel(e.target.value)}
                className="appearance-none border-1 border-[#2D336B] rounded-md px-2 py-1 pr-8 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
              >
                <option value="">Year Level</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
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

            {/* Block Dropdown */}
            <div className="relative w-36 min-w-[9rem]">
              <select
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className="appearance-none border-1 border-[#2D336B] rounded-md px-2 py-1 pr-8 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
              >
                <option value="">All Blocks</option>
                {[...new Set(data.map((item) => item.year_and_section))]
                  .sort()
                  .map((block) => (
                    <option key={block} value={block}>
                      {block}
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
      <ViewStudentModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        student={selectedStudent}
        onEdit={() => {
          setIsViewModalOpen(false);
          setIsEditModalOpen(true);
        }}
        onRemove={handleRemoveStudent}
      />
      <BulkRegistrationModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
      />
      <ManualRegistrationModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />
      <EditStudentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        student={selectedStudent}
        onSave={handleEditStudent}
      />
    </div>
  );
}

export default StudentsPage;
