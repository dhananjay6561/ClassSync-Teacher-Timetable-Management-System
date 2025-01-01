import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <p>&copy; 2025 ClassSync. All rights reserved.</p>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-white transition duration-300">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition duration-300">
              Terms of Service
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
