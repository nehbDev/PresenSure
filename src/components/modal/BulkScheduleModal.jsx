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
        <div className="bg-[#A9B5DF] flex justify-between items-center px-4 py-2 rounded-t-lg">
          <h2 className="text-lg font-bold text-[#2D336B]">Bulk Schedule</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="h-3 w-3" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="flex flex-col gap-4">
            <div className="transition-all duration-300 ease-out transform hover:bg-gray-50 p-1 rounded-md">
              <label className="text-xs font-medium text-gray-700">
                Upload Schedule Data (CSV/Excel):
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
                  className="mt-2 bg-gray-200 text-gray-700 px-2 py-1 text-xs font-semibold rounded-md border border-gray-400 hover:bg-gray-300 transition-colors"
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
                Please upload a file with columns: Schedule ID, Subject Code,
                Description, Days, Time, Room, Instructor, Total Students.
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-3 border-t border-gray-200">
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
            className="flex items-center bg-blue-200 px-2 py-1 text-xs text-blue-700 font-bold rounded-md hover:bg-blue-700 transition-colors hover:text-blue-100"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkScheduleModal;