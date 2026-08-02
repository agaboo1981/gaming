import { useState, useCallback, useRef, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn, ease } from "../../lib/utils";
import { ArrowRight } from "lucide-react";

const operatives = [
  {
    id: "anvil",
    name: "Anvil",
    class: "Breacher",
    image: "/assets/images/operative-breacher.png",
    line: "Former Atlas security enforcer. The bulkhead is the door. The door is optional.",
    ability: {
      key: "Q",
      name: "Kinetic Pulse",
      desc: "Disables visor feeds and motion sensors within 15m. Duration 6s.",
    },
  },
  {
    id: "phantom",
    name: "Phantom",
    class: "Recon",
    image: "/assets/images/operative-recon.png",
    line: "Network runner turned infiltrator. You won't see her. You'll see the dart in your chest.",
    ability: {
      key: "Q",
      name: "Optical Camo",
      desc: "Thermal and optical stealth for 8s. Firing breaks the effect.",
    },
  },
  {
    id: "forge",
    name: "Forge",
    class: "Engineer",
    image: "/assets/images/operative-engineer.png",
    line: "Station mechanic who never left. Salvage rights in exchange for keeping the faction armed.",
    ability: {
      key: "Q",
      name: "Repair Drone",
      desc: "Restores 40 armor over 5s to the nearest damaged ally.",
    },
  },
  {
    id: "ripper",
    name: "Ripper",
    class: "Assault",
    image: "/assets/images/operative-assault.png",
    line: "Ex-orbital boarding specialist. Overclocked nervous system. The room clears in silence.",
    ability: {
      key: "Q",
      name: "Shock Charge",
      desc: "Arc grenade. Staggers and strips shields in a 6m cone.",
    },
  },
];

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
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        next = (index + 1) % ids.length;
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        next = (index - 1 + ids.length) % ids.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = ids.length - 1;
      } else return;
      select(ids[next]);
      listRef.current?.querySelector<HTMLElement>(`[data-op="${ids[next]}"]`)?.focus();
    },
    [index, select]
  );

  return (
    <section
      id="operatives"
      className="relative overflow-hidden border-t border-white/[0.04] bg-steel"
    >
      <div className="absolute inset-0 grid-fine opacity-[0.3] pointer-events-none" />
      <div className="container-wide px-[clamp(1.25rem,4vw,4.5rem)] py-0 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: ease.outExpo }}
          className="py-14 md:py-20 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-6 font-mono text-[0.625rem] tracking-[0.2em] uppercase">
              <span className="text-accent">03</span>
              <span className="w-8 h-px bg-accent/40" />
              <span className="text-cold">Operatives</span>
            </div>
            <h2 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] text-white">
              Pick Your Ghost.
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
              <div className="text-micro text-cold/60">Active Roster</div>
              <div className="font-display text-2xl text-white leading-none mt-1">01—04</div>
            </div>
            <a
              href="#deploy"
              className="btn-press inline-flex items-center gap-2 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] px-5 py-3 border border-accent/35 text-accent clip-notch-sm hover:border-accent hover:bg-accent/8 transition-all whitespace-nowrap"
            >
              Deploy Squad <ArrowRight className="size-3.5" />
            </a>
          </div>
        </motion.div>


        {/* Roster + dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 pb-14 md:pb-20">
          {/* Vertical roster */}
          <div
            ref={listRef}
            className="lg:col-span-3 flex lg:flex-col gap-px overflow-x-auto lg:overflow-visible scrollbar-hide border-l border-white/[0.06]"
            role="tablist"
            aria-label="Operative roster"
            onKeyDown={onKeyNav}
          >
            {operatives.map((op, i) => {
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
                  className={cn(
                    "group flex items-center gap-4 px-5 py-5 min-w-[210px] lg:min-w-0 border-l-2 lg:border-l-0 lg:border-b transition-all duration-300 text-left",
                    on
                      ? "active border-accent bg-white/[0.03] text-white"
                      : "border-transparent text-cold hover:text-bone hover:bg-white/[0.015]"
                  )}
                >
                  <span className="relative size-12 lg:size-14 shrink-0 overflow-hidden border border-white/10">
                    <img
                      src={op.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-top brightness-[0.8] saturate-[0.85] group-hover:brightness-110 transition duration-300"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-void/70 to-transparent" />
                  </span>
                  <div className="min-w-0">
                    <span className="font-mono text-[0.625rem] tracking-[0.2em] text-cold/50 block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg tracking-wide block truncate">
                      {op.name}
                    </span>
                    <span
                      className={cn(
                        "text-micro mt-0.5 block",
                        on ? "text-accent" : "text-cold/60"
                      )}
                    >
                      {op.class}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dossier — cinematic portrait with HUD overlays */}
          <div className="lg:col-span-9 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                id={`op-${active.id}`}
                role="tabpanel"
                className="active grid grid-cols-1 md:grid-cols-2 h-full min-h-[500px] md:min-h-[65vh]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: ease.outExpo }}
              >
                {/* Portrait with HUD frame */}
                <div className="relative overflow-hidden border-b md:border-b-0 md:border-r border-white/[0.05] hud-frame">
                  <img
                    src={active.image}
                    alt={`${active.name} — ${active.class} operative`}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{ filter: "brightness(0.55) contrast(1.1) saturate(0.8)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
                  <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
                  <div className="absolute top-5 left-5 text-micro text-accent">
                    {active.class}
                  </div>
                  <div className="absolute top-5 right-5 font-mono text-[0.625rem] tracking-[0.2em] text-cold/60">
                    OP-{String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <h3 className="text-display text-[clamp(2.5rem,5vw,4rem)] text-white leading-none">
                      {active.name}
                    </h3>
                    <div className="size-12 shrink-0 border border-accent/40 bg-accent/[0.06] flex items-center justify-center font-mono text-base font-semibold text-accent">
                      {active.ability.key}
                    </div>
                  </div>
                </div>

                {/* Specs */}
                <div className="flex flex-col justify-center gap-8 p-6 md:p-10 lg:p-14">
                  <p className="text-fog font-light leading-relaxed text-lg">
                    {active.line}
                  </p>
                  <div className="border-t border-white/[0.06] pt-6">
                    <div className="text-micro text-cold/60 mb-4">Special Ability</div>
                    <h4 className="font-mono text-sm tracking-[0.14em] uppercase text-white font-medium">
                      {active.ability.name}
                    </h4>
                    <p className="text-sm text-cold mt-2 font-light leading-relaxed">
                      {active.ability.desc}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-px bg-white/[0.06]">
                    {[
                      { label: "Class", value: active.class },
                      { label: "Slot", value: "Q" },
                      { label: "Status", value: "Active" },
                    ].map((s) => (
                      <div key={s.label} className="bg-steel/80 px-3 py-2.5">
                        <div className="text-micro text-cold/50">{s.label}</div>
                        <div className="font-mono text-xs text-bone mt-1">{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}