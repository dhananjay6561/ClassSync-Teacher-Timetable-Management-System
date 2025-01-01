import React, { useState, useEffect } from "react";
import axios from "axios";

const SubstitutionList = () => {
  const [substitutions, setSubstitutions] = useState([]);

  useEffect(() => {
    const fetchSubstitutions = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/substitutions", {
          date: "2024-12-28",
        });
        setSubstitutions(response.data);
      } catch (error) {
        console.error("Error fetching substitutions:", error);
      }
    };

    fetchSubstitutions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Substitution List</h1>
        {substitutions.length > 0 ? (
          <ul className="space-y-4">
            {substitutions.map((sub, index) => (
              <li
                key={index}
                className="bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center transition-transform transform hover:scale-105"
              >
                <div>
                  <p className="font-bold text-lg">Absent Teacher: {sub.absentTeacher}</p>
                  <p className="text-gray-400 text-sm">Period: {sub.period}</p>
                </div>
                <p className="text-yellow-400 font-semibold text-md">Substitute: {sub.substituteTeacher}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">No substitutions found for the selected date.</p>
        )}
      </div>
    </div>
  );
};

export default SubstitutionList;
