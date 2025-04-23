import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

const EditInstructorModal = ({ isOpen, onClose, instructor, onSave }) => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState(instructor || {});

  // Handle opening and closing with animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setFormData(instructor || {});
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
  }, [isOpen, instructor]);

  if (!isVisible || !instructor) return null;

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className={`fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 backdrop-blur-xs ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-md w-full max-w-[80%] h-[450px] transform transition-all duration-300 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-[#2D336B] flex justify-between items-center px-6 py-3 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Edit Instructor</h2>
          <button onClick={onClose} className="text-white">
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 h-[calc(100%-7rem)] overflow-y-auto">
          <div className="flex flex-col gap-6">
            {/* Primary Inputs */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="transition-all duration-300 ease-out transform hover:bg-gray-50 p-2 rounded-md delay-0">
                  <label className="text-sm font-medium text-gray-700">First Name:</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname || ""}
                    onChange={handleChange}
                    className="border-2 border-[#2D336B] rounded-md px-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-sm"
                  />
                </div>
                <div className="transition-all duration-300 ease-out transform hover:bg-gray-50 p-2 rounded-md delay-100">
                  <label className="text-sm font-medium text-gray-700">Middle Initial:</label>
                  <input
                    type="text"
                    name="middle_initial"
                    value={formData.middle_initial || ""}
                    onChange={handleChange}
                    className="border-2 border-[#2D336B] rounded-md px-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-sm"
                  />
                </div>
                <div className="transition-all duration-300 ease-out transform hover:bg-gray-50 p-2 rounded-md delay-200">
                  <label className="text-sm font-medium text-gray-700">Last Name:</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname || ""}
                    onChange={handleChange}
                    className="border-2 border-[#2D336B] rounded-md px-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-sm"
                  />
                </div>
                <div className="transition-all duration-300 ease-out transform hover:bg-gray-50 p-2 rounded-md delay-300">
                  <label className="text-sm font-medium text-gray-700">Instructor ID:</label>
                  <input
                    type="text"
                    name="instructorId"
                    value={formData.instructorId || ""}
                    onChange={handleChange}
                    className="border-2 border-[#2D336B] rounded-md px-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Secondary and Tertiary Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Department",
                  name: "department",
                  type: "select",
                  options: ["CCS", "CEA", "CBA"],
                  hierarchy: "secondary",
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
                },
                {
                  label: "Password",
                  name: "password",
                  type: "password",
                  hierarchy: "tertiary",
                },
                {
                  label: "Role",
                  name: "role",
                  type: "text",
                  disabled: true,
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
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      disabled={field.disabled}
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
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      disabled={field.disabled}
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
            Save
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

export default EditInstructorModal;