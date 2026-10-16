import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ease } from '../../lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export function Modal({ open, onClose, title = 'Encrypted transmission' }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      document.body.style.overflow = '';
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
            className="modal-backdrop absolute inset-0 bg-bone"
            style={{ opacity: 0.92 }}
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            className="relative w-full max-w-2xl bg-void clip-notch overflow-hidden"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: ease.outExpo }}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-steel">
              <div>
                <p className="text-sm font-semibold text-cold">Signal stream</p>
                <p id="modal-title" className="font-display text-2xl text-bone mt-1">{title}</p>
              </div>
              <button
                id="modal-close-btn"
                ref={closeRef}
                onClick={onClose}
                className="btn-press text-base font-medium text-bone px-4 py-2 bg-steel clip-notch-sm"
                data-interactive
                aria-label="Close transmission"
              >
                Close
              </button>
            </div>

            <div className="relative aspect-video bg-bone flex items-center justify-center overflow-hidden">
              <img
                src="/assets/images/conflict_bg.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.35 }}
              />
              <div className="relative z-10 text-center px-8">
                <p className="font-display text-3xl md:text-4xl text-void">
                  Field recording 07
                </p>
                <p className="text-base text-void mt-3 max-w-sm mx-auto">
                  Drop-pod insertion over Sector STN-07. Payload integrity unverified.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
