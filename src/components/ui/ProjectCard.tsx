"use client";

import { useRef } from "react";
import Link from "next/link";
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
        onMouseLeave={handleMouseLeave}
        onClick={onToggle}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundColor: isActive ? "var(--bg-elevated)" : "var(--bg-secondary)",
          borderColor: isActive ? "var(--accent-primary)" : "var(--border-subtle)",
          boxShadow: isActive
            ? "0 0 30px rgba(94, 234, 212, 0.22), inset 0 1px 0 rgba(94, 234, 212, 0.5)"
            : undefined,
        }}
        whileHover={{ translateY: -6, scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className={`group relative flex h-full flex-col justify-between rounded-xl sm:rounded-[14px] border p-6 sm:p-7 transition-all duration-300 cursor-pointer select-none ${
          isActive
            ? "border-[var(--accent-primary)] bg-[var(--bg-elevated)] shadow-[0_0_30px_rgba(94,234,212,0.22),_inset_0_1px_0_rgba(94,234,212,0.5)]"
            : "hover:border-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] hover:shadow-[0_0_30px_rgba(94,234,212,0.22),_inset_0_1px_0_rgba(94,234,212,0.4)]"
        }`}
      >
        <div>
          {/* Status Badge */}
          <div className="mb-5 flex items-center justify-between">
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

          {/* View Code Link / Footer */}
          <div
            className="pt-4 border-t"
            style={{ borderColor: "rgba(31, 41, 55, 0.6)" }}
          >
            {project.link ? (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
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
                    backgroundColor: "rgba(22, 28, 41, 0.6)",
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
