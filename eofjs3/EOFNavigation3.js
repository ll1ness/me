// ===== Navigation =====
let nav, navToggle, navMenu, navLinks;

function initNavigation() {
    nav = document.querySelector('.nav');
    navToggle = document.querySelector('.nav-toggle');
    navMenu = document.querySelector('.nav-menu');
    navLinks = document.querySelectorAll('.nav-link');

    if (!nav) {
        console.warn('Navigation element not found - header may not be loaded yet');
        return;
    }

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    if (navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navToggle) navToggle.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
            });
        });
    }
}

// Wait for header to be loaded, then initialize navigation
function tryInitNavigation() {
    const nav = document.querySelector('.header-include .nav');
    const navToggle = document.querySelector('.header-include .nav-toggle');
    const navMenu = document.querySelector('.header-include .nav-menu');
    if (nav && navToggle && navMenu) {
        initNavigation();
        return true;
    }
    return false;
}

// Check immediately in case header is already loaded
if (!tryInitNavigation()) {
    // Set up a MutationObserver to detect when header is added
    const headerInclude = document.querySelector('.header-include');
    if (headerInclude) {
        const observer = new MutationObserver(() => {
            if (tryInitNavigation()) {
                observer.disconnect();
            }
        });
        observer.observe(headerInclude, { childList: true, subtree: true });
    } else {
        // Fallback to polling if .header-include not found
        const fallbackPoll = () => {
            if (!tryInitNavigation()) {
                setTimeout(fallbackPoll, 50);
            }
        };
        fallbackPoll();
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
