"use client";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

export default function Contact() {
  return (
    <section className="py-24 px-8 bg-black text-white">
      {/* Section Header */}
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.5, x: 0 }}
        viewport={{ once: true }}
        className="text-sm font-mono uppercase mb-12"
      >
        Start a Conversation
      </motion.h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl">
        {/* Name Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col gap-2"
        >
          <label className="text-xs uppercase font-mono opacity-50">Name</label>
          <input
            type="text"
            className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-xl"
            placeholder="Full Name"
          />
        </motion.div>

        {/* Email Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col gap-2"
        >
          <label className="text-xs uppercase font-mono opacity-50">
            Email
          </label>
          <input
            type="email"
            className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-xl"
            placeholder="Email Address"
          />
        </motion.div>

        {/* Message Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col gap-2 md:col-span-2"
        >
          <label className="text-xs uppercase font-mono opacity-50">
            Brief
          </label>
          <textarea
            className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-xl resize-none"
            rows={4}
            placeholder="What are we building?"
          />
        </motion.div>

        {/* The Magnetic Button */}
        <div className="pt-8">
          <Magnetic>
            <button
              type="submit"
              className="group relative px-12 py-6 bg-white text-black font-bold uppercase overflow-hidden"
            >
              <span className="relative z-10">Send Signal</span>
              {/* Optional: Hover background fill effect */}
              <motion.div className="absolute inset-0 bg-neutral-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </Magnetic>
        </div>
      </form>
    </section>
  );
}
