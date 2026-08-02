const TICKER_LINES = [
  "ATLAS CORP // EXTRACTION PROTOCOL ACTIVE",
  "PAYLOAD INTEGRITY UNVERIFIED",
  "SIX FACTIONS // ONE SHUTTLE",
  "HELIUM-3 RODS SEALED BEHIND CLASS-3 BULKHEADS",
  "DEFENSE DRONES ARMED // PROCEED WITH CAUTION",
  "ONLY THE TEAM WITH THE PAYLOAD LEAVES THE STATION",
];

/**
 * Scrolling in-fiction telemetry ticker. Two identical tracks are rendered
 * side-by-side and the container is translated -50% for a seamless loop.
 * Pure CSS animation (paused on hover), no JS cost.
 */
export function Ticker() {
  return (
    <div
      className="relative z-10 border-y border-white/[0.06] bg-steel/50 backdrop-blur-sm overflow-hidden"
      aria-hidden
    >
      <div className="ticker-track">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center">
            {TICKER_LINES.map((t, i) => (
              <li
                key={i}
                className="flex items-center font-mono text-[0.625rem] font-medium tracking-[0.22em] uppercase text-cold/70"
              >
                <span className="px-6 py-3 whitespace-nowrap">{t}</span>
                <span className="size-1 rotate-45 bg-accent/60" />
              </li>
            ))}
          </ul>
        ))}
      </div>
      {/* edge fades so text dissolves into the section edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-void to-transparent" />
    </div>
  );
}
