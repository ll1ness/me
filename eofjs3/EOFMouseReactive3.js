// ===== Mouse Reactive Background =====
const mouseGradient = document.getElementById('mouseGradient');
let gradientX = window.innerWidth / 2;
let gradientY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    gradientX = e.clientX;
    gradientY = e.clientY;
    mouseGradient.style.left = gradientX + 'px';
    mouseGradient.style.top = gradientY + 'px';
});
