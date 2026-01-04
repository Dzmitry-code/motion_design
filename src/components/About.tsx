"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative py-40 px-8 bg-white text-black overflow-visible">
      {/* SCROLL INDICATOR
         Position: -top-12 (Pulls it UP into the black Hero section)
         Color: text-white (To contrast against the black Hero background)
      */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white font-mono">
            Scroll
          </span>
          {/* A small white line pointing down towards the About section */}
          <div className="w-[1px] h-6 bg-white/50"></div>
        </motion.div>
      </div>

      <div className="max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-medium leading-tight tracking-tight"
        >
          We are a motion design studio focused on the intersection of
          <span className="text-neutral-400"> digital art </span> and
          <span className="text-neutral-400"> interactive technology. </span>
          Based in the future, working for the now.
        </motion.p>
      </div>
    </section>
  );
}
