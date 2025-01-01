import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <p>&copy; 2025 ClassSync. All rights reserved.</p>
        <p>
          Created with ❣️ by{" "}
          <a
            href="https://github.com/dhananjay6561"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500 underline transition duration-300"
          >
            Dhananjay
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
