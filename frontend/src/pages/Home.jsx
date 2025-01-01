import React from "react";
import Footer from "../components/Footer";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text3D, Center } from "@react-three/drei";
import { Suspense, useState, useRef, useEffect } from "react";
import { useSpring, a, config } from "@react-spring/three";
import { ChevronDown, Calendar, Users, Bell } from "lucide-react";

const Model = () => {
  const [hovered, setHovered] = useState(false);
  const { scene } = useGLTF("/illusion.glb");
  const floatRef = useRef(0);

  useFrame(() => {
    floatRef.current += 0.01;
    scene.rotation.y += 0.005;
    scene.position.y = Math.sin(floatRef.current) * 0.2;
  });

  const scale = useSpring({
    scale: hovered ? 8.4 : 8,
    config: { mass: 1, tension: 200, friction: 20 },
  });

  return (
    <a.primitive
      object={scene}
      scale={scale.scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
};

const AnimatedText = ({ text }) => {
  const [index, setIndex] = useState(0);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % text.length);
      setBounce(true);
      setTimeout(() => setBounce(false), 150);
    }, 150);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className={`text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 ${bounce ? 'animate-bounce' : ''}`}>
      {text.slice(0, index + 1)}<span className="animate-blink">|</span>
    </h1>
  );
};

const StatCard = ({ icon: Icon, value, label }) => {
  const [hover, setHover] = useState(false);
  
  return (
    <div
      className={`bg-gray-800 p-6 rounded-xl transform transition-all duration-300 ${
        hover ? 'scale-105 shadow-xl' : ''
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Icon className="w-8 h-8 mb-4 text-blue-400" />
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
};

const InteractionGuide = () => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the guide after 5 seconds or when user interacts
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    const handleInteraction = () => {
      setHasInteracted(true);
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleInteraction);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleInteraction);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Finger animation container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Animated Hand */}
        <div className="relative">
          <div className="animate-drag-gesture opacity-80">
            <div className="w-8 h-8 border-4 border-blue-400 rounded-full mb-2 relative">
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-6 bg-blue-400 rounded-b-full" />
            </div>
          </div>
          {/* Text animations */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-blue-400 font-medium text-lg animate-fade-up">
              Drag to Explore
            </span>
          </div>
        </div>
      </div>

      {/* Circular gradient overlay */}
      <div className="absolute inset-0 bg-radial-pulse opacity-20 animate-pulse-out" />
    </div>
  );
};

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <style jsx global>{`
        @keyframes dragGesture {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 1; }
          50% { transform: translate(50px, 0); }
          80% { transform: translate(-50px, 0); }
          100% { transform: translate(0, 0); opacity: 0; }
        }

        @keyframes fadeUp {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes pulseOut {
          0% { opacity: 0.2; }
          50% { opacity: 0.1; }
          100% { opacity: 0; }
        }

        .animate-drag-gesture {
          animation: dragGesture 3s ease-in-out infinite;
        }

        .animate-fade-up {
          animation: fadeUp 0.5s ease-out forwards;
        }

        .animate-pulse-out {
          animation: pulseOut 2s ease-in-out forwards;
        }

        .bg-radial-pulse {
          background: radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 70%);
        }
      `}</style>

      <section className="relative min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <AnimatedText text="Welcome to ClassSync" />
              <p className="text-xl text-gray-400 max-w-xl">
                Simplify teacher scheduling with an efficient and intuitive system for managing timetables and substitutions.
              </p>
              <div className="flex gap-4">
                <a
                  href="/upload-timetable"
                  className="group relative px-8 py-4 bg-blue-600 rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 w-3 bg-blue-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                  <span className="relative text-white group-hover:text-white">Get Started</span>
                </a>
                <a
                  href="/schedule-demo"
                  className="group px-8 py-4 border border-white/20 rounded-lg relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative">Schedule a Demo</span>
                </a>
              </div>
            </div>

            <div className="relative h-[600px] group">
              <Canvas
                shadows
                className="absolute top-0 left-0 w-full h-full"
                camera={{ position: [0, 0, 10], fov: 50 }}
              >
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 10, 5]} intensity={3} castShadow />
                <pointLight position={[0, 5, 10]} intensity={3} />
                <spotLight position={[-5, 10, 5]} angle={0.3} penumbra={1} intensity={2} castShadow />
                <Suspense fallback={null}>
                  <Model />
                </Suspense>
                <OrbitControls enableZoom={false} />
              </Canvas>
              <InteractionGuide />
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8" />
          </div>
        </div>
      </section>

      <section id="stats" className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard icon={Calendar} value="5000+" label="Schedules Created" />
            <StatCard icon={Users} value="1000+" label="Active Users" />
            <StatCard icon={Bell} value="99.9%" label="Uptime" />
          </div>
        </div>
      </section>

      <section id="features" className="bg-gray-800/50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose ClassSync?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy Scheduling",
                description: "Plan and organize timetables with just a few clicks, saving time and effort."
              },
              {
                title: "Real-Time Updates",
                description: "Keep teachers informed of any changes to their schedules in real-time."
              },
              {
                title: "Substitution Alerts",
                description: "Automatically find and notify substitutes for absent teachers."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-700/50 p-8 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-2 w-20 bg-blue-500 mb-6 transition-all duration-300 group-hover:w-32" />
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-gray-900/50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "ClassSync revolutionized our school's scheduling process!",
                author: "Ms. Smita Chaudhary"
              },
              {
                quote: "Real-time updates keep everyone informed effortlessly.",
                author: "Ms. Pooja Aggarwal"
              },
              {
                quote: "Substitution alerts are a game changer for us.",
                author: "Ms. Neetu Arora"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800 transition-all duration-300"
              >
                <div className="text-blue-400 text-6xl mb-4">"</div>
                <p className="text-gray-400 italic text-lg mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-700 mr-4" />
                  <h4 className="text-lg font-bold">{testimonial.author}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;