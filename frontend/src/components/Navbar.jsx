import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/upload-timetable">Upload Timetable</Link></li>
        <li><Link to="/substitutions">Substitutions</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
