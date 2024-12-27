import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UploadTimetable from "./pages/UploadTimetable";
import SubstitutionList from "./pages/SubstitutionList";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload-timetable" element={<UploadTimetable />} />
          <Route path="/substitutions" element={<SubstitutionList />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
