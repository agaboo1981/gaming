import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ease } from '../../lib/utils';

export function Fiction() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      id="fiction"
      className="relative overflow-hidden border-t border-bone/[0.04]"
    >
      {/* Full-bleed background image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imgY }}>
        <img
          src="/assets/images/sector-refinery.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110"
           style={{ filter: 'brightness(0.75) contrast(1.1) saturate(0.75)' }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-void/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/55 via-void/10 to-transparent" />
      <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />

      <div className="relative z-10 section-pad">
        <div className="container-wide">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: ease.outExpo }}
              className="text-display text-[clamp(2.5rem,6vw,4.5rem)] text-bone"
            >
              Atlas Left.
              <br />
              <span className="text-accent">You Didn't.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: ease.outExpo }}
              className="mt-8 space-y-5 text-lg font-light text-ink leading-relaxed max-w-lg [text-shadow:0_1px_10px_rgba(255,255,255,0.7)]"
            >
              <p className="border-l-2 border-accent/50 pl-5">
                Atlas Corporation abandoned the orbital manufacturing grid in 2081. They left the
                reactors hot, the defense drones armed, and a fortune in helium-3 fuel rods sealed
                behind Class-3 bulkheads.
              </p>
              <p>
                Now six factions fight over what's left.{' '}
                <span className="text-ink">
                  Corporations pay in orbital credits. Factions pay in ammunition.
                </span>{' '}
                You get paid by walking out with the rods.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[4px] hazard-stripe opacity-40"
        aria-hidden
      />
    </section>
  );
}
