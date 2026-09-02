"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/data/content";

const { interests } = content;

const ease = [0.16, 1, 0.3, 1] as const;

const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease },
});

export default function Interests() {
  const [activeInterestIndex, setActiveInterestIndex] = useState<number | null>(null);

  return (
    <section id="interests" className="flex flex-col items-center px-6 py-16 sm:py-20 sm:px-8">
      <div className="flex w-full max-w-[1100px] flex-col">
        {/* Eyebrow Label */}
        <motion.p
          {...fadeInUp(0)}
          className="eyebrow mb-3 sm:mb-4"
        >
          $ grep -i "passions" ./profile
        </motion.p>

        {/* Section Heading */}
        <motion.h2
          {...fadeInUp(0.1)}
          className="font-display mb-10 sm:mb-12 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          style={{ color: "var(--text-primary)" }}
        >
          Interests
        </motion.h2>

        {/* Editorial Grid of Interest Items */}
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
          {interests.map((interest, index) => {
            const numStr = String(index + 1).padStart(2, "0");
            const isActive = activeInterestIndex === index;

            return (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveInterestIndex(prev => prev === index ? null : index)}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.09, ease }}
                className={`group relative flex flex-col justify-between rounded-xl p-6 border transition-all duration-300 cursor-pointer select-none ${
                  isActive
                    ? "border-[var(--accent-primary)] bg-[var(--bg-secondary)]"
                    : "border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 hover:border-[var(--border-accent)] hover:bg-[var(--bg-secondary)]"
                }`}
                style={{
                  boxShadow: isActive ? "var(--card-shadow-active)" : undefined,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>
                  {/* Index Number & Header Line */}
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`font-mono text-2xl font-bold tracking-wider transition-colors duration-300 ${
                        isActive
                          ? "text-[var(--accent-primary)] opacity-100"
                          : "text-[var(--text-tertiary)] opacity-40 group-hover:text-[var(--accent-primary)] group-hover:opacity-100"
                      }`}
                    >
                      {numStr}
                    </span>

                    <span
                      className={`font-mono text-xs transition-opacity duration-300 ${
                        isActive ? "opacity-100 text-[var(--accent-primary)]" : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{ color: "var(--accent-primary)" }}
                    >
                      SYS.SIGNAL // 0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-display mb-3 text-xl font-bold tracking-tight sm:text-2xl transition-colors duration-300 ${
                      isActive ? "text-[var(--accent-primary)]" : "group-hover:text-[var(--accent-primary)]"
                    }`}
                    style={{ color: isActive ? "var(--accent-primary)" : "var(--text-primary)" }}
                  >
                    {interest.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="font-body text-sm leading-relaxed sm:text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {interest.description}
                  </p>
                </div>

                {/* Bottom Activating Accent Line */}
                <div
                  className="relative mt-6 h-[1px] w-full overflow-hidden"
                  style={{ backgroundColor: "var(--border-subtle)" }}
                >
                  <div
                    className={`absolute top-0 left-0 h-full w-full transition-transform duration-500 ease-out origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    style={{ backgroundColor: "var(--accent-primary)" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
