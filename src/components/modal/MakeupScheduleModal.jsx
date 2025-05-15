import { FaTimes, FaCalendarPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

const MakeupScheduleModal = ({ isOpen, onClose, onScheduleMakeup, schedule }) => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    room: "",
  });
  const [errors, setErrors] = useState({});

  // Handle modal animation
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

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        date: "",
        time: "",
        room: "",
      });
      setErrors({});
    }
  }, [isOpen]);

  if (!isVisible || !schedule) return null;

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Generate time options
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 7; hour <= 18; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour < 18) times.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return times;
  };
  const timeOptions = generateTimeOptions();

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) {
      newErrors.time = "Time is required";
    } else if (
      !timeOptions.includes(formData.time.split(" - ")[0]) ||
      !timeOptions.includes(formData.time.split(" - ")[1])
    ) {
      newErrors.time = "Invalid time selection";
    }
    if (!formData.room) newErrors.room = "Room is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      const [startTime, endTime] = formData.time.split(" - ");
      onScheduleMakeup({
        ...formData,
        time: `${startTime} - ${endTime}`, // Format time as a range
        subjectCode: schedule.subjectCode,
        description: schedule.description,
        instructor: schedule.instructor,
        students: schedule.students,
        totalStudents: schedule.totalStudents,
      });
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-opacity-30 flex items-center justify-center z-60 transition-opacity duration-300 backdrop-blur-xs ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-[#F2F9FF] rounded-lg shadow-sm w-full max-w-md h-[320px] transform transition-all duration-300 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-[#A9B5DF] flex justify-between items-center px-5 py-3 rounded-t-lg border-b border-gray-200">
          <h2 className="text-base font-bold text-[#2D336B]">
            Schedule Makeup Class
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="h-3 w-3" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col space-y-3 overflow-y-auto">
          {/* Read-only Schedule Info */}
          <div className="space-y-1">
            <div className="text-xs font-bold text-gray-700">
              {schedule.subjectCode} - {schedule.description}
            </div>
            <div className="text-xs text-gray-700">
              Instructor: {schedule.instructor}
            </div>
            <div className="text-xs text-gray-700">
              Total Students: {schedule.totalStudents}
            </div>
          </div>

          {/* Form Inputs in One Row */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Date
              </label>
              <select
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              >
                <option value="">Select Date</option>
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  const formattedDate = date.toISOString().split("T")[0];
                  return (
                    <option key={formattedDate} value={formattedDate}>
                      {date.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </option>
                  );
                })}
              </select>
              {errors.date && (
                <p className="text-xs text-red-600">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Time
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              >
                <option value="">Select Time Range</option>
                {timeOptions.map((startTime) => {
                  const startIndex = timeOptions.indexOf(startTime);
                  if (startIndex < timeOptions.length - 1) {
                    const endTime = timeOptions[startIndex + 1];
                    return (
                      <option
                        key={`${startTime}-${endTime}`}
                        value={`${startTime} - ${endTime}`}
                      >
                        {`${startTime} - ${endTime}`}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
              {errors.time && (
                <p className="text-xs text-red-600">{errors.time}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Room
              </label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                placeholder="e.g., LAB-101"
                className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              />
              {errors.room && (
                <p className="text-xs text-red-600">{errors.room}</p>
              )}
            </div>
          </div>
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
            onClick={handleSubmit}
            className="px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-200 rounded-md hover:bg-purple-700 hover:text-purple-100 transition-colors"
          >
            <FaCalendarPlus className="mr-1 h-3 w-3 inline" />
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeupScheduleModal;