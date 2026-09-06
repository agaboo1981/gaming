import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { ease } from '../../lib/utils';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { StationScene } from '../three/StationScene';

interface HeroProps {
  onDeploy: () => void;
  onTrailer: () => void;
}

export function Hero({ onDeploy, onTrailer }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
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
               style={{ filter: 'brightness(0.8) contrast(1.1) saturate(0.85)' }}
            />
          </motion.div>
        ) : (
          <StationScene scroll={scrollYProgress} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void/45 via-void/10 to-void/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/20 via-transparent to-transparent" />
      </motion.div>

      {/* HUD frame overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none" aria-hidden>
        <span className="absolute top-20 left-4 md:left-[clamp(1.25rem,4vw,4.5rem)] size-7 border-t-2 border-l-2 border-accent/40" />
        <span className="absolute top-20 right-4 md:right-[clamp(1.25rem,4vw,4.5rem)] size-7 border-t-2 border-r-2 border-accent/40" />
        <span className="absolute bottom-5 left-4 md:left-[clamp(1.25rem,4vw,4.5rem)] size-7 border-b-2 border-l-2 border-accent/40" />
        <span className="absolute bottom-5 right-4 md:right-[clamp(1.25rem,4vw,4.5rem)] size-7 border-b-2 border-r-2 border-accent/40" />
      </div>

      {/* Content — anchored bottom-left */}
      <div className="relative z-10 container-wide w-full px-[clamp(1.25rem,4vw,4.5rem)] pb-14 md:pb-20">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: ease.outExpo }}
            className="text-display text-[clamp(4.5rem,16vw,13rem)] text-bone leading-[0.88] [text-shadow:0_4px_40px_rgba(0,0,0,0.6)]"
          >
            SALVAGE
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: ease.outExpo }}
          className="mt-6 max-w-md text-lg md:text-xl font-light text-ink leading-relaxed [text-shadow:0_1px_14px_rgba(255,255,255,0.8)]"
        >
          Only the team with the payload leaves the station.
          <span className="text-ink"> Everyone else becomes salvage.</span>
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
          <Link
            to="/fiction"
            className="btn-press font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] px-8 py-4 border border-bone/[0.12] bg-bone/[0.03] text-bone clip-notch hover:border-accent/50 hover:bg-bone/[0.06] hover:text-bone transition-colors"
          >
            Read the Brief
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
