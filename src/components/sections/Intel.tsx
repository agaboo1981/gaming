import { motion } from "framer-motion";
import { ease } from "../../lib/utils";
import { ArrowRight } from "lucide-react";

const dispatches = [
  {
    date: "2084.11.23",
    cat: "Patch 0.4",
    title: "Sector Rotation Updated",
    body: "Refinery Core added to the live rotation pool. Respawn beacons retuned across Cryo-Vault 4. YARD-9 high-ground sightlines tightened.",
  },
  {
    date: "2084.11.12",
    cat: "Operative Drop",
    title: "Operative \u2018Forge\u2019 Cleared for Deployment",
    body: "Former station mechanic. Repair drone online. Salvage rights secured in exchange for keeping the faction armed.",
  },
  {
    date: "2084.10.30",
    cat: "Limited Event",
    title: "Double Extraction Weekend",
    body: "Helium-3 payouts doubled across all contested sectors. Extraction rate jumps to a claimed 41%. No second chances.",
  },
  {
    date: "2084.10.18",
    cat: "Patch 0.3",
    title: "Bullet Drop & Armor Rebalance",
    body: "Long-range falloff flattened. Kinetic Pulse duration steadied in ranked lobbies. Shields no longer regenerate on their own.",
  },
  {
    date: "2084.09.27",
    cat: "Devlog",
    title: "Designing the Payload Objective",
    body: "Why only the team carrying the rods boards the shuttle. A look inside the one-clock match loop that made the brief.",
  },
];

/**
 * News / dispatch feed — the dated update stream every top game site puts
 * front and centre so the property reads as live, not a static demo.
 */
export function Intel() {
  return (
    <section
      id="intel"
      className="relative section-pad overflow-hidden border-t border-white/[0.04] bg-void"
    >
      <div className="absolute inset-0 scanlines opacity-[0.05] pointer-events-none" />

      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: ease.outExpo }}
          className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-6 font-mono text-[0.625rem] tracking-[0.2em] uppercase">
              <span className="text-accent">01</span>
              <span className="w-8 h-px bg-accent/40" />
              <span className="text-cold">Intel</span>
            </div>
            <h2 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] text-white">
              Dispatch Feed
            </h2>
          </div>
          <a
            href="#deploy"
            className="hidden md:inline-flex items-center gap-2 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] px-5 py-3 border border-accent/35 text-accent clip-notch-sm hover:border-accent hover:bg-accent/8 transition-all"
          >
            View All Dispatches <ArrowRight className="size-3.5" />
          </a>
        </motion.div>

        {/* Feed */}
        <div className="border-t border-white/[0.06]">
          {dispatches.map((d, i) => (
            <motion.article
              key={d.date}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: ease.outExpo }}
              className="group grid grid-cols-1 md:grid-cols-[9rem_1fr] gap-2 md:gap-10 py-6 border-b border-white/[0.06] hover:bg-white/[0.015] transition-colors"
            >
              <div className="font-mono text-[0.6875rem] tracking-[0.14em] text-cold/70 pt-1.5">
                {d.date}
              </div>
              <div>
                <span className="chip">{d.cat}</span>
                <h3 className="font-display text-xl md:text-2xl text-white group-hover:text-accent transition-colors mt-3">
                  {d.title}
                </h3>
                <p className="mt-2 text-fog font-light leading-relaxed max-w-2xl">{d.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
