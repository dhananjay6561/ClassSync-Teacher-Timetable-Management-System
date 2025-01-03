import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/dhananjay6561",
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/dhananjay-aggarwal6561/",
      label: "LinkedIn"
    },
    {
      icon: Mail,
      href: "mailto:dhananjayaggarwal6561@gmail.com",
      label: "Email"
    }
  ];

  return (
    <footer className="w-full bg-[#0A1121] text-gray-200 mt-auto relative overflow-hidden">
      {/* Dynamic background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4F67FF]/0 via-[#4F67FF]/5 to-[#4F67FF]/0 animate-gradient" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(79,103,255,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main footer content */}
        <div className="py-12 flex flex-col sm:flex-row justify-between items-center gap-8">
          {/* Brand section */}
          <div className="space-y-4 text-center sm:text-left">
            <motion.div 
              className="flex items-center justify-center sm:justify-start space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-[#4F67FF] rounded-xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="font-bold text-lg text-white relative">CS</span>
              </div>
              <span className="text-xl font-semibold text-[#4F67FF] group-hover:text-[#6A7FFF] transition-colors duration-300">
                ClassSync
              </span>
            </motion.div>
            <p className="text-sm text-gray-400 max-w-md font-medium">
              Simplifying teacher scheduling with efficient and intuitive timetable management.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-2 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={social.label}
              >
                <div className="absolute inset-0 bg-[#4F67FF]/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                <social.icon className="w-6 h-6 text-gray-400 group-hover:text-[#4F67FF] transition-colors duration-300 relative" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="relative h-px w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4F67FF]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4F67FF]/40 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </div>

        
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center sm:text-left font-medium">
            &copy; {currentYear} ClassSync. All rights reserved.
          </p>
          
          <motion.p 
            className="text-sm flex items-center gap-2 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Created with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="w-4 h-4 text-red-500 inline" />
            </motion.span>
            {" "}by{" "}
            <motion.a
              href="https://github.com/dhananjay6561"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4F67FF] hover:text-[#6A7FFF] flex items-center gap-1 group transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Dhananjay
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;