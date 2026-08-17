"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotWrapperRef = useRef<HTMLDivElement>(null);
  const cursorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect desktop with fine pointer & hover support
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
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

    // Event delegation for interactive elements (lightweight class toggle)
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

    // Ultra-lightweight RAF loop for single cursor dot position
    const render = () => {
      if (isVisible) {
        dotX += (mouseX - dotX) * 0.45;
        dotY += (mouseY - dotY) * 0.45;

        if (dotWrapperRef.current) {
          dotWrapperRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
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
      {/* Single Small Circular Cursor Dot (~10-11px, scales 1.5x on hover) */}
      <div
        ref={dotWrapperRef}
        className="pointer-events-none fixed top-0 left-0 will-change-transform"
      >
        <div
          className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_12px_var(--glow-shadow-intense)] transition-transform duration-200 ease-out group-[.cursor-hovered]/cursor:scale-[1.5]"
        />
      </div>
    </div>
  );
}
