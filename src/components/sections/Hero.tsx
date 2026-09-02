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
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export default function Hero() {
  const [isPhotoActive, setIsPhotoActive] = useState(false);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center pt-14 pb-10 sm:pt-20 sm:pb-14 px-4 sm:px-8 overflow-hidden select-none">
      {/* LAYER 1 (Deepest): 3D Particle Network Canvas */}
      <ParticleNetwork />

      {/* LAYER 2: Continuous Infinite Kinetic Typography Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.28 }}
        transition={{ duration: 1.2, delay: 0.05, ease }}
        className="hero-marquee-container"
        aria-hidden="true"
      >
        <div className="hero-marquee-track">
          <span
            className="hero-outline-text font-display font-black uppercase tracking-tight pr-12 select-none"
            style={{
              fontSize: "clamp(4.5rem, 16vw, 12rem)",
            }}
          >
            HASBI SHIDDIQ &nbsp;&middot;&nbsp; HASBI SHIDDIQ &nbsp;&middot;&nbsp; HASBI SHIDDIQ &nbsp;&middot;&nbsp; HASBI SHIDDIQ &nbsp;&middot;&nbsp;
          </span>
          <span
            className="hero-outline-text font-display font-black uppercase tracking-tight pr-12 select-none"
            style={{
              fontSize: "clamp(4.5rem, 16vw, 12rem)",
            }}
          >
            HASBI SHIDDIQ &nbsp;&middot;&nbsp; HASBI SHIDDIQ &nbsp;&middot;&nbsp; HASBI SHIDDIQ &nbsp;&middot;&nbsp; HASBI SHIDDIQ &nbsp;&middot;&nbsp;
          </span>
        </div>
      </motion.div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        {/* 1. Eyebrow Label */}
        <motion.p
          {...fadeInUp(0)}
          className="eyebrow mb-4 sm:mb-6"
        >
          $ {hero.subtitle.toLowerCase()}
        </motion.p>

        {/* 2. Cutout Profile Photo Composition (Centered over Marquee) */}
        <motion.div
          {...fadeInUp(0.12)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsPhotoActive((prev) => !prev)}
          onHoverStart={() => setIsPhotoActive(true)}
          onHoverEnd={() => setIsPhotoActive(false)}
          className="relative mb-5 sm:mb-7 cursor-pointer select-none group"
        >
          <div
            className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-64 lg:h-64 flex items-center justify-center overflow-hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 98%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 98%)",
            }}
          >
            <Image
              src="/profile-cutout.png"
              alt="Hasbi As Shiddiq"
              fill
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 250px, 300px"
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

        {/* 3. Tagline */}
        <motion.p
          {...fadeInUp(0.25)}
          className="font-body mb-6 sm:mb-8 max-w-xl text-base sm:text-lg leading-relaxed px-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {hero.tagline}
        </motion.p>

        {/* 4. Action Buttons */}
        <motion.div
          {...fadeInUp(0.35)}
          className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 px-4 sm:px-0"
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
