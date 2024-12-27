import React, { useState, useEffect } from "react";
import axios from "axios";

const SubstitutionList = () => {
  const [substitutions, setSubstitutions] = useState([]);

  useEffect(() => {
    const fetchSubstitutions = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/substitutions", { date: "2024-12-28" });
        setSubstitutions(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubstitutions();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Substitutions</h1>
      <ul>
        {substitutions.map((sub, index) => (
          <li key={index}>
            Absent Teacher: {sub.absentTeacher}, Period: {sub.period}, Substitute: {sub.substituteTeacher}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubstitutionList;
