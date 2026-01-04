"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative py-40 px-8 bg-white text-black overflow-visible">
      {/* Visual Bridge: The Animated Line positioned at the top of About */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <motion.div
          className="w-[1px] h-24 bg-gradient-to-b from-white via-neutral-400 to-transparent"
          animate={{
            scaleY: [0, 1, 0],
            translateY: [-20, 0, 20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-medium leading-tight tracking-tight text-center md:text-left"
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
