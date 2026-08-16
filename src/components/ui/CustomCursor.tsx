"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotWrapperRef = useRef<HTMLDivElement>(null);
  const ringWrapperRef = useRef<HTMLDivElement>(null);
  const cursorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect desktop with fine pointer & hover support
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        if (cursorContainerRef.current) cursorContainerRef.current.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (cursorContainerRef.current) cursorContainerRef.current.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (cursorContainerRef.current) cursorContainerRef.current.style.opacity = "1";
    };

    // Event delegation for interactive elements (no React re-renders)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive =
        target &&
        target.closest(
          "a, button, [role='button'], input, textarea, select, .cursor-pointer, [data-cursor-hover]"
        );

      if (cursorContainerRef.current) {
        if (isInteractive) {
          cursorContainerRef.current.classList.add("cursor-hovered");
        } else {
          cursorContainerRef.current.classList.remove("cursor-hovered");
        }
      }
    };

    // 60-120fps RAF lerp loop (Positioning ONLY, completely separate from CSS scale)
    const render = () => {
      if (isVisible) {
        // Fast follow for inner dot
        dotX += (mouseX - dotX) * 0.35;
        dotY += (mouseY - dotY) * 0.35;

        // Smooth trailing lag for outer ring
        ringX += (mouseX - ringX) * 0.14;
        ringY += (mouseY - ringY) * 0.14;

        if (dotWrapperRef.current) {
          dotWrapperRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        }
        if (ringWrapperRef.current) {
          ringWrapperRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    document.documentElement.classList.add("custom-cursor-enabled");
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.classList.remove("custom-cursor-enabled");
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={cursorContainerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden opacity-0 transition-opacity duration-300 ease-out group/cursor"
    >
      {/* Outer Ring Wrapper (JS handles positioning translate3d) */}
      <div
        ref={ringWrapperRef}
        className="pointer-events-none fixed top-0 left-0 will-change-transform"
      >
        {/* Inner Ring Element (CSS handles scale & styling transition independently) */}
        <div
          className="w-9 h-9 rounded-full border border-[rgba(94,234,212,0.4)] bg-transparent transition-all duration-300 ease-out group-[.cursor-hovered]/cursor:scale-[1.55] group-[.cursor-hovered]/cursor:border-[var(--accent-primary)] group-[.cursor-hovered]/cursor:bg-[rgba(94,234,212,0.08)]"
        />
      </div>

      {/* Inner Dot Wrapper (JS handles positioning translate3d) */}
      <div
        ref={dotWrapperRef}
        className="pointer-events-none fixed top-0 left-0 will-change-transform"
      >
        {/* Inner Dot Element (CSS handles scale & styling transition independently) */}
        <div
          className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_10px_rgba(94,234,212,0.6)] transition-transform duration-200 ease-out group-[.cursor-hovered]/cursor:scale-50"
        />
      </div>
    </div>
  );
}
