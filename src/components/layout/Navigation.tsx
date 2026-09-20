import React, { useState, useEffect } from "react";
import { personal } from "../../data/personal";
import { SocialIconLink } from "../ui/SocialLink";

function SocialIconLarge({ platform, color }: { platform: string; color: string }) {
  const icons: Record<string, React.ReactElement> = {
    YouTube: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="8" fill="#FF0000" />
        <path d="M27 12.7C26.7 11.6 25.9 10.8 24.8 10.5C22.8 10 18 10 18 10C18 10 13.2 10 11.2 10.5C10.1 10.8 9.3 11.6 9 12.7C8.5 14.7 8.5 18 8.5 18C8.5 18 8.5 21.3 9 23.3C9.3 24.4 10.1 25.2 11.2 25.5C13.2 26 18 26 18 26C18 26 22.8 26 24.8 25.5C25.9 25.2 26.7 24.4 27 23.3C27.5 21.3 27.5 18 27.5 18C27.5 18 27.5 14.7 27 12.7Z" fill="white" />
        <path d="M15.5 21.5L21.5 18L15.5 14.5V21.5Z" fill="#FF0000" />
      </svg>
    ),
    Instagram: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="ig-lg" x1="0" y1="36" x2="36" y2="0">
            <stop offset="0%" stopColor="#FFDC80" />
            <stop offset="50%" stopColor="#F77737" />
            <stop offset="100%" stopColor="#833AB4" />
          </linearGradient>
        </defs>
        <rect width="36" height="36" rx="8" fill="url(#ig-lg)" />
        <rect x="10" y="10" width="16" height="16" rx="4.5" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="18" cy="18" r="4" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="23.5" cy="12.5" r="1.2" fill="white" />
      </svg>
    ),
    Facebook: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="8" fill="#1877F2" />
        <path d="M21 11H23.5V8H21C18.8 8 17 9.8 17 12V14H14.5V17H17V28H20V17H22.5L23.5 14H20V12C20 11.4 20.4 11 21 11Z" fill="white" />
      </svg>
    ),
  };
  return icons[platform] ?? (
    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: color }}>
      {platform[0]}
    </div>
  );
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Media", href: "#recordings" },
  { label: "Awards & Honours", href: "#awards" },
  { label: "Diplomas", href: "#diplomas" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    const onResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // The white sections cover the nav when scrollY reaches windowHeight.
  // Transition happens in the last 240px of that journey so it's smooth and cinematic.
  const TRANSITION_RANGE = 240;
  const transitionStart = windowHeight - TRANSITION_RANGE;
  const scrollProgress = Math.min(Math.max((scrollY - transitionStart) / TRANSITION_RANGE, 0), 1);

  // onDark (Hero): progress = 0 → white text, no bg
  // onLight (sections): progress = 1 → dark text, white frosted bg
  const onDark = scrollProgress < 0.5;
  const textColor      = onDark ? `rgba(250,250,249,${0.9 - scrollProgress * 0.4})` : `rgba(20,20,20,${scrollProgress})`;
  const mutedColor     = onDark ? `rgba(250,250,249,${0.55 - scrollProgress * 0.2})` : `rgba(107,104,99,${scrollProgress})`;
  const activeColor    = onDark ? "#FAFAF9" : "#1C3557";
  const hamburgerColor = onDark ? `rgba(250,250,249,${0.9})` : "#141414";

  // Active section tracker — works in both scroll directions.
  // A section becomes active when its top edge crosses within 100px of the viewport top
  // (just below the nav). Using getBoundingClientRect for accurate viewport position
  // regardless of sticky/z-index wrapper contexts.
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));

    let rafId: number;
    const update = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const cutoff = 100; // px from viewport top — just below the 68px nav
        let current = "";
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= cutoff) current = id;
        }
        setActiveSection(current);
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const initials = personal.firstName ? personal.firstName[0] : personal.name[0];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: `rgba(250,250,249,${scrollProgress * 0.96})`,
          backdropFilter: scrollProgress > 0.05 ? `blur(${scrollProgress * 14}px)` : "none",
          borderBottom: `1px solid rgba(226,224,220,${scrollProgress})`,
          transition: "background-color 300ms ease, border-color 300ms ease",
        }}
      >
        <nav
          className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between"
          style={{ height: "68px" }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#about"
            className="flex items-center gap-3 group"
            aria-label={`${personal.name} — home`}
          >
            <div
              className="w-8 h-8 flex items-center justify-center font-serif font-bold text-sm"
              style={{ backgroundColor: "#1C3557", color: "#FAFAF9", borderRadius: "2px" }}
            >
              {initials}
            </div>
            <span
              className="hidden sm:block font-serif font-semibold"
              style={{
                fontSize: "0.9375rem",
                color: textColor,
                letterSpacing: "0.01em",
                transition: "color 300ms ease",
              }}
            >
              {personal.name}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs tracking-wider uppercase"
                  style={{
                    color: isActive ? activeColor : mutedColor,
                    letterSpacing: "0.1em",
                    fontWeight: isActive ? 500 : 400,
                    borderBottom: isActive
                      ? `1px solid ${activeColor}`
                      : "1px solid transparent",
                    paddingBottom: "2px",
                    transition: "color 300ms ease, border-color 300ms ease",
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Social icons (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {personal.social.slice(0, 3).map((s) => (
              <SocialIconLink key={s.platform} social={s} />
            ))}
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {[
              menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              null,
              menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            ].map((transform, i) =>
              transform === null ? (
                <span
                  key={i}
                  className="block w-6 transition-all duration-300"
                  style={{ height: "2px", backgroundColor: hamburgerColor, opacity: menuOpen ? 0 : 1, transition: "background-color 300ms ease, opacity 300ms ease" }}
                />
              ) : (
                <span
                  key={i}
                  className="block w-6 transition-all duration-300"
                  style={{ height: "2px", backgroundColor: hamburgerColor, transformOrigin: "center", transform, transition: "background-color 300ms ease, transform 300ms ease" }}
                />
              )
            )}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{ pointerEvents: menuOpen ? "auto" : "none", opacity: menuOpen ? 1 : 0, transition: "opacity 300ms ease" }}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(20,20,20,0.4)" }}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className="absolute top-[68px] left-0 right-0 transition-transform duration-300"
          style={{
            backgroundColor: "#FAFAF9",
            borderBottom: "1px solid #E2E0DC",
            transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          }}
        >
          <nav className="px-6 py-6 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-sm tracking-widest uppercase py-3 border-b"
                style={{ color: "#141414", borderColor: "#E2E0DC", letterSpacing: "0.12em" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-5 pt-5 pb-2">
              {personal.social.slice(0, 3).map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.platform}: ${s.handle}`}
                  className="flex flex-col items-center gap-1.5 transition-opacity duration-200 active:opacity-60"
                >
                  <SocialIconLarge platform={s.platform} color={s.color} />
                  <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "#6B6863" }}>
                    {s.platform}
                  </span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
