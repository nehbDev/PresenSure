import { FaTimes, FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const ViewInstructorModal = ({ isOpen, onClose, instructor, onEdit, onRemove }) => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Handle opening and closing of both modals
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
        setShowDeleteModal(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isVisible || !instructor) return null;

  // Handle deletion confirmation
  const handleConfirmRemove = () => {
    onRemove(instructor.id);
    setShowDeleteModal(false);
    onClose();
  };

  // Sample schedule data for instructor
  const schedule = [
    {
      courseId: "CS101",
      subject: "Introduction to Programming",
      day: "Monday",
      room: "Room 101",
      time: "9:00 AM - 11:00 AM",
    },
    {
      courseId: "CS102",
      subject: "Data Structures",
      day: "Wednesday",
      room: "Room 102",
      time: "1:00 PM - 3:00 PM",
    },
    {
      courseId: "CS103",
      subject: "Database Systems",
      day: "Friday",
      room: "Room 103",
      time: "10:00 AM - 12:00 PM",
    },
    {
      courseId: "CS104",
      subject: "Operating Systems",
      day: "Tuesday",
      room: "Room 104",
      time: "2:00 PM - 4:00 PM",
    },
  ];

  return (
    <>
      {/* Main View Instructor Modal */}
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
            <h2 className="text-base font-bold text-[#2D336B]">
              Instructor Details
            </h2>
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
            {/* Instructor Info */}
            <div className="flex flex-col gap-4">
              {/* Photo + Name */}
              <div className="flex flex-row flex-wrap gap-4 items-center justify-center w-full">
                <FaUserCircle className="w-20 h-20 text-gray-400 rounded-full border border-gray-400" />
                <div className="flex-1 space-y-1">
                  <h3 className="text-base font-bold text-gray-700">
                    {instructor.firstname} {instructor.middle_initial}.{" "}
                    {instructor.lastname}
                  </h3>
                  <p className="text-xs font-medium text-gray-700">
                    Instructor ID: {instructor.instructorId}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Department", value: instructor.department },
                  { label: "Sex", value: instructor.sex },
                  { label: "Email", value: instructor.email },
                  { label: "Password", value: "••••••••" },
                  { label: "Role", value: instructor.role },
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

            {/* Schedule */}
            <div>
              <h3 className="text-base font-bold text-gray-700 mt-4 mb-1">
                Teaching Schedule
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#A9B5DF] text-[#2D336B] font-bold">
                      <th className="p-2 text-center">Course ID</th>
                      <th className="p-2 text-center">Subject</th>
                      <th className="p-2 text-center">Day</th>
                      <th className="p-2 text-center">Room</th>
                      <th className="p-2 text-center">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-100"
                        } text-[#2D336B]`}
                      >
                        <td className="p-2 text-center">{item.courseId}</td>
                        <td className="p-2 text-center">{item.subject}</td>
                        <td className="p-2 text-center">{item.day}</td>
                        <td className="p-2 text-center">{item.room}</td>
                        <td className="p-2 text-center">{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-center gap-3 p-5 border-t border-gray-200 w-full">
            <button
              onClick={onEdit}
              className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-200 rounded-md hover:bg-green-700 border-2 border-green-700 hover:text-green-100 transition-colors whitespace-nowrap"
            >
              <FaEdit className="mr-1 h-3 w-3 inline" />
              Edit Instructor
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-200 rounded-md hover:bg-red-700 border-2 border-red-700 hover:text-red-100 transition-colors whitespace-nowrap"
            >
              <FaTrash className="mr-1 h-3 w-3 inline" />
              Remove Instructor
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Deleting Instructor */}
      {showDeleteModal && (
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
              <h2 className="text-base font-bold text-red-700">
                Confirm Deletion
              </h2>
              <button
                onClick={() => setShowDeleteModal(false)}
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
                  {instructor.firstname} {instructor.lastname}
                </strong>
                ?
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 p-5 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-200 rounded-md hover:bg-red-700 hover:text-red-100 transition-colors"
              >
                <FaTrash className="mr-1 h-3 w-3 inline" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewInstructorModal;