"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { content } from "@/data/content";

const { contact } = content;

const ease = [0.16, 1, 0.3, 1] as const;

const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease },
});

export default function Contact() {
  const [activeContactKey, setActiveContactKey] = useState<string | null>(null);

  // Define contact channels with conditional visibility for future additions (LinkedIn, CV)
  const contactLinks = [
    contact.email && {
      key: "email",
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      external: false,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    contact.github && {
      key: "github",
      label: "GitHub",
      value: "asshiddiqhasbi",
      href: contact.github,
      external: true,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    contact.linkedin && {
      key: "linkedin",
      label: "LinkedIn",
      value: "LinkedIn Profile",
      href: contact.linkedin,
      external: true,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    contact.cvUrl && {
      key: "cv",
      label: "Resume",
      value: "Download CV",
      href: contact.cvUrl,
      external: true,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
    },
  ].filter(Boolean);

  return (
    <section id="contact" className="flex flex-col items-center px-6 py-24 sm:py-28 sm:px-8 text-center">
      <div className="flex w-full max-w-[1100px] flex-col items-center">
        {/* Eyebrow Label */}
        <motion.p
          {...fadeInUp(0)}
          className="eyebrow mb-6"
        >
          $ ./connect.sh
        </motion.p>

        {/* Prominent Closing Heading */}
        <motion.h2
          {...fadeInUp(0.1)}
          className="font-display mb-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]"
          style={{ color: "var(--text-primary)" }}
        >
          Let's build something.
        </motion.h2>

        {/* Supporting Line */}
        <motion.p
          {...fadeInUp(0.2)}
          className="font-body mb-12 sm:mb-14 max-w-lg text-lg sm:text-xl leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Open to conversations on AI & software.
        </motion.p>

        {/* Interactive Contact Cards / Pills */}
        <div className="flex w-full flex-col sm:flex-row sm:w-auto items-stretch sm:items-center justify-center gap-4 flex-wrap">
          {contactLinks.map((item, index) => {
            if (!item) return null;
            const isActive = activeContactKey === item.key;

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveContactKey(prev => prev === item.key ? null : item.key)}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease }}
                className="w-full sm:w-auto"
              >
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={`group relative flex items-center justify-between sm:justify-start gap-4 rounded-xl border px-6 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                    isActive
                      ? "border-[var(--accent-primary)] bg-[var(--bg-elevated)] shadow-[0_0_30px_rgba(94,234,212,0.25)]"
                      : "border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] hover:shadow-[0_0_30px_rgba(94,234,212,0.22)]"
                  }`}
                  style={{
                    backgroundColor: isActive ? "var(--bg-elevated)" : "var(--bg-secondary)",
                    borderColor: isActive ? "var(--accent-primary)" : "var(--border-subtle)",
                    boxShadow: isActive ? "0 0 30px rgba(94, 234, 212, 0.25)" : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "var(--accent-primary)";
                      e.currentTarget.style.boxShadow = "0 0 25px rgba(94, 234, 212, 0.22)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  {/* Icon */}
                  <div
                    className={`transition-colors duration-300 ${
                      isActive ? "text-[var(--accent-primary)]" : "text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)]"
                    }`}
                  >
                    {item.icon}
                  </div>

                  {/* Label & Detail */}
                  <div className="flex flex-col text-left">
                    <span
                      className={`font-mono text-sm font-medium transition-colors duration-300 ${
                        isActive ? "text-[var(--accent-primary)]" : "text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span
                      className="font-mono text-xs opacity-70"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {item.value}
                    </span>
                  </div>

                  {/* Arrow Indicator */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`ml-2 transition-all duration-200 ${
                      isActive
                        ? "opacity-100 translate-x-1 -translate-y-0.5 text-[var(--accent-primary)]"
                        : "opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-primary)]"
                    }`}
                    style={{ color: isActive ? "var(--accent-primary)" : "var(--text-tertiary)" }}
                  >
                    <path
                      d="M6 3h7v7M3 13l7-7"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
