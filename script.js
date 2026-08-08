/* =========================================================================
   Lorada Scholars Academy — Shared Script (safe on all 6 pages)
   ========================================================================= */
(function () {
    'use strict';

    // ── Enable JS gating for CSS ──
    document.documentElement.classList.add('js');

    // ── Reduced-motion helper ──
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    // ── DOM lookups (null-safe) ──
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');

    // ── Mobile menu ──
    let backdrop = null;

    function createBackdrop() {
        if (backdrop) return backdrop;
        backdrop = document.createElement('div');
        backdrop.className = 'menu-backdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.appendChild(backdrop);
        backdrop.addEventListener('click', closeMenu);
        return backdrop;
    }

    function openMenu() {
        createBackdrop();
        navMenu.classList.add('active');
        menuToggle.classList.add('active');
        document.body.classList.add('menu-open');
        backdrop.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        if (!navMenu || !menuToggle) return;
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        if (backdrop) backdrop.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    if (menuToggle && navMenu) {
        menuToggle.setAttribute('aria-expanded', 'false');

        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('active');
            if (isOpen) closeMenu(); else openMenu();
        });

        // Close on nav-link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close on Escape
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) closeMenu();
        });

        // Force-close when resizing past breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth > 968 && navMenu.classList.contains('active')) closeMenu();
        });
    }

    // ── Navbar scroll ──
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.pageYOffset > 50);
        }, { passive: true });
    }

    // ── Back-to-top button ──
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = '&#8593;';
    document.body.appendChild(backToTop);

    let backToTopVisible = false;
    window.addEventListener('scroll', () => {
        if (backToTopVisible !== (window.pageYOffset > 500)) {
            backToTopVisible = !backToTopVisible;
            backToTop.classList.toggle('visible', backToTopVisible);
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });

    // ── Reveal-on-scroll ──
    const revealSelectors = [
        '.section-header',
        '.stat-card',
        '.program-card',
        '.program-detail-card',
        '.faculty-card',
        '.value-card',
        '.contact-card',
        '.info-card',
        '.sidebar-card',
        '.form-card',
        '.about-content',
        '.about-image',
        '[data-reveal]'
    ];

    function setupReveals() {
        if (!('IntersectionObserver' in window) || prefersReducedMotion) return;

        const elements = document.querySelectorAll(revealSelectors.join(','));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add('revealed');
                    el.dataset.revealed = 'true';
                    observer.unobserve(el);
                    // Remove .reveal after transition to restore base hover/tilt transforms
                    setTimeout(() => el.classList.remove('reveal'), 1000);
                }
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

        let revealIndex = 0;
        elements.forEach(el => {
            el.classList.add('reveal');
            el.style.setProperty('--reveal-delay', ((revealIndex % 4) * 80) + 'ms');
            revealIndex++;
            observer.observe(el);
        });
    }
    setupReveals();

    // ── Forms — generic handler for all forms with class "inquiry-form" ──
    const defaultSuccessMsg = 'Thank you for your inquiry! We will contact you soon.';

    function showNotification(message, type) {
        type = type || 'success';
        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.innerHTML =
            '<div class="notification-content">' +
            '<span class="notification-icon">' + (type === 'success' ? '✓' : '✕') + '</span>' +
            '<span class="notification-message">' + message + '</span>' +
            '</div>';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    document.querySelectorAll('form.inquiry-form').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const msg = form.dataset.success || defaultSuccessMsg;
            showNotification(msg, 'success');
            form.reset();
        });
    });

    // ── Card tilt (desktop only, after reveal) ──
    if (isFinePointer && !prefersReducedMotion) {
        document.querySelectorAll('.program-card, .faculty-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                if (!card.dataset.revealed) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ── Hero parallax (desktop only, non-touch, respects reduced motion) ──
    if (!prefersReducedMotion && isFinePointer) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const hero = document.querySelector('.hero');
                    if (hero && scrolled < window.innerHeight) {
                        hero.style.transform = 'translate3d(0,' + (scrolled * 0.5) + 'px,0)';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

})();
