import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ease } from "../../lib/utils";

const beats = [
  {
    n: "01",
    title: "Insert",
    body: "Drop-pods punch through the station hull at terminal velocity. Landing zones shift every cycle. You hit the floor running or you don't hit the floor at all.",
    tag: "Drop-Pod Phase",
  },
  {
    n: "02",
    title: "Secure",
    body: "Breach the defense grid. Contest the extraction ports. Hold corridors while your specialist cracks the refinery core. Every second on-station burns oxygen and luck.",
    tag: "Breach & Hold",
  },
  {
    n: "03",
    title: "Extract",
    body: "Signal the shuttle. Defend the pad. Only the team carrying the payload is cleared for departure. Everyone else stays. Permanently.",
    tag: "Payload Priority",
  },
];

export function Loop() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const railScale = useTransform(scrollYProgress, [0.1, 0.75], [0, 1]);

  return (
    <section
      ref={ref}
      id="loop"
      className="relative section-pad overflow-hidden bg-void border-t border-white/[0.04]"
    >
      <div className="absolute inset-0 grid-blueprint opacity-[0.12] pointer-events-none" />
      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: ease.outExpo }}
          >
            <div className="flex items-center gap-3 mb-6 font-mono text-[0.625rem] tracking-[0.2em] uppercase">
              <span className="text-accent">02</span>
              <span className="w-8 h-px bg-accent/40" />
              <span className="text-cold">Combat Protocol</span>
            </div>
            <h2 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] text-white">
              Three Beats.
              <br />
              <span className="text-fog">Zero Mercy.</span>
            </h2>
          </motion.div>
          <motion.p
            className="lg:col-span-4 lg:col-start-9 self-end text-fog font-light text-lg leading-relaxed lg:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: ease.outExpo }}
          >
            Matches play like a compressed war film. No respawn lottery. One objective. One
            clock. One team leaves with the rods.
          </motion.p>
        </div>

        {/* Phase bands with left rail */}
        <div className="relative pl-8 md:pl-0">
          {/* Left rail */}
          <div className="absolute left-0 md:left-[7rem] top-0 bottom-0 w-px bg-white/[0.06]" />
          <motion.div
            className="absolute left-0 md:left-[7rem] top-0 w-px bg-accent origin-top"
            style={{ scaleY: railScale, height: "100%" }}
          />

          <div className="flex flex-col">
            {beats.map((b, i) => (
              <motion.article
                key={b.n}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: ease.outExpo }}
                className="relative grid grid-cols-1 md:grid-cols-[7rem_1fr] gap-4 md:gap-12 items-start py-10 md:py-14 border-b border-white/[0.06] last:border-b-0"
              >
                {/* Node on rail */}
                <div className="absolute left-0 md:left-[7rem] top-12 -translate-x-1/2 z-10 size-3 bg-accent rounded-full shadow-[0_0_12px_var(--color-accent)]" />

                {/* Phase designation */}
                <div className="md:text-right md:pr-4">
                  <div className="text-micro text-cold/60 tracking-[0.2em]">Phase</div>
                  <div className="font-display text-4xl text-white/20 leading-none mt-1">
                    {b.n}
                  </div>
                </div>

                {/* Content */}
                <div className="md:pl-8">
                  <span className="text-micro text-accent">{b.tag}</span>
                  <h3 className="text-display text-[clamp(2rem,4vw,3rem)] text-white mt-2 leading-none">
                    {b.title}
                  </h3>
                  <p className="mt-4 text-fog font-light leading-relaxed max-w-xl">
                    {b.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
