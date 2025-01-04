import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useState, useRef, useEffect } from "react";
import { useSpring, a, config } from "@react-spring/three";
import { ChevronDown, Calendar, Users, Bell } from "lucide-react";
import { motion } from "framer-motion";


const ParticleBackground = () => {
  const particlesRef = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initialize particles
    particlesRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5
    }));

    const animateParticles = () => {
      particlesRef.current = particlesRef.current.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + dimensions.width) % dimensions.width,
        y: (particle.y + particle.speedY + dimensions.height) % dimensions.height
      }));
      requestAnimationFrame(animateParticles);
    };

    const animation = requestAnimationFrame(animateParticles);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(animation);
    };
  }, [dimensions.width, dimensions.height]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <svg className="absolute inset-0 w-full h-full">
        {particlesRef.current.map((particle, index) => (
          <circle
            key={index}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            className="fill-blue-400/20"
          />
        ))}
      </svg>
    </div>
  );
};

// Model Component
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

// Smooth Text Animation Component
const SmoothText = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        {text}
      </h1>
    </motion.div>
  );
};

// Enhanced Stat Card with Animation
const StatCard = ({ icon: Icon, value, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg"
    >
      <Icon className="w-8 h-8 mb-4 text-blue-400" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-2xl md:text-3xl font-bold mb-2"
      >
        {value}
      </motion.div>
      <div className="text-gray-400">{label}</div>
    </motion.div>
  );
};

// Enhanced Interactive Card
const InteractiveCard = ({ title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="relative group overflow-hidden rounded-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative bg-gray-800/50 p-8 rounded-xl">
        <div className="relative z-10">
          <motion.div
            initial={{ width: "5rem" }}
            whileHover={{ width: "8rem" }}
            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 mb-6"
          />
          <h3 className="text-2xl font-semibold mb-4">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ quote, author, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800/50 p-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]"
    >
      <div className="text-blue-400 text-6xl mb-4 transition-colors duration-300 group-hover:text-purple-400">"</div>
      <p className="text-gray-400 italic text-lg mb-6">{quote}</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 mr-4" />
        <h4 className="text-lg font-bold">{author}</h4>
      </div>
    </motion.div>
  );
};

// Main Home Component
const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      <ParticleBackground />
      
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <SmoothText text="Welcome to ClassSync" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-400 max-w-xl"
              >
                Simplify teacher scheduling with an efficient and intuitive system for managing timetables and substitutions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/upload-timetable"
                  className="group relative px-8 py-4 rounded-lg overflow-hidden text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative text-white font-semibold">Get Started</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/schedule-demo"
                  className="group px-8 py-4 rounded-lg relative overflow-hidden text-center border border-white/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                  <span className="relative text-white font-semibold">Schedule a Demo</span>
                </motion.a>
              </motion.div>
            </div>

            <div className="relative h-[400px] lg:h-[600px] group">
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
            </div>
          </div>
          
          <motion.div
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </div>
      </section>

      <section id="stats" className="py-20 bg-black/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard icon={Calendar} value="5000+" label="Schedules Created" delay={0} />
            <StatCard icon={Users} value="1000+" label="Active Users" delay={0.2} />
            <StatCard icon={Bell} value="99.9%" label="Uptime" delay={0.4} />
          </div>
        </div>
      </section>

      <section id="features" className="bg-gray-900/50 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            Why Choose ClassSync?
          </motion.h2>
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
              <InteractiveCard key={index} {...feature} delay={index * 0.2} />
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-black/30 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-16"
          >
            What Our Users Say
          </motion.h2>
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
              <TestimonialCard 
                key={index} 
                {...testimonial} 
                delay={index * 0.2} 
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;