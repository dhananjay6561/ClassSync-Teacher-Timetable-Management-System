import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h1 className="text-5xl font-bold mb-6 animate-fade-in">
                Welcome to{" "}
                <span className="text-gray-500 hover:text-white transition duration-300">
                  ClassSync
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl mb-6">
                Simplify teacher scheduling with an efficient and intuitive
                system for managing timetables and substitutions.
              </p>
              <a
                href="/upload-timetable"
                className="inline-block bg-white text-black px-6 py-3 rounded-lg shadow-lg hover:bg-gray-800 hover:text-white transition duration-300"
              >
                Get Started
              </a>
            </div>
            <div className="flex items-center justify-center animate-slide-up">
              <img
                src="https://via.placeholder.com/600"
                alt="ClassSync Illustration"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-800 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose ClassSync?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Easy Scheduling</h3>
              <p className="text-gray-400">
                Plan and organize timetables with just a few clicks, saving
                time and effort.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Real-Time Updates</h3>
              <p className="text-gray-400">
                Keep teachers informed of any changes to their schedules in
                real time.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Substitution Alerts</h3>
              <p className="text-gray-400">
                Automatically find and notify substitutes for absent teachers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
