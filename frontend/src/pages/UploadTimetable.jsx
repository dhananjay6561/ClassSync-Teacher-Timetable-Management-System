import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Save } from "lucide-react";

const UploadTimetable = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];
  const [teacherName, setTeacherName] = useState("");
  const [timetable, setTimetable] = useState(Array(5).fill(Array(8).fill("")));
  const [focusedCell, setFocusedCell] = useState(null);

  // Animation variants for different elements
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  const handleTimetableChange = (dayIndex, periodIndex, value) => {
    const newTimetable = timetable.map((row, i) =>
      i === dayIndex ? [...row.slice(0, periodIndex), value, ...row.slice(periodIndex + 1)] : [...row]
    );
    setTimetable(newTimetable);
  };

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
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        alert("Timetable saved successfully!");
        // Optionally, reset the form
        setTeacherName("");
        setTimetable(Array(5).fill(Array(8).fill("")));
      } else {
        const error = await response.json();
        alert("Error saving timetable: " + error.error);
      }
    } catch (err) {
      console.error("Error submitting timetable:", err);
      alert("An unexpected error occurred.");
    }
  };
  

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-[#0A1121] to-[#1a2942] p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-4 mb-8">
            <Calendar className="w-8 h-8 text-[#4F67FF]" />
            <h1 className="text-3xl font-bold text-white">Upload Timetable</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div 
              className="bg-white/5 p-6 rounded-xl"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-4 mb-4">
                <User className="w-5 h-5 text-[#4F67FF]" />
                <label className="text-lg font-medium text-white">Teacher Name</label>
              </div>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4F67FF] transition-all duration-300"
                placeholder="Enter teacher's name"
                required
              />
            </motion.div>

            <motion.div 
              className="overflow-x-auto"
              variants={itemVariants}
            >
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
                      <td className="bg-[#4F67FF]/10 p-4 text-white font-medium">
                        {day}
                      </td>
                      {periods.map((_, periodIndex) => (
                        <td key={periodIndex} className="p-2">
                          <motion.input
                            type="text"
                            placeholder="Class/Section"
                            value={timetable[dayIndex][periodIndex]}
                            onChange={(e) =>
                              handleTimetableChange(dayIndex, periodIndex, e.target.value)
                            }
                            onFocus={() => setFocusedCell(`${dayIndex}-${periodIndex}`)}
                            onBlur={() => setFocusedCell(null)}
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#4F67FF] focus:bg-white/10 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UploadTimetable;