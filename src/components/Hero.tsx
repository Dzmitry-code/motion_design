"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { motion, useScroll } from "framer-motion";

function ParticleCloud() {
  const count = 6000;
  const meshRef = useRef<THREE.Points>(null!);
  const { mouse, camera, viewport } = useThree(); // Added viewport here
  const { scrollYProgress } = useScroll();
  const raycaster = new THREE.Raycaster();

  const [particles, originalPositions] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originals = new Float32Array(count * 3);

    // LOGIC: Check if screen width is 'Desktop' size ( > 10 3D units)
    // Mobile/Tablet keeps radius 3. Desktop gets bumped to 4.5.
    const isDesktop = viewport.width > 10;
    const baseRadius = isDesktop ? 4.5 : 3;

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      // Use the conditional baseRadius here
      const r = baseRadius * Math.cbrt(Math.random());

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions.set([x, y, z], i * 3);
      originals.set([x, y, z], i * 3);
    }
    return [positions, originals];
  }, [viewport.width]); // Re-run this if window width changes

  useFrame(() => {
    const scrollVal = scrollYProgress.get();
    const positions = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    raycaster.setFromCamera(mouse, camera);
    const ray = raycaster.ray;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const vPos = new THREE.Vector3(
        positions[i3],
        positions[i3 + 1],
        positions[i3 + 2]
      );
      vPos.applyMatrix4(meshRef.current.matrixWorld);
      const closestPointOnRay = new THREE.Vector3();
      ray.closestPointToPoint(vPos, closestPointOnRay);
      const dist = vPos.distanceTo(closestPointOnRay);

      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      const force = 2.0;
      const radius = 0.8;

      if (dist < radius) {
        const dir = vPos.clone().sub(closestPointOnRay).normalize();
        const push = (radius - dist) * force;
        vPos.add(dir.multiplyScalar(push));
        const localPos = meshRef.current.worldToLocal(vPos);
        positions[i3] = localPos.x;
        positions[i3 + 1] = localPos.y;
        positions[i3 + 2] = localPos.z;
      }

      positions[i3] = THREE.MathUtils.lerp(positions[i3], ox, 0.1);
      positions[i3 + 1] = THREE.MathUtils.lerp(positions[i3 + 1], oy, 0.1);
      positions[i3 + 2] = THREE.MathUtils.lerp(
        positions[i3 + 2],
        oz + scrollVal * -5,
        0.1
      );
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y += 0.0015;
    meshRef.current.rotation.x += 0.0008;
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
        size={0.025}
        color="#FFFFFF"
        transparent
        opacity={0.5}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full bg-black overflow-hidden flex items-center justify-center touch-none">
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
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
