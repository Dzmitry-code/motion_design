"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { motion, useScroll } from "framer-motion";

function FloatingObject() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { scrollYProgress } = useScroll();

  useFrame((state) => {
    const { x, y } = state.mouse;
    const scrollVal = scrollYProgress.get();

    // Subtle rotation based on mouse + scroll
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      y * 0.5 + scrollVal * 4,
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      x * 0.5 + scrollVal * 2,
      0.1
    );

    // Moves the object back as you scroll
    meshRef.current.position.z = THREE.MathUtils.lerp(0, scrollVal * -10, 0.1);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 20]} />
      {/* Changed color to #555 to make it more visible than #333 on Retina screens */}
      <meshStandardMaterial color="#555" wireframe />
    </mesh>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      {/* 3D Background - Simplified for Mac Compatibility */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <FloatingObject />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 text-center px-4 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-[12vw] md:text-9xl font-bold uppercase tracking-tighter leading-none"
        >
          Defining the Future <br />
          <span className="text-gray-500 italic">of Motion.</span>
        </motion.h1>
      </div>
    </section>
  );
}
