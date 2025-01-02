import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, UserMinus, Users, Clock, AlertTriangle } from "lucide-react";

const SubstitutionList = () => {
  const [substitutions, setSubstitutions] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [teachersList, setTeachersList] = useState([]);
  const [teachersOnLeave, setTeachersOnLeave] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectStyles = {
    control: (base) => ({
      ...base,
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid rgba(255, 255, 255, 0.3)"
      }
    }),
    input: (base) => ({
      ...base,
      color: "white"
    }),
    menu: (base) => ({
      ...base,
      background: "#1a2942",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "rgba(79, 103, 255, 0.2)" : "transparent",
      color: "white",
      "&:hover": {
        background: "rgba(79, 103, 255, 0.2)"
      }
    }),
    singleValue: (base) => ({
      ...base,
      color: "white"
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.5)"
    })
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/teachers");
        setTeachersList(response.data.map(teacher => ({
          value: teacher.id,
          label: `${teacher.name} (${teacher.id})`
        })));
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
    setCurrentDate(DateTime.now().toLocaleString(DateTime.DATETIME_MED));
  }, []);

  useEffect(() => {
    const fetchSubstitutions = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/substitutions", {
          date: DateTime.now().toISODate()
        });
        setSubstitutions(response.data);
      } catch (error) {
        console.error("Error fetching substitutions:", error);
      }
    };

    fetchSubstitutions();
  }, []);

  const handleSubmitLeave = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/api/leaves", {
        teacherId: teacherName.value,
        date: DateTime.now().toISODate()
      });

      setTeachersOnLeave([...teachersOnLeave, {
        teacherName: teacherName.label,
        date: DateTime.now().toISODate()
      }]);

      setTeacherName("");
    } catch (error) {
      console.error("Error submitting leave:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLeave = async (teacher) => {
    setTeachersOnLeave(teachersOnLeave.filter(item => item.teacherName !== teacher.teacherName));
  };

  return (
    <motion.div 
      className="min-h-screen w-full bg-gradient-to-b from-[#0A1121] to-[#1a2942] px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="w-full bg-white/10 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Substitution Management
          </motion.h1>
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-[#4F67FF]"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span className="text-base sm:text-lg">
                {DateTime.now().toFormat("cccc, LLL dd, yyyy")}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="text-base sm:text-lg">
                {DateTime.now().toFormat("hh:mm a")}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Leave Form Section */}
        <motion.form 
          onSubmit={handleSubmitLeave}
          className="bg-white/5 p-4 sm:p-6 rounded-xl mb-6 sm:mb-8"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="text-white text-base sm:text-lg font-medium mb-2 block">
                Date for Leave
              </label>
              <input
                type="date"
                defaultValue={DateTime.now().toISODate()}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#4F67FF] transition-all duration-300"
                readOnly
              />
            </div>
            <div>
              <label className="text-white text-base sm:text-lg font-medium mb-2 block">
                Select Teacher
              </label>
              <Select
                value={teacherName}
                onChange={setTeacherName}
                options={teachersList}
                styles={selectStyles}
                placeholder="Search for teacher..."
                isClearable
                className="text-base"
              />
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full mt-6 bg-[#4F67FF] text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-[#6A7FFF] transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            <UserMinus className="w-5 h-5" />
            <span>{isSubmitting ? "Submitting..." : "Mark Teacher on Leave"}</span>
          </motion.button>
        </motion.form>

        {/* Teachers on Leave Section */}
        <motion.div 
          className="mb-8 sm:mb-12"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#4F67FF]" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Teachers on Leave</h2>
          </div>
          <AnimatePresence>
            {teachersOnLeave.length > 0 ? (
              <motion.div className="grid gap-3 sm:gap-4">
                {teachersOnLeave.map((teacher, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 p-3 sm:p-4 rounded-xl backdrop-blur-sm flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <span className="text-white font-medium">{teacher.teacherName}</span>
                    <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-[#4F67FF]">{teacher.date}</span>
                      <motion.button
                        onClick={() => handleDeleteLeave(teacher)}
                        className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <UserMinus className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-6 sm:py-8 text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-[#4F67FF]" />
                <p>No teachers are currently on leave</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Substitutions Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#4F67FF]" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Today's Substitutions</h2>
          </div>
          <AnimatePresence>
            {substitutions.length > 0 ? (
              <motion.div className="grid gap-3 sm:gap-4">
                {substitutions.map((sub, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 p-4 sm:p-6 rounded-xl backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-[#4F67FF] text-sm mb-1">Absent Teacher</p>
                        <p className="text-white font-medium">{sub.absentTeacher}</p>
                      </div>
                      <div>
                        <p className="text-[#4F67FF] text-sm mb-1">Period</p>
                        <p className="text-white font-medium">{sub.period}</p>
                      </div>
                      <div>
                        <p className="text-[#4F67FF] text-sm mb-1">Substitute</p>
                        <p className="text-white font-medium">{sub.substituteTeacher}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-6 sm:py-8 text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-[#4F67FF]" />
                <p>No substitutions scheduled for today</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SubstitutionList;