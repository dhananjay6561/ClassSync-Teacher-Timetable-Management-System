import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0A1121]/80 backdrop-blur-md py-4 shadow-lg shadow-[#4F67FF]/10"
          : "bg-[#0A1121] py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <NavLink
            to="/"
            className="group flex items-center space-x-3 text-white"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-[#4F67FF] rounded-xl flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="font-bold text-lg relative">CS</span>
            </motion.div>
            <span className="text-xl font-semibold text-[#4F67FF] group-hover:text-[#6A7FFF] transition-colors duration-300">
              ClassSync
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onMouseEnter={() => setHoveredLink(link.path)}
                onMouseLeave={() => setHoveredLink(null)}
                className={({ isActive }) =>
                  `relative text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#4F67FF]"
                      : "text-gray-200 hover:text-[#4F67FF]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <motion.span
                      initial={false}
                      animate={{
                        width: isActive || hoveredLink === link.path ? "100%" : "0%",
                      }}
                      className="absolute -bottom-1 left-0 h-0.5 bg-[#4F67FF] rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  </>
                )}
              </NavLink>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2 overflow-hidden rounded-full group"
            >
              <span className="absolute inset-0 bg-[#4F67FF] transition-transform duration-300" />
              <span className="absolute inset-0 bg-[#6A7FFF] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative text-white text-sm font-medium">
                Sign In
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-base transition-all duration-300 rounded-lg ${
                        isActive
                          ? "bg-[#4F67FF]/20 text-[#4F67FF]"
                          : "text-gray-200 hover:bg-white/5 hover:text-[#4F67FF]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 bg-[#4F67FF] rounded-full text-white text-sm font-medium hover:bg-[#6A7FFF] transition-colors duration-300"
                >
                  Sign In
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;