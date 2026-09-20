import { useState, useEffect, useRef } from "react";
import { diplomas, type Diploma } from "../../data/diplomas";
import { SectionHeader } from "../ui/SectionHeader";
import { DiplomaCard } from "../ui/DiplomaCard";
import { DiplomaLightbox } from "../ui/DiplomaLightbox";

const HIDDEN: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(22px)",
  transition: "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)",
};

interface DiplomasProps {
  onViewAll: () => void;
}

export function Diplomas({ onViewAll }: DiplomasProps) {
  const [selected, setSelected] = useState<Diploma | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child) => {
            const delay = Number(child.dataset.delay ?? 0);
            setTimeout(() => {
              child.style.opacity = "1";
              child.style.transform = "translateY(0)";
            }, delay);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const featured = diplomas.filter((d) => d.featured).slice(0, 3);
  const preview = featured.length > 0 ? featured : diplomas.slice(0, 3);
  const hasMore = diplomas.length > preview.length;

  return (
    <>
      <section
        ref={sectionRef}
        id="diplomas"
        className="py-24 md:py-32 px-6 md:px-10"
        style={{ backgroundColor: "#F4F3F0" }}
        aria-labelledby="diplomas-heading"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-14" data-reveal data-delay="0" style={HIDDEN}>
            <SectionHeader
              label="Credentials"
              heading="Diplomas &amp; Certificates"
              description="Academic credentials and professional certifications."
            />
          </div>

          {preview.length === 0 ? (
            <div
              data-reveal data-delay="120"
              className="flex flex-col items-center justify-center text-center py-20 border"
              style={{ borderColor: "#E2E0DC", borderRadius: "3px", backgroundColor: "#FAFAF9", ...HIDDEN }}
            >
              <p className="font-serif italic mb-2" style={{ fontSize: "1.125rem", color: "#3A3A3A" }}>
                Diplomas and certificates will appear here.
              </p>
              <p className="font-mono text-xs tracking-wider" style={{ color: "#B8B5AF", letterSpacing: "0.08em" }}>
                Add entries to src/data/diplomas.ts to get started.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {preview.map((diploma, i) => (
                  <div
                    key={diploma.id}
                    data-reveal
                    data-delay={120 + i * 100}
                    style={HIDDEN}
                  >
                    <DiplomaCard
                      diploma={diploma}
                      onClick={() => setSelected(diploma)}
                    />
                  </div>
                ))}
              </div>

              {(hasMore || diplomas.length > 0) && (
                <div
                  className="mt-14 flex justify-center"
                  data-reveal data-delay="420"
                  style={HIDDEN}
                >
                  <button
                    onClick={onViewAll}
                    className="group inline-flex items-center gap-3 px-8 py-3.5 border font-mono text-xs tracking-wider uppercase transition-all duration-200 hover:bg-[#1C3557] hover:text-[#FAFAF9] hover:border-[#1C3557]"
                    style={{ borderColor: "#1C3557", color: "#1C3557", borderRadius: "2px", letterSpacing: "0.12em" }}
                  >
                    View All Diplomas &amp; Certificates
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {selected && (
        <DiplomaLightbox diploma={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
