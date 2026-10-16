import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ease } from '../../lib/utils';

interface DeployProps {
  onTrailer?: () => void;
}

/**
 * One word is the button: the whole yellow band is the link.
 * Chamfered top corners carry the motif.
 */
export function Deploy({ onTrailer: _onTrailer }: DeployProps) {
  void _onTrailer;
  return (
    <section id="deploy" className="relative bg-void">
      <Link
        to="/deploy"
        aria-label="Deploy: go to deployment"
        className="group block bg-accent clip-cta"
      >
        <span className="section-pad container-wide px-[var(--margin)] block min-h-[60svh]">
          <span className="flex items-start justify-between gap-6">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: ease.outExpo }}
              className="text-xl text-bone max-w-[28ch] leading-snug"
            >
              Free to play on PC, PlayStation 5 and Xbox. 24 GB. 12-player lobbies.
            </motion.span>
            <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden className="shrink-0">
              <path d="M8 40 L40 8 M16 8 h24 v24" stroke="currentColor" strokeWidth="4" fill="none" color="#0d2a1c" />
            </svg>
          </span>
          <motion.span
            initial={{ y: '40%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: ease.outExpo }}
            className="block font-display font-bold text-bone leading-none mt-10 deploy-word"
          >
            Deploy
          </motion.span>
        </span>
      </Link>
    </section>
  );
}
