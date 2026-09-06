import { Link } from 'react-router-dom';
import { LEGAL, type LegalDoc } from '../../lib/legal';

export function LegalScreen({ doc }: { doc: LegalDoc }) {
  const d = LEGAL[doc];
  return (
    <section className="section-pad">
      <div className="container-wide max-w-3xl">
        <div className="inline-flex items-center gap-3 rounded-full glass-pill px-4 py-2 font-mono text-[0.625rem] tracking-[0.2em] uppercase">
          <span className="text-accent">Atlas Corp</span>
          <span className="w-4 h-px bg-accent/40" />
          <span className="text-cold">Legal</span>
        </div>
        <h1 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] text-bone mt-6">
          {d.title}
        </h1>
        <p className="mt-3 font-mono text-[0.625rem] tracking-[0.2em] uppercase text-cold/60">
          Last updated 2084.11
        </p>
        <p className="mt-6 text-lg text-fog font-light leading-relaxed">{d.intro}</p>
        <ul className="mt-8 space-y-4 border-t border-bone/[0.06] pt-8">
          {d.points.map((p) => (
            <li
              key={p.slice(0, 28)}
              className="flex gap-3 text-[0.9375rem] font-light leading-relaxed text-bone/80"
            >
              <span
                className="mt-[0.55rem] size-1.5 shrink-0 rotate-45 bg-accent/70"
                aria-hidden
              />
              {p}
            </li>
          ))}
        </ul>
        <Link
          to="/"
          className="btn-press inline-flex items-center gap-2 mt-10 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] px-5 py-3 border border-accent/35 text-accent clip-notch-sm hover:border-accent hover:bg-accent/8 transition-all"
        >
          ← Back to Base
        </Link>
      </div>
    </section>
  );
}
