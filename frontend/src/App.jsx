import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UploadTimetable from "./pages/UploadTimetable";
import SubstitutionList from "./pages/SubstitutionList";
import  "./index.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload-timetable" element={<UploadTimetable />} />
        <Route path="/substitutions" element={<SubstitutionList />} />
      </Routes>
    </Router>
  );
};

export default App;
