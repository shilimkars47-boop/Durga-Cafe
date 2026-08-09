// ============================================================
// CAFE DURGA — LOCATIONS PAGE INTERACTIVITY (locations.js)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    setupBranchCardClicks();
    setupSearch();
    setupAreaChips();
    setupMapLoader();
});

// ============================================================
// BRANCH CARDS — Click to update map
// ============================================================
const cards = document.querySelectorAll('.branch-card');
const mapIframe = document.getElementById('googleMapIframe');
const mapBranchName = document.getElementById('mapBranchName');
const mapBranchAddr = document.getElementById('mapBranchAddr');
const mapDirectionsLink = document.getElementById('mapDirectionsLink');
const mapLoader = document.getElementById('mapLoader');

const branchData = [
    { name: 'Hotel Durga — Flagship', addr: 'Malati Complex, Kothrud, Pune' },
    { name: 'Cafe Durga', addr: 'Mayur Colony, Kothrud, Pune' },
    { name: 'Cafe Durga', addr: 'Chaitanya Nagar, Kothrud, Pune' },
    { name: 'Cafe Durga', addr: 'Karvenagar, Pune' },
    { name: 'Cafe Durga', addr: 'Bavdhan, Pune' },
    { name: 'Cafe Durga', addr: 'Rambaug Colony, Kothrud, Pune' },
    { name: 'Cafe Durga', addr: 'Bopodi, Pune' },
    { name: 'Durga Cafe', addr: 'Viman Nagar, Pune' },
    { name: 'Cafe Durga', addr: 'Sahawas Society, Karvenagar, Pune' },
    { name: 'Cafe Durga', addr: 'Symbiosis Lavale Road, Pune' },
    { name: 'Cafe Durga', addr: 'Hadapsar, Pune' },
];

function setupBranchCardClicks() {
    cards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
            // Don't fire if clicking the directions button link
            if (e.target.closest('.branch-directions-btn')) return;

            selectCard(card, idx);
        });
    });
}

function selectCard(card, idx) {
    // Update active state
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    // Update map
    const query = card.getAttribute('data-query');
    const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
    const data = branchData[idx];

    // Show loader
    if (mapLoader) {
        mapLoader.classList.remove('hidden');
    }

    // Update iframe src
    if (mapIframe) {
        mapIframe.src = `https://maps.google.com/maps?q=${query}&output=embed&hl=en&z=16`;
    }

    // Update map header
    if (mapBranchName) mapBranchName.textContent = data.name;
    if (mapBranchAddr) {
        mapBranchAddr.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.addr}`;
    }
    if (mapDirectionsLink) {
        mapDirectionsLink.href = directionsHref;
    }

    // Scroll card into view on mobile
    if (window.innerWidth < 1100) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ============================================================
// IFRAME LOAD — Hide spinner once map loads
// ============================================================
function setupMapLoader() {
    if (mapIframe && mapLoader) {
        // Hide loader on first load
        mapIframe.addEventListener('load', () => {
            mapLoader.classList.add('hidden');
        });

        // Show loader whenever src changes (handled in selectCard)
        const observer = new MutationObserver(() => {
            mapLoader.classList.remove('hidden');
        });
        observer.observe(mapIframe, { attributes: true, attributeFilter: ['src'] });
    }
}

// ============================================================
// SEARCH — Filter branch cards
// ============================================================
const searchInput = document.getElementById('branchSearch');
const searchClear = document.getElementById('searchClear');
const noResults = document.getElementById('noResults');
const searchTermEl = document.getElementById('searchTerm');
const visibleCount = document.getElementById('visibleCount');

function setupSearch() {
    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();

        // Show/hide clear button
        if (searchClear) {
            searchClear.classList.toggle('visible', query.length > 0);
        }

        filterCards(query);
    });

    if (searchClear) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchClear.classList.remove('visible');
            filterCards('');
            searchInput.focus();
        });
    }
}

function filterCards(query) {
    let count = 0;
    let firstVisible = null;

    cards.forEach((card, idx) => {
        const area = (card.getAttribute('data-area') || '').toLowerCase();
        const addr = branchData[idx].addr.toLowerCase();
        const name = branchData[idx].name.toLowerCase();

        const matches = !query || area.includes(query) || addr.includes(query) || name.includes(query);

        if (matches) {
            card.classList.remove('hidden');
            count++;
            if (!firstVisible) firstVisible = { card, idx };
        } else {
            card.classList.add('hidden');
        }
    });

    // Update count
    if (visibleCount) visibleCount.textContent = count;

    // No results message
    if (noResults) {
        if (count === 0) {
            noResults.style.display = 'flex';
            if (searchTermEl) searchTermEl.textContent = searchInput.value;
        } else {
            noResults.style.display = 'none';
        }
    }

    // Auto-select the first visible result
    if (firstVisible) {
        selectCard(firstVisible.card, firstVisible.idx);
    }
}

// ============================================================
// AREA CHIPS — Quick area filter
// ============================================================
const areaChips = document.querySelectorAll('.area-chip');

function setupAreaChips() {
    areaChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update active chip
            areaChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const area = chip.getAttribute('data-area');

            // Clear search input when chip is clicked
            if (searchInput) {
                searchInput.value = '';
                if (searchClear) searchClear.classList.remove('visible');
            }

            let count = 0;
            let firstVisible = null;

            cards.forEach((card, idx) => {
                const cardArea = card.getAttribute('data-area') || '';
                const matches = area === 'all' || cardArea === area;

                if (matches) {
                    card.classList.remove('hidden');
                    count++;
                    if (!firstVisible) firstVisible = { card, idx };
                } else {
                    card.classList.add('hidden');
                }
            });

            if (visibleCount) visibleCount.textContent = count;
            if (noResults) noResults.style.display = 'none';

            // Auto-select first visible
            if (firstVisible) {
                selectCard(firstVisible.card, firstVisible.idx);
            }

            // Scroll to branch list
            document.getElementById('branchList')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}
