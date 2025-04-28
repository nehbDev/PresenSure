import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const DeleteScheduleModal = ({ isOpen, onClose, onConfirm, schedule }) => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => {
        setAnimate(true);
      }, 0);
    } else {
      setAnimate(false);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isVisible || !schedule) return null;

  return (
    <div
      className={`fixed inset-0 bg-opacity-50 flex items-center justify-center z-60 transition-opacity duration-300 backdrop-blur-xs ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-md w-full max-w-sm h-[160px] transform transition-all duration-300 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-[#DC2626] flex justify-between items-center px-4 py-2 rounded-t-lg">
          <h2 className="text-lg font-bold text-white">Confirm Deletion</h2>
          <button onClick={onClose} className="text-white">
            <FaTimes className="h-3 w-3" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-center">
          <p className="text-xs text-gray-800 text-center">
            Are you sure you want to delete{" "}
            <strong className="text-xs font-semibold">
              {schedule.subjectCode} - {schedule.description}
            </strong>
            ?
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-3 border-t border-gray-200">
          <button
            onClick={() => {
              onConfirm(schedule.id);
              onClose();
            }}
            className="flex items-center bg-[#DC2626] border border-[#DC2626] px-2 py-1 text-xs text-white rounded-md hover:bg-[#B91C1C] hover:border-[#B91C1C] transition-all duration-300 hover:scale-95"
          >
            <FaTrash className="mr-1 h-3 w-3" />
            Delete
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

const ViewScheduleModal = ({ isOpen, onClose, schedule, onEdit, onRemove }) => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Handle opening and closing with animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => {
        setAnimate(true);
      }, 0);
    } else {
      setAnimate(false);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isVisible || !schedule) return null;

  // Sample student data (same as ManualScheduleModal)
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

  // Filter students based on schedule.students (array of student IDs)
  const enrolledStudents = studentsData.filter((student) =>
    schedule.students?.includes(student.studentId)
  );

  // DataTable columns for enrolled students
  const columns = [
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
      wrap: true,
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
  ];

  // Custom styles for DataTable
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
        {/* Header */}
        <div className="bg-[#F59E0B] flex justify-between items-center px-4 py-2 rounded-t-lg">
          <h2 className="text-lg font-bold text-white">Schedule Details</h2>
          <button onClick={onClose} className="text-white">
            <FaTimes className="h-3 w-3" />
          </button>
        </div>

        {/* Scrollable Content with Hidden Scrollbar */}
        <div
          className="p-4 space-y-4 h-[calc(100%-5rem)] overflow-y-auto hide-scrollbar"
        >
          {/* Schedule Details */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 space-y-1">
              <h3 className="text-md font-bold text-[#2D336B]">
                {schedule.subjectCode} - {schedule.description}
              </h3>
              <p className="text-xs font-medium text-gray-800">
                Schedule ID: {schedule.scheduleId}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Days", value: schedule.days, type: "secondary" },
                { label: "Time", value: schedule.time, type: "secondary" },
                { label: "Room", value: schedule.room, type: "secondary" },
                { label: "Instructor", value: schedule.instructor, type: "secondary" },
                { label: "Total Students", value: schedule.totalStudents, type: "tertiary" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ease-out transform ${
                    animate ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                  } delay-${(index + 2) * 100}`}
                >
                  <div className="text-xs font-medium text-gray-700">{item.label}:</div>
                  <div
                    className={`${
                      item.type === "secondary" ? "text-[10px]" : "text-[10px]"
                    } text-gray-900`}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enrolled Students */}
          <div>
            <h3 className="text-md font-semibold text-[#2D336B] mt-4 mb-1">
              Enrolled Students
            </h3>
            <div className="max-h-40 view-schedule-table">
              <DataTable
                columns={columns}
                data={enrolledStudents}
                customStyles={customStyles}
                noDataComponent={
                  <div className="p-1 text-center text-gray-500 text-[10px]">
                    No students enrolled
                  </div>
                }
                highlightOnHover
                responsive
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-2 p-2 border-t border-gray-200">
          <button
            onClick={onEdit}
            className="flex items-center bg-[#D97706] border border-[#D97706] px-2 py-1 text-xs text-white rounded-md hover:bg-[#B45309] hover:border-[#B45309] transition-all duration-300 hover:scale-95"
          >
            <FaEdit className="mr-1 h-3 w-3" />
            Edit Schedule
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center bg-[#DC2626] border border-[#DC2626] px-2 py-1 text-xs text-white rounded-md hover:bg-[#B91C1C] hover:border-[#B91C1C] transition-all duration-300 hover:scale-95"
          >
            <FaTrash className="mr-1 h-3 w-3" />
            Remove Schedule
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteScheduleModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={(id) => {
            onRemove(id);
            setIsDeleteModalOpen(false);
            onClose(); // Close ViewScheduleModal after deletion
          }}
          schedule={schedule}
        />
      </div>
    </div>
  );
};

export default ViewScheduleModal;