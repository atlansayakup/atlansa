var mainPageWelcomeText = document.getElementById('mainPageWelcomeText');
var mainPageClickToBegin = document.getElementById('mainPageClickToBegin');
var mainPageContent = document.getElementById('mainPageContent');

var started = false;
var isMobile = ('ontouchstart' in window) || (window.matchMedia('(max-width: 768px)').matches);

const bgMusic = new Audio('assets/backgroundMusic.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.2;

document.addEventListener('DOMContentLoaded', () => {
    bgMusic.play().catch(e => console.log("Autoplay prevented by browser. Will play on interaction."));

    const toggleMusicBtn = document.getElementById('toggleMusicBtn');

    if (toggleMusicBtn) {
        bgMusic.addEventListener('play', () => {
            toggleMusicBtn.innerText = "⏸";
        });
        bgMusic.addEventListener('pause', () => {
            toggleMusicBtn.innerText = "▶";
        });

        toggleMusicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().catch(e => console.error(e));
            } else {
                bgMusic.pause();
            }
        });
    }

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

// Mobile & Desktop: tap anywhere on the intro screen
['click', 'touchend'].forEach(evt => {
    document.addEventListener(evt, (event) => {
        if (!started) {
            // Browsers often require audio.play() to be called directly within the user-event handler
            bgMusic.play().catch(e => console.error("Audio playback failed on interaction:", e));
            bgMusic.volume = 1;

            start();
        }
    }, { passive: false });
});


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

    bgMusic.play().catch(e => console.error("Audio playback failed:", e));
    bgMusic.volume = 1;

    document.body.style.backgroundColor = "var(--bg-dark)";
    document.body.classList.add('dark-mode');
    document.body.classList.add('scroll-enabled');
    window.scrollTo({ top: 0, behavior: 'instant' });

    mainPageWelcomeText.style.filter = "blur(100px)";
    mainPageWelcomeText.style.top = "-30%";
    mainPageClickToBegin.style.top = "-30%";

    setTimeout(() => {
        mainPageContent.classList.add('show');
    }, 400);
}
