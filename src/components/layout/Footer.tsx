export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-void overflow-hidden">
      {/* Hazard stripe divider */}
      <div className="h-[6px] w-full hazard-stripe opacity-80" aria-hidden />

      <div className="container-wide px-[clamp(1.25rem,4vw,4.5rem)] py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <div className="font-display text-5xl md:text-6xl tracking-[0.03em] text-white">
              SALVAGE
            </div>
            <p className="mt-4 font-mono text-[0.625rem] tracking-[0.2em] uppercase text-cold">
              Orbital Extraction Protocol
            </p>
            <p className="mt-6 text-sm text-fog font-light max-w-xs leading-relaxed">
              Only the team with the payload leaves. Everyone else becomes salvage.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-8 font-mono text-[0.625rem] tracking-[0.18em] uppercase text-cold">
              <a href="#fiction" className="hover:text-accent transition-colors">
                Fiction
              </a>
              <a href="#loop" className="hover:text-accent transition-colors">
                Protocol
              </a>
              <a href="#operatives" className="hover:text-accent transition-colors">
                Operatives
              </a>
              <a href="#sectors" className="hover:text-accent transition-colors">
                Sectors
              </a>
            </div>
            <div className="flex gap-6 font-mono text-[0.625rem] tracking-[0.18em] uppercase text-cold">
              <a href="#" className="hover:text-accent transition-colors" aria-label="Discord">
                Discord
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="X / Twitter">
                X
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="YouTube">
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between gap-3 font-mono text-[0.5625rem] tracking-[0.16em] uppercase text-cold/60">
          <span>&copy; 2084 Atlas Corporation. All rights reserved.</span>
          <span>Unauthorized access will be logged and prosecuted.</span>
        </div>
      </div>
    </footer>
  );
}
