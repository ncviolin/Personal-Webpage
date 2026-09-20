import type { Award } from "../../data/awards";

interface AchievementItemProps {
  award: Award;
}

export function AchievementItem({ award }: AchievementItemProps) {
  return (
    <div
      className="flex gap-6 py-6 border-b"
      style={{ borderColor: "#E2E0DC" }}
    >
      {/* Date */}
      <div className="font-mono shrink-0 pt-0.5 w-16">
        <span className="block text-sm" style={{ color: "var(--color-accent)", fontWeight: 500 }}>
          {award.year}
        </span>
        {award.month && (
          <span className="block text-xs" style={{ color: "var(--color-muted-foreground)", letterSpacing: "0.04em" }}>
            {award.month}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-serif font-semibold leading-snug mb-0.5"
          style={{ fontSize: "1.0625rem", color: "#141414" }}
        >
          {award.title}
        </h3>
        <p className="font-mono text-xs mb-2" style={{ color: "#6B6863", letterSpacing: "0.04em" }}>
          {award.organization}
        </p>
        {award.description && (
          <p className="text-sm leading-relaxed" style={{ color: "#3A3A3A" }}>
            {award.description}
          </p>
        )}
      </div>
    </div>
  );
}
