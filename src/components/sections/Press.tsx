import { SectionHeader } from "../ui/SectionHeader";

export function Press() {
  return (
    <section
      id="press"
      className="py-24 md:py-32 px-6 md:px-10"
      style={{ backgroundColor: "#FAFAF9" }}
      aria-labelledby="press-heading"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="In the Media"
          heading="Press &amp; Publications"
        />

        <div
          className="flex flex-col items-center justify-center text-center py-20 border"
          style={{
            borderColor: "#E2E0DC",
            borderRadius: "3px",
            backgroundColor: "#F4F3F0",
          }}
        >
          {/* Decorative icon */}
          <div className="mb-6" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="6" y="10" width="28" height="22" rx="2" stroke="#B8B5AF" strokeWidth="1.5" fill="none" />
              <path d="M12 16h16M12 21h16M12 26h8" stroke="#B8B5AF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p
            className="font-serif italic mb-2"
            style={{ fontSize: "1.125rem", color: "#3A3A3A", maxWidth: "420px" }}
          >
            No articles have been published yet.
          </p>
          <p
            className="font-mono text-xs tracking-wider"
            style={{ color: "#B8B5AF", letterSpacing: "0.08em" }}
          >
            Please check back soon.
          </p>
        </div>
      </div>
    </section>
  );
}
