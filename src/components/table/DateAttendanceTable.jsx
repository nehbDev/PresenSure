import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const DateAttendanceTable = ({
  scheduleId,
  records,
  onDateSelect,
  selectedDate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch unique dates
  const uniqueDates = [
    ...new Set(
      records.flatMap((student) =>
        (student.attendance || []).map((entry) => entry.date)
      )
    ),
  ].sort();

  // Filter dates based on search query
  const filteredDates = uniqueDates.filter((date) => {
    const day = (() => {
      try {
        return new Date(date).toLocaleDateString("en-US", { weekday: "long" });
      } catch {
        return "";
      }
    })();
    const lowerQuery = searchQuery.toLowerCase();
    return (
      date.toLowerCase().includes(lowerQuery) ||
      day.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div className="flex-1">
  <h3 className="text-md font-bold text-[#2D336B] mb-2">
    Attendance Dates
  </h3>
  <div className="mb-4">
    <div className="relative w-full"> {/* Changed to w-full */}
      <input
        type="text"
        placeholder="Search by date"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-1 border-[#2D336B] rounded-md pl-7 pr-1 py-1 h-8 w-full focus:outline-none focus:ring-2 focus:ring-[#34495E] text-xs"
      />
      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
        <FaSearch className="text-gray-500 w-3 h-3" />
      </div>
    </div>
  </div>
  {filteredDates.length > 0 ? (
    <div className="grid grid-cols-1 gap-2">
      {filteredDates.map((date) => {
        const day = (() => {
          try {
            return new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
            });
          } catch {
            return "N/A";
          }
        })();
        return (
          <button
            key={date}
            onClick={() => onDateSelect(date)}
            className={`w-full py-2 px-1 rounded-lg font-semibold text-xs transition-colors border-3 border-[#2D336B]
              ${
                selectedDate === date
                  ? "bg-[#2D336B] text-white"
                  : "bg-white text-[#2D336B] hover:bg-[#A9B5DF]"
              }`}
          >
            {`${date} (${day})`}
          </button>
        );
      })}
    </div>
  ) : (
    <div className="text-center text-gray-500 p-4">
      {selectedDate
        ? "No attendance records found for this schedule."
        : "Please select a date to view attendance records."}
    </div>
  )}
</div>
  );
};

export default DateAttendanceTable;
