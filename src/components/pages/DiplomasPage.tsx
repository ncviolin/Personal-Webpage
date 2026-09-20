import { useState, useEffect } from "react";
import { diplomas, type Diploma } from "../../data/diplomas";
import { DiplomaCard } from "../ui/DiplomaCard";
import { DiplomaLightbox } from "../ui/DiplomaLightbox";
import { personal } from "../../data/personal";

interface DiplomasPageProps {
  onBack: () => void;
}

export function DiplomasPage({ onBack }: DiplomasPageProps) {
  const [selected, setSelected] = useState<Diploma | null>(null);

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      {/* ── Page shell ───────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh" }}>

        {/* Top bar */}
        <header
          className="sticky top-0 z-50 px-6 md:px-10"
          style={{
            backgroundColor: "rgba(250,250,249,0.96)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #E2E0DC",
          }}
        >
          <div
            className="max-w-6xl mx-auto flex items-center justify-between"
            style={{ height: "68px" }}
          >
            {/* Back button */}
            <button
              onClick={onBack}
              className="group flex items-center gap-2.5 font-mono text-xs tracking-wider transition-colors duration-200 hover:text-[#1C3557]"
              style={{ color: "#6B6863", letterSpacing: "0.1em" }}
              aria-label="Back to main site"
            >
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>

            {/* Site name */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onBack(); }}
              className="font-serif font-semibold transition-colors duration-200 hover:text-[#1C3557]"
              style={{ fontSize: "0.9375rem", color: "#141414" }}
            >
              {personal.name}
            </a>
          </div>
        </header>

        {/* ── Hero strip ──────────────────────────────────────────────────── */}
        <div
          className="px-6 md:px-10 pt-16 pb-14 border-b"
          style={{ borderColor: "#E2E0DC" }}
        >
          <div className="max-w-6xl mx-auto">
            <p
              className="font-mono text-xs mb-4 uppercase tracking-widest"
              style={{ color: "#B8965A", letterSpacing: "0.2em" }}
            >
              Credentials
            </p>
            <h1
              className="font-serif leading-tight mb-4"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 600, color: "#141414" }}
            >
              Diplomas &amp; Certificates
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "#6B6863", maxWidth: "520px" }}>
              A complete record of academic credentials and professional certifications.
              Click any item to view a larger, readable version.
            </p>
          </div>
        </div>

        {/* ── Gallery ─────────────────────────────────────────────────────── */}
        <main className="px-6 md:px-10 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            {diplomas.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center text-center py-28 border"
                style={{ borderColor: "#E2E0DC", borderRadius: "3px", backgroundColor: "#F4F3F0" }}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="mb-5">
                  <rect x="6" y="8" width="36" height="32" rx="2" stroke="#C8C5BF" strokeWidth="1.5" fill="none" />
                  <path d="M14 18h20M14 24h20M14 30h12" stroke="#C8C5BF" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M30 28l4 4 6-7" stroke="#B8965A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="font-serif italic mb-2" style={{ fontSize: "1.125rem", color: "#3A3A3A" }}>
                  No diplomas or certificates yet.
                </p>
                <p className="font-mono text-xs tracking-wider" style={{ color: "#B8B5AF", letterSpacing: "0.08em" }}>
                  Add entries to src/data/diplomas.ts to get started.
                </p>
              </div>
            ) : (
              <>
                {/* Count */}
                <p
                  className="font-mono text-xs mb-10 pb-4 border-b"
                  style={{ color: "#B8B5AF", letterSpacing: "0.08em", borderColor: "#E2E0DC" }}
                >
                  {diplomas.length} {diplomas.length === 1 ? "item" : "items"}
                </p>

                {/* Grid — 4 cols on large, 3 on md, 2 on sm, 1 on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
                  {diplomas.map((diploma) => (
                    <DiplomaCard
                      key={diploma.id}
                      diploma={diploma}
                      onClick={() => setSelected(diploma)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </main>

        {/* ── Footer strip ─────────────────────────────────────────────────── */}
        <footer
          className="px-6 md:px-10 py-8 border-t"
          style={{ borderColor: "#E2E0DC" }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <p className="font-mono text-xs" style={{ color: "#B8B5AF", letterSpacing: "0.06em" }}>
              © {new Date().getFullYear()} {personal.name}
            </p>
            <button
              onClick={onBack}
              className="font-mono text-xs transition-colors duration-200 hover:text-[#1C3557]"
              style={{ color: "#6B6863", letterSpacing: "0.08em" }}
            >
              ← Back to site
            </button>
          </div>
        </footer>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {selected && (
        <DiplomaLightbox diploma={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
