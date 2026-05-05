// ===== Global Background Animation =====
class GlobalBackground {
    constructor() {
        this.container = null;
        this.mouseTimeout = null;
        this.keyboardTimeout = null;
        this.orbs = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetMouseX = 0;
        this.targetMouseY = 0;
        this.animationFrame = null;
        this.init();
    }

    init() {
        this.createContainer();
        this.createOrbs();
        this.bindEvents();
        this.startAnimation();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'global-background';
        document.body.insertBefore(this.container, document.body.firstChild);
    }

    createOrbs() {
        const orbConfigs = [
            { className: 'bg-orb-1', baseX: 0, baseY: 0, speed: 0.02, radius: 300 },
            { className: 'bg-orb-2', baseX: 0, baseY: 0, speed: 0.015, radius: 250 },
            { className: 'bg-orb-3', baseX: 0, baseY: 0, speed: 0.01, radius: 200 },
            { className: 'bg-orb-4', baseX: 0, baseY: 0, speed: 0.025, radius: 150 },
            { className: 'bg-orb-5', baseX: 0, baseY: 0, speed: 0.018, radius: 225 }
        ];

        orbConfigs.forEach((config, index) => {
            const orb = document.createElement('div');
            orb.className = `bg-orb ${config.className}`;
            this.container.appendChild(orb);
            this.orbs.push({
                element: orb,
                baseX: config.baseX,
                baseY: config.baseY,
                x: config.baseX,
                y: config.baseY,
                speed: config.speed,
                radius: config.radius,
                phase: Math.random() * Math.PI * 2
            });
        });
    }

    bindEvents() {
        // Mouse move - track position for parallax effect
        document.addEventListener('mousemove', (e) => {
            this.targetMouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            this.targetMouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
            this.container.classList.add('mouse-active');
            clearTimeout(this.mouseTimeout);
            this.mouseTimeout = setTimeout(() => {
                this.container.classList.remove('mouse-active');
            }, 2000);
        });

        // Keyboard events - create ripple effect
        document.addEventListener('keydown', (e) => {
            this.createRipple(e.key);
            document.body.classList.add('keyboard-press');
            clearTimeout(this.keyboardTimeout);
            this.keyboardTimeout = setTimeout(() => {
                document.body.classList.remove('keyboard-press');
            }, 1000);
        });

        // Touch support
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.targetMouseX = (e.touches[0].clientX - window.innerWidth / 2) / window.innerWidth;
                this.targetMouseY = (e.touches[0].clientY - window.innerHeight / 2) / window.innerHeight;
            }
            this.container.classList.add('mouse-active');
            clearTimeout(this.mouseTimeout);
            this.mouseTimeout = setTimeout(() => {
                this.container.classList.remove('mouse-active');
            }, 2000);
        });

        // Click anywhere - create burst effect
        document.addEventListener('click', (e) => {
            this.createBurst(e.clientX, e.clientY);
        });
    }

    startAnimation() {
        const animate = () => {
            this.updateOrbs();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    updateOrbs() {
        // Smooth mouse position interpolation
        this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

        const time = Date.now() * 0.001;

        this.orbs.forEach((orb, index) => {
            // Base floating animation
            const floatX = Math.sin(time * orb.speed + orb.phase) * 30;
            const floatY = Math.cos(time * orb.speed * 1.3 + orb.phase) * 30;

            // Mouse parallax - different orbs move at different speeds
            const parallaxX = this.mouseX * orb.radius * (1 + index * 0.2);
            const parallaxY = this.mouseY * orb.radius * (1 + index * 0.2);

            orb.x = orb.baseX + floatX + parallaxX;
            orb.y = orb.baseY + floatY + parallaxY;

            orb.element.style.transform = `translate(${orb.x}px, ${orb.y}px)`;
        });
    }

    createRipple(key) {
        // Create a temporary ripple element at a random position
        const ripple = document.createElement('div');
        ripple.className = 'keyboard-ripple';
        ripple.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            transform: translate(-50%, -50%) scale(0);
            animation: rippleEffect 1s ease-out forwards;
        `;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    }

    createBurst(x, y) {
        // Create multiple particles from click position
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            const angle = (i / 8) * Math.PI * 2;
            const distance = 100 + Math.random() * 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${x}px;
                top: ${y}px;
                transform: translate(-50%, -50%);
                animation: particleBurst 0.8s ease-out forwards;
                --tx: ${tx}px;
                --ty: ${ty}px;
            `;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 800);
        }
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
    }
    @keyframes particleBurst {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new GlobalBackground());
} else {
    new GlobalBackground();
}
