import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function AppealsPage() {
  const initialData = [
    {
      id: 1,
      studentName: "John Doe",
      yearLevel: "2nd Year",
      block: "A",
      course: "BS Information Technology",
      department: "College of Computing",
      appealSubject: "Attendance Error",
      description: "My attendance wasn’t marked for Advanced Mathematics class on Monday despite being present the full session.",
      date: "2025-05-01",
      timeSubmitted: "08:30 AM",
      status: "Pending",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      yearLevel: "3rd Year",
      block: "B",
      course: "BS Computer Science",
      department: "College of Computing",
      appealSubject: "Technical Issue",
      description: "Unable to access the online assessment platform during the scheduled quiz time.",
      date: "2025-05-02",
      timeSubmitted: "10:15 AM",
      status: "Approved",
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      yearLevel: "1st Year",
      block: "C",
      course: "BS Information Technology",
      department: "College of Computing",
      appealSubject: "Attendance Issue",
      description: "Attendance not recorded for IT202 class on Wednesday.",
      date: "2025-05-03",
      timeSubmitted: "14:20 PM",
      status: "Pending",
    },
    {
      id: 4,
      studentName: "Sarah Lee",
      yearLevel: "4th Year",
      block: "A",
      course: "BS Computer Science",
      department: "College of Computing",
      appealSubject: "Exam Retake Request",
      description: "Requesting a retake for IT101 exam due to unforeseen circumstances.",
      date: "2025-05-04",
      timeSubmitted: "09:45 AM",
      status: "Rejected",
    },
  ];

  const [data] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [viewAppeal, setViewAppeal] = useState(null);

  const filteredData = data.filter((item) => {
    const matchesSearch =
      (item.studentName || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.appealSubject || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.description || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" ? true : item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const ViewAppealDetails = ({ appeal, onBack }) => {
    const handleAccept = () => {
      alert(`Appeal for ${appeal.studentName} accepted`);
      // In a real app, update the appeal status via API
      onBack();
    };

    const handleReject = () => {
      alert(`Appeal for ${appeal.studentName} rejected`);
      // In a real app, update the appeal status via API
      onBack();
    };

    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        {/* Appeal Subject */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#2D336B]">{appeal.appealSubject}</h2>
        </div>
        <hr className="border-t border-gray-200 my-4" />

        {/* Student and Appeal Information */}
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student Information */}
            <div>
              <h3 className="text-sm font-medium text-[#2D336B] mb-2">Student Information</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-800">
                  <span className="font-medium">Name:</span> {appeal.studentName}
                </p>
                <p className="text-sm text-gray-800">
                  <span className="font-medium">Year Level:</span> {appeal.yearLevel}
                </p>
                <p className="text-sm text-gray-800">
                  <span className="font-medium">Block:</span> {appeal.block}
                </p>
                <p className="text-sm text-gray-800">
                  <span className="font-medium">Course:</span> {appeal.course}
                </p>
                <p className="text-sm text-gray-800">
                  <span className="font-medium">Department:</span> {appeal.department}
                </p>
              </div>
            </div>
            {/* Appeal Information */}
            <div>
              <h3 className="text-sm font-medium text-[#2D336B] mb-2">Appeal Information</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-800">
                  <span className="font-medium">Subject:</span> {appeal.appealSubject}
                </p>
                <p className="text-sm text-gray-800">
                  <span className="font-medium">Date Submitted:</span> {appeal.date}
                </p>
                <p className="text-sm text-gray-800">
                  <span className="font-medium">Time Submitted:</span> {appeal.timeSubmitted}
                </p>
                <p className="text-sm text-gray-800">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                      appeal.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : appeal.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appeal.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-200 my-4" />

        {/* Appeal Description */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-[#2D336B] mb-2">Description</h3>
          <p className="text-sm text-gray-800">{appeal.description}</p>
        </div>
        <hr className="border-t border-gray-200 my-4" />

        {/* Action Buttons */}
        {appeal.status === "Pending" && (
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleAccept}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs"
            >
              Accept
            </button>
            <button
              onClick={handleReject}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs"
            >
              Reject
            </button>
          </div>
        )}
        <div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3 w-full max-w-[1800px] mx-auto">
      {/* Header Section */}
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl text-[#2D336B] font-bold">Student Appeals</h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="px-3">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <div className="flex items-center">
                {viewAppeal ? (
                  <>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setViewAppeal(null);
                      }}
                      className="ml-1 text-xs font-medium text-[#2D336B] hover:text-[#A9B5DF] md:ml-2"
                    >
                      Student Appeals
                    </a>
                    <svg
                      className="w-4 h-4 text-gray-400 mx-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-1 text-xs font-medium text-gray-500 md:ml-2">
                      {viewAppeal.appealSubject}
                    </span>
                  </>
                ) : (
                  <span className="ml-1 text-xs font-medium text-gray-500 md:ml-2">
                    Student Appeals
                  </span>
                )}
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      {viewAppeal ? (
        <ViewAppealDetails
          appeal={viewAppeal}
          onBack={() => setViewAppeal(null)}
        />
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md">
          {/* Search and Filter Section */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="relative w-44 min-w-[9rem]">
              <input
                type="text"
                placeholder="Search Appeals"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-1 border-[#2D336B] rounded-md pl-8 pr-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
              />
              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500 w-3 h-3" />
              </div>
            </div>

            {/* Sorting Buttons */}
            <div className="flex gap-2 text-xs">
              {["All", "Pending", "Approved", "Rejected"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 rounded-md border-1 border-[#2D336B] ${
                    filterStatus === status
                      ? "bg-[#2D336B] text-white"
                      : "bg-white text-[#2D336B] hover:bg-[#A9B5DF] hover:text-white"
                  } transition-colors`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Appeals List as Mailbox Cards */}
          <div className="space-y-2">
            {filteredData.length > 0 ? (
              filteredData.map((appeal) => (
                <div
                  key={appeal.id}
                  className="relative p-3 bg-[#e2e8f0] rounded-md hover:bg-[#cbd5e1] cursor-pointer transition-colors"
                  onClick={() => setViewAppeal(appeal)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-[#2D336B] truncate">
                      {appeal.studentName}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        appeal.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : appeal.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appeal.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-800 truncate">
                    {appeal.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{appeal.date}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 text-xs py-4">
                No appeals found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AppealsPage;