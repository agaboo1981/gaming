import { Gamepad2, Globe, Monitor } from "lucide-react";

const platforms = [
  { name: "Steam", note: "Wishlist", icon: Globe },
  { name: "Epic Games", note: "Wishlist", icon: Globe },
  { name: "PlayStation 5", note: "TBA", icon: Gamepad2 },
  { name: "Xbox Series X|S", note: "TBA", icon: Gamepad2 },
  { name: "PC", note: "Wishlist", icon: Monitor },
];

/**
 * Platform availability row — the multi-store/multi-console signal every
 * top game site (Apex, Elden Ring, Overwatch) leads with. TBA/Wishlist
 * labels keep it honest for a fictional title.
 */
export function PlatformBar() {
  return (
    <div className="mt-14">
      <div className="flex items-center gap-3 mb-5 font-mono text-[0.625rem] tracking-[0.2em] uppercase text-cold">
        <span className="text-accent">Available On</span>
        <span className="w-6 h-px bg-accent/40" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-white/[0.08] border border-white/[0.08]">
        {platforms.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.name}
              className="group flex items-center justify-between gap-2 min-h-[58px] bg-steel/80 px-4 py-4 hover:bg-steel transition-colors"
            >
              <span className="flex items-center gap-2.5 font-display text-sm text-bone group-hover:text-white transition-colors">
                <Icon className="size-4 text-cold/60 group-hover:text-accent transition-colors" />
                {p.name}
              </span>
              <span className="text-micro text-accent/80 whitespace-nowrap">{p.note}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
