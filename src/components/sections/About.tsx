import { useEffect, useRef } from "react";
import { personal } from "../../data/personal";
import aboutPhoto from "../../imports/DSC02763__1_-1.jpg";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child, i) => {
            const delay = Number(child.dataset.delay ?? i * 80);
            setTimeout(() => {
              child.style.opacity = "1";
              child.style.transform = "translateY(0) translateX(0)";
            }, delay);
          });
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

const REVEAL_BASE: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(28px)",
  transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
};

const REVEAL_RIGHT: React.CSSProperties = {
  opacity: 0,
  transform: "translateX(40px)",
  transition: "opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)",
};

export function About() {
  const sectionRef = useReveal(0.12);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="about"
      className="py-24 md:py-32 px-6 md:px-10"
      style={{ backgroundColor: "var(--color-background)" }}
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — biography text */}
          <div>
            <h2
              id="about-heading"
              data-reveal
              data-delay="0"
              className="font-serif leading-none mb-10"
              style={{
                ...REVEAL_BASE,
                fontSize: "clamp(3.5rem, 7vw, 6rem)",
                fontWeight: 600,
                color: "var(--color-foreground)",
                letterSpacing: "-0.02em",
              }}
            >
              Biography
            </h2>

            <div className="space-y-5 mb-10">
              {personal.bio.map((paragraph, i) => (
                <p
                  key={i}
                  data-reveal
                  data-delay={120 + i * 100}
                  className="leading-relaxed"
                  style={{
                    ...REVEAL_BASE,
                    fontSize: "1.0625rem",
                    color: "var(--color-secondary-foreground)",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {personal.pullQuote && (
              <blockquote
                data-reveal
                data-delay={120 + personal.bio.length * 100 + 80}
                className="border-l-2 pl-6 py-2"
                style={{
                  ...REVEAL_BASE,
                  borderColor: "var(--color-accent)",
                }}
              >
                <p
                  className="font-serif italic leading-relaxed"
                  style={{ fontSize: "1.1875rem", color: "var(--color-foreground)" }}
                >
                  {personal.pullQuote}
                </p>
              </blockquote>
            )}
          </div>

          {/* Right — portrait photo */}
          <div
            data-reveal
            data-delay="200"
            className="overflow-hidden lg:sticky lg:top-24"
            style={{
              ...REVEAL_RIGHT,
              borderRadius: "3px",
            }}
          >
            <img
              src={aboutPhoto}
              alt={`${personal.name}, ${personal.instrument}`}
              className="w-full object-cover"
              style={{
                aspectRatio: "3/4",
                objectPosition: "center 20%",
                filter: "grayscale(10%)",
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
