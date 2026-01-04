"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-40 px-8 bg-white text-black">
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
