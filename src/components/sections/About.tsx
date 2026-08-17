"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/data/content";

const { about } = content;

const ease = [0.16, 1, 0.3, 1] as const;

const fadeInLeft = (delay: number) => ({
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease },
});

const fadeInRight = (delay: number) => ({
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease },
});

const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease },
});

export default function About() {
  const [activeDetailIndex, setActiveDetailIndex] = useState<number | null>(null);

  return (
    <section id="about" className="flex flex-col items-center px-6 py-16 sm:py-20 sm:px-8">
      <div className="flex w-full max-w-[1100px] flex-col">
        <motion.p
          {...fadeInUp(0)}
          className="eyebrow mb-3 sm:mb-4"
        >
          $ cat about.md
        </motion.p>

        <motion.h2
          {...fadeInUp(0.1)}
          className="font-display mb-10 sm:mb-12 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          style={{ color: "var(--text-primary)" }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column - Intro */}
          <motion.div
            {...fadeInLeft(0.2)}
            className="flex flex-col"
          >
            <p
              className="font-body text-lg leading-relaxed sm:text-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              {about.intro}
            </p>
          </motion.div>

          {/* Right Column - System Info Panel */}
          <motion.div
            {...fadeInRight(0.35)}
            className="flex flex-col"
          >
            <div
              className="rounded-lg border p-6 transition-all duration-300"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-subtle)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              {/* Panel Header */}
              <div className="mb-6 flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--border-subtle)" }}>
                <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--accent-primary)" }}>
                  $ status --info
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                  <span>SYS.OK</span>
                </div>
              </div>

              {/* Detail Items */}
              <div className="space-y-4">
                {about.details.map((detail, index) => {
                  const isActive = activeDetailIndex === index;

                  return (
                    <motion.div
                      key={index}
                      {...fadeInUp(0.45 + index * 0.08)}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveDetailIndex(prev => prev === index ? null : index)}
                      className={`group flex flex-col rounded-md p-3 transition-colors cursor-pointer select-none ${
                        isActive ? "bg-[var(--bg-elevated)]" : ""
                      }`}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = "var(--bg-elevated)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <span className="font-mono mb-1 text-xs uppercase tracking-wider transition-colors" style={{ color: "var(--text-tertiary)" }}>
                        {detail.label}
                      </span>
                      <span
                        className={`text-sm transition-colors ${
                          isActive ? "text-[var(--accent-primary)]" : "group-hover:text-[var(--accent-primary)]"
                        }`}
                        style={{ color: isActive ? "var(--accent-primary)" : "var(--text-primary)" }}
                      >
                        {detail.value}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
