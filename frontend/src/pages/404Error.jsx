import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, RefreshCcw } from 'lucide-react';

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      setMousePosition({ x: moveX * 0.01, y: moveY * 0.01 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center relative">
          {/* Animated background circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] opacity-20">
              <div className="absolute inset-0 rotate-0 animate-spin-slow">
                <div className="w-1 sm:w-2 h-1 sm:h-2 rounded-full bg-blue-400 absolute top-0 left-1/2" />
                <div className="w-1 sm:w-2 h-1 sm:h-2 rounded-full bg-blue-400 absolute top-1/2 right-0" />
                <div className="w-1 sm:w-2 h-1 sm:h-2 rounded-full bg-blue-400 absolute bottom-0 left-1/2" />
                <div className="w-1 sm:w-2 h-1 sm:h-2 rounded-full bg-blue-400 absolute top-1/2 left-0" />
              </div>
            </div>
          </div>

          {/* Main 404 text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
            }}
            className="relative"
          >
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              404
            </h1>
          </motion.div>

          {/* Error message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 sm:mt-6 md:mt-8 space-y-4 sm:space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Page Not Found
            </h2>
            <p className="text-gray-400 max-w-md mx-auto text-base sm:text-lg px-4">
              The page you're looking for seems to have wandered off into the digital void.
              
            </p>

            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 sm:mt-8 px-4">
              <motion.a
                href="/"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute inset-0 w-3 bg-blue-400 transition-all duration-300 ease-out group-hover:w-full opacity-20" />
                <Home className="w-4 sm:w-5 h-4 sm:h-5 relative" />
                <span className="relative text-sm sm:text-base">Go Home</span>
              </motion.a>

              <motion.button
                onClick={() => window.location.reload()}
                className="group px-6 sm:px-8 py-3 sm:py-4 border border-gray-800 rounded-lg relative overflow-hidden flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 w-3 bg-blue-400 transition-all duration-300 ease-out group-hover:w-full opacity-20" />
                <RefreshCcw className="w-4 sm:w-5 h-4 sm:h-5 relative" />
                <span className="relative text-sm sm:text-base">Retry</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.2
              }}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.4;
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;