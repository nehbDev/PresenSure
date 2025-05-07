import { FaTimes, FaTimesCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const ManualScheduleModal = ({ isOpen, onClose, onSave }) => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    scheduleId: "",
    subjectCode: "",
    description: "",
    days: "",
    startTime: "",
    endTime: "",
    room: "",
    instructor: "",
    students: [],
  });
  const [filters, setFilters] = useState({
    search: "",
    course: "",
    yearLevel: "",
    block: "",
    department: "",
  });

  const instructors = [
    { id: 1, name: "Anna Gomez" },
    { id: 2, name: "Mark Tan" },
    { id: 3, name: "Clara Lopez" },
  ];

  const students = [
    {
      id: 1,
      studentId: "C-2000-001",
      name: "Juan Dela Cruz",
      course: "BSIT",
      year_and_section: "1A",
      yearLevel: "1st Year",
      department: "CCS",
    },
    {
      id: 2,
      studentId: "C-2000-002",
      name: "Maria Santos",
      course: "BSCS",
      year_and_section: "2B",
      yearLevel: "2nd Year",
      department: "CCS",
    },
    {
      id: 3,
      studentId: "C-2000-003",
      name: "Pedro Reyes",
      course: "BSIT",
      year_and_section: "3A",
      yearLevel: "3rd Year",
      department: "CCS",
    },
  ];

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 7; hour <= 18; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour < 18) times.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return times;
  };
  const timeOptions = generateTimeOptions();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setFormData({
        scheduleId: "",
        subjectCode: "",
        description: "",
        days: "",
        startTime: "",
        endTime: "",
        room: "",
        instructor: "",
        students: [],
      });
      setFilters({
        search: "",
        course: "",
        yearLevel: "",
        block: "",
        department: "",
      });
      setTimeout(() => setAnimate(true), 0);
    } else {
      setAnimate(false);
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      student.studentId.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCourse = filters.course
      ? student.course === filters.course
      : true;
    const matchesYearLevel = filters.yearLevel
      ? student.yearLevel === filters.yearLevel
      : true;
    const matchesBlock = filters.block
      ? student.year_and_section === filters.block
      : true;
    const matchesDepartment = filters.department
      ? student.department === filters.department
      : true;
    return (
      matchesSearch &&
      matchesCourse &&
      matchesYearLevel &&
      matchesBlock &&
      matchesDepartment
    );
  });

  const handleSelectStudent = (studentId) => {
    setFormData((prev) => ({
      ...prev,
      students: prev.students.includes(studentId)
        ? prev.students.filter((id) => id !== studentId)
        : [...prev.students, studentId],
    }));
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      students: checked
        ? filteredStudents.map((student) => student.studentId)
        : [],
    }));
  };

  const handleRemoveStudent = (studentId) => {
    setFormData((prev) => ({
      ...prev,
      students: prev.students.filter((id) => id !== studentId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.startTime || !formData.endTime) {
      alert("Please select both start and end times.");
      return;
    }
    const startMinutes =
      parseInt(formData.startTime.split(":")[0]) * 60 +
      parseInt(formData.startTime.split(":")[1]);
    const endMinutes =
      parseInt(formData.endTime.split(":")[0]) * 60 +
      parseInt(formData.endTime.split(":")[1]);
    if (startMinutes >= endMinutes) {
      alert("End time must be after start time.");
      return;
    }
    const scheduleData = {
      ...formData,
      time: `${formData.startTime} - ${formData.endTime}`,
      totalStudents: formData.students.length,
    };
    onSave(scheduleData);
    onClose();
  };

  const columns = [
    {
      name: (
        <input
          type="checkbox"
          checked={
            filteredStudents.length > 0 &&
            filteredStudents.every((student) =>
              formData.students.includes(student.studentId)
            )
          }
          onChange={handleSelectAll}
          className="h-3 w-3 text-gray-700 focus:ring-blue-100 m-0"
        />
      ),
      selector: (row) => row.studentId,
      cell: (row) => (
        <input
          type="checkbox"
          checked={formData.students.includes(row.studentId)}
          onChange={() => handleSelectStudent(row.studentId)}
          className="h-3 w-3 text-gray-700 focus:ring-blue-100 m-0"
        />
      ),
      width: "50px",
      style: { justifyContent: "center", padding: "0" },
    },
    {
      name: "Student ID",
      selector: (row) => row.studentId,
      sortable: true,
      width: "100px",
      style: { justifyContent: "center" },
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "120px",
      style: { justifyContent: "center" },
    },
    {
      name: "Course",
      selector: (row) => row.course,
      sortable: true,
      width: "80px",
      style: { justifyContent: "center" },
    },
    {
      name: "Year & Section",
      selector: (row) => row.year_and_section,
      sortable: true,
      width: "80px",
      style: { justifyContent: "center" },
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
      width: "70px",
      style: { justifyContent: "center" },
    },
    {
      name: (
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          Action
        </div>
      ),
      cell: (row) => (
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <button
            type="button"
            onClick={() => handleRemoveStudent(row.studentId)}
            className="text-gray-700 hover:text-gray-900 transition-colors"
            title="Remove student"
          >
            <FaTimesCircle className="h-3 w-3" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
      style: { justifyContent: "flex-end", paddingRight: "0.75rem" },
    },
  ];

  const customStyles = {
    table: {
      style: {
        width: "100%",
        backgroundColor: "#F2F9FF",
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
        backgroundColor: "#F2F9FF",
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
    <div
      className={`fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 transition-opacity duration-300 backdrop-blur-xs ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-[#F2F9FF] rounded-lg shadow-sm w-full max-w-xl transform transition-all duration-300 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="bg-[#A9B5DF] flex justify-between items-center px-5 py-3 border-b rounded-t-lg border-gray-200">
          <h2 className="text-base font-bold text-[#2D336B]">Add Schedule</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="h-3 w-3" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4 max-h-[70vh] overflow-y-auto hide-scrollbar"
        >
          <div className="flex flex-col gap-4">
            {/* Schedule Details Section */}
            <div>
              <h3 className="text-base font-bold text-gray-700 mb-2">
                Schedule Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    label: "Schedule ID",
                    name: "scheduleId",
                    type: "text",
                    placeholder: "e.g., SCH-2025-001",
                  },
                  {
                    label: "Subject Code",
                    name: "subjectCode",
                    type: "text",
                    placeholder: "e.g., IT101",
                  },
                  {
                    label: "Description",
                    name: "description",
                    type: "text",
                    placeholder: "e.g., Introduction to Programming",
                  },
                  {
                    label: "Days",
                    name: "days",
                    type: "select",
                    options: ["MWF", "TTh"],
                  },
                  {
                    label: "Start Time",
                    name: "startTime",
                    type: "select",
                    options: timeOptions,
                  },
                  {
                    label: "End Time",
                    name: "endTime",
                    type: "select",
                    options: timeOptions,
                  },
                  {
                    label: "Room",
                    name: "room",
                    type: "text",
                    placeholder: "e.g., LAB-101",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Section */}
            <div>
              <h3 className="text-base font-bold text-gray-700 mb-2">
                Instructor
              </h3>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Instructor
                </label>
                <select
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                >
                  <option value="">Select Instructor</option>
                  {instructors.map((instructor) => (
                    <option key={instructor.id} value={instructor.name}>
                      {instructor.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Students Section */}
            <div>
              <h3 className="text-base font-bold text-gray-700 mb-2">
                Students
              </h3>
              <div className="space-y-3">
                <div className="text-xs">
                  {/* Four Filter Inputs in a Row */}
                  <div className="flex flex-row gap-2">
                    {[
                      {
                        name: "course",
                        placeholder: "All Courses",
                        options: [
                          ...new Set(students.map((s) => s.course)),
                        ].sort(),
                      },
                      {
                        name: "yearLevel",
                        placeholder: "All Year Levels",
                        options: ["1st Year", "2nd Year", "3rd Year"],
                      },
                      {
                        name: "block",
                        placeholder: "All Blocks",
                        options: [
                          ...new Set(students.map((s) => s.year_and_section)),
                        ].sort(),
                      },
                      {
                        name: "department",
                        placeholder: "All Departments",
                        options: [
                          ...new Set(students.map((s) => s.department)),
                        ].sort(),
                      },
                    ].map((filter) => (
                      <div
                        key={filter.name}
                        className="relative flex-1 min-w-[100px]"
                      >
                        <select
                          name={filter.name}
                          value={filters[filter.name]}
                          onChange={handleFilterChange}
                          className="appearance-none border border-gray-300 rounded-md px-2 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-xs"
                        >
                          <option value="">{filter.placeholder}</option>
                          {filter.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
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
                    ))}
                  </div>
                  {/* Search Bar Below, Aligned to the Right */}
                  <div className="flex justify-end mt-2">
                    <div className="relative w-full sm:w-[300px]">
                      <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                        placeholder="Search by name or ID"
                        className="border border-gray-300 rounded-md pl-8 pr-2 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 text-xs"
                      />
                      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                        <svg
                          className="w-3 h-3 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-h-40">
                  <DataTable
                    columns={columns}
                    data={filteredStudents}
                    customStyles={customStyles}
                    noDataComponent={
                      <div className="p-1 text-center text-gray-500 text-xs">
                        No students found
                      </div>
                    }
                    highlightOnHover
                    responsive
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Selected students: {formData.students.length}
                </p>
              </div>
            </div>
          </div>
        </form>

        <div className="flex justify-end gap-2 p-5 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-200 rounded-md hover:bg-green-700 transition-colors hover:text-green-100"
          >
            Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualScheduleModal;
