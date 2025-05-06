import { FaTimes } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

const BulkScheduleModal = ({ isOpen, onClose, onSave }) => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  // Handle opening and closing with animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setFile(null);
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

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onSave(file);
      onClose();
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 backdrop-blur-xs ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-md w-full max-w-[50%] transform transition-all duration-300 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-[#2563EB] flex justify-between items-center px-4 py-2 rounded-t-lg">
          <h2 className="text-lg font-bold text-white">Bulk Registration</h2>
          <button onClick={onClose} className="text-white">
            <FaTimes className="h-3 w-3" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="flex flex-col gap-4">
            <div className="transition-all duration-300 ease-out transform hover:bg-gray-50 p-1 rounded-md">
              <label className="text-xs font-medium text-gray-700">
                Upload Student Data (CSV/Excel):
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  accept=".csv, .xlsx"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="bg-[#2D336B] text-white px-2 py-1 text-xs rounded-md hover:bg-[#3e5a77] transition-colors w-32"
                >
                  Select File
                </button>
                {file && (
                  <p className="mt-1 text-[10px] text-gray-700">
                    Selected: {file.name}
                  </p>
                )}
              </div>
              <p className="text-[10px] text-gray-500 mt-1">
                Please upload a file with columns: Student ID, First Name,
                Middle Initial, Last Name, Course, Department, Year & Section,
                Sex, Email, Password, Status.
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-3 border-t border-gray-200">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center bg-[#2563EB] border border-[#2D336B] px-2 py-1 text-xs text-white rounded-md hover:border-[#ffffff] transition-all duration-300 hover:scale-95"
          >
            Upload
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center bg-gray-300 text-black px-2 py-1 text-xs rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkScheduleModal;