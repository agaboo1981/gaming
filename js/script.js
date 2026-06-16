const fallbackImageUrl = new URL('../assets/images/fallback-gaming.svg', import.meta.url).href;

const operativesData = {
    razeon: {
        name: 'RAZEON',
        role: 'ENTRY DUELIST',
        difficulty: 80,
        lore: 'A high-mobility shock operator specializing in rapid breaches and space-making maneuvers. Razeon utilizes reactive kinetic kits to displace crosshairs and force early round compromises on site defenders.',
        visual: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
        abilities: [
            { name: 'KINETIC BREACH', trigger: 'Q', desc: 'Fires directional kinetic charges that stick to surfaces and detonate, creating displacement waves and visual debris.' },
            { name: 'FLASH DASH', trigger: 'E', desc: 'Instantly dashes in the direction of movement, gaining temporary camera sway immunity.' },
            { name: 'OVERLOAD COMPRESSION', trigger: 'X', desc: 'Equips a high-yield compression launcher that deals massive radial impact and opens structural panels.' }
        ]
    },
    myra: {
        name: 'MYRA',
        role: 'ZONE CONTROLLER',
        difficulty: 60,
        lore: 'A tactical grid master who shapes terrain sightlines. Myra deploys micro-particle occlusion grids that block diagnostic visual channels, isolating hostiles and controlling retake angles.',
        visual: 'https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=600&auto=format&fit=crop',
        abilities: [
            { name: 'PARTICLE DEPLOY', trigger: 'Q', desc: 'Deploys an emitter that projects a hollow sphere of visual occlusion particles.' },
            { name: 'AXIAL SMOKE', trigger: 'E', desc: 'Directly targets spatial coordinates to establish line-clamping smoke barriers.' },
            { name: 'NEURAL GRIDLOCK', trigger: 'X', desc: 'Triggers a global signal dampening field, reducing hostile audio logs and radar ranges.' }
        ]
    },
    vex: {
        name: 'VEX',
        role: 'TRAP SENTINEL',
        difficulty: 90,
        lore: 'A defensive network engineer specializing in automated deterrent arrays. Vex transforms site entryways into locked grid structures, punishing aggressive corridor pushes.',
        visual: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop',
        abilities: [
            { name: 'TRIPWIRE LASER', trigger: 'Q', desc: 'Places a stealth tripwire between structural columns. Tripping triggers auditory telemetry and flash alerts.' },
            { name: 'SLOWING CORE', trigger: 'E', desc: 'Throws a cryogenic core that creates a localized field of low-friction movement speed reduction.' },
            { name: 'TURRET SENTRY', trigger: 'X', desc: 'Deploys an automated micro-targeting sentry that fires hitscan bursts at detected hostiles.' }
        ]
    },
    kairo: {
        name: 'KAIRO',
        role: 'INTEL INITIATOR',
        difficulty: 45,
        lore: 'A forward scout utilizing micro-drone reconnaissance. Kairo gathers crucial movement data, verifying enemy rotation tracks and revealing team formations.',
        visual: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=600&auto=format&fit=crop',
        abilities: [
            { name: 'RECON DRONE', trigger: 'Q', desc: 'Launches a steerable drone equipped with tagging darts.' },
            { name: 'SCAN PULSE', trigger: 'E', desc: 'Fires a sonic arrow that scans geometry layers and displays signatures on local HUDs.' },
            { name: 'SATELLITE COMPRESSION', trigger: 'X', desc: 'Deploys a satellite beam that scans key lanes, disorienting defenders.' }
        ]
    }
};

