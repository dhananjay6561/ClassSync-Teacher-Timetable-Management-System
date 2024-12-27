import React from 'react';
import { Link } from 'react-router-dom';  // Importing Link from react-router-dom
import Header from '../components/TimetableForm';
import Button from '../components/Button';
import { Upload, Shuffle } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header>
        <title>Teacher Substitution System</title>
        <link rel="icon" href="/favicon.ico" />
      </header>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
          Welcome to the Teacher Substitution System
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link to="/upload" className="group">
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
              <div className="bg-primary bg-opacity-10 rounded-full p-4 mb-6 float-animation">
                <Upload size={48} className="text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-primary">Upload Timetable</h2>
              <p className="text-center text-gray">Input teacher details and schedules</p>
              <Button className="mt-6 group-hover:bg-opacity-90 transition-all duration-300">Get Started</Button>
            </div>
          </Link>
          <Link to="/substitutions" className="group">
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
              <div className="bg-secondary bg-opacity-10 rounded-full p-4 mb-6 float-animation">
                <Shuffle size={48} className="text-secondary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-secondary">Generate Substitutions</h2>
              <p className="text-center text-gray">Automatically assign substitutes</p>
              <Button variant="secondary" className="mt-6 group-hover:bg-opacity-90 transition-all duration-300">
                View Substitutions
              </Button>
            </div>
          </Link>
        </div>
      </main>

    
    </div>
  );
}

export default Home;
