import { motion } from 'framer-motion';
import { ease } from '../../lib/utils';

/**
 * Statement with inline thumbnails: the fiction claim set as a
 * three-line statement, sector crops sitting inside the line.
 */
export function Fiction() {
  return (
    <section id="fiction" className="relative overflow-hidden bg-void">
      <div className="section-pad container-wide max-w-[1100px] mx-auto text-center px-[var(--margin)]">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: ease.outExpo }}
          className="text-bone font-medium mx-auto statement"
          style={{ maxWidth: '52ch' }}
        >
          Atlas abandoned the grid in 2081{' '}
          <img
            src="/assets/images/sector-refinery.png"
            alt="Refinery core interior"
            width={192}
            height={112}
            loading="lazy"
            className="inline-thumb clip-notch-sm"
          />{' '}
          Six crews fight over the rods{' '}
          <img
            src="/assets/images/sector-cryo.png"
            alt="Cryo vault corridor"
            width={192}
            height={112}
            loading="lazy"
            className="inline-thumb clip-notch-sm"
          />{' '}
          behind Class-3 bulkheads.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.12, ease: ease.outExpo }}
          className="mt-10 flex flex-col sm:flex-row gap-8 justify-center text-left max-w-3xl mx-auto"
        >
          <p className="text-lg leading-relaxed text-ink max-w-[38ch]">
            They left the reactors hot. Corporations pay in orbital credits.
            Factions pay in ammunition. You get paid by walking out with the fuel.
          </p>
          <p className="text-lg leading-relaxed text-ink max-w-[38ch]">
            Defense drones stayed armed. The shuttle seats one squad.
            Everyone else becomes salvage.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
