import { useEffect, useRef, useState } from "react";
import { personal } from "../../data/personal";
import { SocialIconLink } from "../ui/SocialLink";
import heroBg from "../../imports/DSC02719-1.jpeg";

const [_first, ...restParts] = personal.name.split(" ");
const firstName = personal.firstName ?? _first;
const lastName = restParts.join(" ");

// Staggered entrance: each element fades up from 24px below, one after another
function revealStyle(delayMs: number, entered: boolean): React.CSSProperties {
  return {
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delayMs}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delayMs}ms`,
  };
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  // Trigger entrance after first paint
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setTimeout(() => setEntered(true), 80);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Scroll-driven parallax + fade on the content block
  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const el = sectionRef.current;
        const content = contentRef.current;
        if (!el || !content) return;
        const vh = el.offsetHeight;
        const progress = Math.min(Math.max(window.scrollY / vh, 0), 1);
        content.style.transform = `translateY(${progress * -40}px) scale(${1 - progress * 0.04})`;
        content.style.opacity = `${1 - progress * 1.4}`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col justify-center px-6 md:px-10"
      style={{ position: "sticky", top: 0, height: "100vh", zIndex: 1, backgroundColor: "#0a0a0a" }}
      aria-label="Introduction"
    >
      {/* Background photo — slides in from slight scale */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{
          objectPosition: "right center",
          opacity: entered ? 1 : 0,
          transform: entered ? "scale(1)" : "scale(1.04)",
          transition: "opacity 1.2s ease, transform 1.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.50) 100%)" }}
      />
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.40), transparent)" }}
      />

      {/* Content block — scroll-driven fade+lift */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-6xl mx-auto w-full pt-24 pb-16"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="max-w-xl">

          {/* Instrument label */}
          <p
            className="font-mono text-xs uppercase mb-8"
            style={{
              color: "var(--color-accent)",
              letterSpacing: "0.25em",
              ...revealStyle(200, entered),
            }}
          >
            {personal.instrument}
          </p>

          {/* First name */}
          <h1
            className="font-serif leading-none"
            translate="no"
            spellCheck={false}
            style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: 600, color: "#FAFAF9", letterSpacing: "-0.02em" }}
          >
            <span
              className="block"
              style={revealStyle(340, entered)}
            >
              {firstName}
            </span>
            {lastName && (
              <span
                className="block mb-6"
                style={revealStyle(440, entered)}
              >
                {lastName}
              </span>
            )}
          </h1>

          {/* Tagline */}
          {personal.tagline && (
            <p
              className="leading-relaxed mb-10"
              style={{
                fontSize: "clamp(1.0625rem, 2vw, 1.25rem)",
                color: "rgba(250,250,249,0.68)",
                maxWidth: "38ch",
                ...revealStyle(540, entered),
              }}
            >
              {personal.tagline}
            </p>
          )}

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mb-10"
            style={revealStyle(personal.tagline ? 640 : 540, entered)}
          >
            <a
              href="#recordings"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-mono text-xs uppercase transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
              style={{ backgroundColor: "var(--color-accent)", color: "#141414", borderRadius: "2px", letterSpacing: "0.12em" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5.5 5L9.5 7L5.5 9V5Z" fill="currentColor" />
              </svg>
              Watch &amp; Listen
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-7 py-3.5 font-mono text-xs uppercase border transition-all duration-200 hover:-translate-y-px"
              style={{ borderColor: "rgba(250,250,249,0.45)", color: "#FAFAF9", borderRadius: "2px", letterSpacing: "0.12em", backgroundColor: "transparent" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(250,250,249,0.10)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
            >
              Get in Touch
            </a>
            {personal.pressKitUrl && (
              <a
                href={personal.pressKitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3.5 font-mono text-xs uppercase border transition-all duration-200 hover:-translate-y-px"
                style={{ borderColor: "rgba(250,250,249,0.25)", color: "rgba(250,250,249,0.50)", borderRadius: "2px", letterSpacing: "0.12em" }}
              >
                Press Kit
              </a>
            )}
          </div>

          {/* Social icons */}
          <div
            className="flex items-center gap-4"
            style={revealStyle(personal.tagline ? 720 : 620, entered)}
          >
            {personal.social.map((s) => (
              <SocialIconLink key={s.platform} social={s} />
            ))}
          </div>
        </div>
      </div>

      {/* Location — bottom right */}
      <div
        className="absolute bottom-10 right-6 md:right-10 hidden lg:flex z-10"
        style={revealStyle(900, entered)}
      >
        <span className="font-mono text-xs" style={{ color: "rgba(250,250,249,0.40)", letterSpacing: "0.08em" }}>
          {personal.location}
        </span>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
        style={revealStyle(1000, entered)}
      >
        <span className="font-mono text-xs" style={{ color: "rgba(250,250,249,0.35)", letterSpacing: "0.1em" }}>
          scroll
        </span>
        <div
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, var(--color-accent), transparent)" }}
        />
      </div>
    </section>
  );
}
