"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/data/content";

const { skills } = content;

const ease = [0.16, 1, 0.3, 1] as const;

const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease },
});

export default function Skills() {
  const [activeSkillName, setActiveSkillName] = useState<string | null>(null);

  return (
    <section id="skills" className="flex flex-col items-center px-6 py-16 sm:py-20 sm:px-8">
      <div className="flex w-full max-w-[1100px] flex-col">
        {/* Eyebrow Header */}
        <motion.p
          {...fadeInUp(0)}
          className="eyebrow mb-3 sm:mb-4"
        >
          $ cat skills.json
        </motion.p>

        {/* Main Section Heading */}
        <motion.h2
          {...fadeInUp(0.1)}
          className="font-display mb-10 sm:mb-12 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-[var(--text-primary)]"
        >
          Skills & Tools
        </motion.h2>

        {/* Category Panels Grid */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: categoryIndex * 0.12, ease }}
              className="flex flex-col rounded-xl sm:rounded-[14px] border p-6 sm:p-7 transition-colors duration-300 hover:border-[var(--accent-primary)] bg-[var(--bg-secondary)] border-[var(--border-subtle)] shadow-[var(--card-shadow)]"
            >
              {/* Category Module Header */}
              <div className="mb-6 flex items-center justify-between border-b pb-4 border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[var(--accent-primary)]">
                    //
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-[var(--accent-primary)]">
                    {category.category}{" "}
                    <span className="opacity-60">
                      [{category.items.length}]
                    </span>
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider opacity-70 text-[var(--text-tertiary)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                  <span>ACTIVE</span>
                </div>
              </div>

              {/* Skill Cards */}
              <div className="grid grid-cols-1 gap-3">
                {category.items.map((skill, skillIndex) => {
                  const isActive = activeSkillName === skill.name;

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveSkillName(prev => prev === skill.name ? null : skill.name)}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: categoryIndex * 0.12 + 0.1 + skillIndex * 0.05,
                        ease,
                      }}
                      className={`group relative flex flex-col rounded-lg p-4 transition-all duration-200 cursor-pointer select-none border border-[var(--border-subtle)] ${
                        isActive
                          ? "border-[var(--accent-primary)] bg-[var(--bg-elevated)] shadow-sm"
                          : "bg-[var(--bg-primary)]/40 hover:border-[var(--border-accent)] hover:bg-[var(--bg-elevated)]"
                      }`}
                    >
                      {/* Name & Tech Tag Accent */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`font-display font-bold text-sm sm:text-base transition-colors duration-200 ${
                            isActive ? "text-[var(--accent-primary)]" : "group-hover:text-[var(--accent-primary)] text-[var(--text-primary)]"
                          }`}
                        >
                          {skill.name}
                        </span>

                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] opacity-60 group-hover:opacity-100 transition-opacity">
                          stack
                        </span>
                      </div>

                      {/* Description */}
                      <p className="font-body text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                        {skill.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
