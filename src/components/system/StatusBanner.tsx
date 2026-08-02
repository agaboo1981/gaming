import { Play } from "lucide-react";
import { LiveDot } from "../ui/LiveDot";

interface StatusBannerProps {
  onTrailer: () => void;
}

/**
 * Persistent "season live" transmission bar — the same status hook every
 * top game site (Valorant, Apex, Overwatch) leads with.
 */
export function StatusBanner({ onTrailer }: StatusBannerProps) {
  return (
    <section className="relative z-10 border-y border-accent/[0.18] bg-gradient-to-r from-steel via-haze to-steel overflow-hidden">
      <div className="absolute inset-0 grid-blueprint opacity-[0.08] pointer-events-none" />
      <div className="container-wide px-[clamp(1.25rem,4vw,4.5rem)] py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3 font-mono text-[0.625rem] sm:text-xs tracking-[0.2em] uppercase">
          <LiveDot />
          <span className="text-accent text-glow-accent">Season 01 — Salvage Protocol</span>
          <span className="hidden sm:inline-block w-px h-3 bg-white/15" />
          <span className="hidden sm:inline text-cold">Now Live</span>
        </div>
        <button
          onClick={onTrailer}
          className="btn-press group inline-flex items-center gap-2 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] px-4 py-2 text-void bg-accent clip-notch-sm hover:bg-accent-hot"
        >
          <Play className="size-3" fill="currentColor" />
          Watch Now
        </button>
      </div>
    </section>
  );
}
