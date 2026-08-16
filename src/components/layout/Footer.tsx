"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="w-full border-t py-8 px-6 sm:px-8 transition-colors"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Copyright notice */}
        <p
          className="font-mono text-xs"
          style={{ color: "var(--text-tertiary)" }}
        >
          © 2026 Hasbi As Shiddiq. Built with curiosity.
        </p>

        {/* System online signal status indicator */}
        <div className="flex items-center gap-2 font-mono text-xs" style={{ color: "var(--text-tertiary)" }}>
          <span
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--accent-primary)" }}
          />
          <span>System Online</span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="font-mono text-xs inline-flex items-center gap-1.5 transition-colors duration-200 cursor-pointer group"
          style={{ color: "var(--text-tertiary)" }}
        >
          <span className="group-hover:text-[var(--accent-primary)] transition-colors">
            Back to top
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-primary)]"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
