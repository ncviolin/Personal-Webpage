import type { PressItem as PressItemType } from "../../data/press";

const typeLabels: Record<string, string> = {
  review: "Review",
  interview: "Interview",
  feature: "Feature",
  radio: "Radio",
  tv: "Television",
};

interface PressItemProps {
  item: PressItemType;
}

export function PressItem({ item }: PressItemProps) {
  const { title, type, publication, date, url, quote } = item;

  return (
    <div className="py-6 border-b" style={{ borderColor: "#E2E0DC" }}>
      <div className="flex items-start gap-4 mb-2 flex-wrap">
        <span
          className="font-mono text-xs px-2 py-0.5 shrink-0"
          style={{
            backgroundColor: "#F0EFED",
            color: "#6B6863",
            borderRadius: "2px",
            letterSpacing: "0.06em",
          }}
        >
          {typeLabels[type] ?? type}
        </span>
        <span className="font-mono text-xs" style={{ color: "#B8965A", letterSpacing: "0.04em", paddingTop: "2px" }}>
          {publication} · {date}
        </span>
      </div>

      {quote && (
        <blockquote
          className="font-serif italic mb-2 leading-relaxed"
          style={{ fontSize: "1.0625rem", color: "#141414" }}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
      )}

      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium transition-colors duration-200 hover:underline"
          style={{ color: "#1C3557" }}
          aria-label={`Read: ${title}`}
        >
          {title} →
        </a>
      ) : (
        <p className="text-sm font-medium" style={{ color: "#3A3A3A" }}>
          {title}
        </p>
      )}
    </div>
  );
}
