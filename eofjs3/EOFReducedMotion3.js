// ===== Prefers Reduced Motion =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.querySelectorAll('.gradient-orb, .floating-card').forEach(el => {
        el.style.animation = 'none';
    });
}
