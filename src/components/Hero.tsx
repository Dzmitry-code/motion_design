"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { motion, useScroll } from "framer-motion";

function ParticleCloud() {
  const count = 5000; // Number of dots
  const meshRef = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();
  const { scrollYProgress } = useScroll();

  // Create initial positions for the dots
  const [particles, originalPositions] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originals = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create a sphere-like distribution
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      const x = 3 * Math.sin(theta) * Math.cos(phi);
      const y = 3 * Math.sin(theta) * Math.sin(phi);
      const z = 3 * Math.cos(theta);

      positions.set([x, y, z], i * 3);
      originals.set([x, y, z], i * 3);
    }
    return [positions, originals];
  }, []);

  useFrame(() => {
    const scrollVal = scrollYProgress.get();
    const positions = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    // Convert normalized mouse coordinates to world coordinates
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Current positions
      let x = positions[i3];
      let y = positions[i3 + 1];
      let z = positions[i3 + 2];

      // Original positions (to pull particles back)
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      // Calculate distance from mouse
      const dx = x - mouseX;
      const dy = y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Physical repulsion logic
      const force = 1.5; // Strength of push
      const radius = 1.0; // Distance of influence

      if (dist < radius) {
        const angle = Math.atan2(dy, dx);
        const push = (radius - dist) * force;
        x += Math.cos(angle) * push;
        y += Math.sin(angle) * push;
      }

      // Smoothly pull particles back to original spot + add scroll rotation
      positions[i3] = THREE.MathUtils.lerp(x, ox, 0.1);
      positions[i3 + 1] = THREE.MathUtils.lerp(y, oy, 0.1);
      positions[i3 + 2] = THREE.MathUtils.lerp(z, oz + scrollVal * -5, 0.1);
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate the whole cloud slowly
    meshRef.current.rotation.y += 0.001;
    meshRef.current.rotation.x += 0.0005;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#FFFFFF"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true }}
        >
          <ParticleCloud />
        </Canvas>
      </div>

      <div className="relative z-10 text-center px-4 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-[12vw] md:text-9xl font-bold uppercase tracking-tighter leading-none"
        >
          Defining the Future <br />
          <span className="text-gray-500 italic">of Motion.</span>
        </motion.h1>
      </div>
    </section>
  );
}