const modesData = {
    breach: {
        name: 'TACTICAL BREACH',
        role: 'ROUND FORMAT // ECONOMIC SWINGS',
        lore: 'The premier competitive discipline of NEXUS: CONFLICT. Teams alternate halves as attackers or defenders over a best-of-24 format. Attackers deploy spike utility spikes; defenders disarm under active utility pressure.',
        visual: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
        teamSize: '5 v 5',
        duration: '35 - 45 Mins',
        difficulty: 'Tactical (High)',
        strategy: 'Buy-phase economic optimization, weapon buy synchronization, and entry utility orchestration.'
    },
    payload: {
        name: 'PAYLOAD RUN',
        role: 'OBJECTIVE FORMAT // ROUTE CONTROL',
        lore: 'An asymmetrical progression scenario where the attacking cohort guides a mobile telemetry cart along a path of grid coordinates. Speed of transport scales with attacker proximity.',
        visual: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
        teamSize: '5 v 5',
        duration: '20 - 30 Mins',
        difficulty: 'Execution (Medium)',
        strategy: 'Lane division pressure, ultimate capability chaining, and checkpoint spatial locking.'
    },
    dominion: {
        name: 'DOMINION CONTROL',
        role: 'TERRITORY FORMAT // DUAL CAPTURE',
        lore: 'Teams contest key lane junctions across the battlefield. Retaining control points triggers operational score loops. Demands flexible rotations and localized small-squad skirmishes.',
        visual: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop',
        teamSize: '5 v 5',
        duration: '15 - 25 Mins',
        difficulty: 'Macro Routing (Medium)',
        strategy: 'Split defensive structures, rapid communication grids, and lane-clear utility retention.'
    },
    elimination: {
        name: 'LAST SQUAD STANDING',
        role: 'SURVIVAL FORMAT // ELIMINATION',
        lore: 'A high-stakes format featuring limited economic pools and zero respawns. Players receive singular active utility kits per round. Perfect for high-intensity tournament tie-breakers.',
        visual: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=600&auto=format&fit=crop',
        teamSize: '3 v 3',
        duration: '10 - 15 Mins',
        difficulty: 'Precision (Extreme)',
        strategy: 'Crosshair discipline, physical spacing, utility scarcity budgeting, and clutch execution.'
    }
};

const loopPhases = [
    'PREPARATION // LOADOUT CONTROL: Team allocates budget pools, coordinates active agent select setups, and purchases utility charges.',
    'CONTESTING // INTELLIGENCE GATHERING: Forward entry scouts clear corridors using sonar darts and visual occlusion fields, identifying rotation routes.',
    'COMMITMENT // BREACH COORDINATION: Team initiates execute protocol. Entry specialists deploy flash capabilities, and controllers sweep site corners.',
    'RESOLUTION // POSITION LOCKDOWN: Defenders coordinate retake parameters or plant spike defense structures, managing remaining timer frames.'
];

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initMobileMenu();
    initTabs();
    initAccordion();
    initModal();
    initSmoothScroll();
    initNewsletterForm();
    initScrollEffects();
    initImageFallbacks();
    initOperativeSelector();
    initModesSelector();
});

