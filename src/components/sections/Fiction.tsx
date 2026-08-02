import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ease } from "../../lib/utils";

export function Fiction() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      id="fiction"
      className="relative overflow-hidden border-t border-white/[0.04]"
    >
      {/* Full-bleed background image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imgY }}>
        <img
          src="/assets/images/sector-refinery.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ filter: "brightness(0.28) contrast(1.15) saturate(0.6)" }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-void/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-void via-void/30 to-transparent" />
      <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />

      <div className="relative z-10 section-pad">
        <div className="container-wide">
          <div className="max-w-2xl">
            {/* Decoded transmission header */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: ease.outExpo }}
              className="flex items-center gap-3 mb-10 font-mono text-[0.625rem] tracking-[0.2em] uppercase"
            >
              <span className="text-accent">T-2084.07.31</span>
              <span className="w-px h-3 bg-white/15" />
              <span className="text-cold">Clearance 03</span>
              <span className="w-px h-3 bg-white/15" />
              <span className="text-danger flex items-center gap-1.5">
                <span className="size-1.5 bg-danger rounded-full animate-pulse-live" />
                Decoded
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: ease.outExpo }}
              className="text-display text-[clamp(2.5rem,6vw,4.5rem)] text-white"
            >
              Atlas Left.
              <br />
              <span className="text-accent">You Didn't.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: ease.outExpo }}
              className="mt-8 space-y-5 text-lg font-light text-fog leading-relaxed max-w-lg"
            >
              <p className="border-l-2 border-accent/50 pl-5">
                Atlas Corporation abandoned the orbital manufacturing grid in 2081. They left
                the reactors hot, the defense drones armed, and a fortune in helium-3 fuel rods
                sealed behind Class-3 bulkheads.
              </p>
              <p>
                Now six factions fight over what's left.{" "}
                <span className="text-bone">
                  Corporations pay in orbital credits. Factions pay in ammunition.
                </span>{" "}
                You get paid by walking out with the rods.
              </p>
            </motion.div>

            {/* HUD telemetry strip */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 grid grid-cols-3 gap-px bg-white/[0.06] hud-frame"
            >
              {[
                { label: "Factions", value: "06", accent: false },
                { label: "Stations", value: "04", accent: false },
                { label: "Extraction Rate", value: "23%", accent: true },
              ].map((s) => (
                <div key={s.label} className="bg-void/60 px-4 py-3">
                  <div className="text-micro text-cold/60">{s.label}</div>
                  <div
                    className={`font-display text-2xl mt-1 ${
                      s.accent ? "text-accent" : "text-white"
                    }`}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[4px] hazard-stripe opacity-40" aria-hidden />
    </section>
  );
}
