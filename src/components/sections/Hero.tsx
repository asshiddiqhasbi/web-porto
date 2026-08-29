"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax shifts: outline text shifts faster than photo to amplify depth perception
  const yOutlineText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 35]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center pt-12 pb-10 sm:pt-16 sm:pb-12 px-4 sm:px-8 overflow-hidden select-none"
    >
      {/* LAYER 1 (Deepest): 3D Particle Network Canvas */}
      <ParticleNetwork />

      {/* LAYER 2: Giant Outline Typography (Background Kinetic Layer) */}
      <motion.div
        style={{ y: yOutlineText }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 0.28, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.05, ease }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        <span
          className="hero-outline-text font-display font-black uppercase tracking-tight whitespace-nowrap leading-none select-none"
          style={{
            fontSize: "clamp(5rem, 21vw, 16rem)",
          }}
        >
          SHIDDIQ
        </span>
      </motion.div>

      {/* FOREGROUND LAYERS (Layers 3 & 4) */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        {/* Eyebrow Label */}
        <motion.p
          {...fadeInUp(0)}
          className="eyebrow mb-2 sm:mb-4"
        >
          $ {hero.subtitle.toLowerCase()}
        </motion.p>

        {/* LAYER 3: Cutout Profile Photo (Layered visual centerpiece) */}
        <motion.div
          style={{ y: yPhoto }}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsPhotoActive((prev) => !prev)}
          onHoverStart={() => setIsPhotoActive(true)}
          onHoverEnd={() => setIsPhotoActive(false)}
          className="relative mb-3 sm:mb-4 cursor-pointer select-none group"
        >
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 flex items-center justify-center">
            {/* Soft ambient background glow tailored to cutout contour */}
            <div
              className={`absolute inset-2 rounded-full transition-all duration-500 blur-2xl pointer-events-none ${
                isPhotoActive
                  ? "opacity-70 bg-[var(--accent-primary)] scale-110"
                  : "opacity-30 group-hover:opacity-60 bg-[var(--accent-primary)] group-hover:scale-105"
              }`}
            />

            {/* Transparent Cutout Profile Image */}
            <Image
              src="/profile-cutout.png"
              alt="Hasbi As Shiddiq"
              fill
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 280px"
              quality={95}
              className={`object-contain transition-all duration-500 ${
                isPhotoActive
                  ? "grayscale-0 contrast-105 brightness-105 drop-shadow-[0_12px_28px_var(--glow-shadow-intense)]"
                  : "grayscale contrast-100 brightness-95 group-hover:grayscale-0 group-hover:contrast-105 group-hover:brightness-105 group-hover:drop-shadow-[0_12px_28px_var(--glow-shadow-intense)]"
              }`}
              priority
            />
          </div>
        </motion.div>

        {/* LAYER 4: Foreground Text Content */}
        {/* Main Name Heading */}
        <motion.h1
          {...fadeInUp(0.25)}
          className="font-display mb-3 sm:mb-4 text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.1] tracking-tight"
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
          className="font-body mb-5 sm:mb-7 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed px-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {hero.tagline}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          {...fadeInUp(0.45)}
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

      {/* Scroll indicator positioned safely */}
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
