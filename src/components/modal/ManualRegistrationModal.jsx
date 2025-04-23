import { FaTimes } from "react-icons/fa";
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
      className={`fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 backdrop-blur-xs ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-md w-full max-w-[80%] h-[550px] transform transition-all duration-300 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-[#2D336B] flex justify-between items-center px-6 py-3 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Manual Registration</h2>
          <button onClick={onClose} className="text-white">
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 h-[calc(100%-7rem)] overflow-y-auto">
          <div className="flex flex-col gap-6">
            {/* Photo and Primary Inputs */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex flex-col items-center">
                <img
                  src={previewImage || "https://via.placeholder.com/100"}
                  alt="Student"
                  className="w-25 h-25 object-cover rounded-lg shadow-sm my-6 mx-3"
                />
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
                  className="bg-[#2D336B] text-white px-3 py-1.5 text-xs rounded-md hover:bg-[#3e5a77] transition-colors w-25"
                >
                  Select Photo
                </button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="transition-all duration-300 ease-out transform hover:bg-gray-50 p-2 rounded-md delay-0">
                    <label className="text-sm font-medium text-gray-700">First Name:</label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="border-2 border-[#2D336B] rounded-md px-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-sm"
                      placeholder="e.g., Juan"
                    />
                  </div>
                  <div className="transition-all duration-300 ease-out transform hover:bg-gray-50 p-2 rounded-md delay-100">
                    <label className="text-sm font-medium text-gray-700">Middle Initial:</label>
                    <input
                      type="text"
                      name="middle_initial"
                      value={formData.middle_initial}
                      onChange={handleChange}
                      className="border-2 border-[#2D336B] rounded-md px-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-sm"
                      placeholder="e.g., D."
                    />
                  </div>
                  <div className="transition-all duration-300 ease-out transform hover:bg-gray-50 p-2 rounded-md delay-200">
                    <label className="text-sm font-medium text-gray-700">Last Name:</label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="border-2 border-[#2D336B] rounded-md px-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-sm"
                      placeholder="e.g., Dela Cruz"
                    />
                  </div>
                  <div className="transition-all duration-300 ease-out transform hover:bg-gray-50 p-2 rounded-md delay-300">
                    <label className="text-sm font-medium text-gray-700">Student ID:</label>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      className="border-2 border-[#2D336B] rounded-md px-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-sm"
                      placeholder="e.g., C-2000-001"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary and Tertiary Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Course",
                  name: "course",
                  type: "select",
                  options: ["BSIT", "BSCS"],
                  hierarchy: "secondary",
                },
                {
                  label: "Year & Section",
                  name: "year_and_section",
                  type: "text",
                  hierarchy: "secondary",
                  placeholder: "e.g., 3-A",
                },
                {
                  label: "Department",
                  name: "department",
                  type: "text",
                  hierarchy: "secondary",
                  placeholder: "e.g., CCS",
                },
                {
                  label: "Sex",
                  name: "sex",
                  type: "select",
                  options: ["Male", "Female"],
                  hierarchy: "secondary",
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  hierarchy: "tertiary",
                  placeholder: "e.g., juan@example.com",
                },
                {
                  label: "Password",
                  name: "password",
                  type: "password",
                  hierarchy: "tertiary",
                  placeholder: "Enter password",
                },
                {
                  label: "Status",
                  name: "status",
                  type: "select",
                  options: ["regular", "irregular"],
                  hierarchy: "tertiary",
                },
              ].map((field, index) => (
                <div
                  key={field.name}
                  className={`transition-all duration-300 ease-out transform hover:bg-gray-50 p-2 rounded-md ${
                    animate ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                  } delay-${(index + 4) * 100}`}
                >
                  <label className="text-sm font-medium text-gray-700">{field.label}:</label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className={`border-2 border-[#2D336B] rounded-md px-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] ${
                        field.hierarchy === "secondary" ? "text-sm" : "text-xs"
                      }`}
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
                      className={`border-2 border-[#2D336B] rounded-md px-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] ${
                        field.hierarchy === "secondary" ? "text-sm" : "text-xs"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center bg-[#2D336B] border border-[#2D336B] px-3 py-1.5 text-sm text-white rounded-md hover:border-[#ffffff] transition-all duration-300 hover:scale-95"
          >
            Register
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center bg-[#34495E] text-white px-3 py-1.5 text-sm rounded-md hover:bg-[#3e5a77] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualRegistrationModal;