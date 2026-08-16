"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { content } from "@/data/content";
import ParticleNetwork from "@/components/ui/ParticleNetwork";

const { hero } = content;

const ease = [0.16, 1, 0.3, 1] as const;

const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export default function Hero() {
  const [isPhotoActive, setIsPhotoActive] = useState(false);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center pt-16 pb-12 sm:pt-20 sm:pb-14 px-6 sm:px-8 overflow-hidden">
      <ParticleNetwork />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        {/* Eyebrow Label */}
        <motion.p
          {...fadeInUp(0)}
          className="eyebrow mb-3 sm:mb-4"
        >
          $ {hero.subtitle.toLowerCase()}
        </motion.p>

        {/* Profile Photo as Compact Supporting Tech Accent Element */}
        <motion.div
          {...fadeInUp(0.12)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          onClick={() => setIsPhotoActive((prev) => !prev)}
          onHoverStart={() => setIsPhotoActive(true)}
          onHoverEnd={() => setIsPhotoActive(false)}
          className="relative mb-5 sm:mb-6 group cursor-pointer select-none"
        >
          <div
            className={`relative flex items-center justify-center p-1 rounded-full border transition-all duration-500 ${
              isPhotoActive
                ? "border-[var(--accent-primary)] shadow-[0_0_25px_rgba(94,234,212,0.35)]"
                : "border-[rgba(94,234,212,0.35)] group-hover:border-[var(--accent-primary)] shadow-[0_0_15px_rgba(94,234,212,0.18)] group-hover:shadow-[0_0_25px_rgba(94,234,212,0.35)]"
            }`}
            style={{
              backgroundColor: "rgba(16, 21, 31, 0.6)",
            }}
          >
            {/* Tech Reticle Viewfinder Corner Accents */}
            <span
              className={`absolute -top-0.5 -left-0.5 h-2 w-2 border-t-2 border-l-2 rounded-tl-[2px] transition-colors duration-300 ${
                isPhotoActive ? "border-[var(--accent-primary)]" : "border-[rgba(94,234,212,0.5)] group-hover:border-[var(--accent-primary)]"
              }`}
            />
            <span
              className={`absolute -top-0.5 -right-0.5 h-2 w-2 border-t-2 border-r-2 rounded-tr-[2px] transition-colors duration-300 ${
                isPhotoActive ? "border-[var(--accent-primary)]" : "border-[rgba(94,234,212,0.5)] group-hover:border-[var(--accent-primary)]"
              }`}
            />
            <span
              className={`absolute -bottom-0.5 -left-0.5 h-2 w-2 border-b-2 border-l-2 rounded-bl-[2px] transition-colors duration-300 ${
                isPhotoActive ? "border-[var(--accent-primary)]" : "border-[rgba(94,234,212,0.5)] group-hover:border-[var(--accent-primary)]"
              }`}
            />
            <span
              className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 border-b-2 border-r-2 rounded-br-[2px] transition-colors duration-300 ${
                isPhotoActive ? "border-[var(--accent-primary)]" : "border-[rgba(94,234,212,0.5)] group-hover:border-[var(--accent-primary)]"
              }`}
            />

            {/* Profile Image Container */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-[var(--border-subtle)]">
              <Image
                src="/profile_picture.jpg"
                alt="Hasbi As Shiddiq"
                fill
                sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 320px"
                quality={95}
                className={`object-cover transition-all duration-500 ease-out ${
                  isPhotoActive
                    ? "grayscale-0 contrast-100 brightness-100 opacity-100"
                    : "grayscale contrast-100 brightness-95 opacity-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:opacity-100"
                }`}
                priority
              />
            </div>

            {/* Compact Monospace Identity Signal Tag */}
            <div
              className={`absolute -bottom-2 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-md font-semibold transition-all duration-300 ${
                isPhotoActive
                  ? "bg-[rgba(10,14,20,0.95)] border-[var(--accent-primary)] text-[var(--accent-primary)]"
                  : "bg-[rgba(10,14,20,0.85)] border-[rgba(94,234,212,0.4)] text-[var(--accent-primary)] group-hover:border-[var(--accent-primary)]"
              }`}
            >
              {isPhotoActive ? "// online" : "// hasbi.jpg"}
            </div>
          </div>
        </motion.div>

        {/* Main Name Heading */}
        <motion.h1
          {...fadeInUp(0.25)}
          className="font-display mb-4 sm:mb-5 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1] tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {hero.name.split(" ").map((word, index, array) => (
            <span key={index}>
              {index === array.length - 1 ? (
                <span style={{ color: "var(--accent-primary)" }}>{word}</span>
              ) : (
                <span>{word} </span>
              )}
            </span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...fadeInUp(0.3)}
          className="font-body mb-6 sm:mb-8 max-w-xl text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {hero.tagline}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          {...fadeInUp(0.45)}
          className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          <Link
            href="#projects"
            className="inline-flex items-center justify-center rounded-lg px-7 py-3 text-sm font-medium transition-all hover:scale-105 active:scale-95 active:opacity-90"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "var(--bg-primary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(94, 234, 212, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {hero.ctaProjects}
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg border px-7 py-3 text-sm font-medium transition-all hover:scale-105 active:scale-95 active:border-[var(--accent-primary)] active:bg-[var(--bg-elevated)]"
            style={{
              backgroundColor: "transparent",
              borderColor: "var(--border-subtle)",
              color: "var(--text-primary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-subtle)";
            }}
          >
            {hero.ctaContact}
          </Link>
        </motion.div>
      </div>

      {/* Smooth gradient transition overlay from Hero to About */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent via-[var(--bg-primary)]/70 to-[var(--bg-primary)] pointer-events-none z-10" />

      {/* Scroll indicator positioned safely */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
          style={{ color: "var(--text-tertiary)" }}
        >
          <div className="h-6 w-px bg-current opacity-40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
