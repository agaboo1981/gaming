import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { ease } from "../../lib/utils";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { LiveDot } from "../ui/LiveDot";
import { StationScene } from "../three/StationScene";

interface HeroProps {
  onDeploy: () => void;
  onTrailer: () => void;
}

export function Hero({ onDeploy, onTrailer }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
    >
      {/* Full-bleed environment — live WebGL station, or static fallback */}
      <motion.div className="absolute inset-0 z-0" style={{ opacity }}>
        {reduced ? (
          <motion.div className="absolute inset-0" style={{ scale }}>
            <img
              src="/assets/images/hero.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.5) contrast(1.1) saturate(0.85)" }}
            />
          </motion.div>
        ) : (
          <StationScene scroll={scrollYProgress} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-void/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-transparent to-void/40" />
      </motion.div>

      {/* HUD frame overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none" aria-hidden>
        <span className="absolute top-20 left-4 md:left-[clamp(1.25rem,4vw,4.5rem)] size-7 border-t-2 border-l-2 border-accent/40" />
        <span className="absolute top-20 right-4 md:right-[clamp(1.25rem,4vw,4.5rem)] size-7 border-t-2 border-r-2 border-accent/40" />
        <span className="absolute bottom-5 left-4 md:left-[clamp(1.25rem,4vw,4.5rem)] size-7 border-b-2 border-l-2 border-accent/40" />
        <span className="absolute bottom-5 right-4 md:right-[clamp(1.25rem,4vw,4.5rem)] size-7 border-b-2 border-r-2 border-accent/40" />
        <span className="side-label hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[0.5625rem] font-medium tracking-[0.32em] uppercase text-cold/35">
          SALVAGE — ORBITAL EXTRACTION — 2084
        </span>
      </div>

      {/* Content — anchored bottom-left */}
      <div className="relative z-10 container-wide w-full px-[clamp(1.25rem,4vw,4.5rem)] pb-14 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: ease.outExpo }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="inline-block w-8 h-[3px] hazard-stripe-thin" />
          <span className="text-micro text-accent">Orbital Extraction Protocol</span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: ease.outExpo }}
            className="text-display text-[clamp(4.5rem,16vw,13rem)] text-white leading-[0.88]"
          >
            SALVAGE
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: ease.outExpo }}
          className="mt-6 max-w-md text-lg md:text-xl font-light text-fog leading-relaxed"
        >
          Only the team with the payload leaves the station.
          <span className="text-bone"> Everyone else becomes salvage.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: ease.outExpo }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={onDeploy}
            className="btn-press font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] px-8 py-4 bg-accent text-void clip-notch hover:bg-accent-hot hover:shadow-[0_0_32px_color-mix(in_srgb,var(--color-accent)_25%,transparent)]"
          >
            Request Clearance
          </button>
          <button
            id="trailer-btn"
            onClick={onTrailer}
            className="btn-press group inline-flex items-center gap-2.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] px-6 py-4 text-accent hover:text-accent-hot transition-colors"
          >
            <span className="grid place-items-center size-6 border border-accent/40 group-hover:border-accent/80 group-hover:bg-accent/10 transition-colors">
              <Play className="size-3" fill="currentColor" />
            </span>
            Field Recording
          </button>
          <a
            href="#fiction"
            className="btn-press font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] px-8 py-4 border border-white/[0.12] text-bone clip-notch hover:border-accent/50 hover:text-white"
          >
            Read the Brief
          </a>
        </motion.div>

        {/* Bottom meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-14 flex items-center justify-between gap-4 text-micro text-cold/70"
        >
          <span className="flex items-center gap-2">
            <LiveDot />
            Atlas Corp. // Clearance Level 3
          </span>
          <span className="hidden md:flex items-center gap-2 text-accent/70">
            Live Feed
            <span className="inline-block w-px h-3 bg-accent/30" />
            <span className="text-cold/60">Scroll to descend</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
