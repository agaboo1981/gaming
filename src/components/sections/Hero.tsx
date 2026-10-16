import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ease } from '../../lib/utils';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface HeroProps {
  onDeploy: () => void;
  onTrailer: () => void;
}

/**
 * Giant cropped shape: one chamfered bulkhead block in flat yellow,
 * cropped by the right/bottom edges. Headline sits on bare ground.
 */
export function Hero({ onDeploy, onTrailer }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative min-h-[100svh] overflow-hidden bg-void">
      {/* The motif at enormous scale */}
      <motion.div className="absolute inset-0" style={{ opacity: fade }} aria-hidden>
        <div
          className={
            reduced
              ? 'absolute hero-motif clip-notch'
              : 'absolute hero-motif clip-notch animate-drift-slow'
          }
        />
        <img
          src="/assets/images/hero.png"
          alt=""
          className="absolute hero-motif-img clip-notch"
        />
      </motion.div>

      <div className="relative z-10 container-wide px-[var(--margin)] pt-32 md:pt-40 pb-16 min-h-[100svh] flex flex-col justify-center max-w-[880px] ml-0 hero-pad">
        <motion.h1
          initial={{ y: '105%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: ease.outExpo }}
          className="text-display text-bone hero-title"
        >
          Only the payload
          <br />
          leaves.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: ease.outExpo }}
          className="mt-6 text-lg md:text-xl leading-relaxed text-ink max-w-[46ch]"
        >
          SALVAGE is an orbital extraction shooter. Six crews enter the refinery.
          One carries the rods out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: ease.outExpo }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={onDeploy}
            className="btn-press font-display text-base font-semibold px-9 py-4 bg-bone text-void clip-notch"
          >
            Request clearance
          </button>
          <button
            id="trailer-btn"
            onClick={onTrailer}
            className="btn-press font-display text-base font-medium px-6 py-4 text-bone underline underline-offset-8"
          >
            Watch field recording
          </button>
          <Link
            to="/fiction"
            className="btn-press font-display text-base font-medium px-6 py-4 bg-steel text-bone clip-notch-sm"
          >
            Read the brief
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
