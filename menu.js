// ============================================================
// CAFE DURGA — MENU PAGE INTERACTIVITY (menu.js)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    setupCategoryFilter();
});

// ============================================================
// CATEGORY FILTER TABS
// ============================================================
function setupCategoryFilter() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.menu-section');
    const cards = document.querySelectorAll('.menu-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-cat');

            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (cat === 'all') {
                // Show all sections and cards
                sections.forEach(s => {
                    s.classList.remove('hidden');
                    // Re-trigger reveal on cards in this section
                    s.querySelectorAll('.reveal').forEach(el => {
                        el.classList.remove('visible');
                        setTimeout(() => el.classList.add('visible'), 50);
                    });
                });
            } else {
                // Show only matching section, hide others
                sections.forEach(s => {
                    const sectionCat = s.getAttribute('data-section');
                    if (sectionCat === cat) {
                        s.classList.remove('hidden');
                        s.querySelectorAll('.reveal').forEach(el => {
                            el.classList.remove('visible');
                            setTimeout(() => el.classList.add('visible'), 50);
                        });
                        // Smooth scroll to the section
                        setTimeout(() => {
                            s.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                    } else {
                        s.classList.add('hidden');
                    }
                });
            }
        });
    });
}
