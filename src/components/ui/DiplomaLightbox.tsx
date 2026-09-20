import { useEffect } from "react";
import type { Diploma } from "../../data/diplomas";

export function DiplomaLightbox({
  diploma,
  onClose,
}: {
  diploma: Diploma;
  onClose: () => void;
}) {
  const src = diploma.previewUrl || diploma.imageUrl;

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
      style={{ backgroundColor: "rgba(14,14,14,0.92)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${diploma.title} — ${diploma.institution}`}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-10 right-0 flex items-center gap-2 font-mono text-xs tracking-widest transition-opacity duration-200 hover:opacity-60"
          style={{ color: "#FAFAF9", letterSpacing: "0.12em" }}
        >
          <span>CLOSE</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Image or placeholder */}
        <div
          style={{
            borderRadius: "3px",
            overflow: "hidden",
            backgroundColor: "#F4F3F0",
          }}
        >
          {src ? (
            <img
              src={src}
              alt={`${diploma.title} from ${diploma.institution}`}
              className="w-full object-contain"
              style={{ maxHeight: "75vh" }}
            />
          ) : (
            <div
              className="w-full flex flex-col items-center justify-center gap-4 py-28"
            >
              <svg width="52" height="52" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <rect x="6" y="8" width="36" height="32" rx="2" stroke="#B8B5AF" strokeWidth="1.5" fill="none" />
                <path d="M14 18h20M14 24h20M14 30h12" stroke="#B8B5AF" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M30 28l4 4 6-7" stroke="#B8965A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-mono text-xs" style={{ color: "#B8B5AF", letterSpacing: "0.08em" }}>
                Image not yet uploaded
              </p>
            </div>
          )}
        </div>

        {/* Caption bar */}
        <div
          className="mt-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
        >
          <div>
            <p
              className="font-serif font-semibold leading-snug"
              style={{ fontSize: "1.125rem", color: "#FAFAF9" }}
            >
              {diploma.title}
            </p>
            <p
              className="font-mono text-xs mt-1"
              style={{ color: "#9E9B96", letterSpacing: "0.07em" }}
            >
              {diploma.institution}
            </p>
            {diploma.description && (
              <p className="text-sm mt-2 leading-relaxed" style={{ color: "#9E9B96" }}>
                {diploma.description}
              </p>
            )}
          </div>
          <p
            className="font-mono text-xs whitespace-nowrap"
            style={{ color: "#B8965A", letterSpacing: "0.1em" }}
          >
            {diploma.date}
          </p>
        </div>
      </div>
    </div>
  );
}
