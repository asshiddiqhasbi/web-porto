"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";

const { about } = content;

const ease = [0.16, 1, 0.3, 1] as const;

const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease },
});

export default function About() {
  return (
    <section id="about" className="flex flex-col items-center px-6 py-16 sm:py-24 sm:px-8">
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

          {/* 4. Methodology / Approach Bento Card (col-span-2) */}
          <motion.div
            {...fadeInUp(0.48)}
            className="md:col-span-1 lg:col-span-2 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-[var(--card-shadow)] transition-all duration-300 hover:border-[var(--border-accent)]"
          >
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <span className="font-mono text-xs text-[var(--accent-primary)] uppercase tracking-wider">
                  // METHODOLOGY
                </span>
                <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
                  03
                </span>
              </div>
              <p className="font-body text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                Building robust applications with an emphasis on performance, maintainable system design, and clean visual typography. Driven by curiosity and continuous experimentation.
              </p>
            </div>
            <div className="mt-4 font-mono text-[11px] text-[var(--text-tertiary)] flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-tertiary)]" />
              <span>Continuous Iteration & Execution</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
