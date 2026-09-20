import { useEffect, useRef, useState } from "react";
import { recordings } from "../../data/recordings";
import { personal } from "../../data/personal";
import { RecordingCard } from "../ui/RecordingCard";
import mediaBg from "../../imports/media-bg.jpg"; // full-res for all layouts

// ─── Shared data ─────────────────────────────────────────────────────────────

function useYouTubeChannel() {
  return personal.social.find((s) => s.platform === "YouTube");
}

// ─── Desktop layout ──────────────────────────────────────────────────────────
// Sticky full-bleed photo, dark right panel floats on top, user scrolls through cards.

function DesktopMedia() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const [entered, setEntered] = useState(false);
  const youtubeChannel = useYouTubeChannel();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setEntered(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
        bg.style.transform = `scale(1.08) translateY(${Math.max(-0.2, Math.min(1, progress)) * 32}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="recordings"
      aria-labelledby="media-heading-desktop"
      style={{ position: "relative" }}
    >
      {/* Sticky background — height:0 so it doesn't push content */}
      <div style={{ position: "sticky", top: 0, height: 0, overflow: "visible", zIndex: 0 }}>
        <div style={{ position: "relative", height: "100vh", width: "100%" }}>
          <img
            ref={bgRef}
            src={mediaBg}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 30%",
              transform: "scale(1.08)", willChange: "transform",
              opacity: entered ? 1 : 0,
              transition: "opacity 1.2s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
          {/* Fade to black on right */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              background: [
                "linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.15) 38%, rgba(5,5,5,0.96) 68%, rgb(5,5,5) 100%)",
                "linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, transparent 15%, transparent 80%, rgba(5,5,5,0.6) 100%)",
              ].join(", "),
            }}
          />
          {/* "Media" heading bottom-left */}
          <div
            style={{
              position: "absolute", bottom: "3rem", left: "3rem", zIndex: 2,
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s",
              pointerEvents: "none",
            }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "0.5rem" }}>
              Listen &amp; Watch
            </p>
            <h2 id="media-heading-desktop" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(3rem, 5vw, 4.5rem)", lineHeight: 1.0, color: "#FAFAF9", letterSpacing: "-0.02em" }}>
              Media
            </h2>
          </div>
        </div>
      </div>

      {/* Content layer */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", minHeight: "100vh" }}>
        {/* Left: transparent — photo shows through */}
        <div style={{ flex: 1 }} />
        {/* Right: dark scrollable panel */}
        <div style={{
          width: "min(480px, 100%)", flexShrink: 0,
          backgroundColor: "rgb(5,5,5)",
          display: "flex", flexDirection: "column",
          paddingTop: "7rem", paddingBottom: "5rem",
          paddingLeft: "2.5rem", paddingRight: "2.5rem",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {recordings.map((rec, i) => (
              <div key={rec.id} style={{
                paddingBottom: "2.5rem", marginBottom: "2.5rem",
                borderBottom: i < recordings.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                opacity: entered ? 1 : 0,
                transform: entered ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${400 + i * 130}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${400 + i * 130}ms`,
              }}>
                <RecordingCard recording={rec} dark />
              </div>
            ))}
          </div>
          {youtubeChannel && (
            <div style={{ marginTop: "0.5rem", opacity: entered ? 1 : 0, transition: `opacity 0.7s ease ${400 + recordings.length * 130 + 100}ms` }}>
              <a href={youtubeChannel.url} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", transition: "opacity 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.6")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                <svg width="13" height="9" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                  <path d="M13.7 1.56A1.76 1.76 0 0 0 12.46.3C11.37 0 7 0 7 0S2.63 0 1.54.3A1.76 1.76 0 0 0 .3 1.56C0 2.66 0 5 0 5s0 2.34.3 3.44A1.76 1.76 0 0 0 1.54 9.7C2.63 10 7 10 7 10s4.37 0 5.46-.3a1.76 1.76 0 0 0 1.24-1.26C14 7.34 14 5 14 5s0-2.34-.3-3.44ZM5.6 7.14V2.86L9.24 5 5.6 7.14Z" fill="currentColor"/>
                </svg>
                View full channel →
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Mobile layout ────────────────────────────────────────────────────────────
// Phase 1: photo fills screen (user scrolls through intro space).
// Phase 2: fixed panel slides in HORIZONTALLY from the right edge of the screen.
// Phase 3: page scroll drives panel inner scroll — user scrolls through all recordings.
// Phase 4: section ends, next section appears.
//
// The panel is position:fixed so it always enters from the true right edge of the
// viewport — no bottom-right diagonal drift.

const INTRO_SCROLL = 0.15;  // fraction of vh before slide begins
const SLIDE_SCROLL = 0.40;  // fraction of vh over which slide completes

function MobileMedia() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const panelRef      = useRef<HTMLDivElement>(null);   // slides in from right (inside sticky clip)
  const panelInnerRef = useRef<HTMLDivElement>(null);   // inner scroll driven by page scroll
  const hasScrolledInRef = useRef(false); // true once section top has entered the viewport
  const [photoEntered, setPhotoEntered] = useState(false);
  const youtubeChannel = useYouTubeChannel();

  // Photo fade-in on section enter
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setPhotoEntered(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Scroll driver: slide panel in + sync inner content scroll with page scroll
  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const panel   = panelRef.current;
        const inner   = panelInnerRef.current;
        if (!section || !panel || !inner) return;

        const vh         = window.innerHeight;
        const sectionTop = section.getBoundingClientRect().top;
        const scrolledIn = -sectionTop;

        // Section fully below viewport — hide panel and reset entry tracking
        if (sectionTop > vh) {
          panel.style.transform = "translateX(100%)";
          inner.scrollTop = 0;
          hasScrolledInRef.current = false;
          return;
        }

        // Section top has entered the viewport — mark as entered
        if (scrolledIn >= 0) hasScrolledInRef.current = true;

        // scrolledIn < 0 means section top is still below viewport top.
        // If we've already scrolled through the section (scrolling back up), keep panel visible.
        // If we're arriving fresh from above (scrolling down), keep panel hidden.
        if (scrolledIn < 0) {
          panel.style.transform = hasScrolledInRef.current ? "translateX(0%)" : "translateX(100%)";
          inner.scrollTop = 0;
          return;
        }

        const slideStart = vh * INTRO_SCROLL;
        const slideEnd   = vh * (INTRO_SCROLL + SLIDE_SCROLL);

        // Slide IN from right (pure horizontal)
        const slideRaw = Math.min(Math.max((scrolledIn - slideStart) / (slideEnd - slideStart), 0), 1);
        const eased    = 1 - Math.pow(1 - slideRaw, 3);
        panel.style.transform = `translateX(${(1 - eased) * 100}%)`;

        // Page scroll drives the recording list inside the panel
        inner.scrollTop = Math.max(scrolledIn - slideEnd, 0);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="recordings"
      aria-labelledby="media-heading-mobile"
      style={{
        position: "relative",
        minHeight: `calc(${INTRO_SCROLL + SLIDE_SCROLL}* 100vh + 900px)`,
      }}
    >
      {/* Layer 1: sticky photo — sits behind everything */}
      <div style={{ position: "sticky", top: 0, height: 0, overflow: "visible", zIndex: 0 }}>
        <div style={{ position: "relative", height: "100vh", width: "100%", backgroundColor: "#0d0d0d" }}>
          <img
            src={mediaBg}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "18% center",
              opacity: photoEntered ? 1 : 0,
              transition: "opacity 1.2s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.10) 50%, rgba(0,0,0,0.55) 100%)" }} />
          <div style={{
            position: "absolute", bottom: "2.5rem", left: "1.5rem",
            opacity: photoEntered ? 1 : 0,
            transform: photoEntered ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.9s ease 0.4s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s",
          }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "0.4rem" }}>
              Listen &amp; Watch
            </p>
            <h2 id="media-heading-mobile" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(2.25rem, 8vw, 3rem)", lineHeight: 1.0, color: "#FAFAF9", letterSpacing: "-0.02em" }}>
              Media
            </h2>
          </div>
        </div>
      </div>

      {/*
        Layer 2: sticky clip-wrapper.
        - position:sticky keeps it pinned at the top while section scrolls.
        - overflow:hidden clips the panel when it's translateX(100%) off-screen.
        - When the section ends and scrolls past the viewport, this wrapper
          scrolls away naturally — the next section slides up from below with
          no jump, no fixed-element fighting.
      */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        zIndex: 2,
        pointerEvents: "none",
      }}>
        {/* Panel — slides in from right, driven by JS translateX */}
        <div
          ref={panelRef}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgb(5,5,5)",
            transform: "translateX(100%)",
            willChange: "transform",
            overflow: "hidden",
            pointerEvents: "auto",
          }}
        >
          <div
            ref={panelInnerRef}
            style={{ height: "100%", overflowY: "scroll", scrollbarWidth: "none" }}
          >
            {/* Heading */}
            <div style={{ padding: "3.5rem 1.5rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "0.35rem" }}>
                Listen &amp; Watch
              </p>
              <p style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.75rem", color: "#FAFAF9", letterSpacing: "-0.02em" }}>
                Media
              </p>
            </div>

            {/* Recording cards */}
            <div style={{ padding: "1.75rem 1.5rem", display: "flex", flexDirection: "column" }}>
              {recordings.map((rec, i) => (
                <div key={rec.id} style={{
                  paddingBottom: "2rem", marginBottom: "2rem",
                  borderBottom: i < recordings.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}>
                  <RecordingCard recording={rec} dark />
                </div>
              ))}
              {youtubeChannel && (
                <div style={{ paddingTop: "0.5rem", paddingBottom: "3rem" }}>
                  <a href={youtubeChannel.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                  >
                    <svg width="13" height="9" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                      <path d="M13.7 1.56A1.76 1.76 0 0 0 12.46.3C11.37 0 7 0 7 0S2.63 0 1.54.3A1.76 1.76 0 0 0 .3 1.56C0 2.66 0 5 0 5s0 2.34.3 3.44A1.76 1.76 0 0 0 1.54 9.7C2.63 10 7 10 7 10s4.37 0 5.46-.3a1.76 1.76 0 0 0 1.24-1.26C14 7.34 14 5 14 5s0-2.34-.3-3.44ZM5.6 7.14V2.86L9.24 5 5.6 7.14Z" fill="currentColor"/>
                    </svg>
                    View full channel →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Exported component — picks layout based on screen width ─────────────────

export function Recordings() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile ? <MobileMedia /> : <DesktopMedia />;
}
