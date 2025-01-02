import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/upload-timetable", label: "Upload Timetable" },
    { path: "/substitutions", label: "Substitutions" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A1121]/80 backdrop-blur-md py-4"
          : "bg-[#0A1121] py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <NavLink
            to="/"
            className="flex items-center space-x-3 text-white"
          >
            <div className="w-10 h-10 bg-[#4F67FF] rounded-xl flex items-center justify-center">
              <span className="font-bold text-lg">CS</span>
            </div>
            <span className="text-xl font-semibold text-[#4F67FF]">
              ClassSync
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-base font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-[#4F67FF]"
                      : "text-gray-200 hover:text-[#4F67FF]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#4F67FF]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <button className="px-6 py-2 bg-[#4F67FF] rounded-full text-white text-sm font-medium hover:bg-[#6A7FFF] transition-colors duration-300">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="py-4 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 text-base transition-colors duration-300 rounded-lg ${
                    isActive
                      ? "bg-[#4F67FF]/20 text-[#4F67FF]"
                      : "text-gray-200 hover:bg-white/5 hover:text-[#4F67FF]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button className="w-full px-4 py-2 bg-[#4F67FF] rounded-full text-white text-sm font-medium hover:bg-[#6A7FFF] transition-colors duration-300">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;