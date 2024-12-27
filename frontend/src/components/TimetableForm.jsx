import React, { useState } from "react";

const TimetableForm = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];

  // Initialize state for teacher name and timetable
  const [teacherName, setTeacherName] = useState("");
  const [timetable, setTimetable] = useState(
    Array(5).fill(Array(8).fill("")) // 5 days x 8 periods
  );

  // Handle input change for timetable
  const handleTimetableChange = (dayIndex, periodIndex, value) => {
    const newTimetable = timetable.map((row, i) =>
      i === dayIndex ? row.map((cell, j) => (j === periodIndex ? value : cell)) : row
    );
    setTimetable(newTimetable);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/timetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacherName, timetable }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Timetable submitted successfully!");
        console.log(data);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Error submitting timetable:", err);
      alert("Failed to submit timetable.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Enter Timetable</h1>
      <form onSubmit={handleSubmit}>
        {/* Teacher Name Input */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Teacher Name:</label>
          <input
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Enter teacher's name"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Timetable Input Table */}
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2">Day / Period</th>
              {periods.map((period) => (
                <th key={period} className="border border-gray-400 p-2">
                  {`Period ${period}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day, dayIndex) => (
              <tr key={day}>
                <td className="border border-gray-400 p-2 font-bold">{day}</td>
                {periods.map((_, periodIndex) => (
                  <td key={periodIndex} className="border border-gray-400 p-2">
                    <input
                      type="text"
                      placeholder="Class/Section"
                      value={timetable[dayIndex][periodIndex]}
                      onChange={(e) =>
                        handleTimetableChange(dayIndex, periodIndex, e.target.value)
                      }
                      className="w-full p-1 border rounded"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Timetable
        </button>
      </form>
    </div>
  );
};

export default TimetableForm;
