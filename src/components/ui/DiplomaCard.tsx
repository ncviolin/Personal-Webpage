import type { Diploma } from "../../data/diplomas";

export function DiplomaCard({
  diploma,
  onClick,
}: {
  diploma: Diploma;
  onClick: () => void;
}) {
  const hasThumbnail = !!diploma.imageUrl;

  return (
    <button
      className="group text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C3557]"
      onClick={onClick}
      aria-label={`View ${diploma.title} from ${diploma.institution}`}
    >
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden mb-4"
        style={{
          aspectRatio: "4/3",
          borderRadius: "3px",
          border: "1px solid #E2E0DC",
          backgroundColor: "#F4F3F0",
        }}
      >
        {hasThumbnail ? (
          <img
            src={diploma.imageUrl}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <rect x="6" y="8" width="36" height="32" rx="2" stroke="#C8C5BF" strokeWidth="1.5" fill="none" />
              <path d="M14 18h20M14 24h20M14 30h12" stroke="#C8C5BF" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M30 28l4 4 6-7" stroke="#B8965A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: "rgba(28,53,87,0.72)" }}
          aria-hidden="true"
        >
          <span
            className="font-mono text-xs tracking-widest"
            style={{ color: "#FAFAF9", letterSpacing: "0.15em" }}
          >
            VIEW
          </span>
        </div>
      </div>

      {/* Meta */}
      <p
        className="font-mono text-xs mb-1.5"
        style={{ color: "#B8965A", letterSpacing: "0.1em" }}
      >
        {diploma.date}
      </p>
      <p
        className="font-serif font-semibold leading-snug mb-1 transition-colors duration-200 group-hover:text-[#1C3557]"
        style={{ fontSize: "1rem", color: "#141414" }}
      >
        {diploma.title}
      </p>
      <p className="text-sm leading-snug" style={{ color: "#6B6863" }}>
        {diploma.institution}
      </p>
    </button>
  );
}
