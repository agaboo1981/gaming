import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ease } from '../../lib/utils';
import { cn } from '../../lib/utils';

const sectors = [
  {
    id: 'STN-07',
    name: 'Refinery Core',
    temp: '4200°C',
    threat: 'Critical',
    image: '/assets/images/sector-refinery.png',
    desc: 'Helium-3 refinement. Unstable reactor. Tight corridors open into a burning atrium.',
  },
  {
    id: 'CRYO-4',
    name: 'Cryo-Vault 4',
    temp: '-120°C',
    threat: 'High',
    image: '/assets/images/sector-cryo.png',
    desc: 'Deep-freeze storage. Coolant fog and long sightlines. Bring thermal optics.',
  },
  {
    id: 'YARD-9',
    name: 'Shipbreaker Yard',
    temp: '15°C',
    threat: 'Severe',
    image: '/assets/images/hero.png',
    desc: 'Scrap of corporate cruisers stacked to orbit. The high ground wins.',
  },
  {
    id: 'HUB-1',
    name: 'Logistics Hub',
    temp: '22°C',
    threat: 'Elevated',
    image: '/assets/images/cta-bg.png',
    desc: 'Magnetic cargo rails rewrite the map mid-match. Never the same corridor twice.',
  },
];

/**
 * One frame, contents change: a single chamfered frame crossfades
 * through the four sectors. Tapping advances. Caption follows.
 */
export function Sectors() {
  const [held, setHeld] = useState<number | null>(null);

  const advance = useCallback(() => {
    setHeld((h) => (((h ?? 0) + 1) % sectors.length));
  }, []);

  return (
    <section id="sectors" className="relative bg-steel">
      <div className="section-pad container-wide px-[var(--margin)] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: ease.outExpo }}
            className="text-display text-bone sec-head"
          >
            Four sectors.
            <br />
            One way out.
          </motion.h2>
          <div className="mt-8 flex flex-col gap-2" role="list">
            {sectors.map((s, i) => {
              const on = held === null || held === i;
              return (
                <button
                  key={s.id}
                  role="listitem"
                  onClick={() => setHeld(i)}
                  onMouseEnter={() => setHeld(i)}
                  className={cn(
                    'text-left font-display text-xl py-2 transition-colors flex items-center gap-3',
                    (held ?? 0) === i ? 'text-bone' : 'text-cold hover:text-bone',
                  )}
                  style={{ opacity: held === null ? 1 : on ? 1 : 0.85 }}
                >
                  <span className="motif-dot" aria-hidden />
                  {s.name}
                </button>
              );
            })}
          </div>
          <p className="mt-6 text-base text-ink max-w-[38ch]">
            {(sectors[held ?? 0]).desc} Temperature {(sectors[held ?? 0]).temp}.
            Threat {(sectors[held ?? 0]).threat}.
          </p>
        </div>

        <div>
          <button
            onClick={advance}
            aria-label="Show next sector"
            className="block w-full max-w-[560px] mx-auto clip-notch overflow-hidden bg-void aspect-[4/5]"
          >
            {held === null ? (
              <span className="frame-cycle relative block w-full h-full">
                {sectors.map((s) => (
                  <img
                    key={s.id}
                    src={s.image}
                    alt=""
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ))}
              </span>
            ) : (
              <img
                key={sectors[held].id}
                src={sectors[held].image}
                alt={`${sectors[held].name} sector`}
                width={800}
                height={1000}
                className="w-full h-full object-cover"
              />
            )}
          </button>
          <p className="mt-4 text-center text-sm text-ink">
            {(sectors[held ?? 0]).id} · {(sectors[held ?? 0]).name} · {(sectors[held ?? 0]).temp}
          </p>
        </div>
      </div>
    </section>
  );
}
