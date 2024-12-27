import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-6">
      <h1 className="text-5xl font-bold mb-6 animate-fade-in">
        Welcome to <span className="text-gray-500 hover:text-white transition duration-300">ClassSync</span>
      </h1>
      <p className="text-lg text-gray-400 max-w-2xl text-center animate-slide-up">
        Simplify teacher scheduling with an efficient and intuitive system for managing timetables and substitutions.
      </p>
      <div className="mt-10 animate-bounce">
        <a
          href="/upload-timetable"
          className="bg-white text-black px-6 py-3 rounded-lg shadow-lg hover:bg-gray-800 hover:text-white transition duration-300"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Home;
