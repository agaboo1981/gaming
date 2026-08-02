const rq = (id) => document.getElementById(id);
const qa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const motionOk = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let targetScrollY = window.pageYOffset;
let currentScrollY = window.pageYOffset;
let targetMouseX = 0;
let targetMouseY = 0;
let currentMouseX = 0;
let currentMouseY = 0;

const heroBg = rq('hero-bg');

if (motionOk()) {
  window.addEventListener(
    'scroll',
    () => {
      targetScrollY = window.pageYOffset;
    },
    { passive: true },
  );
}

function animate() {
  if (motionOk()) {
    currentScrollY += (targetScrollY - currentScrollY) * 0.08;
    if (heroBg) {
      heroBg.style.transform = `scale(1.05) translate3d(0, ${currentScrollY * 0.3}px, 0)`;
    }
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

const progressBar = rq('scroll-progress');
if (progressBar) {
  window.addEventListener(
    'scroll',
    () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) progressBar.style.width = `${(window.pageYOffset / total) * 100}%`;
    },
    { passive: true },
  );
}

const navbar = rq('navbar');
if (navbar) {
  window.addEventListener(
    'scroll',
    () => {
      const scrolled = window.pageYOffset > 50;
      navbar.style.background = scrolled ? 'rgba(10, 10, 12, 0.98)' : 'rgba(10, 10, 12, 0.9)';
      navbar.style.height = scrolled ? '64px' : 'var(--nav-height)';
    },
    { passive: true },
  );
}

const TABS_KEY = { ArrowDown: 1, ArrowUp: -1, Home: 'home', End: 'end' };

function initTabs(container) {
  const tabs = qa('[role="tab"]', container);
  const panels = qa('[role="tabpanel"]', container);
  if (!tabs.length) return;

  const activate = (tab) => {
    tabs.forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    panels.forEach((p) => p.classList.remove('active'));

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const panel = rq(tab.getAttribute('aria-controls'));
    if (panel) panel.classList.add('active');
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (e) => {
      const key = TABS_KEY[e.key];
      if (key === undefined) return;
      e.preventDefault();

      let next;
      if (key === 'home') next = 0;
      else if (key === 'end') next = tabs.length - 1;
      else next = (i + key + tabs.length) % tabs.length;

      tabs[next].focus();
      activate(tabs[next]);
    });
  });
}

initTabs(document.querySelector('.operative-interface'));

const focusableEls =
  'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

function trapFocus(container) {
  const els = qa(focusableEls, container);
  if (!els.length) return () => {};
  const first = els[0];
  const last = els[els.length - 1];

  const handler = (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  container.addEventListener('keydown', handler);
  first.focus();
  return () => container.removeEventListener('keydown', handler);
}

const modal = rq('signal-modal');
const trailerBtn = rq('trailer-btn');
const modalClose = rq('modal-close-btn');
const modalBackdrop = rq('modal-backdrop');
let releaseFocus = null;

if (modal && trailerBtn) {
  const openModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', escHandler);
    releaseFocus = trapFocus(modal);
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', escHandler);
    if (releaseFocus) {
      releaseFocus();
      releaseFocus = null;
    }
    trailerBtn.focus();
  };

  const escHandler = (e) => {
    if (e.key === 'Escape') closeModal();
  };

  trailerBtn.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
}

const recruitBtn = rq('recruit-btn');
const terminusSection = rq('terminus');
if (recruitBtn && terminusSection) {
  recruitBtn.addEventListener('click', () => {
    terminusSection.scrollIntoView({ behavior: motionOk() ? 'smooth' : 'auto' });
  });
}

const recruitForm = rq('recruit-form');
if (recruitForm) {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  recruitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = rq('contractor-email');
    const errorEl = recruitForm.querySelector('.form-error');

    if (!input) return;

    if (!input.value || !emailRe.test(input.value)) {
      input.classList.add('error');
      if (errorEl) errorEl.textContent = 'Enter a valid email address';
      return;
    }

    input.classList.remove('error');
    if (errorEl) errorEl.textContent = '';

    const btn = recruitForm.querySelector('.btn');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = 'Signal Sent //';
      btn.style.opacity = '0.6';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.opacity = '1';
        btn.disabled = false;
        input.value = '';
      }, 2500);
    }
  });

  const emailInput = rq('contractor-email');
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      emailInput.classList.remove('error');
      const errorEl = recruitForm.querySelector('.form-error');
      if (errorEl) errorEl.textContent = '';
    });
  }
}

const mobileToggle = rq('mobile-toggle');
const mobileMenu = rq('mobile-menu');
const mobileClose = rq('mobile-close');
const mobileOverlay = rq('mobile-menu-overlay');

if (mobileToggle && mobileMenu) {
  let releaseMenuFocus = null;

  const mobEscHandler = (e) => {
    if (e.key === 'Escape') closeMenu();
  };

  const openMenu = () => {
    mobileMenu.classList.add('active');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', mobEscHandler);
    releaseMenuFocus = trapFocus(mobileMenu);
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', mobEscHandler);
    if (releaseMenuFocus) {
      releaseMenuFocus();
      releaseMenuFocus = null;
    }
    mobileToggle.focus();
  };

  mobileToggle.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

if (motionOk()) {
  const revealEls = qa('.dossier-card, .mode-card, .stage-card');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 },
    );

    revealEls.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
}
