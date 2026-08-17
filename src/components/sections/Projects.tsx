"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/data/content";
import ProjectCard from "@/components/ui/ProjectCard";

const { projects } = content;

const ease = [0.16, 1, 0.3, 1] as const;

const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease },
});

export default function Projects() {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="flex flex-col items-center px-6 py-16 sm:py-20 sm:px-8">
      <div className="flex w-full max-w-[1100px] flex-col">
        {/* Eyebrow Label */}
        <motion.p
          {...fadeInUp(0)}
          className="eyebrow mb-3 sm:mb-4"
        >
          $ ls ./projects
        </motion.p>

        {/* Section Heading */}
        <motion.h2
          {...fadeInUp(0.1)}
          className="font-display mb-10 sm:mb-12 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          style={{ color: "var(--text-primary)" }}
        >
          Projects
        </motion.h2>

        {/* Grid of Project Cards (Clean, equal-width 3-column grid) */}
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div key={project.title} className="col-span-1">
              <ProjectCard
                project={project}
                index={index}
                isActive={activeProjectIndex === index}
                onToggle={() => setActiveProjectIndex(prev => prev === index ? null : index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
