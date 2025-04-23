import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";

const ViewInstructorModal = ({ isOpen, onClose, instructor, onEdit, onRemove }) => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  if (!isVisible || !instructor) return null;

  // Sample schedule data for instructor (replace with actual instructor.schedule)
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
    <div
      className={`fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 backdrop-blur-xs ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-md w-full max-w-[90%] transform transition-all duration-300 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-[#2D336B] flex justify-between items-center px-6 py-3 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Instructor Details</h2>
          <button onClick={onClose} className="text-white">
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Instructor Details */}
          <div className="flex flex-col gap-6">
            {/* Primary Info (No Photo) */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-bold text-[#2D336B]">
                  {instructor.firstname} {instructor.middle_initial}.{" "}
                  {instructor.lastname}
                </h3>
                <p className="text-md font-medium text-gray-800">
                  Instructor ID: {instructor.instructorId}
                </p>
              </div>
            </div>

            {/* Secondary and Tertiary Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Department", value: instructor.department, type: "secondary" },
                { label: "Sex", value: instructor.sex, type: "secondary" },
                { label: "Email", value: instructor.email, type: "tertiary" },
                { label: "Password", value: "••••••••", type: "tertiary" },
                { label: "Role", value: instructor.role, type: "tertiary" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ease-out transform ${
                    animate
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  } ${index === 0 ? "delay-0" : `delay-${(index + 2) * 100}`}`}
                >
                  <div className="text-sm font-medium text-gray-700">
                    {item.label}:
                  </div>
                  <div
                    className={`${
                      item.type === "secondary" ? "text-sm" : "text-xs"
                    } text-gray-900`}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Schedule */}
          <div>
            <h3 className="text-lg font-semibold text-[#2D336B] mt-6 mb-2">
              Teaching Schedule
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#A9B5DF] text-[#2D336B] font-bold">
                    <th className="p-2 text-center border border-gray-200">
                      Course ID
                    </th>
                    <th className="p-2 text-center border border-gray-200">
                      Subject
                    </th>
                    <th className="p-2 text-center border border-gray-200">
                      Day
                    </th>
                    <th className="p-2 text-center border border-gray-200">
                      Room
                    </th>
                    <th className="p-2 text-center border border-gray-200">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item, index) => (
                    <tr
                      key={index}
                      className={`bg-slate-100 border-b border-gray-200 transition-all duration-500 ease-out transform ${
                        animate
                          ? "translate-y-0 opacity-100"
                          : "translate-y-5 opacity-0"
                      } delay-${(index + 10) * 100}`}
                    >
                      <td className="p-2 text-center border border-gray-200">
                        {item.courseId}
                      </td>
                      <td className="p-2 text-center border border-gray-200">
                        {item.subject}
                      </td>
                      <td className="p-2 text-center border border-gray-200">
                        {item.day}
                      </td>
                      <td className="p-2 text-center border border-gray-200">
                        {item.room}
                      </td>
                      <td className="p-2 text-center border border-gray-200">
                        {item.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-3 p-4 border-t border-gray-200">
          <button
            onClick={onEdit}
            className="flex items-center bg-[#2D336B] border border-[#2D336B] px-3 py-1.5 text-sm text-white rounded-md hover:border-[#ffffff] transition-all duration-300 hover:scale-95"
          >
            <FaEdit className="mr-1 h-4 w-4" />
            Edit Instructor
          </button>
          <button
            onClick={() => onRemove(instructor.id)}
            className="flex items-center bg-red-600 border border-red-600 px-3 py-1.5 text-sm text-white rounded-md hover:border-[#ffffff] transition-all duration-300 hover:scale-95"
          >
            <FaTrash className="mr-1 h-4 w-4" />
            Remove Instructor
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewInstructorModal;