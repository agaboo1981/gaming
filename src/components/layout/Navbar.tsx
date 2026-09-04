import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn, ease } from '../../lib/utils';
import { LiveDot } from '../ui/LiveDot';

const links = [
  { href: '#fiction', label: 'Fiction' },
  { href: '#loop', label: 'Protocol' },
  { href: '#operatives', label: 'Operatives' },
  { href: '#sectors', label: 'Sectors' },
];

export function Navbar({ onDeploy }: { onDeploy?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Active-section tracking: last section whose top passed the probe line.
      const probe = window.scrollY + window.innerHeight * 0.4;
      let current: string | null = null;
      for (const l of links) {
        const el = document.getElementById(l.href.slice(1));
        if (el && el.offsetTop <= probe) current = l.href.slice(1);
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        initial={reduced ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: ease.outExpo }}
        className="fixed top-4 inset-x-0 z-50"
      >
        <nav
          className="container-wide px-[clamp(1.25rem,4vw,4.5rem)] flex items-center justify-between gap-4"
          aria-label="Primary"
        >
          {/* Brand — floats free of the pill */}
          <div className="flex items-center gap-5 min-w-0">
            <a href="#hero" className="group flex items-center gap-2">
              <span className="font-display text-[1.4rem] tracking-[0.04em] text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.85)] group-hover:text-accent transition-colors duration-300">
                SALVAGE
              </span>
              <span className="hidden sm:inline-block w-6 h-[3px] hazard-stripe-thin opacity-60" />
            </a>

            <span className="hidden xl:flex items-center gap-2 text-micro text-cold/60">
              <LiveDot />
              Servers Online
            </span>
          </div>

          {/* Floating glass pill — links + integrated CTA */}
          <div
            className={cn(
              'hidden md:flex items-center gap-1 rounded-full p-1.5 glass-pill transition-colors duration-500',
              scrolled && 'glass-pill-solid',
            )}
          >
            <ul className="nav-links flex items-center gap-0.5">
              {links.map((l) => {
                const isActive = active === l.href.slice(1);
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={cn(
                        'relative rounded-full px-4 py-2 font-mono text-[0.625rem] font-medium uppercase tracking-[0.2em] transition-all duration-300',
                        isActive
                          ? 'text-accent bg-accent/10'
                          : 'text-fog hover:text-white hover:bg-white/[0.06]',
                      )}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <span className="mx-2 h-5 w-px bg-white/10" aria-hidden />

            <button
              onClick={onDeploy}
              className="btn-press rounded-full font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] px-5 py-2.5 bg-accent text-void hover:bg-accent-hot hover:shadow-[0_0_24px_color-mix(in_srgb,var(--color-accent)_30%,transparent)]"
            >
              Request Clearance
            </button>
          </div>

          {/* Mobile menu toggle — compact glass circle */}
          <button
            id="mobile-toggle"
            className={cn(
              'md:hidden relative size-11 rounded-full flex items-center justify-center glass-pill text-fog hover:text-white transition-colors',
              scrolled && 'glass-pill-solid',
            )}
            onClick={toggle}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span
                className={cn(
                  'h-[2px] w-full bg-current transition-all duration-300 origin-center',
                  open && 'translate-y-[7px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'h-[2px] w-full bg-current transition-all duration-300',
                  open && 'opacity-0 scale-x-0',
                )}
              />
              <span
                className={cn(
                  'h-[2px] w-full bg-current transition-all duration-300 origin-center',
                  open && '-translate-y-[7px] -rotate-45',
                )}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-void/70 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              id="mobile-menu"
              className="active fixed top-0 right-0 z-50 h-full w-[min(100%,320px)] bg-void/85 backdrop-blur-2xl border-l border-white/10 md:hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: ease.outExpo }}
            >
              <div className="flex items-center justify-between h-16 px-6 border-b border-white/[0.06]">
                <span className="font-display text-lg text-white">SALVAGE</span>
                <button
                  onClick={close}
                  className="text-micro text-fog hover:text-accent transition-colors px-2 py-2"
                >
                  Close
                </button>
              </div>
              <div className="flex flex-col p-6 flex-1">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    className={cn(
                      'font-display text-3xl py-4 border-b border-white/[0.05] transition-colors',
                      active === l.href.slice(1)
                        ? 'text-accent'
                        : 'text-white/90 hover:text-accent',
                    )}
                    onClick={close}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1, ease: ease.outExpo }}
                  >
                    {l.label}
                  </motion.a>
                ))}
              </div>
              <div className="p-6 border-t border-white/[0.06]">
                <button
                  onClick={() => {
                    close();
                    onDeploy?.();
                  }}
                  className="btn-press w-full font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] px-6 py-3.5 bg-accent text-void clip-notch-sm hover:bg-accent-hot"
                >
                  Request Clearance
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
