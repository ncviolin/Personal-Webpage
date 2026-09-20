import { useState, useEffect, useRef, useCallback } from "react";
import type { Recording } from "../../data/recordings";

// Extend window for YouTube IFrame API
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
    _ytApiCallbacks: Array<() => void>;
  }
}

function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT?.Player) { resolve(); return; }
    window._ytApiCallbacks = window._ytApiCallbacks ?? [];
    window._ytApiCallbacks.push(resolve);
    if (!document.getElementById("yt-iframe-api")) {
      const script = document.createElement("script");
      script.id = "yt-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
      window.onYouTubeIframeAPIReady = () => {
        (window._ytApiCallbacks ?? []).forEach((cb) => cb());
        window._ytApiCallbacks = [];
      };
    }
  });
}

function getVideoId(youtubeUrl: string): string {
  try { return new URL(youtubeUrl).searchParams.get("v") ?? ""; }
  catch { return ""; }
}

function getStartSeconds(youtubeUrl: string): number {
  try {
    const t = new URL(youtubeUrl).searchParams.get("t") ?? "";
    return parseInt(t.replace(/s$/, ""), 10) || 0;
  } catch { return 0; }
}

// ── Modal ─────────────────────────────────────────────────────────────────────

interface ModalProps { recording: Recording; onClose: () => void; }

