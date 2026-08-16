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

// Relative proficiency level mapping based on experience and context clues in description
const getProficiency = (skillName: string): number => {
  const name = skillName.toLowerCase();
  if (name.includes("javascript")) return 92;
  if (name.includes("html") || name.includes("css")) return 94;
  if (name.includes("vs code")) return 95;
  if (name.includes("git")) return 88;
  if (name.includes("laravel")) return 88;
  if (name.includes("mysql")) return 86;
  if (name.includes("php")) return 85;
  if (name.includes("react")) return 84;
  if (name.includes("java")) return 82;
  if (name.includes("python")) return 80;
  if (name.includes("sql server")) return 76;
  if (name.includes("figma")) return 75;
  return 80;
};

export default function Skills() {
  const [activeSkillName, setActiveSkillName] = useState<string | null>(null);

  return (
    <section id="skills" className="flex flex-col items-center px-6 py-20 sm:py-24 sm:px-8">
      <div className="flex w-full max-w-[1100px] flex-col">
        {/* Eyebrow Header */}
        <motion.p
          {...fadeInUp(0)}
          className="eyebrow mb-4"
        >
          $ cat skills.json
        </motion.p>

        {/* Main Section Heading */}
        <motion.h2
          {...fadeInUp(0.1)}
          className="font-display mb-12 sm:mb-16 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          style={{ color: "var(--text-primary)" }}
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
              className="flex flex-col rounded-xl sm:rounded-[14px] border p-6 sm:p-7 transition-colors duration-300 hover:border-[var(--accent-primary)]"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-subtle)",
              }}
            >
              {/* Category Module Header */}
              <div
                className="mb-6 flex items-center justify-between border-b pb-4"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    //
                  </span>
                  <h3
                    className="font-mono text-xs uppercase tracking-wider font-semibold"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    {category.category}{" "}
                    <span className="opacity-60">
                      [{category.items.length}]
                    </span>
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider opacity-70" style={{ color: "var(--text-tertiary)" }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                  <span>ACTIVE</span>
                </div>
              </div>

              {/* Skill Rows */}
              <div className="flex flex-col gap-3">
                {category.items.map((skill, skillIndex) => {
                  const proficiency = getProficiency(skill.name);
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
                      className={`group relative flex flex-col rounded-lg p-3 transition-all duration-200 cursor-pointer select-none border-l-2 ${
                        isActive
                          ? "border-[var(--accent-primary)] bg-[var(--bg-elevated)]"
                          : "border-transparent hover:border-[var(--accent-primary)] hover:bg-[var(--bg-elevated)]"
                      }`}
                    >
                      {/* Name & Percentage / Score label */}
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`font-display font-semibold text-sm sm:text-base transition-colors duration-200 ${
                            isActive ? "text-[var(--accent-primary)]" : "group-hover:text-[var(--accent-primary)]"
                          }`}
                          style={{ color: isActive ? "var(--accent-primary)" : "var(--text-primary)" }}
                        >
                          {skill.name}
                        </span>

                        <span
                          className={`font-mono text-[10px] sm:text-xs transition-opacity ${
                            isActive ? "opacity-100 text-[var(--accent-primary)]" : "opacity-40 group-hover:opacity-100"
                          }`}
                          style={{ color: isActive ? "var(--accent-primary)" : "var(--text-secondary)" }}
                        >
                          {proficiency}%
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        className="font-body text-xs sm:text-sm leading-relaxed mb-3"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {skill.description}
                      </p>

                      {/* Visual Proficiency Indicator Bar */}
                      <div
                        className="w-full h-1 rounded-full overflow-hidden"
                        style={{ backgroundColor: "rgba(31, 41, 55, 0.7)" }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            delay: categoryIndex * 0.12 + 0.15 + skillIndex * 0.05,
                            ease,
                          }}
                          className="h-full rounded-full transition-colors duration-300"
                          style={{
                            background:
                              "linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
                          }}
                        />
                      </div>
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
