import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { cn, ease } from '../../lib/utils';

const links = [
  { to: '/fiction', match: 'fiction', label: 'Fiction' },
  { to: '/protocol', match: 'protocol', label: 'Protocol' },
  { to: '/operatives', match: 'operatives', label: 'Operatives' },
  { to: '/sectors', match: 'sectors', label: 'Sectors' },
];

const MotionLink = motion(Link);

export function Navbar({ onDeploy }: { onDeploy?: () => void }) {
  const location = useLocation();
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      if (location.pathname !== '/') {
        const m = links.find((l) => l.to === location.pathname);
        setActive(m ? m.match : null);
        return;
      }
      const probe = window.scrollY + window.innerHeight * 0.4;
      let current: string | null = null;
      for (const l of links) {
        const el = document.getElementById(l.match === 'protocol' ? 'loop' : l.match);
        if (el && el.offsetTop <= probe) current = l.match;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggle = () => {
    setOpen((v) => {
      const next = !v;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        document.getElementById('mobile-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <>
      <motion.header
        initial={reduced ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: ease.outExpo }}
        className="fixed top-0 inset-x-0 z-50 bg-void"
      >
        <nav
          className="container-wide flex items-center justify-between gap-4 px-[var(--margin)] py-4"
          aria-label="Primary"
        >
          <Link to="/" className="font-display text-2xl tracking-tight text-bone" aria-label="SALVAGE home">
            SALVAGE
          </Link>

          <div className="hidden md:flex items-center gap-7">
            <ul className="nav-links flex items-center gap-6">
              {links.map((l) => {
                const isActive = active === l.match;
                return (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'text-base font-medium transition-colors',
                        isActive ? 'text-bone underline underline-offset-8 decoration-2' : 'text-cold hover:text-bone',
                      )}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={onDeploy}
              className="btn-press font-display text-base font-semibold px-6 py-3 bg-accent text-bone clip-notch-sm"
            >
              Request clearance
            </button>
          </div>

          <button
            id="mobile-toggle"
            className="md:hidden font-display text-base font-semibold text-bone px-4 py-2 bg-steel clip-notch-sm"
            onClick={toggle}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <div
              id="mobile-menu-overlay"
              className="active fixed inset-0 z-40 bg-bone md:hidden"
              style={{ opacity: 0.5 }}
              onClick={close}
              aria-hidden
            />
            <motion.div
              id="mobile-menu"
              className="active fixed top-0 right-0 z-50 h-full w-[min(100%,320px)] bg-void md:hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: ease.outExpo }}
            >
              <div className="flex items-center justify-between px-6 h-20">
                <span className="font-display text-xl text-bone">SALVAGE</span>
                <button id="mobile-close" onClick={close} className="text-base font-medium text-cold px-2 py-2">
                  Close
                </button>
              </div>
              <div className="flex flex-col px-6 flex-1">
                {links.map((l, i) => (
                  <MotionLink
                    key={l.to}
                    to={l.to}
                    className={cn(
                      'mobile-link font-display text-3xl py-4 transition-colors',
                    active === l.match ? 'text-bone underline underline-offset-8' : 'text-cold',
                  )}
                  onClick={close}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, ease: ease.outExpo }}
                >
                  {l.label}
                </MotionLink>
              ))}
            </div>
            <div className="p-6">
              <button
                onClick={() => {
                  close();
                  onDeploy?.();
                }}
                className="btn-press w-full font-display text-base font-semibold px-6 py-4 bg-accent text-bone clip-notch-sm"
              >
                Request clearance
              </button>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