function initImageFallbacks() {
    const images = document.querySelectorAll('img');

    images.forEach((img) => {
        const applyFallback = () => {
            if (img.dataset.fallbackApplied === 'true') return;
            img.dataset.fallbackApplied = 'true';
            img.src = fallbackImageUrl;
            if (!img.alt || /^(screenshot|artwork|trailer|gameplay|dev diary)$/i.test(img.alt.trim())) {
                img.alt = 'NEXUS: CONFLICT visual';
            }
        };

        img.addEventListener('error', applyFallback, { once: true });

        if (img.complete && img.naturalWidth === 0) {
            applyFallback();
        }
    });
}

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor || window.innerWidth <= 768 || 'ontouchstart' in window) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.transform = `translate(${cursorX - 8}px, ${cursorY - 8}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.body.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .interactive-element, .gallery-item, .store-btn')) {
            cursor.classList.add('hover');
        }
    });

    document.body.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, .interactive-element, .gallery-item, .store-btn')) {
            cursor.classList.remove('hover');
        }
    });

    document.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));
}

function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const progressBar = document.querySelector('.scroll-progress');

    let docHeight = 0;
    let scrollY = 0;
    let ticking = false;

    const calculateDocHeight = () => {
        docHeight = document.body.scrollHeight - window.innerHeight;
    };
    
    window.addEventListener('load', calculateDocHeight);
    window.addEventListener('resize', calculateDocHeight);
    calculateDocHeight();

    const updateScrollMetrics = () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 50);
        }

        if (progressBar && docHeight > 0) {
            progressBar.style.width = `${(scrollY / docHeight) * 100}%`;
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(updateScrollMetrics);
            ticking = true;
        }
    }, { passive: true });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (!targetId.startsWith('#')) return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Keep core functions, mobile menus, modal traps unchanged
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const closeBtn = document.getElementById('mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!toggle || !menu) return;

    const closeMenu = () => {
        menu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
        toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            menu.classList.add('active');
            if (overlay) overlay.classList.add('active');
            document.body.classList.add('no-scroll');
            toggle.setAttribute('aria-expanded', 'true');
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
}

function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-tab');
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            const target = document.getElementById(targetId);
            if (target) target.classList.add('active');
        });
    });
}

function initAccordion() {
    document.querySelectorAll('.accordion-item').forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        }
    });
}

function initModal() {
    let previousActiveElement = null;

    window.openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            previousActiveElement = document.activeElement;
            modal.classList.add('active');
            document.body.classList.add('no-scroll');
            modal.setAttribute('aria-hidden', 'false');
            
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) closeBtn.focus();

            trapFocus(modal);
        }
    };

    window.closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('no-scroll');
            modal.setAttribute('aria-hidden', 'true');
            if (previousActiveElement) {
                previousActiveElement.focus();
            }
        }
    };

    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusableElements.length) return;
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', () => {
            const modal = backdrop.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => closeModal(modal.id));
        }
    });

    document.querySelectorAll('[data-open-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-open-modal');
            if (modalId) openModal(modalId);
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.classList.contains('nav-link') || anchor.classList.contains('mobile-link')) return;
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('.newsletter-input');
        if (input && input.value && input.checkValidity()) {
            input.value = '';
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                const originalText = btn.textContent;
                btn.textContent = 'STATUS: SUBSCRIBED';
                btn.disabled = true;
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 4000);
            }
        }
    });
}

function initOperativeSelector() {
    const selectorPanel = document.querySelector('.operative-selection-list');
    const briefingPanel = document.getElementById('operative-details-panel');
    if (!selectorPanel || !briefingPanel) return;

    const renderOperative = (id) => {
        const data = operativesData[id];
        if (!data) return;

        briefingPanel.style.opacity = '0';
        setTimeout(() => {
            let abilitiesHtml = '';
            data.abilities.forEach(ability => {
                abilitiesHtml += `
                    <div class="op-ability-card">
                        <div class="ability-meta">
                            <span class="ability-name">${ability.name}</span>
                            <span class="ability-trigger">// ${ability.trigger}</span>
                        </div>
                        <p class="ability-description">${ability.desc}</p>
                    </div>
                `;
            });

            briefingPanel.innerHTML = `
                <div class="op-brief-container">
                    <div class="op-visual-card">
                        <img src="${data.visual}" alt="${data.name} visual file preview" width="600" height="750">
                    </div>
                    <div class="op-details-meta">
                        <div class="op-identity">
                            <h3 class="op-codename">${data.name}</h3>
                            <span class="op-class-label">// SYSTEM_CLASS: ${data.role}</span>
                        </div>
                        
                        <div class="op-metric-row">
                            <div class="op-metric-header">
                                <span>OPERATIONAL DIFFICULTY</span>
                                <span>${data.difficulty}%</span>
                            </div>
                            <div class="op-metric-bar-outer" aria-hidden="true">
                                <div class="op-metric-bar-fill" style="width: ${data.difficulty}%"></div>
                            </div>
                        </div>

                        <p class="op-lore-brief">${data.lore}</p>

                        <div class="op-abilities-section">
                            <h4 class="op-abilities-header">ACTIVE UTILITY SPECIFICATIONS</h4>
                            <div class="op-abilities-grid">
                                ${abilitiesHtml}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            briefingPanel.style.opacity = '1';
        }, 200);
    };

    const tiles = selectorPanel.querySelectorAll('.selector-tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            tiles.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tile.classList.add('active');
            tile.setAttribute('aria-selected', 'true');
            const opId = tile.getAttribute('data-op-id');
            renderOperative(opId);
        });
    });

    // Initial render
    const defaultTile = selectorPanel.querySelector('.selector-tile.active');
    if (defaultTile) {
        renderOperative(defaultTile.getAttribute('data-op-id'));
    }
}

