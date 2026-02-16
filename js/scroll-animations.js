/**
 * Sutilde.com Scroll Animations v2
 * Optimizado para clases existentes
 */

(function() {
    'use strict';

    // Header scroll effect
    function setupHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (window.scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // Animate elements on scroll
    function setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Añadir clase y observar elementos
        const animateElements = [
            '.service-card',
            '.flip-card',
            '.testimonial-card',
            '.faq-item',
            '.process-step',
            '.timeline-step',
            '.footer-section'
        ];

        animateElements.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.classList.add('animate-on-scroll');
                el.style.transitionDelay = `${index * 0.1}s`;
                observer.observe(el);
            });
        });
    }

    // Smooth scroll
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Init
    function init() {
        setupHeaderScroll();
        setupScrollAnimations();
        setupSmoothScroll();
        
        // Mark body as loaded for any initial animations
        document.body.classList.add('loaded');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
