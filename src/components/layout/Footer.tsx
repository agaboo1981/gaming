import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GAME_LINKS = [
  { href: '/fiction', label: 'Fiction' },
  { href: '/protocol', label: 'Protocol' },
  { href: '/operatives', label: 'Operatives' },
  { href: '/sectors', label: 'Sectors' },
  { href: '/deploy', label: 'Deploy' },
];

const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/cookies', label: 'Cookies' },
  { href: '/eula', label: 'EULA' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || !EMAIL_RE.test(value)) {
      setError('Please enter a valid email');
      setSent(false);
      return;
    }
    setError('');
    setSent(true);
    setEmail('');
  };

  return (
    <footer className="relative bg-bone text-void overflow-hidden">
      <div className="container-wide px-[var(--margin)] pt-16 md:pt-20">
        <div
          aria-label="SALVAGE"
          className="grid grid-cols-7 gap-1"
          style={{ height: 'clamp(120px, 22svh, 240px)' }}
        >
          {'SALVAGE'.split('').map((ch, i) => (
            <span
              key={i}
              aria-hidden={i > 0}
              className="flex items-end justify-center bg-void text-bone font-display font-bold clip-notch-sm overflow-hidden foot-block"
              style={{ height: `${100 - (i % 3) * 14}%`, alignSelf: 'end' }}
            >
              {ch}
            </span>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-10 pb-14">
          <nav aria-label="Game">
            <h3 className="text-base font-semibold">Game</h3>
            <ul className="mt-4 space-y-2.5 text-base">
              {GAME_LINKS.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="hover:underline underline-offset-4">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h3 className="text-base font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2.5 text-base">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="hover:underline underline-offset-4">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2">
            <h3 className="text-base font-semibold">Dispatch signal</h3>
            <p className="mt-4 text-base max-w-[36ch]">
              Patch notes and operative drops. One signal a week.
            </p>
            <form id="recruit-form" onSubmit={onSubmit} noValidate className="mt-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="contractor-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="contractor@atlas.corp"
                  aria-label="Email address"
                  aria-invalid={!!error}
                  aria-describedby="form-error"
                  className="flex-1 min-w-0 bg-void text-bone px-4 py-3.5 text-base placeholder:text-bone/50 focus:outline-3"
                  style={{ outlineColor: '#f6e016' }}
                />
                <button
                  type="submit"
                  className="btn btn-press font-display text-base font-semibold px-6 py-3.5 bg-accent text-bone clip-notch-sm whitespace-nowrap"
                >
                  {sent ? 'Signal sent' : 'Subscribe'}
                </button>
              </div>
              <p id="form-error" className="form-error" aria-live="polite" style={{ color: '#f6e016' }}>
                {error}
              </p>
            </form>
          </div>
        </div>

        <div className="pb-8 flex flex-col sm:flex-row justify-between gap-3 text-sm">
          <span>© 2084 Atlas Corporation. All rights reserved.</span>
          <span>Station photography: Atlas survey archive.</span>
          <Link to="/" className="hover:underline underline-offset-4">
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
