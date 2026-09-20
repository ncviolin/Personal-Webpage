import { useEffect, useRef, useState } from "react";
import awardsBg from "../../imports/awards-bg.jpg";

const resumePdf = "/Resume_2026.pdf";

export function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const [entered, setEntered] = useState(false);

  // Trigger entrance when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setEntered(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle parallax on the background photo
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section || !bg) return;
        const rect = section.getBoundingClientRect();
        const progress = -rect.top / rect.height;
        bg.style.transform = `scale(1.08) translateY(${Math.max(-0.2, Math.min(1, progress)) * 36}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  const reveal = (delay: number): React.CSSProperties => ({
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      id="awards"
      aria-labelledby="awards-heading"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background photo — fades in + unscales */}
      <img
        ref={bgRef}
        src={awardsBg}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "70% 20%",
          transform: "scale(1.08)",
          willChange: "transform",
          opacity: entered ? 1 : 0,
          transition: "opacity 1.2s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(10,16,28,0.55) 0%, rgba(10,16,28,0.72) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "6rem 1.5rem",
          maxWidth: "640px",
          margin: "0 auto",
        }}
      >
        {/* Label */}
        <p
          style={{
            ...reveal(200),
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "1.25rem",
          }}
        >
          Recognition
        </p>

        {/* Heading */}
        <h2
          id="awards-heading"
          style={{
            ...reveal(340),
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            lineHeight: 1.1,
            color: "#FAFAF9",
            marginBottom: "1.25rem",
            letterSpacing: "-0.01em",
          }}
        >
          Awards &amp; Honours
        </h2>

        {/* Divider — grows in width */}
        <div
          aria-hidden="true"
          style={{
            width: entered ? "48px" : "0px",
            height: "1px",
            backgroundColor: "var(--color-accent)",
            margin: "0 auto 1.75rem",
            opacity: entered ? 0.7 : 0,
            transition: "width 0.7s cubic-bezier(0.22,1,0.36,1) 460ms, opacity 0.7s ease 460ms",
          }}
        />

        {/* Subtext */}
        <p
          style={{
            ...reveal(520),
            fontFamily: "var(--font-sans)",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "rgba(250,250,249,0.72)",
            marginBottom: "2.75rem",
          }}
        >
          A full record of competition prizes, fellowships, and notable
          recognitions — available as a downloadable PDF.
        </p>

        {/* Download button */}
        <div style={reveal(660)}>
          <a
            href={resumePdf}
            download="Nathan_Chen_Resume_2026.pdf"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "0.875rem 2.25rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#141414",
              backgroundColor: "var(--color-accent)",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
            aria-label="Download Resume PDF"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M7 1v8M3.5 6.5L7 10l3.5-3.5M1 12h12"
                stroke="#141414"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download Resume
          </a>
        </div>

      </div>
    </section>
  );
}
