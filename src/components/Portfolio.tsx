"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Cyberpunk 2077 AR",
    category: "AR",
    video: "/path-to-video.mp4",
  },
  {
    id: 2,
    title: "Abstract Motion",
    category: "Motion",
    video: "/path-to-video.mp4",
  },
  {
    id: 3,
    title: "Interactive Hub",
    category: "Interactive",
    video: "/path-to-video.mp4",
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="py-24 px-8 bg-black">
      <div className="flex gap-8 mb-12 text-white/50 font-mono text-sm uppercase">
        {["All", "Motion", "AR", "Interactive"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`hover:text-white transition-colors ${
              filter === cat ? "text-white underline" : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={project.id}
              className="group relative aspect-video bg-neutral-900 overflow-hidden cursor-none"
            >
              {/* Video would play here on hover */}
              <div className="absolute inset-0 bg-neutral-800 group-hover:bg-neutral-700 transition-colors" />
              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs font-mono mb-1">{project.category}</p>
                <h3 className="text-2xl font-bold uppercase">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
