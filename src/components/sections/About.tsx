"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/data/content";

const { about } = content;

const ease = [0.16, 1, 0.3, 1] as const;

const traits = [
  {
    title: "Problem Solver",
    tagline: "Approaching engineering challenges with analytical depth and practical logic.",
    icon: "🧩",
  },
  {
    title: "Detail-Oriented",
    tagline: "Obsessed with clean code architecture, type-safety, and visual UI precision.",
    icon: "🔍",
  },
  {
    title: "Continuous Learner",
    tagline: "Constantly experimenting with AI models, modern web technologies, and system design.",
    icon: "⚡",
  },
  {
    title: "Curious Generalist",
    tagline: "Bridging software engineering, AI capabilities, and scalable web architecture.",
    icon: "🚀",
  },
];

const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease },
});

export default function About() {
  const [traitIndex, setTraitIndex] = useState(0);

  const nextTrait = () => {
    setTraitIndex((prev) => (prev + 1) % traits.length);
  };

  return (
    <section id="about" className="flex flex-col items-center px-6 py-16 sm:py-24 sm:px-8 select-none">
      <div className="flex w-full max-w-[1100px] flex-col">
        {/* Eyebrow Header */}
        <motion.p
          {...fadeInUp(0)}
          className="eyebrow mb-3 sm:mb-4"
        >
          $ cat about.md
        </motion.p>

        {/* Section Heading */}
        <motion.h2
          {...fadeInUp(0.1)}
          className="font-display mb-10 sm:mb-12 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-[var(--text-primary)]"
        >
          About & Overview
        </motion.h2>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {/* 1. Main Bio Card (col-span-2) */}
          <motion.div
            {...fadeInUp(0.2)}
            className="md:col-span-2 lg:col-span-2 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-[var(--card-shadow)] transition-all duration-300 hover:border-[var(--border-accent)]"
          >
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <span className="font-mono text-xs text-[var(--accent-primary)] uppercase tracking-wider">
                  // BIO & PHILOSOPHY
                </span>
                <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
                  01
                </span>
              </div>
              <p className="font-body text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
                {about.intro}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs text-[var(--text-tertiary)]">
              <span>Universitas Ma'soem</span>
              <span>Informatics Eng.</span>
            </div>
          </motion.div>

          {/* 2. System Status Bento Card (col-span-2) */}
          <motion.div
            {...fadeInUp(0.3)}
            className="md:col-span-1 lg:col-span-2 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-[var(--card-shadow)] transition-all duration-300 hover:border-[var(--border-accent)]"
          >
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent-primary)]">
                  $ status --info
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-primary)] animate-pulse" />
                  <span>SYS.OK</span>
                </div>
              </div>

              {/* Status Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {about.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)]/50 p-3.5 transition-colors hover:border-[var(--border-accent)]"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                      {detail.label}
                    </span>
                    <span className="font-body font-medium text-xs sm:text-sm text-[var(--text-primary)]">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3. Core Focus Bento Card (col-span-2) */}
          <motion.div
            {...fadeInUp(0.4)}
            className="md:col-span-2 lg:col-span-2 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-[var(--card-shadow)] transition-all duration-300 hover:border-[var(--border-accent)]"
          >
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <span className="font-mono text-xs text-[var(--accent-primary)] uppercase tracking-wider">
                  // CORE DISCIPLINES
                </span>
                <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
                  02
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5 mt-2">
                {[
                  "Software Engineering",
                  "Applied AI & ML",
                  "Modern Web Systems",
                  "Database Design",
                  "Network Infrastructure",
                  "Clean Code Architecture",
                ].map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-colors hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 4. Interactive Trait Deck Bento Card (col-span-2) */}
          <motion.div
            {...fadeInUp(0.48)}
            onClick={nextTrait}
            whileTap={{ scale: 0.98 }}
            className="md:col-span-1 lg:col-span-2 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-[var(--card-shadow)] transition-all duration-300 hover:border-[var(--border-accent)] cursor-pointer group relative overflow-hidden"
          >
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <span className="font-mono text-xs text-[var(--accent-primary)] uppercase tracking-wider flex items-center gap-2">
                  <span>TRAIT DECK</span>
                  <span className="text-[10px] px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors">
                    Click to cycle ↻
                  </span>
                </span>
                <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
                  0{traitIndex + 1} / 0{traits.length}
                </span>
              </div>

              {/* Animated Trait Card Flip / Slide */}
              <div className="relative min-h-[85px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={traitIndex}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.96 }}
                    transition={{ duration: 0.3, ease }}
                    className="flex flex-col gap-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{traits[traitIndex].icon}</span>
                      <h4 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                        {traits[traitIndex].title}
                      </h4>
                    </div>
                    <p className="font-body text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                      {traits[traitIndex].tagline}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Progress Bar Indicator */}
            <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-[11px] text-[var(--text-tertiary)]">
              <div className="flex gap-1.5">
                {traits.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === traitIndex
                        ? "w-6 bg-[var(--text-primary)]"
                        : "w-1.5 bg-[var(--border-subtle)]"
                    }`}
                  />
                ))}
              </div>
              <span className="group-hover:translate-x-1 transition-transform">Tap next →</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
