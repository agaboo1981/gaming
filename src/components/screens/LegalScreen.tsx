import { Link } from 'react-router-dom';
import { LEGAL, type LegalDoc } from '../../lib/legal';

export function LegalScreen({ doc }: { doc: LegalDoc }) {
  const d = LEGAL[doc];
  return (
    <section className="section-pad">
      <div className="container-wide max-w-3xl px-[var(--margin)]">
        <p className="text-base font-semibold text-cold">Atlas Corporation</p>
        <h1 className="text-display text-bone mt-4 sec-head">
          {d.title}
        </h1>
        <p className="mt-3 text-base text-cold">
          Last updated 2084.11
        </p>
        <p className="mt-6 text-lg leading-relaxed">{d.intro}</p>
        <ul className="mt-8 space-y-4">
          {d.points.map((p) => (
            <li
              key={p.slice(0, 28)}
              className="flex gap-3 text-base leading-relaxed"
            >
              <span className="motif-dot mt-2" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
        <Link
          to="/"
          className="btn-press inline-flex items-center gap-2 mt-10 font-display text-base font-semibold px-6 py-3 bg-steel text-bone clip-notch-sm"
        >
          Back to base
        </Link>
      </div>
    </section>
  );
}