function initModesSelector() {
    const selectorPanel = document.querySelector('.mode-selection-list');
    const briefingPanel = document.getElementById('mode-details-panel');
    const timelineContainer = document.querySelector('.cycle-timeline-grid');
    const timelineTerminal = document.getElementById('cycle-details-terminal');

    if (selectorPanel && briefingPanel) {
        const renderMode = (id) => {
            const data = modesData[id];
            if (!data) return;

            briefingPanel.style.opacity = '0';
            setTimeout(() => {
                briefingPanel.innerHTML = `
                    <div class="mode-brief-container">
                        <div class="mode-visual-card">
                            <img src="${data.visual}" alt="${data.name} scene preview" width="600" height="750">
                        </div>
                        <div class="mode-details-meta">
                            <div class="mode-identity">
                                <h3 class="mode-codename">${data.name}</h3>
                                <span class="mode-class-label">// FORMAT: ${data.role}</span>
                            </div>

                            <p class="mode-lore-brief">${data.lore}</p>

                            <div class="mode-specs-grid">
                                <div class="spec-item">
                                    <span class="spec-label">SQUAD COUNT</span>
                                    <span class="spec-value">${data.teamSize}</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">MATCH CYCLE</span>
                                    <span class="spec-value">${data.duration}</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">DIFFICULTY METRIC</span>
                                    <span class="spec-value">${data.difficulty}</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">CORE PROTOCOL</span>
                                    <span class="spec-value">${data.strategy}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                briefingPanel.style.opacity = '1';
            }, 200);
        };

        const tiles = selectorPanel.querySelectorAll('.selector-tile');
        tiles.forEach(tile => {
            tile.addEventListener('click', () => {
                tiles.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tile.classList.add('active');
                tile.setAttribute('aria-selected', 'true');
                const modeId = tile.getAttribute('data-mode-id');
                renderMode(modeId);
            });
        });

        // Initial render
        const defaultTile = selectorPanel.querySelector('.selector-tile.active');
        if (defaultTile) {
            renderMode(defaultTile.getAttribute('data-mode-id'));
        }
    }

    if (timelineContainer && timelineTerminal) {
        const renderPhaseDetails = (index) => {
            timelineTerminal.style.opacity = '0';
            setTimeout(() => {
                timelineTerminal.textContent = loopPhases[index] || '';
                timelineTerminal.style.opacity = '1';
            }, 150);
        };

        const phases = timelineContainer.querySelectorAll('.cycle-phase');
        phases.forEach(phase => {
            phase.addEventListener('click', () => {
                phases.forEach(p => p.classList.remove('active'));
                phase.classList.add('active');
                const index = parseInt(phase.getAttribute('data-phase-index'), 10);
                renderPhaseDetails(index);
            });
        });

        // Initial phase render
        const activePhase = timelineContainer.querySelector('.cycle-phase.active');
        if (activePhase) {
            renderPhaseDetails(parseInt(activePhase.getAttribute('data-phase-index'), 10));
        }
    }
}
