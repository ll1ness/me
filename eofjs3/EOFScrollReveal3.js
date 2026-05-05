// ===== Scroll Reveal Animations =====
const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item, .about-text, .about-visual, .contact-info, .chat-container');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});
