"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Project } from "@/data/content";

interface ProjectCardProps {
  project: Project;
  index?: number;
  isActive?: boolean;
  onToggle?: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProjectCard({ project, index = 0, isActive = false, onToggle }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Damped spring physics for tactile, smooth motion
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  // Map mouse positions [-0.5, 0.5] to tilt rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Color coding status badge systematic helper
  const getBadgeStyles = (badge: string) => {
    const lower = badge.toLowerCase();
    if (lower.includes("featured") || lower.includes("full-stack")) {
      return {
        backgroundColor: "rgba(94, 234, 212, 0.08)",
        borderColor: "rgba(94, 234, 212, 0.25)",
        color: "var(--accent-primary)",
        dotColor: "var(--accent-primary)",
      };
    }
    if (lower.includes("exploration") || lower.includes("architecture")) {
      return {
        backgroundColor: "rgba(125, 211, 252, 0.08)",
        borderColor: "rgba(125, 211, 252, 0.25)",
        color: "var(--accent-secondary)",
        dotColor: "var(--accent-secondary)",
      };
    }
    // Muted / Upcoming treatment
    return {
      backgroundColor: "rgba(90, 100, 120, 0.12)",
      borderColor: "rgba(90, 100, 120, 0.25)",
      color: "var(--text-secondary)",
      dotColor: "var(--text-tertiary)",
    };
  };

  const badgeStyle = getBadgeStyles(project.badge);

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseLeave();
    if (!isActive) {
      e.currentTarget.style.boxShadow = "var(--card-shadow)";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease }}
      className="h-full"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleCardMouseLeave}
        onClick={onToggle}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundColor: isActive ? "var(--bg-elevated)" : "var(--bg-secondary)",
          borderColor: isActive ? "var(--accent-primary)" : "var(--border-subtle)",
          boxShadow: isActive ? "var(--card-shadow-active)" : "var(--card-shadow)",
        }}
        whileHover={{ translateY: -6, scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="group relative flex h-full flex-col justify-between rounded-xl sm:rounded-[14px] border p-6 sm:p-7 transition-all duration-300 cursor-pointer select-none"
        onMouseEnter={(e) => {
          if (!isActive) e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
        }}
      >
        <div>
          {/* Top Screenshot / Image (if available) */}
          {project.image && (
            <div className="relative mb-5 w-full aspect-[16/9] overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] group/img">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                quality={92}
                className="object-cover object-top transition-transform duration-500 ease-out group-hover/img:scale-105 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)]/30 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* Status Badge */}
          <div className="mb-4 flex items-center justify-between">
            <span
              className="font-mono inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border tracking-wide"
              style={{
                backgroundColor: badgeStyle.backgroundColor,
                borderColor: badgeStyle.borderColor,
                color: badgeStyle.color,
              }}
            >
              <span
                className="mr-1.5 h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: badgeStyle.dotColor }}
              />
              {project.badge}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-display mb-3 text-xl font-bold tracking-tight sm:text-2xl transition-colors duration-300 group-hover:text-[var(--accent-primary)]"
            style={{ color: "var(--text-primary)" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="font-body mb-6 text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="font-mono text-xs px-2.5 py-1 rounded-full border bg-transparent transition-colors duration-200"
                style={{
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-tertiary)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Links / Footer */}
          <div
            className="pt-4 border-t"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            {project.liveUrl && project.link ? (
              /* Dual Action Links: Live Demo & View Code */
              <div className="flex items-center justify-between gap-3">
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-mono text-xs font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 border border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[#0A0E14] transition-all duration-200 shadow-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                  <span>Live Demo</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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

                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-mono text-xs font-medium inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors py-1"
                >
                  <span>View Code</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 3h7v7M3 13l7-7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            ) : project.link ? (
              /* Single View Code Link */
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-sm font-medium inline-flex items-center group/link transition-colors"
                style={{ color: "var(--accent-primary)" }}
              >
                <span>View Code</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1.5 transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5"
                >
                  <path
                    d="M6 3h7v7M3 13l7-7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ) : (
              /* Disabled / Coming Soon */
              <span
                className="font-mono text-sm inline-flex items-center justify-between w-full cursor-not-allowed select-none"
                style={{ color: "var(--text-tertiary)" }}
              >
                <span className="inline-flex items-center">
                  <span>View Code</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1.5 opacity-40"
                  >
                    <path
                      d="M6 3h7v7M3 13l7-7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider font-semibold"
                  style={{
                    borderColor: "var(--border-subtle)",
                    backgroundColor: "var(--bg-elevated)",
                    color: "var(--text-tertiary)",
                  }}
                >
                  Coming Soon
                </span>
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
