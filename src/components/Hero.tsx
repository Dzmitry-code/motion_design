"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

function FloatingObject() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // This makes the object follow the mouse subtly
  useFrame((state) => {
    const { x, y } = state.mouse;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      y * 0.5,
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      x * 0.5,
      0.1
    );
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 20]} />
      <meshStandardMaterial color="#333" wireframe />
    </mesh>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <FloatingObject />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-6xl md:text-9xl font-bold uppercase tracking-tighter"
        >
          Defining the Future <br />
          <span className="text-gray-500 italic">of Motion.</span>
        </motion.h1>
      </div>
    </section>
  );
}
