import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold text-white">ClassSync</h1>
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upload-timetable"
              className={({ isActive }) =>
                `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
              }
            >
              Upload Timetable
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/substitutions"
              className={({ isActive }) =>
                `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
              }
            >
              Substitutions
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
