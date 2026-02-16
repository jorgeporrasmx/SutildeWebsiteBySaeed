/**
 * Sutilde.com Scroll Animations
 * Maneja animaciones on-scroll con IntersectionObserver
 */

(function() {
    'use strict';

    // Configuración del observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    // Callback del observer
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Opcional: dejar de observar después de animar
                // observer.unobserve(entry.target);
            }
        });
    };

    // Crear observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Inicializar cuando el DOM esté listo
    function init() {
        // Añadir clases de animación a elementos
        addAnimationClasses();
        
        // Observar elementos
        observeElements();
        
        // Navbar scroll effect
        setupNavbarScroll();
        
        // Smooth scroll para links internos
        setupSmoothScroll();
    }

    // Añadir clases de animación automáticamente
    function addAnimationClasses() {
        // Secciones principales - fade in up
        document.querySelectorAll('section').forEach((section, index) => {
            if (!section.classList.contains('hero') && !section.classList.contains('hero-section')) {
                section.classList.add('fade-in-up');
            }
        });

        // Cards - fade in scale
        document.querySelectorAll('.service-card, .feature-card, .benefit-card, .case-card, .card').forEach(card => {
            card.classList.add('fade-in-scale');
        });

        // Grids con stagger
        document.querySelectorAll('.services-grid, .features-grid, .benefits-grid, .cases-grid').forEach(grid => {
            grid.classList.add('stagger-children');
        });
    }

    // Observar elementos con clases de animación
    function observeElements() {
        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-scale, .stagger-children');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Efecto de navbar al hacer scroll
    function setupNavbarScroll() {
        const navbar = document.querySelector('.navbar, header nav, header');
        if (!navbar) return;

        let lastScroll = 0;
        const scrollThreshold = 50;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // Smooth scroll para links internos
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
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

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Exponer función para re-inicializar si es necesario
    window.SutildeAnimations = { init };
})();
