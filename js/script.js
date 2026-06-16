/* ==========================================================================
   NEXUS: CONFLICT - AAA INTERACTION DESIGN & OPTIMIZED ANIMATION LOOPS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Decoupled animation states
    let targetScrollY = window.pageYOffset;
    let currentScrollY = window.pageYOffset;
    
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    
    const cursor = document.getElementById('custom-cursor');
    const heroBg = document.getElementById('hero-bg');
    
    // Track mouse coordinates dynamically
    document.addEventListener('mousemove', (e) => {
        targetMouseX = e.clientX;
        targetMouseY = e.clientY;
    }, { passive: true });

    // Track scroll coordinates passively without triggering main layout recalcs
    window.addEventListener('scroll', () => {
        targetScrollY = window.pageYOffset;
    }, { passive: true });

    // 2. High performance animation frame update loop
    function animate() {
        // Linear interpolation (lerp) coefficients
        const cursorEase = 0.15;
        const scrollEase = 0.08;

        // Lerp custom cursor coordinates
        currentMouseX += (targetMouseX - currentMouseX) * cursorEase;
        currentMouseY += (targetMouseY - currentMouseY) * cursorEase;

        if (cursor) {
            // Apply coordinates via GPU-accelerated translate3d
            cursor.style.transform = `translate3d(${currentMouseX}px, ${currentMouseY}px, 0) translate(-50%, -50%)`;
        }

        // Lerp scroll coordinates for background parallax
        currentScrollY += (targetScrollY - currentScrollY) * scrollEase;

        if (heroBg) {
            // Update parallax offset smoothly using translate3d
            heroBg.style.transform = `scale(1.05) translate3d(0, ${currentScrollY * 0.3}px, 0)`;
        }

        requestAnimationFrame(animate);
    }
    
    // Start animation loop
    requestAnimationFrame(animate);

    // 3. Hover expansions for clickable elements
    const interactiveElements = document.querySelectorAll('a, button, .map-card, input');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            if (cursor) cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) cursor.classList.remove('hover');
        });
    });

    // 4. Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const percentage = (window.pageYOffset / totalScroll) * 100;
                progressBar.style.width = `${percentage}%`;
            }
        }, { passive: true });
    }

    // 5. Operative Tab Switcher
    const opTabs = document.querySelectorAll('.op-tab');
    const opViewers = document.querySelectorAll('.operative-viewer');

    if (opTabs.length > 0 && opViewers.length > 0) {
        opTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                const targetOp = tab.getAttribute('data-op');

                opTabs.forEach(t => t.classList.remove('active'));
                opViewers.forEach(v => v.classList.remove('active'));

                tab.classList.add('active');
                const targetViewer = document.getElementById(`op-${targetOp}`);
                if (targetViewer) {
                    targetViewer.classList.add('active');
                }
            });
        });
    }

    // 6. Game Mode Accordion
    const accItems = document.querySelectorAll('.mode-acc-item');
    if (accItems.length > 0) {
        accItems.forEach((item) => {
            const trigger = item.querySelector('.mode-acc-trigger');
            if (trigger) {
                trigger.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    accItems.forEach(i => i.classList.remove('active'));
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // 7. Navigation Scroll Blur Effects
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                navbar.style.background = 'rgba(7, 7, 8, 0.98)';
                navbar.style.height = '70px';
            } else {
                navbar.style.background = 'rgba(7, 7, 8, 0.9)';
                navbar.style.height = '80px';
            }
        }, { passive: true });
    }

    // 8. Video Trailer Modal Controls
    const trailerBtn = document.getElementById('trailer-btn');
    const trailerModal = document.getElementById('trailer-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const iframe = document.getElementById('trailer-video');

    if (trailerBtn && trailerModal) {
        const openModal = () => {
            trailerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            trailerModal.classList.remove('active');
            document.body.style.overflow = '';
            
            if (iframe) {
                const tempSrc = iframe.src;
                iframe.src = '';
                iframe.src = tempSrc;
            }
        };

        trailerBtn.addEventListener('click', openModal);
        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
        if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    }

    // Infiltration CTA click scroll
    const recruitBtn = document.getElementById('recruit-btn');
    const terminusSection = document.getElementById('terminus');
    if (recruitBtn && terminusSection) {
        recruitBtn.addEventListener('click', () => {
            terminusSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 9. Mobile Menu Navigation
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileClose = document.getElementById('mobile-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    if (mobileToggle && mobileMenu) {
        const openMenu = () => {
            mobileMenu.classList.add('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            mobileMenu.classList.remove('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        mobileToggle.addEventListener('click', openMenu);
        if (mobileClose) mobileClose.addEventListener('click', closeMenu);
        if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);
    }

    // 10. Telemetry Dynamic Glitch Numbers
    const telemetryElements = document.querySelectorAll('.telemetry');
    if (telemetryElements.length > 0) {
        setInterval(() => {
            telemetryElements.forEach(el => {
                if (Math.random() > 0.85) {
                    const originalText = el.textContent;
                    if (originalText.includes('LATENCY')) {
                        const newLatency = Math.floor(Math.random() * 20) + 5;
                        el.textContent = `NET_BREACH_INITIALIZED // LATENCY: ${newLatency}MS`;
                        setTimeout(() => {
                            el.textContent = originalText;
                        }, 150);
                    }
                }
            });
        }, 3000);
    }
});
