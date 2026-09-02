"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HangingLanyard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.4 }}
      drag
      dragConstraints={{ left: -30, right: 30, top: -20, bottom: 40 }}
      dragElastic={0.2}
      whileHover={{ scale: 1.03, rotate: 2 }}
      whileTap={{ scale: 0.97 }}
      className="hidden lg:flex flex-col items-center absolute right-8 xl:right-16 top-0 z-30 cursor-grab active:cursor-grabbing select-none"
    >
      {/* Lanyard Line / Strap */}
      <div className="w-[3px] h-24 sm:h-28 bg-gradient-to-b from-[var(--border-accent)] via-[var(--text-tertiary)] to-[var(--border-subtle)] relative flex justify-center">
        {/* Clip / Buckle */}
        <div className="absolute bottom-0 w-4 h-5 rounded-sm border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-center shadow-sm">
          <div className="w-2 h-2 rounded-full border border-[var(--text-tertiary)]" />
        </div>
      </div>

      {/* The ID Card Container */}
      <div className="relative w-52 sm:w-56 rounded-xl border border-[var(--border-accent)] bg-[var(--bg-secondary)]/95 backdrop-blur-md p-4 shadow-[var(--card-shadow-hover)] flex flex-col items-center text-center mt-2 group">
        {/* Strap Ring Hole */}
        <div className="w-6 h-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] mb-3" />

        {/* Card Header Badge */}
        <div className="w-full flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-[var(--text-tertiary)] mb-3 pb-2 border-b border-[var(--border-subtle)]">
          <span>SD CARD</span>
          <span className="text-[var(--accent-primary)] font-bold">● HASBI.DEV</span>
        </div>

        {/* Photo Container */}
        <div className="relative w-36 h-44 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-primary)] mb-3 group-hover:border-[var(--accent-primary)] transition-colors">
          <Image
            src="/profile-cutout.png"
            alt="Hasbi As Shiddiq"
            fill
            sizes="160px"
            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Card Details */}
        <h4 className="font-display font-bold text-xs sm:text-sm tracking-tight text-[var(--text-primary)] mb-0.5">
          HASBI AS SHIDDIQ
        </h4>
        <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
          INFORMATICS · SOFTWARE & AI
        </p>

        {/* Barcode & Footer Aesthetic */}
        <div className="w-full pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-[8px] text-[var(--text-tertiary)]">
          <div className="flex items-center gap-0.5 tracking-tighter opacity-60">
            <span>|||</span><span>|</span><span>||</span><span>|||</span><span>|</span><span>||</span><span>||</span>
          </div>
          <span>ID: 2026-DEV</span>
        </div>
      </div>
    </motion.div>
  );
}
