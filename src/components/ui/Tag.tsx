interface TagProps {
  children: React.ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <span
      className="inline-block font-mono text-xs px-3 py-1 border transition-colors duration-200"
      style={{
        borderColor: "#E2E0DC",
        color: "#6B6863",
        borderRadius: "2px",
        letterSpacing: "0.04em",
      }}
    >
      {children}
    </span>
  );
}
