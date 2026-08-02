import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, ease } from "../../lib/utils";
import { LiveDot } from "../ui/LiveDot";

const links = [
  { href: "#fiction", label: "Fiction" },
  { href: "#loop", label: "Protocol" },
  { href: "#operatives", label: "Operatives" },
  { href: "#sectors", label: "Sectors" },
];

export function Navbar({ onDeploy }: { onDeploy?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  const toggle = () => {
    setOpen((v) => {
      const next = !v;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        document.getElementById("mobile-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-void/90 backdrop-blur-md border-b border-white/[0.06] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.9)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent transition-opacity duration-500",
            scrolled ? "opacity-70" : "opacity-0"
          )}
          aria-hidden
        />
        <nav
          className="container-wide h-16 px-[clamp(1.25rem,4vw,4.5rem)] flex items-center justify-between"
          aria-label="Primary"
        >
          <a href="#hero" className="group flex items-center gap-2">
            <span className="font-display text-[1.4rem] tracking-[0.04em] text-white group-hover:text-accent transition-colors duration-300">
              SALVAGE
            </span>
            <span className="hidden sm:inline-block w-6 h-[3px] hazard-stripe-thin opacity-60" />
          </a>

          <span className="hidden lg:flex items-center gap-2 font-mono text-[0.5625rem] font-medium tracking-[0.22em] uppercase text-cold/60">
            <LiveDot />
            Servers Online
          </span>

          <ul className="nav-links hidden md:flex items-center gap-8 font-mono text-[0.625rem] font-medium uppercase tracking-[0.2em] text-cold">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative py-2 hover:text-white transition-colors duration-300 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <button
              onClick={onDeploy}
              className="btn-press font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] px-6 py-2.5 bg-accent text-void clip-notch-sm hover:bg-accent-hot"
            >
              Request Clearance
            </button>
          </div>

          <button
            id="mobile-toggle"
            className="md:hidden relative size-10 flex items-center justify-center text-fog hover:text-white transition-colors"
            onClick={toggle}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span
                className={cn(
                  "h-[2px] w-full bg-current transition-all duration-300 origin-center",
                  open && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-[2px] w-full bg-current transition-all duration-300",
                  open && "opacity-0 scale-x-0"
                )}
              />
              <span
                className={cn(
                  "h-[2px] w-full bg-current transition-all duration-300 origin-center",
                  open && "-translate-y-[7px] -rotate-45"
                )}
              />
            </div>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-void/80 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              id="mobile-menu"
              className="fixed top-0 right-0 z-50 h-full w-[min(100%,320px)] bg-steel border-l border-white/[0.08] md:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
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
                    className="font-display text-3xl text-white/90 hover:text-accent py-4 border-b border-white/[0.05] transition-colors"
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
