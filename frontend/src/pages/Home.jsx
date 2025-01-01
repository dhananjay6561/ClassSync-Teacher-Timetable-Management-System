import React from "react";
import Footer from "../components/Footer";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useState, useRef } from "react";
import { useSpring, a } from "@react-spring/three";

// 3D Model Component
const Model = () => {
  const [hovered, setHovered] = useState(false); // State to track hover effect
  const { scene } = useGLTF("/illusion.glb"); // Load 3D model using GLTF loader
  const floatRef = useRef(0); // Reference for floating animation

  // Handle continuous rotation and floating animation
  useFrame(() => {
    floatRef.current += 0.01;
    scene.rotation.y += 0.005; // Continuous Y-axis rotation
    scene.position.y = Math.sin(floatRef.current) * 0.2; // Floating effect
  });

  // Spring animation for scaling on hover
  const scale = useSpring({
    scale: hovered ? 8.4 : 8, // Change scale when hovered
    config: { mass: 1, tension: 200, friction: 20 },
  });

  return (
    <a.primitive
      object={scene}
      scale={scale.scale} // Apply scaling animation
      onPointerOver={() => setHovered(true)} // Handle hover start
      onPointerOut={() => setHovered(false)} // Handle hover end
    />
  );
};

// Home Component
const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hero Text */}
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

            {/* 3D Canvas */}
            <div className="relative h-[600px]">
              <Canvas
                shadows
                className="absolute top-0 left-0 w-full h-full"
                camera={{ position: [0, 0, 10], fov: 50 }} // Camera settings
              >
                {/* Lighting Setup */}
                <ambientLight intensity={0.3} /> {/* Soft ambient light */}
                <directionalLight position={[5, 10, 5]} intensity={3} castShadow />
                <pointLight position={[0, 5, 10]} intensity={3} />
                <spotLight
                  position={[-5, 10, 5]} // Light position
                  angle={0.3} // Spotlight angle
                  penumbra={1} // Soft edges
                  intensity={2}
                  castShadow
                />

                {/* Load 3D Model */}
                <Suspense fallback={null}>
                  <Model />
                </Suspense>

                {/* Enable orbit controls */}
                <OrbitControls enableZoom={false} />
              </Canvas>
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
            {/* Feature 1 */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Easy Scheduling</h3>
              <p className="text-gray-400">
                Plan and organize timetables with just a few clicks, saving time
                and effort.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Real-Time Updates</h3>
              <p className="text-gray-400">
                Keep teachers informed of any changes to their schedules in real
                time.
              </p>
            </div>
            {/* Feature 3 */}
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
