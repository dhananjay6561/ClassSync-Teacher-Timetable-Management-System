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
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="text-center relative">
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20">
            <div className="absolute inset-0 rotate-0 animate-spin-slow">
              <div className="w-2 h-2 rounded-full bg-blue-400 absolute top-0 left-1/2" />
              <div className="w-2 h-2 rounded-full bg-blue-400 absolute top-1/2 right-0" />
              <div className="w-2 h-2 rounded-full bg-blue-400 absolute bottom-0 left-1/2" />
              <div className="w-2 h-2 rounded-full bg-blue-400 absolute top-1/2 left-0" />
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
          <h1 className="text-[12rem] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            404
          </h1>
        </motion.div>

        {/* Error message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 space-y-6"
        >
          <h2 className="text-4xl font-bold text-white">Page Not Found</h2>
          <p className="text-gray-400 max-w-md mx-auto text-lg">
            The page you're looking for seems to have wandered off into the digital void.
          </p>

          {/* Action buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <motion.a
              href="/"
              className="group relative px-8 py-4 bg-gray-800 rounded-lg overflow-hidden flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="absolute inset-0 w-3 bg-blue-400 transition-all duration-300 ease-out group-hover:w-full" />
              <Home className="w-5 h-5 relative" />
              <span className="relative">Go Home</span>
            </motion.a>

            <motion.button
              onClick={() => window.location.reload()}
              className="group px-8 py-4 border border-gray-700 rounded-lg relative overflow-hidden flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 w-3 bg-blue-400 transition-all duration-300 ease-out group-hover:w-full opacity-20" />
              <RefreshCcw className="w-5 h-5 relative" />
              <span className="relative">Retry</span>
            </motion.button>
          </div>
        </motion.div>

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