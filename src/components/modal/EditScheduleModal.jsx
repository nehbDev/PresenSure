import { FaTimes, FaTimesCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const EditScheduleModal = ({ isOpen, onClose, schedule, onSave }) => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState(schedule || {});
  const [filters, setFilters] = useState({
    search: "",
    course: "",
    yearLevel: "",
    block: "",
    department: "",
  });

  const instructors = [
    { id: 1, name: "Prof. Anna Smith" },
    { id: 2, name: "Mark Tan" },
    { id: 3, name: "Clara Lopez" },
  ];

  const instructorList = [
    ...instructors,
    ...(schedule?.instructor &&
    !instructors.some((i) => i.name === schedule.instructor)
      ? [{ id: instructors.length + 1, name: schedule.instructor }]
      : []),
  ];

  const studentsData = [
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

  const parseTime = (timeString) => {
    if (!timeString) return { startTime: "", endTime: "" };
    const regex = /(\d{1,2}:\d{2})\s*(AM|PM)?\s*-\s*(\d{1,2}:\d{2})\s*(AM|PM)?/;
    const match = timeString.match(regex);
    if (!match) return { startTime: "", endTime: "" };

    let [_, start, startPeriod, end, endPeriod] = match;

    if (startPeriod && endPeriod) {
      const startHour = parseInt(start.split(":")[0]);
      const endHour = parseInt(end.split(":")[0]);
      start =
        startPeriod === "PM" && startHour !== 12
          ? `${(startHour + 12).toString().padStart(2, "0")}:${
              start.split(":")[1]
            }`
          : startPeriod === "AM" && startHour === 12
          ? `00:${start.split(":")[1]}`
          : start;
      end =
        endPeriod === "PM" && endHour !== 12
          ? `${(endHour + 12).toString().padStart(2, "0")}:${end.split(":")[1]}`
          : endPeriod === "AM" && endHour === 12
          ? `00:${end.split(":")[1]}`
          : end;
    }

    return { startTime: start, endTime: end };
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const { startTime, endTime } = parseTime(schedule?.time);
      setFormData({
        ...schedule,
        students: Array.isArray(schedule?.students) ? schedule.students : [],
        id: schedule?.id || "",
        instructor: schedule?.instructor || "",
        startTime,
        endTime,
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
  }, [isOpen, schedule]);

  if (!isVisible || !schedule) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredStudents = studentsData.filter((student) => {
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
          className="h-3 w-3 text-[#2D336B] focus:ring-[#34495E]"
        />
      ),
      selector: (row) => row.studentId,
      cell: (row) => (
        <input
          type="checkbox"
          checked={formData.students.includes(row.studentId)}
          onChange={() => handleSelectStudent(row.studentId)}
          className="h-3 w-3 text-[#2D336B] focus:ring-[#34495E]"
        />
      ),
      width: "60px",
      style: { textAlign: "center !important" },
    },
    {
      name: "Student ID",
      selector: (row) => row.studentId,
      sortable: true,
      width: "100px",
      style: { textAlign: "center !important" },
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "120px",
      style: { textAlign: "center !important" },
    },
    {
      name: "Course",
      selector: (row) => row.course,
      sortable: true,
      width: "80px",
      style: { textAlign: "center !important" },
    },
    {
      name: "Year & Section",
      selector: (row) => row.year_and_section,
      sortable: true,
      width: "80px",
      style: { textAlign: "center !important" },
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
      width: "80px",
      style: { textAlign: "center !important" },
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
            className="text-[#DC2626] hover:text-[#B91C1C] transition-colors"
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
      style: { textAlign: "right !important", paddingRight: "0.75rem" },
    },
  ];

  const customStyles = {
    table: {
      style: {
        borderCollapse: "separate",
        borderSpacing: "0 0.25rem",
        width: "100%",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#A9B5DF",
        border: "1px solid #e5e7eb",
        marginBottom: "0.25rem",
      },
    },
    headCells: {
      style: {
        padding: "0.125rem",
        textAlign: "center",
        fontWeight: "bold",
        color: "#2D336B",
        fontSize: "0.625rem",
        boxSizing: "border-box",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    cells: {
      style: {
        padding: "0.125rem",
        textAlign: "center",
        fontSize: "0.625rem",
        boxSizing: "border-box",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginRight: "0.25rem",
      },
    },
    rows: {
      style: {
        backgroundColor: "#f1f5f9",
        border: "1px solid #e5e7eb",
        borderRadius: "0.25rem",
        marginBottom: "0.25rem",
        minHeight: "1.5rem",
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
    <div
      className={`fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 backdrop-blur-xs ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-md w-full max-w-[55%] h-[500px] transform transition-all duration-300 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="bg-[#D97706] flex justify-between items-center px-4 py-2 rounded-t-lg">
          <h2 className="text-lg font-bold text-white">Edit Schedule</h2>
          <button onClick={onClose} className="text-white">
            <FaTimes className="h-3 w-3" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 space-y-4 h-[calc(100%-6rem)] overflow-y-auto hide-scrollbar"
        >
          <div className="flex flex-col gap-4">
            <div className="border-b border-gray-200 pb-1">
              <h3 className="text-base font-semibold text-gray-800">
                Schedule Details
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  label: "Schedule ID",
                  name: "id",
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
                  label: "Room",
                  name: "room",
                  type: "text",
                  placeholder: "e.g., LAB-101",
                },
              ].map((field, index) => (
                <div
                  key={field.name}
                  className={`transition-all duration-300 ease-out transform hover:bg-gray-50 p-1 rounded-md delay-${
                    index * 100
                  }`}
                >
                  <label className="text-xs font-medium text-gray-700">
                    {field.label}:
                  </label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="border-2 border-[#2D336B] rounded-md px-1 py-0.5 h-7 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
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
                      className="border-2 border-[#2D336B] rounded-md px-1 py-0.5 h-7 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
                    />
                  )}
                </div>
              ))}
              <div className="transition-all duration-300 ease-out transform hover:bg-gray-50 p-1 rounded-md delay-400">
                <label className="text-xs font-medium text-gray-700">
                  Time:
                </label>
                <div className="flex gap-2">
                  <select
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="border-2 border-[#2D336B] rounded-md px-1 py-0.5 h-7 w-1/2 focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
                  >
                    <option value="">Start Time</option>
                    {timeOptions.map((time) => (
                      <option key={`start-${time}`} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <select
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="border-2 border-[#2D336B] rounded-md px-1 py-0.5 h-7 w-1/2 focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
                  >
                    <option value="">End Time</option>
                    {timeOptions.map((time) => (
                      <option key={`end-${time}`} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-1 mt-3">
              <h3 className="text-base font-semibold text-gray-800">
                Instructor Assignment
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="transition-all duration-300 ease-out transform hover:bg-gray-50 p-1 rounded-md delay-600">
                <label className="text-xs font-medium text-gray-700">
                  Instructor:
                </label>
                <select
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  className="border-2 border-[#2D336B] rounded-md px-1 py-0.5 h-7 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
                >
                  <option value="">Select Instructor</option>
                  {instructorList.map((instructor) => (
                    <option key={instructor.id} value={instructor.name}>
                      {instructor.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-1 mt-3">
              <h3 className="text-base font-semibold text-gray-800">
                Student Assignment
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex flex-row gap-2 text-[10px]">
                <div className="relative flex-1 min-w-[100px]">
                  <select
                    name="course"
                    value={filters.course}
                    onChange={handleFilterChange}
                    className="appearance-none border-2 border-[#2D336B] rounded-md px-1 py-0.5 pr-6 h-7 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-[10px]"
                  >
                    <option value="">All Courses</option>
                    {[...new Set(studentsData.map((s) => s.course))]
                      .sort()
                      .map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
                    <svg
                      className="w-2 h-2 text-gray-500"
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
                <div className="relative flex-1 min-w-[100px]">
                  <select
                    name="yearLevel"
                    value={filters.yearLevel}
                    onChange={handleFilterChange}
                    className="appearance-none border-2 border-[#2D336B] rounded-md px-1 py-0.5 pr-6 h-7 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-[10px]"
                  >
                    <option value="">All Year Levels</option>
                    {["1st Year", "2nd Year", "3rd Year"].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
                    <svg
                      className="w-2 h-2 text-gray-500"
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
                <div className="relative flex-1 min-w-[100px]">
                  <select
                    name="block"
                    value={filters.block}
                    onChange={handleFilterChange}
                    className="appearance-none border-2 border-[#2D336B] rounded-md px-1 py-0.5 pr-6 h-7 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-[10px]"
                  >
                    <option value="">All Blocks</option>
                    {[...new Set(studentsData.map((s) => s.year_and_section))]
                      .sort()
                      .map((block) => (
                        <option key={block} value={block}>
                          {block}
                        </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
                    <svg
                      className="w-2 h-2 text-gray-500"
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
                <div className="relative flex-1 min-w-[100px]">
                  <select
                    name="department"
                    value={filters.department}
                    onChange={handleFilterChange}
                    className="appearance-none border-2 border-[#2D336B Vassie
                    rounded-md px-1 py-0.5 pr-6 h-7 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-[10px]"
                  >
                    <option value="">All Departments</option>
                    {[...new Set(studentsData.map((s) => s.department))]
                      .sort()
                      .map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
                    <svg
                      className="w-2 h-2 text-gray-500"
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
                <div className="relative flex-1 min-w-[120px]">
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search by name or ID"
                    className="border-2 border-[#2D336B] rounded-md pl-4 pr-1 py-0.5 h-7 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-[10px]"
                  />
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                    <svg
                      className="w-2 h-2 text-gray-500"
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

              <div className="max-h-40 edit-schedule-table">
                <DataTable
                  columns={columns}
                  data={filteredStudents}
                  customStyles={customStyles}
                  noDataComponent={
                    <div className="p-1 text-center text-gray-500 text-[10px]">
                      No students found
                    </div>
                  }
                  highlightOnHover
                  responsive
                />
              </div>
              <p className="text-[10px] text-gray-500">
                Selected students: {formData.students.length}
              </p>
            </div>
          </div>
        </form>

        <div className="flex justify-end gap-2 p-3 border-t border-gray-200">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center bg-[#D97706] border border-[#D97706] px-2 py-1 text-xs text-white rounded-md hover:bg-[#B45309] hover:border-[#B45309] transition-all duration-300 hover:scale-95"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center bg-gray-300 border border-gray-300 px-2 py-1 text-xs text-black rounded-md hover:bg-gray-400 hover:border-gray-400 transition-all duration-300 hover:scale-95"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditScheduleModal;
