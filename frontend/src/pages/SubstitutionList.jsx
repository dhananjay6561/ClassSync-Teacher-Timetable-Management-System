import React, { useState, useEffect } from "react";
import axios from "axios";

const SubstitutionList = () => {
  const [substitutions, setSubstitutions] = useState([]);

  useEffect(() => {
    const fetchSubstitutions = async () => {
      const response = await axios.post("http://localhost:5000/api/substitutions", {
        date: "2024-12-28",
      });
      setSubstitutions(response.data);
    };
    fetchSubstitutions();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Substitution List</h1>
      <ul className="space-y-4">
        {substitutions.map((sub, index) => (
          <li
            key={index}
            className="bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <p className="font-bold">Absent Teacher: {sub.absentTeacher}</p>
              <p className="text-gray-400">Period: {sub.period}</p>
            </div>
            <p className="text-yellow-400 font-bold">Substitute: {sub.substituteTeacher}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubstitutionList;
