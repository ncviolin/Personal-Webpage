interface TimelineItemProps {
  period: string;
  title: string;
  subtitle: string;
  location?: string;
  description?: string;
  highlights?: string[];
  meta?: string[];
  isLast?: boolean;
}

export function TimelineItem({
  period,
  title,
  subtitle,
  location,
  description,
  highlights,
  meta,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="flex gap-8 md:gap-12">
      {/* Left: period + connector */}
      <div className="flex flex-col items-center shrink-0 w-28 md:w-36">
        <span
          className="font-mono text-xs leading-relaxed text-right w-full pt-1"
          style={{ color: "#6B6863", letterSpacing: "0.04em" }}
        >
          {period}
        </span>
        <div className="flex flex-col items-center mt-3 flex-1">
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: "#B8965A" }}
          />
          {!isLast && (
            <div className="w-px flex-1 mt-2" style={{ backgroundColor: "#E2E0DC" }} />
          )}
        </div>
      </div>

      {/* Right: content */}
      <div className="pb-12 flex-1 min-w-0">
        <h3
          className="font-serif font-semibold leading-snug mb-1"
          style={{ fontSize: "1.1875rem", color: "#141414" }}
        >
          {title}
        </h3>
        <p className="font-medium mb-1" style={{ color: "#1C3557", fontSize: "0.9375rem" }}>
          {subtitle}
        </p>
        {location && (
          <p className="font-mono text-xs mb-3" style={{ color: "#6B6863", letterSpacing: "0.04em" }}>
            {location}
          </p>
        )}
        {description && (
          <p className="leading-relaxed mb-3" style={{ color: "#3A3A3A", fontSize: "0.9375rem" }}>
            {description}
          </p>
        )}
        {highlights && highlights.length > 0 && (
          <ul className="space-y-1">
            {highlights.map((h, i) => (
              <li key={i} className="flex gap-2 items-start" style={{ color: "#3A3A3A", fontSize: "0.9375rem" }}>
                <span className="mt-2 shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: "#B8965A" }} />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        )}
        {meta && meta.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {meta.map((m) => (
              <span
                key={m}
                className="font-mono text-xs px-2 py-0.5 border"
                style={{ borderColor: "#E2E0DC", color: "#6B6863", borderRadius: "2px" }}
              >
                {m}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
