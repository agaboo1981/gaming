import { useState, useCallback, useRef, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn, ease } from '../../lib/utils';
import { Link } from 'react-router-dom';

const operatives = [
  {
    id: 'anvil',
    name: 'Anvil',
    class: 'Breacher',
    image: '/assets/images/operative-breacher.png',
    line: 'Former Atlas security enforcer. The bulkhead is the door. The door is optional.',
    ability: { key: 'Q', name: 'Kinetic Pulse', desc: 'Disables visor feeds and motion sensors within 15m for 6 seconds.' },
  },
  {
    id: 'phantom',
    name: 'Phantom',
    class: 'Recon',
    image: '/assets/images/operative-recon.png',
    line: 'Network runner turned infiltrator. You never see her. You see the dart.',
    ability: { key: 'Q', name: 'Optical Camo', desc: 'Thermal and optical stealth for 8 seconds. Firing breaks it.' },
  },
  {
    id: 'forge',
    name: 'Forge',
    class: 'Engineer',
    image: '/assets/images/operative-engineer.png',
    line: 'Station mechanic who never left. Salvage rights in exchange for keeping the faction armed.',
    ability: { key: 'Q', name: 'Repair Drone', desc: 'Restores 40 armor over 5 seconds to the nearest damaged ally.' },
  },
  {
    id: 'ripper',
    name: 'Ripper',
    class: 'Assault',
    image: '/assets/images/operative-assault.png',
    line: 'Ex-orbital boarding specialist. Overclocked nerves. The room clears in silence.',
    ability: { key: 'Q', name: 'Shock Charge', desc: 'Arc grenade. Staggers and strips shields in a 6m cone.' },
  },
];

/**
 * Square plate, spare text. Left: one square portrait in the motif mask.
 * Right: plain-text tabs (the signature index-with-preview), dossier,
 * and two filled action cells.
 */
export function Operatives() {
  const [activeId, setActiveId] = useState(operatives[0].id);
  const listRef = useRef<HTMLDivElement>(null);
  const active = operatives.find((o) => o.id === activeId)!;
  const index = operatives.findIndex((o) => o.id === activeId);

  const select = useCallback((id: string) => setActiveId(id), []);

  const onKeyNav = useCallback(
    (e: KeyboardEvent) => {
      const ids = operatives.map((o) => o.id);
      let next = index;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        next = (index + 1) % ids.length;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        next = (index - 1 + ids.length) % ids.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        next = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        next = ids.length - 1;
      } else return;
      select(ids[next]);
      listRef.current?.querySelector<HTMLElement>(`[data-op="${ids[next]}"]`)?.focus();
    },
    [index, select],
  );

  return (
    <section id="operatives" className="relative bg-void">
      <div className="section-pad container-wide px-[var(--margin)] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[88svh]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: ease.outExpo }}
          className="clip-notch bg-steel overflow-hidden aspect-square max-w-[640px] w-full"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={active.id}
              src={active.image}
              alt={`${active.name}, ${active.class} operative`}
              width={900}
              height={900}
              className="w-full h-full object-cover object-top"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
            />
          </AnimatePresence>
        </motion.div>

        <div className="flex flex-col justify-between gap-10 min-h-[60svh]">
          <div
            ref={listRef}
            role="tablist"
            aria-label="Operative roster"
            onKeyDown={onKeyNav}
            className="flex flex-wrap gap-x-8 gap-y-3"
          >
            {operatives.map((op) => {
              const on = op.id === activeId;
              return (
                <button
                  key={op.id}
                  data-op={op.id}
                  role="tab"
                  aria-selected={on}
                  aria-controls={`op-${op.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(op.id)}
                  onMouseEnter={() => select(op.id)}
                  onFocus={() => select(op.id)}
                  className={cn(
                    'font-display text-lg pb-1 transition-colors',
                    on ? 'text-bone underline underline-offset-8 decoration-2' : 'text-cold hover:text-bone',
                  )}
                >
                  {op.name}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id={`op-${active.id}`}
              role="tabpanel"
              className="active"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: ease.outExpo }}
            >
              <h2 className="text-display text-bone sec-head">
                Pick {active.name}.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink max-w-[34ch]">{active.line}</p>
              <p className="mt-4 text-base text-ink">
                <span className="motif-dot inline-block mr-2" aria-hidden />
                {active.ability.name}: {active.ability.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/deploy"
              className="btn-press flex items-center justify-center font-display text-base font-semibold h-[72px] bg-bone text-void clip-notch-sm"
            >
              Deploy as {active.name}
            </Link>
            <Link
              to="/sectors"
              className="btn-press flex items-center justify-center font-display text-base font-semibold h-[72px] bg-steel text-bone clip-notch-sm"
            >
              See sectors
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
