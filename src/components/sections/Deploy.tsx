import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { ease } from "../../lib/utils";
import { PlatformBar } from "../ui/PlatformBar";

interface DeployProps {
  onTrailer?: () => void;
}

export function Deploy({ onTrailer }: DeployProps) {
  return (
    <section
      id="deploy"
      className="relative overflow-hidden border-t border-white/[0.04] bg-void"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/cta-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.28) contrast(1.2) saturate(0.6)" }}
        />
        <div className="absolute inset-0 bg-void/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
      </div>

      <div className="container-wide relative z-10 py-24 md:py-36 px-[clamp(1.25rem,4vw,4.5rem)]">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: ease.outExpo }}
            className="flex items-center gap-3 mb-8 font-mono text-[0.625rem] tracking-[0.2em] uppercase"
          >
            <span className="size-2 bg-accent rounded-full animate-pulse-live" />
            <span className="text-accent">Server Status — Green</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="text-cold">12-Player Lobbies</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "105%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: ease.outExpo }}
              className="text-display text-[clamp(3rem,8vw,6.5rem)] text-white leading-[0.88]"
            >
              GET TO
              <br />
              THE STATION.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: ease.outExpo }}
            className="mt-6 text-lg text-fog font-light leading-relaxed max-w-xl"
          >
            <span className="text-bone">Free to play.</span>{" "}
            <span className="text-bone">No storefront</span> inside the station.
            Grind credits, craft gear, or pay zero. Skill decides who walks out.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35, ease: ease.outExpo }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button className="btn-press font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] px-10 py-5 bg-accent text-void clip-notch hover:bg-accent-hot hover:shadow-[0_0_40px_color-mix(in_srgb,var(--color-accent)_30%,transparent)]">
              Download Client
            </button>
            <button
              id="trailer-btn-deploy"
              onClick={onTrailer}
              className="btn-press group inline-flex items-center gap-2.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] px-8 py-5 text-accent hover:text-accent-hot transition-colors"
            >
              <span className="grid place-items-center size-6 border border-accent/40 group-hover:border-accent/80 group-hover:bg-accent/10 transition-colors">
                <Play className="size-3" fill="currentColor" />
              </span>
              Watch Trailer
            </button>
            <a
              href="#fiction"
              className="btn-press font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] px-10 py-5 border border-white/[0.12] text-bone clip-notch hover:border-accent/50 hover:text-white"
            >
              Read the Brief
            </a>
          </motion.div>

          <PlatformBar />

          {/* System requirements strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] hud-frame"
          >
            {[
              { label: "Client Size", value: "24 GB" },
              { label: "Platform", value: "PC" },
              { label: "Release", value: "TBA" },
              { label: "Players", value: "12P" },
            ].map((r) => (
              <div key={r.label} className="bg-void/60 px-4 py-3">
                <div className="text-micro text-cold/60">{r.label}</div>
                <div className="font-display text-lg text-white mt-1">{r.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[4px] hazard-stripe opacity-40" aria-hidden />
    </section>
  );
}
