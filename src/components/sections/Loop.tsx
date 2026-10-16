import { motion } from 'framer-motion';
import { ease } from '../../lib/utils';

const beats = [
  {
    title: 'Drop in',
    body: 'Pods punch the hull at terminal velocity. Landing zones shift every cycle. Hit the floor running.',
    image: '/assets/images/hero.png',
    alt: 'Drop pods over the refinery',
    tile: '30vh',
  },
  {
    title: 'Crack the core',
    body: 'Contest the ports and hold the corridors while your specialist opens the Class-3 bulkheads.',
    image: '/assets/images/sector-refinery.png',
    alt: 'Refinery core atrium',
    tile: '44vh',
  },
  {
    title: 'Carry it out',
    body: 'Signal the shuttle and defend the pad. Only the squad holding the rods boards.',
    image: '/assets/images/sector-cryo.png',
    alt: 'Extraction pad in coolant fog',
    tile: '60vh',
  },
];

/** Tiles that grow: order carried by size, text under each tile. */
export function Loop() {
  return (
    <section id="loop" className="relative bg-steel">
      <div className="section-pad container-wide px-[var(--margin)]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: ease.outExpo }}
          className="text-display text-bone sec-head"
        >
          Three beats.
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-3 items-end">
          {beats.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: ease.outExpo }}
              className={
                i === 0
                  ? 'md:col-span-3'
                  : i === 1
                    ? 'md:col-span-4'
                    : 'md:col-span-5'
              }
            >
              <div
                className="clip-notch bg-void overflow-hidden"
                style={{ height: b.tile, minHeight: '220px' }}
              >
                <img
                  src={b.image}
                  alt={b.alt}
                  width={900}
                  height={900}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-5 font-display text-xl text-bone">{b.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink max-w-[34ch]">{b.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
