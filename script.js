var mainPageWelcomeText = document.getElementById('mainPageWelcomeText');
var mainPageClickToBegin = document.getElementById('mainPageClickToBegin');
var mainPageContent = document.getElementById('mainPageContent');

var started = false;
var isMobile = ('ontouchstart' in window) || (window.matchMedia('(max-width: 768px)').matches);

document.addEventListener('DOMContentLoaded', () => {
    const clickToBeginText = document.querySelector('.mainPageClickToBegin');

    // Show appropriate prompt
    const promptText = isMobile ? 'Tap to begin.' : 'Click SPACE to begin.';
    clickToBeginText.innerHTML = '';

    promptText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.innerHTML = char === ' ' ? '&nbsp;' : char;
        span.style.animationDelay = `${index * 0.1}s`;
        clickToBeginText.appendChild(span);
    });
});

// Desktop: Spacebar
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        start();
    }
});

// Mobile: tap anywhere on the intro screen
document.addEventListener('touchstart', (event) => {
    if (!started) {
        start();
    }
}, { passive: true });


// Mouse trail — desktop only
if (!isMobile) {
    let lastX = 0, lastY = 0;
    document.addEventListener('mousemove', (e) => {
        if (Math.abs(e.clientX - lastX) + Math.abs(e.clientY - lastY) < 20) return;
        lastX = e.clientX; lastY = e.clientY;
        const dot = document.createElement('div');
        dot.style.cssText = `
          position: fixed; left: ${e.clientX}px; top: ${e.clientY}px;
          width: 3px; height: 3px; border-radius: 50%;
          background: var(--ink);
          pointer-events: none; z-index: 9998;
          transition: all 0.6s ease;
        `;
        document.body.appendChild(dot);
        setTimeout(() => { dot.style.opacity = '0'; dot.style.transform = 'scale(3)'; }, 50);
        setTimeout(() => dot.remove(), 700);
    });
}




function start() {
    if (started) return;
    started = true;

    document.body.style.backgroundColor = "var(--bg-dark)";
    document.body.classList.add('dark-mode');
    mainPageWelcomeText.style.filter = "blur(100px)";
    mainPageWelcomeText.style.top = "-30%";
    mainPageClickToBegin.style.top = "-30%";

    setTimeout(() => {
        mainPageContent.classList.add('show');
    }, 400);
}
