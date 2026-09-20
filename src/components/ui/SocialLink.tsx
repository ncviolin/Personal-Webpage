import { useId } from "react";
import type { Social } from "../../data/personal";

interface SocialLinkProps {
  social: Social;
  variant?: "card" | "icon";
}

function YouTubeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="6" fill="#FF0000" />
      <path d="M21.5 10.5C21.3 9.7 20.7 9.1 19.9 8.9C18.5 8.5 14 8.5 14 8.5C14 8.5 9.5 8.5 8.1 8.9C7.3 9.1 6.7 9.7 6.5 10.5C6.1 11.9 6.1 14 6.1 14C6.1 14 6.1 16.1 6.5 17.5C6.7 18.3 7.3 18.9 8.1 19.1C9.5 19.5 14 19.5 14 19.5C14 19.5 18.5 19.5 19.9 19.1C20.7 18.9 21.3 18.3 21.5 17.5C21.9 16.1 21.9 14 21.9 14C21.9 14 21.9 11.9 21.5 10.5Z" fill="white" />
      <path d="M12.2 16.5L16.8 14L12.2 11.5V16.5Z" fill="#FF0000" />
    </svg>
  );
}

function InstagramIcon({ gradientId }: { gradientId: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="28" x2="28" y2="0">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#FCAF45" />
          <stop offset="50%" stopColor="#F77737" />
          <stop offset="75%" stopColor="#F56040" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <rect width="28" height="28" rx="6" fill={`url(#${gradientId})`} />
      <rect x="8" y="8" width="12" height="12" rx="3.5" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="14" cy="14" r="3" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="18.2" cy="9.8" r="1" fill="white" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="6" fill="#1877F2" />
      <path d="M16.5 9H18V6.5H15.5C13.8 6.5 12.5 7.8 12.5 9.5V11H10.5V13.5H12.5V21.5H15V13.5H17L17.5 11H15V9.5C15 9.2 15.2 9 15.5 9H16.5Z" fill="white" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="6" fill="#1DB954" />
      <circle cx="14" cy="14" r="8" fill="#1DB954" />
      <path d="M10 16.5C12.5 15.5 15.5 15.5 18 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 13.5C12 12 16 12 19 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 10.5C12.5 9 15.5 9 18.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlatformIcon({ platform, gradientId }: { platform: string; gradientId: string }) {
  switch (platform) {
    case "YouTube": return <YouTubeIcon />;
    case "Instagram": return <InstagramIcon gradientId={gradientId} />;
    case "Facebook": return <FacebookIcon />;
    case "Spotify": return <SpotifyIcon />;
    default: return (
      <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold"
        style={{ backgroundColor: "#1C3557" }}>
        {platform[0]}
      </div>
    );
  }
}

export function SocialLinkCard({ social }: { social: Social }) {
  const uid = useId();
  const gradientId = `ig-grad-${uid.replace(/:/g, "")}`;
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-5 p-8 border transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: "#E2E0DC",
        backgroundColor: "#FAFAF9",
        borderRadius: "3px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
      aria-label={`Follow on ${social.platform}: ${social.handle}`}
    >
      <PlatformIcon platform={social.platform} gradientId={gradientId} />
      <div className="flex-1">
        <p
          className="font-mono text-xs mb-1 uppercase tracking-widest"
          style={{ color: "#6B6863" }}
        >
          {social.platform}
        </p>
        <p
          className="font-serif font-semibold mb-2 transition-colors duration-200 group-hover:text-[#1C3557]"
          style={{ fontSize: "1.0625rem", color: "#141414" }}
        >
          {social.handle}
        </p>
        <p className="text-sm" style={{ color: "#6B6863" }}>
          {social.label}
        </p>
      </div>
      <span
        className="font-mono text-xs font-medium tracking-wider self-start transition-colors duration-200 group-hover:text-[#1C3557]"
        style={{ color: "#B8965A" }}
      >
        Follow →
      </span>
    </a>
  );
}

export function SocialIconLink({ social }: { social: Social }) {
  const uid = useId();
  const gradientId = `ig-grad-${uid.replace(/:/g, "")}`;
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${social.platform}: ${social.handle}`}
      className="transition-opacity duration-200 hover:opacity-70"
    >
      <PlatformIcon platform={social.platform} gradientId={gradientId} />
    </a>
  );
}

export function SocialLink({ social, variant = "icon" }: SocialLinkProps) {
  return variant === "card" ? <SocialLinkCard social={social} /> : <SocialIconLink social={social} />;
}
