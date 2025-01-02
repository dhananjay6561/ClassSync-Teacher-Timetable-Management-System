import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Save, PlusCircle } from "lucide-react";

const UploadTimetable = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [newTeacherName, setNewTeacherName] = useState("");
  const [timetable, setTimetable] = useState(Array(5).fill(Array(8).fill({ classSection: "", subject: "" })));
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);

  // Fetch all teachers from backend
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/teachers");
        const data = await response.json();
        setTeachers(data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };

    fetchTeachers();
  }, []);

  // Fetch timetable for the selected teacher
  useEffect(() => {
    const fetchTimetable = async () => {
      if (selectedTeacherId) {
        try {
          const response = await fetch(`http://localhost:5000/api/timetable/${selectedTeacherId}`);
          if (response.ok) {
            const data = await response.json();
            setTimetable(data.timetable);
          } else {
            setTimetable(Array(5).fill(Array(8).fill({ classSection: "", subject: "" })));
          }
        } catch (err) {
          console.error("Error fetching timetable:", err);
        }
      }
    };

    fetchTimetable();
  }, [selectedTeacherId]);

  const handleTimetableChange = (dayIndex, periodIndex, field, value) => {
    const newTimetable = timetable.map((row, i) =>
      i === dayIndex
        ? row.map((cell, j) => (j === periodIndex ? { ...cell, [field]: value } : cell))
        : row
    );
    setTimetable(newTimetable);
  };

  const handleAddTeacher = async () => {
    if (!newTeacherName.trim()) {
      alert("Please enter a valid teacher name.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTeacherName }),
      });
      

      if (response.ok) {
        const newTeacher = await response.json();
        setTeachers([...teachers, newTeacher]);
        setNewTeacherName("");
        setIsAddingTeacher(false);
        alert("Teacher added successfully!");
      } else {
        alert("Error adding teacher.");
      }
    } catch (err) {
      console.error("Error adding teacher:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace empty cells with "FREE"
    const finalizedTimetable = timetable.map((row) =>
      row.map((cell) => ({
        classSection: cell.classSection.trim() || "FREE",
        subject: cell.subject.trim() || "FREE",
      }))
    );

    try {
      const response = await fetch("http://localhost:5000/api/timetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacherId: selectedTeacherId, timetable: finalizedTimetable }),
      });

      if (response.ok) {
        alert("Timetable saved successfully!");
        setTimetable(Array(5).fill(Array(8).fill({ classSection: "", subject: "" })));
      } else {
        alert("Error saving timetable.");
      }
    } catch (err) {
      console.error("Error submitting timetable:", err);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-[#0A1121] to-[#1a2942] p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
          <div className="flex items-center space-x-4 mb-8">
            <Calendar className="w-8 h-8 text-[#4F67FF]" />
            <h1 className="text-3xl font-bold text-white">Upload Timetable</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white/5 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <User className="w-5 h-5 text-[#4F67FF]" />
                  <label className="text-lg font-medium text-white">Select Teacher</label>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingTeacher(true)}
                  className="flex items-center px-4 py-2 bg-[#4F67FF] text-white rounded-lg shadow-md hover:bg-[#6A7FFF] transition-colors"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Teacher
                </button>
              </div>
              {isAddingTeacher && (
                <div className="space-y-4 mb-4">
                  <input
                    type="text"
                    value={newTeacherName}
                    onChange={(e) => setNewTeacherName(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4F67FF] transition-all duration-300"
                    placeholder="Enter new teacher's name"
                  />
                  <button
                    type="button"
                    onClick={handleAddTeacher}
                    className="px-6 py-2 bg-[#4F67FF] text-white rounded-lg shadow-md hover:bg-[#6A7FFF] transition-colors"
                  >
                    Save Teacher
                  </button>
                </div>
              )}
              <select
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#4F67FF] transition-all duration-300"
                required
              >
                <option value="" disabled>
                  Select a teacher
                </option>
                {teachers.map((teacher) => (
                  <option key={teacher.teacher_id} value={teacher.teacher_id}>
                    {teacher.name} (ID: {teacher.teacher_id})
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-[#4F67FF]/20 p-4 text-white rounded-tl-lg">
                      <Clock className="w-5 h-5 mx-auto" />
                    </th>
                    {periods.map((period) => (
                      <th key={period} className="bg-[#4F67FF]/20 p-4 text-white font-medium">
                        Period {period}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {daysOfWeek.map((day, dayIndex) => (
                    <tr key={day}>
                      <td className="bg-[#4F67FF]/10 p-4 text-white font-medium">{day}</td>
                      {periods.map((_, periodIndex) => (
                        <td key={periodIndex} className="p-2">
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="Class/Section"
                              value={timetable[dayIndex][periodIndex].classSection}
                              onChange={(e) =>
                                handleTimetableChange(dayIndex, periodIndex, "classSection", e.target.value)
                              }
                              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4F67FF]"
                            />
                            <input
                              type="text"
                              placeholder="Subject"
                              value={timetable[dayIndex][periodIndex].subject}
                              onChange={(e) =>
                                handleTimetableChange(dayIndex, periodIndex, "subject", e.target.value)
                              }
                              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4F67FF]"
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <motion.button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-[#4F67FF] text-white rounded-full font-medium flex items-center justify-center space-x-2 hover:bg-[#6A7FFF] transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-5 h-5" />
              <span>Submit Timetable</span>
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadTimetable;