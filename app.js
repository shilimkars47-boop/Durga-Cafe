// ============================================================
// AURA CAFÉ — ENHANCED INTERACTIVITY v2.0
// ============================================================

// --- DOM ELEMENTS ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const closeMobileNav = document.getElementById('closeMobileNav');
const backToTop = document.getElementById('backToTop');
const topHeader = document.getElementById('topHeader');
const heroWord = document.getElementById('heroWord');
const scrollIndicator = document.getElementById('scrollIndicator');

// --- INITIALIZATION ---
function initApp() {
    setupEventListeners();
    setupScrollObserver();
    setupStatCounters();
    startHeroWordCycle();
    setupScrollHeader();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// ============================================================
// MOBILE MENU
// ============================================================
function setupEventListeners() {
    if (mobileMenuBtn && closeMobileNav && mobileNavOverlay) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        closeMobileNav.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if (mobileNavOverlay && mobileNavOverlay.style.display === 'block') {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Back to top
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function toggleMobileMenu() {
    if (mobileNavOverlay) {
        const isOpen = mobileNavOverlay.style.display === 'block';
        mobileNavOverlay.style.display = isOpen ? 'none' : 'block';
    }
}

// ============================================================
// SCROLL EVENTS (Header style + back-to-top + scroll indicator)
// ============================================================
function setupScrollHeader() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Sticky header style change
        if (topHeader) {
            if (scrollY > 80) {
                topHeader.classList.add('scrolled');
            } else {
                topHeader.classList.remove('scrolled');
            }
        }

        // Back to top visibility
        if (backToTop) {
            if (scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Hide scroll indicator when scrolled
        if (scrollIndicator) {
            scrollIndicator.style.opacity = scrollY > 100 ? '0' : '1';
        }
    }, { passive: true });
}

// ============================================================
// SCROLL REVEAL — IntersectionObserver
// ============================================================
function setupScrollObserver() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Also trigger counters when stats bar is visible
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsBar);
    }
}

// ============================================================
// ANIMATED STAT COUNTERS
// ============================================================
function setupStatCounters() {
    // Numbers are triggered by IntersectionObserver in setupScrollObserver
}

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1800;
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            if (target >= 10000) {
                el.textContent = current >= 1000
                    ? (current / 1000).toFixed(current >= 10000 ? 0 : 1) + 'k'
                    : current;
            } else {
                el.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                // Final value
                if (target >= 10000) {
                    el.textContent = '50k';
                } else {
                    el.textContent = target;
                }
            }
        }

        requestAnimationFrame(tick);
    });
}

// ============================================================
// ANIMATED HERO HEADLINE WORD CYCLE
// ============================================================
function startHeroWordCycle() {
    if (!heroWord) return;

    const words = ['Fresh', 'Warm', 'Iconic', 'Loved', 'Crafted'];
    let index = 0;

    function cycleWord() {
        // Fade out
        heroWord.classList.add('fade-out');

        setTimeout(() => {
            index = (index + 1) % words.length;
            heroWord.textContent = words[index];
            heroWord.classList.remove('fade-out');
        }, 400);
    }

    setInterval(cycleWord, 2800);
}