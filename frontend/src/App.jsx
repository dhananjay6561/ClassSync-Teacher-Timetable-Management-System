import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UploadTimetable from "./pages/UploadTimetable";
import SubstitutionList from "./pages/SubstitutionList";
import NotFound from "./pages/404Error";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)]"> {/* Assuming Navbar is 64px tall */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload-timetable" element={<UploadTimetable />} />
          <Route path="/substitutions" element={<SubstitutionList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Analytics />
      </main>
    </BrowserRouter>
  );
};

export default App;