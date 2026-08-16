"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Interests", href: "#interests" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { scrollY } = useScroll();
  const navbarBackground = useTransform(scrollY, [0, 50], ["transparent", "var(--bg-secondary)"]);
  const navbarBorder = useTransform(scrollY, [0, 50], ["transparent", "var(--border-subtle)"]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.querySelector(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        style={{
          backgroundColor: navbarBackground,
          borderBottomColor: navbarBorder,
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-[12px] border-b"
      >
        <div className="flex items-center justify-between px-6 py-4 sm:px-8">
          <Link
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="font-mono text-sm flex items-center gap-2 transition-opacity hover:opacity-80"
            style={{ color: "var(--text-primary)" }}
          >
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: "var(--accent-primary)" }}
            >
              ●
            </motion.span>
            hasbi.dev
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-7">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-mono text-xs uppercase tracking-wider relative group py-1 transition-colors duration-300 ease-out active:scale-95 ${
                    isActive
                      ? "text-[var(--accent-primary)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                  }`}
                >
                  <span
                    className={`transition-opacity duration-300 ${
                      isActive ? "opacity-90 text-[var(--accent-primary)]" : "opacity-40 group-hover:opacity-80"
                    }`}
                  >
                    [{String(index + 1).padStart(2, "0")}]
                  </span>{" "}
                  {link.name}

                  {/* Active Section Underline (glides smoothly using layoutId) */}
                  {isActive ? (
                    <motion.div
                      layoutId="activeSectionIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full"
                      style={{ backgroundColor: "var(--accent-primary)" }}
                      transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    />
                  ) : (
                    /* Non-Active Hover Underline (expands from left on hover) */
                    <span
                      className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left opacity-70"
                      style={{ backgroundColor: "var(--accent-primary)" }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden flex flex-col items-center justify-center gap-1.5 p-2 active:scale-95 transition-transform"
            style={{ color: "var(--text-primary)" }}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-current"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-current"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-current"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 sm:hidden"
            style={{ backgroundColor: "rgba(10, 14, 20, 0.95)" }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-mono text-xl uppercase tracking-wider transition-all active:scale-95 active:text-[var(--accent-primary)]"
                  style={{
                    color: activeSection === link.href ? "var(--accent-primary)" : "var(--text-primary)",
                  }}
                >
                  <span className="opacity-50">[{String(index + 1).padStart(2, "0")}]</span> {link.name}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
