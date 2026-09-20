interface SectionHeaderProps {
  label: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeader({ label, heading, description, align = "left", light = false }: SectionHeaderProps) {
  const textAlign = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 mb-14 ${textAlign}`}>
      <span
        className="font-mono text-xs font-medium tracking-[0.2em] uppercase"
        style={{ color: light ? "#B8965A" : "#B8965A" }}
      >
        {label}
      </span>
      <h2
        className="font-serif leading-tight"
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          color: light ? "#FAFAF9" : "#141414",
          fontWeight: 600,
        }}
      >
        {heading}
      </h2>
      {description && (
        <p
          className="max-w-xl leading-relaxed"
          style={{
            color: light ? "#D4D1CC" : "#6B6863",
            fontSize: "1.0625rem",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
