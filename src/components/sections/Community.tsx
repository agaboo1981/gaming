import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ease } from "../../lib/utils";
import { MessageSquare, Mail, Send, Radio } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Community() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || !EMAIL_RE.test(value)) {
      setError("Please enter a valid email");
      setSent(false);
      return;
    }
    setError("");
    setSent(true);
    setEmail("");
  };

  return (
    <section
      id="community"
      className="relative section-pad overflow-hidden border-t border-white/[0.04] bg-steel"
    >
      <div className="absolute inset-0 grid-fine opacity-[0.25] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void/40 pointer-events-none" />
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Community */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: ease.outExpo }}
          >
            <div className="flex items-center gap-3 mb-6 font-mono text-[0.625rem] tracking-[0.2em] uppercase">
              <span className="text-accent">05</span>
              <span className="w-8 h-px bg-accent/40" />
              <span className="text-cold">The Network</span>
            </div>
            <h2 className="text-display text-[clamp(2.25rem,5vw,3.75rem)] text-white">
              Join the Crews
            </h2>
            <p className="mt-5 text-fog font-light leading-relaxed max-w-md">
              The station never sleeps. Squad up on Discord, check dispatch pins, trade loadouts,
              and organize extractions with a rotating roster of contractors.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="btn-press inline-flex items-center gap-2.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] px-6 py-3.5 bg-accent text-void clip-notch hover:bg-accent-hot"
              >
                <MessageSquare className="size-4" /> Discord Server
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="btn-press inline-flex items-center gap-2.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] px-6 py-3.5 text-fog hover:text-white border border-white/[0.12] hover:border-accent/50 clip-notch"
              >
                <Radio className="size-4" /> Dispatch Feed
              </a>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: ease.outExpo }}
            className="hud-frame border border-white/[0.08] bg-void/40 p-6 md:p-8"
          >
            <div className="flex items-center gap-2 text-accent">
              <Mail className="size-4" />
              <span className="text-micro tracking-[0.2em] uppercase">Dispatch Signal</span>
            </div>
            <h3 className="font-display text-2xl text-white tracking-wide mt-3">
              Never Miss an Extraction
            </h3>
            <p className="mt-2 text-sm text-fog font-light leading-relaxed">
              Patch notes, operative drops, and double-payout alerts. One signal, weekly.
            </p>
            <form id="recruit-form" onSubmit={onSubmit} noValidate className="mt-6">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="contractor-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="contractor@atlas.corp"
                  aria-label="Email address"
                  aria-invalid={!!error}
                  aria-describedby="form-error"
                  className="flex-1 min-w-0 bg-void/60 border border-white/10 px-4 py-3.5 font-mono text-xs tracking-[0.08em] text-white placeholder:text-cold/50 focus:border-accent/60 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="btn btn-press inline-flex items-center justify-center gap-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] px-6 py-3.5 bg-accent text-void clip-notch hover:bg-accent-hot whitespace-nowrap"
                >
                  {sent ? (
                    <>
                      <Send className="size-3.5" /> Signal Sent
                    </>
                  ) : (
                    <>Subscribe</>
                  )}
                </button>
              </div>
              <p id="form-error" className="form-error" aria-live="polite">
                {error}
              </p>
            </form>
            <div className="mt-4 pt-5 border-t border-white/[0.06]">
              <span className="text-micro text-cold/50">Zero spam. Unsubscribe anytime.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
