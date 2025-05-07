import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import styled from "styled-components";

// Styled container with hidden scrollbar functionality
const ScrollableTableContainer = styled.div`
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const AllRecordTable = ({ records, onRowClicked, customStyles, onGenerateReport }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMark, setSelectedMark] = useState("");

  // Filter records
  const filteredRecords = records.filter((record) => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMark = selectedMark ? record.attendance.some((entry) => entry.mark === selectedMark) : true;
    return matchesSearch && matchesMark;
  });

  // Columns configuration
  const allRecordsColumns = [
    {
      name: "Student Name",
      selector: (row) => row.studentName || "N/A",
      sortable: true,
      style: { textAlign: 'center' },
      width: "150px",
    },
    ...(records[0]?.attendance?.map((entry) => ({
      name: (
        <div className="flex flex-col items-center">
          <div>{entry.date}</div>
          <div className="text-xs">{entry.day}</div>
        </div>
      ),
      selector: (row) => row.attendance.find((e) => e.date === entry.date)?.mark || "N/A",
      cell: (row) => {
        const mark = row.attendance.find((e) => e.date === entry.date)?.mark || "N/A";
        switch (mark) {
          case "Present":
            return <FaCheckCircle className="text-green-500" />;
          case "Absent":
            return <FaTimesCircle className="text-red-500" />;
          case "Late":
            return <FaClock className="text-yellow-500" />;
          default:
            return "N/A";
        }
      },
      style: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: (row) => {
          const mark = row.attendance.find((e) => e.date === entry.date)?.mark || "N/A";
          return mark === "Present" ? '#d4edda' :
                 mark === "Absent" ? '#f8d7da' :
                 mark === "Late" ? '#fff3cd' : '#f1f5f9';
        },
      },
      minWidth: "120px",
    })) || []),
    {
      name: "Present",
      selector: (row) => row.attendance?.filter((e) => e.mark === "Present").length || 0,
      style: { 
        textAlign: 'center',
        backgroundColor: '#d4edda',
        color: '#155724'
      },
      width: "100px",
    },
    {
      name: "Absent",
      selector: (row) => row.attendance?.filter((e) => e.mark === "Absent").length || 0,
      style: { 
        textAlign: 'center',
        backgroundColor: '#f8d7da',
        color: '#721c24'
      },
      width: "100px",
    },
    {
      name: "Late",
      selector: (row) => row.attendance?.filter((e) => e.mark === "Late").length || 0,
      style: { 
        textAlign: 'center',
        backgroundColor: '#fff3cd',
        color: '#856404'
      },
      width: "100px",
    },
    {
      name: "Incomplete Verification",
      selector: (row) => row.attendance?.filter((e) => e.mark === "Incomplete Verification").length || 0,
      style: { textAlign: 'center' },
      width: "170px",
    },
  ];

  // Custom styles
  const updatedCustomStyles = {
    ...customStyles,
    table: {
      style: {
        width: "auto",
        minWidth: "100%",
        backgroundColor: "#f1f5f9",
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem",
      },
    },
    headRow: {
      style: {
        whiteSpace: "nowrap",
        backgroundColor: "#A9B5DF",
        borderBottom: "1px solid #e5e7eb",
      },
    },
    rows: {
      style: {
        whiteSpace: "nowrap",
        '&:hover': {
          backgroundColor: "#e2e8f0",
        },
      },
    },
    headCells: {
      style: {
        padding: "0.25rem",
        justifyContent: "center",
        fontWeight: "bold",
        color: "#2D336B",
        fontSize: "0.75rem",
        display: "flex",
      },
    },
    cells: {
      style: {
        padding: "0.25rem",
        justifyContent: "center",
        fontSize: "0.75rem",
        display: "flex",
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md space-y-4 mb-4 w-full">
      <h3 className="text-md font-bold text-[#2D336B] mb-2">
        All Attendance Records
      </h3>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="relative w-44 min-w-[9rem]">
          <input
            type="text"
            placeholder="Search by student name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-1 border-[#2D336B] rounded-md pl-8 pr-2 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
          />
          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500 w-3 h-3" />
          </div>
        </div>
        <button
          onClick={onGenerateReport}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow text-xs"
        >
          Generate Report
        </button>
      </div>

      <ScrollableTableContainer>
        <DataTable
          columns={allRecordsColumns}
          data={filteredRecords}
          customStyles={updatedCustomStyles}
          pagination
          highlightOnHover
          pointerOnHover
          sortIcon={<span></span>}
          onRowClicked={onRowClicked}
          noDataComponent={
            <div className="text-center text-gray-500 p-4">
              No records match the search or filter criteria.
            </div>
          }
          fixedHeader
          fixedHeaderScrollHeight="400px"
        />
      </ScrollableTableContainer>
    </div>
  );
};

export default AllRecordTable;