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
      className={`fixed inset-0 bg-opacity-30 flex items-center justify-center z-60 transition-opacity duration-300 backdrop-blur-xs ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-[#F2F9FF] rounded-lg shadow-sm w-full max-w-md h-[180px] transform transition-all duration-300 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-red-200 flex justify-between items-center px-5 py-3 rounded-t-lg border-b border-gray-200">
          <h2 className="text-base font-bold text-red-700">Confirm Deletion</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="h-3 w-3" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-700 text-center">
            Are you sure you want to delete{" "}
            <strong className="text-xs font-semibold">
              {schedule.subjectCode} - {schedule.description}
            </strong>
            ?
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-5 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(schedule.id);
              onClose();
            }}
            className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-200 rounded-md hover:bg-red-700 hover:text-red-100 transition-colors"
          >
            <FaTrash className="mr-1 h-3 w-3 inline" />
            Delete
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
      style: { justifyContent: "center" },
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
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
      width: "80px",
      style: { justifyContent: "center" },
    },
  ];

  // Custom styles for DataTable
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
        className={`bg-[#F2F9FF] rounded-lg shadow-sm w-full max-w-xl max-h-[500px] transform transition-all duration-300 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-[#A9B5DF] flex justify-between items-center px-5 py-3 border-b rounded-t-lg border-gray-200">
          <h2 className="text-base font-bold text-[#2D336B">Schedule Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="h-3 w-3" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          className="p-5 space-y-4 overflow-y-auto hide-scrollbar"
          style={{ maxHeight: "calc(70vh - 104px)" }}
        >
          {/* Schedule Details */}
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
                  <div className="text-xs text-gray-900">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Enrolled Students */}
          <div>
            <h3 className="text-base font-bold text-gray-700 mt-4 mb-1">
              Enrolled Students
            </h3>
            <div className="max-h-40">
              <DataTable
                columns={columns}
                data={enrolledStudents}
                customStyles={customStyles}
                noDataComponent={
                  <div className="p-1 text-center text-gray-500 text-xs">
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
        <div className="flex justify-center gap-3 p-5 border-t border-gray-200 w-full">
          <button
            onClick={onEdit}
            className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-200 rounded-md hover:bg-green-700 border-2 border-green-700 hover:text-green-100 transition-colors whitespace-nowrap"
          >
            <FaEdit className="mr-1 h-3 w-3 inline" />
            Edit Schedule
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-200 rounded-md hover:bg-red-700 border-2 border-red-700 hover:text-red-100 transition-colors whitespace-nowrap"
          >
            <FaTrash className="mr-1 h-3 w-3 inline" />
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
            onClose();
          }}
          schedule={schedule}
        />
      </div>
    </div>
  );
};

export default ViewScheduleModal;