function VideoModal({ recording, onClose }: ModalProps) {
  const { composer, work, youtubeUrl } = recording;
  const videoId = getVideoId(youtubeUrl);
  const startSeconds = getStartSeconds(youtubeUrl);

  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const [embedBlocked, setEmbedBlocked] = useState(false);

  // Lock scroll, close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  // Initialize YouTube Player API for error detection
  useEffect(() => {
    if (!videoId || !containerRef.current) return;
    let destroyed = false;

    loadYouTubeAPI().then(() => {
      if (destroyed || !containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          start: startSeconds || undefined,
        } as YT.PlayerVars,
        events: {
          onError: (e: YT.OnErrorEvent) => {
            // 100 = video not found, 101/150 = embedding not allowed, 5 = HTML5 error
            if ([100, 101, 150, 153].includes(e.data as number) && !destroyed) {
              setEmbedBlocked(true);
            }
          },
        },
      });
    });

    return () => {
      destroyed = true;
      try { playerRef.current?.destroy(); } catch { /* ignore */ }
    };
  }, [videoId, startSeconds]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: "rgba(10,10,10,0.92)" }}
      onClick={onClose}
    >
      <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 font-mono text-xs uppercase tracking-widest transition-opacity duration-200 hover:opacity-60"
          style={{ color: "rgba(250,250,249,0.65)", letterSpacing: "0.12em" }}
          aria-label="Close"
        >
          Close ✕
        </button>

        {/* Player area */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "16/9", backgroundColor: "#0a0a0a", borderRadius: "3px" }}
        >
          {embedBlocked ? (
            /* Embedding blocked — clean fallback */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8 text-center">
              <div>
                <p
                  className="font-mono text-xs uppercase mb-3"
                  style={{ color: "var(--color-accent)", letterSpacing: "0.2em" }}
                >
                  {composer}
                </p>
                <p
                  className="font-serif mb-2"
                  style={{ fontSize: "1.125rem", fontWeight: 600, color: "rgba(250,250,249,0.9)" }}
                >
                  {work}
                </p>
                <p
                  className="font-mono text-xs"
                  style={{ color: "rgba(250,250,249,0.35)", letterSpacing: "0.05em" }}
                >
                  This video cannot be embedded — watch it directly on YouTube.
                </p>
              </div>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 font-mono text-xs uppercase transition-opacity duration-200 hover:opacity-80"
                style={{
                  backgroundColor: "#FF0000",
                  color: "#fff",
                  borderRadius: "2px",
                  letterSpacing: "0.12em",
                }}
              >
                {/* using inline SVG: YouTube brand icon */}
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true">
                  <path d="M15.66 1.72A2 2 0 0 0 14.26.3C13 0 8 0 8 0S3 0 1.74.3A2 2 0 0 0 .34 1.72C0 3 0 5.5 0 5.5s0 2.5.34 3.78a2 2 0 0 0 1.4 1.42C3 11 8 11 8 11s5 0 6.26-.3a2 2 0 0 0 1.4-1.42C16 8 16 5.5 16 5.5s0-2.5-.34-3.78ZM6.4 7.86V3.14L10.55 5.5 6.4 7.86Z" fill="white"/>
                </svg>
                Watch on YouTube
              </a>
            </div>
          ) : (
            /* YouTube Player API mounts here */
            <div ref={containerRef} className="absolute inset-0 w-full h-full" />
          )}
        </div>

        {/* Footer */}
        {!embedBlocked && (
          <div className="flex items-center justify-between mt-4 px-1">
            <div className="min-w-0 mr-6">
              <p className="font-mono text-xs mb-0.5" style={{ color: "rgba(250,250,249,0.4)", letterSpacing: "0.06em" }}>{composer}</p>
              <p className="font-serif truncate" style={{ fontSize: "0.9375rem", fontWeight: 600, color: "rgba(250,250,249,0.88)" }}>{work}</p>
            </div>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs uppercase shrink-0 transition-opacity duration-200 hover:opacity-80"
              style={{ backgroundColor: "#FF0000", color: "#fff", borderRadius: "2px", letterSpacing: "0.1em" }}
            >
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M13.7 1.56A1.76 1.76 0 0 0 12.46.3C11.37 0 7 0 7 0S2.63 0 1.54.3A1.76 1.76 0 0 0 .3 1.56C0 2.66 0 5 0 5s0 2.34.3 3.44A1.76 1.76 0 0 0 1.54 9.7C2.63 10 7 10 7 10s4.37 0 5.46-.3a1.76 1.76 0 0 0 1.24-1.26C14 7.34 14 5 14 5s0-2.34-.3-3.44ZM5.6 7.14V2.86L9.24 5 5.6 7.14Z" fill="white"/>
              </svg>
              Watch on YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

export function RecordingCard({ recording, dark = false }: RecordingCardProps) {
  const { composer, work, movement, ensemble, conductor, year, thumbnailUrl, youtubeUrl } = recording;
  const [modalOpen, setModalOpen] = useState(false);

  const textPrimary = dark ? "rgba(250,250,249,0.90)" : "var(--color-foreground)";
  const textMuted   = dark ? "rgba(250,250,249,0.42)" : "var(--color-muted-foreground)";

  return (
    <>
      {modalOpen && <VideoModal recording={recording} onClose={() => setModalOpen(false)} />}

      <div style={{ borderRadius: "3px" }}>
        {/* Thumbnail */}
        <button
          onClick={() => setModalOpen(true)}
          className="group/btn relative w-full overflow-hidden mb-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2"
          style={{ aspectRatio: "16/9", backgroundColor: "#0a0a0a", borderRadius: "2px", display: "block" }}
          aria-label={`Play ${composer} — ${work}`}
        >
          <img
            src={thumbnailUrl}
            alt={`${composer} — ${work}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/btn:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover/btn:opacity-100" style={{ backgroundColor: "rgba(0,0,0,0.22)" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 flex items-center justify-center transition-all duration-300 group-hover/btn:scale-110"
              style={{ backgroundColor: "rgba(20,20,20,0.78)", borderRadius: "50%" }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M8 5.5L17.5 11L8 16.5V5.5Z" fill="#FAFAF9" />
              </svg>
            </div>
          </div>
          <span
            className="absolute top-2 right-2 font-mono text-xs px-2 py-0.5"
            style={{ backgroundColor: "#FF0000", color: "#fff", borderRadius: "2px", fontSize: "0.65rem", letterSpacing: "0.06em" }}
          >
            YouTube
          </span>
        </button>

        {/* Metadata */}
        <div>
          <p className="font-mono text-xs mb-1" style={{ color: textMuted, letterSpacing: "0.06em" }}>
            {composer} · {year}
          </p>
          <h3 className="font-serif leading-snug mb-1" style={{ fontSize: "1rem", fontWeight: 600, color: textPrimary }}>
            {work}
          </h3>
          {movement && <p className="text-sm italic mb-1" style={{ color: textMuted }}>{movement}</p>}
          {(ensemble || conductor) && (
            <p className="text-sm mb-2" style={{ color: textMuted }}>
              {conductor ? `Cond. ${conductor}` : ""}{conductor && ensemble ? " · " : ""}{ensemble ?? ""}
            </p>
          )}
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs hover:opacity-70 transition-opacity duration-200"
            style={{ color: "var(--color-accent)", letterSpacing: "0.06em" }}
          >
            Open on YouTube ↗
          </a>
        </div>
      </div>
    </>
  );
}

interface RecordingCardProps {
  recording: Recording;
  dark?: boolean;
}
