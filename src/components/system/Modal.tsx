import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "../../lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export function Modal({ open, onClose, title = "Encrypted Transmission" }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      document.body.style.overflow = "";
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="signal-modal"
          className="active fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="modal-backdrop absolute inset-0 bg-void/90 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            className="relative w-full max-w-2xl border border-white/10 bg-gunmetal/95 clip-frame overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: ease.outExpo }}
          >
            <div className="absolute inset-0 grid-fine opacity-40 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

            <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/8">
              <div>
                <p id="modal-title" className="text-micro text-accent">
                  Signal Stream
                </p>
                <p className="font-display text-2xl text-white tracking-wide mt-1">{title}</p>
              </div>
              <button
                id="modal-close-btn"
                ref={closeRef}
                onClick={onClose}
                className="text-micro text-fog hover:text-white px-3 py-2 border border-white/10 hover:border-white/25 transition-colors data-interactive"
                data-interactive
                aria-label="Close transmission"
              >
                Close [ESC]
              </button>
            </div>

            <div className="relative aspect-video bg-black scanlines flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('/assets/images/conflict_bg.jpg')] bg-cover bg-center opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
              <div className="relative z-10 text-center px-8">
                <div className="mx-auto mb-5 size-16 rounded-full border border-accent/40 flex items-center justify-center">
                  <div className="w-0 h-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-accent ml-1" />
                </div>
                <p className="font-display text-3xl md:text-4xl text-white tracking-wide">
                  Field Recording 07
                </p>
                <p className="text-label text-fog mt-3 max-w-sm mx-auto normal-case tracking-normal font-body font-light">
                  Drop-pod insertion over Sector STN-07. Payload integrity unverified.
                </p>
              </div>
              <div className="absolute bottom-4 left-4 text-micro text-accent/70">
                REC // 2084.11.23
              </div>
              <div className="absolute bottom-4 right-4 text-micro text-cold">
                Uplink 48kb/s
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
