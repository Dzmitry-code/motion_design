"use client";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef(null);

  // This ensures Lenis is synchronized with your animation frame
  useEffect(() => {
    function update(time: number) {
      // @ts-ignore
      lenisRef.current?.lenis?.raf(time);
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  );
}
