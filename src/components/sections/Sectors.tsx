import { motion } from "framer-motion";
import { ease } from "../../lib/utils";

const sectors = [
  {
    id: "STN-07",
    name: "Refinery Core",
    status: "Compromised",
    threat: "Critical",
    temp: "4,200°C",
    image: "/assets/images/sector-refinery.png",
    desc: "Primary helium-3 refinement. Unstable reactor. Tight corridors open into a multi-level atrium of fire and steel.",
  },
  {
    id: "CRYO-4",
    name: "Cryo-Vault 4",
    status: "Offline",
    threat: "High",
    temp: "−120°C",
    image: "/assets/images/sector-cryo.png",
    desc: "Deep-freeze storage for volatile compounds. Coolant fog. Long sightlines. Thermal optics required or you walk blind.",
  },
  {
    id: "YARD-9",
    name: "Shipbreaker Yard",
    status: "Contested",
    threat: "Severe",
    temp: "15°C",
    image: "/assets/images/hero.png",
    desc: "Orbital scrap of corporate cruisers. Vertical playground. Movement-heavy operatives own the high ground.",
  },
  {
    id: "HUB-1",
    name: "Logistics Hub",
    status: "Locked Down",
    threat: "Elevated",
    temp: "22°C",
    image: "/assets/images/cta-bg.png",
    desc: "Magnetic cargo rails rewrite the map mid-match. Fast, loud, and never the same corridor twice.",
  },
];

export function Sectors() {
  return (
    <section
      id="sectors"
      className="relative section-pad overflow-hidden border-t border-white/[0.04] bg-void"
    >
      <div className="container-wide relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: ease.outExpo }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6 font-mono text-[0.625rem] tracking-[0.2em] uppercase">
            <span className="text-accent">04</span>
            <span className="w-8 h-px bg-accent/40" />
            <span className="text-cold">Sectors</span>
          </div>
          <h2 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] text-white">
            Deployment Zones
          </h2>
        </motion.div>

        {/* Sector bands — immersive full-width cards */}
        <div className="flex flex-col gap-4">
          {sectors.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: ease.outExpo }}
              className="group relative min-h-[280px] md:min-h-[340px] overflow-hidden border border-white/[0.06] hud-frame"
            >
              <img
                src={s.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
                style={{ filter: "brightness(0.32) contrast(1.15) saturate(0.65)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-void via-void/60 to-void/20 group-hover:from-void/90 group-hover:via-void/40 transition-all duration-500" />
              <div className="absolute inset-0 scanlines opacity-15 pointer-events-none" />

              <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-10">
                {/* Top row — ID + status */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.2em] uppercase">
                    <span className="text-accent">{s.id}</span>
                    <span className="w-6 h-px bg-white/20" />
                    <span className="text-cold/60">{s.status}</span>
                  </div>
                  <div
                    className={`text-micro px-2.5 py-1 border ${
                      s.threat === "Critical"
                        ? "border-danger/50 text-danger"
                        : s.threat === "Severe"
                          ? "border-accent/50 text-accent"
                          : "border-white/15 text-cold"
                    }`}
                  >
                    {s.threat}
                  </div>
                </div>

                {/* Bottom row — name + desc + data */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                  <div className="md:col-span-7">
                    <h3 className="text-display text-[clamp(1.75rem,4vw,3rem)] text-white group-hover:text-accent transition-colors duration-300">
                      {s.name}
                    </h3>
                    <p className="mt-3 text-sm text-fog font-light leading-relaxed max-w-md group-hover:text-bone transition-colors duration-300">
                      {s.desc}
                    </p>
                  </div>
                  <div className="md:col-span-3 md:col-start-10 flex md:justify-end gap-6">
                    <div>
                      <div className="text-micro text-cold/50">Temp</div>
                      <div className="font-display text-xl text-white mt-1">{s.temp}</div>
                    </div>
                    <div>
                      <div className="text-micro text-cold/50">Threat</div>
                      <div
                        className={`font-display text-xl mt-1 ${
                          s.threat === "Critical" ? "text-danger" : "text-accent"
                        }`}
                      >
                        {s.threat}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
