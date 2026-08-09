// --- DOM ELEMENTS ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const closeMobileNav = document.getElementById('closeMobileNav');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

// --- EVENT LISTENERS ---
function setupEventListeners() {
    // Mobile Menu Toggle
    if (mobileMenuBtn && closeMobileNav && mobileNavOverlay) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        closeMobileNav.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                if (mobileNavOverlay && mobileNavOverlay.style.display === 'block') {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// --- UI TOGGLES ---
function toggleMobileMenu() {
    if (mobileNavOverlay) {
        mobileNavOverlay.style.display = mobileNavOverlay.style.display === 'none' ? 'block' : 'none';
    }
}