"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { motion, useScroll } from "framer-motion";

function ParticleCloud() {
  const count = 5000;
  const meshRef = useRef<THREE.Points>(null!);
  const { mouse, raycaster, camera } = useThree();
  const { scrollYProgress } = useScroll();

  // Create initial positions
  const [particles, originalPositions] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originals = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
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

  useFrame((state) => {
    const scrollVal = scrollYProgress.get();
    const positions = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    // 1. PROJECT MOUSE INTO 3D SPACE
    // We create a vector that represents where the mouse is pointing in the 3D world
    const mouseVector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(
      camera
    );
    const dir = mouseVector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));

    // 2. CONVERT GLOBAL MOUSE TO LOCAL OBJECT SPACE
    // This is the "Magic Fix": it accounts for the rotation of the meshRef
    const localMouse = meshRef.current.worldToLocal(pos.clone());

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let x = positions[i3];
      let y = positions[i3 + 1];
      let z = positions[i3 + 2];

      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      // Calculate distance relative to LOCAL mouse position
      const dx = x - localMouse.x;
      const dy = y - localMouse.y;
      const dz = z - localMouse.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      const force = 2.5;
      const radius = 1.2;

      if (dist < radius) {
        // Push in 3D (X, Y, and Z)
        const push = (radius - dist) * force;
        x += (dx / dist) * push;
        y += (dy / dist) * push;
        z += (dz / dist) * push;
      }

      // Smoothly return to original positions
      positions[i3] = THREE.MathUtils.lerp(x, ox, 0.1);
      positions[i3 + 1] = THREE.MathUtils.lerp(y, oy, 0.1);
      positions[i3 + 2] = THREE.MathUtils.lerp(z, oz + scrollVal * -5, 0.1);
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotation of the whole cloud
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.x += 0.001;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#FFFFFF"
        transparent
        opacity={0.4}
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
