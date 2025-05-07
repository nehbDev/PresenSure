import { FaTimes, FaUserCircle } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

const ManualRegistrationModal = ({ isOpen, onClose, onSave }) => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    firstname: "",
    middle_initial: "",
    lastname: "",
    course: "",
    department: "",
    year_and_section: "",
    sex: "",
    email: "",
    password: "",
    status: "",
    student_photo: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef(null);

  // Handle opening and closing with animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setFormData({
        studentId: "",
        firstname: "",
        middle_initial: "",
        lastname: "",
        course: "",
        department: "",
        year_and_section: "",
        sex: "",
        email: "",
        password: "",
        status: "",
        student_photo: "",
      });
      setPreviewImage("");
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

  if (!isVisible) return null;

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({ ...prev, student_photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
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
        {/* Header */}
        <div className="bg-[#A9B5DF] flex justify-between items-center px-5 py-3 border-b rounded-t-lg border-gray-200">
          <h2 className="text-base font-bold text-[#2D336B]">
            Manual Registration
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="h-3 w-3" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4 max-h-[70vh] overflow-y-auto hide-scrollbar"
        >
          <div className="flex flex-col gap-4">
            {/* Profile Icon/Photo and Primary Inputs */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex flex-col items-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Student"
                    className="w-20 h-20 object-cover object-center rounded-full border border-gray-400"
                  />
                ) : (
                  <FaUserCircle className="w-20 h-20 text-gray-400 rounded-full border border-gray-400" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="mt-2 bg-gray-200 text-gray-700 px-2 py-1 text-xs font-semibold rounded-md border border-gray-400 hover:bg-gray-300 transition-colors"
                >
                  Upload Photo
                </button>
              </div>
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      label: "Student ID",
                      name: "studentId",
                      placeholder: "e.g., C-2000-001",
                    },
                    {
                      label: "First Name",
                      name: "firstname",
                      placeholder: "e.g., Juan",
                    },
                    {
                      label: "Middle Initial",
                      name: "middle_initial",
                      placeholder: "e.g., D.",
                    },
                    {
                      label: "Last Name",
                      name: "lastname",
                      placeholder: "e.g., Dela Cruz",
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Secondary and Tertiary Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  label: "Course",
                  name: "course",
                  type: "select",
                  options: ["BSIT", "BSCS"],
                },
                {
                  label: "Year & Section",
                  name: "year_and_section",
                  type: "text",
                  placeholder: "e.g., 3-A",
                },
                {
                  label: "Department",
                  name: "department",
                  type: "text",
                  placeholder: "e.g., CCS",
                },
                {
                  label: "Sex",
                  name: "sex",
                  type: "select",
                  options: ["Male", "Female"],
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  placeholder: "e.g., juan@example.com",
                },
                {
                  label: "Status",
                  name: "status",
                  type: "select",
                  options: ["regular", "irregular"],
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
        </form>

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
            type="submit"
            onClick={handleSubmit}
            className="px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-200 rounded-md hover:bg-green-700 transition-colors hover:text-green-100"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualRegistrationModal;
