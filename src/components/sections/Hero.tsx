"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { content } from "@/data/content";
import ParticleNetwork from "@/components/ui/ParticleNetwork";
import HangingLanyard from "@/components/ui/HangingLanyard";

const { hero } = content;

const ease = [0.16, 1, 0.3, 1] as const;

const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export default function Hero() {
  const [isPhotoActive, setIsPhotoActive] = useState(false);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center pt-20 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-8 overflow-hidden select-none">
      {/* LAYER 1 (Deepest): 3D Particle Network Canvas */}
      <ParticleNetwork />

      {/* LAYER 1.5: Interactive Hanging Lanyard ID Card */}
      <HangingLanyard />

      {/* LAYER 2: Static Giant Outline Typography (Subtle 3D Depth Layering) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none opacity-[0.06] dark:opacity-[0.09]"
        aria-hidden="true"
      >
        <span
          className="font-display font-black uppercase tracking-tighter whitespace-nowrap text-transparent"
          style={{
            fontSize: "clamp(5.5rem, 20vw, 16rem)",
            WebkitTextStroke: "1.5px var(--text-primary)",
          }}
        >
          HASBI SHIDDIQ
        </span>
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        {/* 1. Eyebrow Badge / Terminal Label */}
        <motion.div
          {...fadeInUp(0)}
          className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--bg-secondary)]/80 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
          <span className="eyebrow font-mono text-xs sm:text-sm tracking-wide">
            $ {hero.subtitle.toLowerCase()}
          </span>
        </motion.div>

        {/* 2. Main Prominent H1 Title */}
        <motion.h1
          {...fadeInUp(0.1)}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 sm:mb-8"
        >
          <span className="gradient-text">{hero.name}</span>
        </motion.h1>

        {/* 3. Cutout Profile Photo Composition with Ambient Glow Ring */}
        <motion.div
          {...fadeInUp(0.18)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsPhotoActive((prev) => !prev)}
          onHoverStart={() => setIsPhotoActive(true)}
          onHoverEnd={() => setIsPhotoActive(false)}
          className="relative mb-6 sm:mb-8 cursor-pointer select-none group"
        >
          {/* Ambient Glow Backdrop Ring */}
          <div className="absolute inset-0 rounded-full bg-[var(--accent-primary)]/15 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60 pointer-events-none" />

          {/* Cutout Photo Mask Container */}
          <div
            className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center overflow-hidden rounded-b-full border-b border-[var(--border-accent)]/50"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)",
            }}
          >
            <Image
              src="/profile-cutout.png"
              alt="Hasbi As Shiddiq"
              fill
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 260px, 300px"
              quality={95}
              className={`object-contain transition-all duration-500 ${
                isPhotoActive
                  ? "grayscale-0 contrast-105 brightness-105"
                  : "grayscale contrast-100 brightness-95 group-hover:grayscale-0 group-hover:contrast-105 group-hover:brightness-105"
              }`}
              priority
            />
          </div>
        </motion.div>

        {/* 4. Tagline */}
        <motion.p
          {...fadeInUp(0.25)}
          className="font-body mb-8 sm:mb-10 max-w-2xl text-base sm:text-xl leading-relaxed text-[var(--text-secondary)] px-2"
        >
          {hero.tagline}
        </motion.p>

        {/* 5. Action Buttons */}
        <motion.div
          {...fadeInUp(0.35)}
          className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:gap-5 px-4 sm:px-0"
        >
          <Link
            href="#projects"
            className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 active:opacity-90 shadow-lg"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "var(--bg-primary)",
              boxShadow: "0 4px 20px var(--glow-shadow)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 25px var(--glow-shadow-intense)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 20px var(--glow-shadow)";
            }}
          >
            {hero.ctaProjects}
          </Link>

          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-8 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] hover:scale-105 active:scale-95"
          >
            {hero.ctaContact}
          </Link>
        </motion.div>
      </div>

      {/* Smooth gradient transition overlay from Hero to About */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[var(--bg-primary)]/70 to-[var(--bg-primary)] pointer-events-none z-10" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
          style={{ color: "var(--text-tertiary)" }}
        >
          <div className="h-5 sm:h-6 w-px bg-current opacity-40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
