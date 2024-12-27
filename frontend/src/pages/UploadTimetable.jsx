import React, { useState } from "react";

const UploadTimetable = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];
  const [teacherName, setTeacherName] = useState("");
  const [timetable, setTimetable] = useState(Array(5).fill(Array(8).fill("")));

  const handleTimetableChange = (dayIndex, periodIndex, value) => {
    const newTimetable = timetable.map((row, i) =>
      i === dayIndex ? row.map((cell, j) => (j === periodIndex ? value : cell)) : row
    );
    setTimetable(newTimetable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ teacherName, timetable });
    // Send data to backend here
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Upload Timetable</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Teacher Name:</label>
          <input
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            className="w-full p-2 rounded border"
            placeholder="Enter teacher's name"
            required
          />
        </div>
        <table className="table-auto border-collapse border border-gray-600 w-full mb-4">
          <thead>
            <tr>
              <th className="border border-gray-600 p-2">Day / Period</th>
              {periods.map((period) => (
                <th key={period} className="border border-gray-600 p-2">
                  Period {period}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day, dayIndex) => (
              <tr key={day}>
                <td className="border border-gray-600 p-2 font-bold">{day}</td>
                {periods.map((_, periodIndex) => (
                  <td key={periodIndex} className="border border-gray-600 p-2">
                    <input
                      type="text"
                      placeholder="Class/Section"
                      value={timetable[dayIndex][periodIndex]}
                      onChange={(e) =>
                        handleTimetableChange(dayIndex, periodIndex, e.target.value)
                      }
                      className="w-full p-1 rounded border"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit Timetable
        </button>
      </form>
    </div>
  );
};

export default UploadTimetable;
