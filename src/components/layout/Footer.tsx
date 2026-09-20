import { personal } from "../../data/personal";
import { SocialIconLink } from "../ui/SocialLink";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-0"
      style={{ borderColor: "#E2E0DC", backgroundColor: "#FAFAF9" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="font-mono text-xs text-center sm:text-left"
          style={{ color: "#6B6863", letterSpacing: "0.04em" }}
        >
          © {year} {personal.name} · All rights reserved
        </p>

        <div className="flex items-center gap-4">
          {personal.social.map((s) => (
            <SocialIconLink key={s.platform} social={s} />
          ))}
        </div>
      </div>
    </footer>
  );
}
