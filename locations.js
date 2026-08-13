// ============================================================
// AURA CAFÉ — LOCATIONS PAGE INTERACTIVITY (locations.js)
// ============================================================

const branchData = [
    { name: 'Aura Café — Flagship', addr: 'Malati Complex, Kothrud, Pune' },
    { name: 'Aura Café', addr: 'Mayur Colony, Kothrud, Pune' },
    { name: 'Aura Café', addr: 'Chaitanya Nagar, Kothrud, Pune' },
    { name: 'Aura Café', addr: 'Karvenagar, Pune' },
    { name: 'Aura Café', addr: 'Bavdhan, Pune' },
    { name: 'Aura Café', addr: 'Rambaug Colony, Kothrud, Pune' },
    { name: 'Aura Café', addr: 'Bopodi, Pune' },
    { name: 'Aura Café', addr: 'Viman Nagar, Pune' },
    { name: 'Aura Café', addr: 'Sahawas Society, Karvenagar, Pune' },
    { name: 'Aura Café', addr: 'Symbiosis Lavale Road, Pune' },
    { name: 'Aura Café', addr: 'Hadapsar, Pune' },
];

function initLocations() {
    const cards = document.querySelectorAll('.branch-card');
    cards.forEach(card => card.classList.add('visible'));

    setupBranchCardClicks();
    setupSearch();
    setupAreaChips();
    setupMapLoader();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLocations);
} else {
    initLocations();
}

// ============================================================
// BRANCH CARDS — Click to update map
// ============================================================
function setupBranchCardClicks() {
    const cards = document.querySelectorAll('.branch-card');
    cards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
            // Don't fire if clicking the directions button link
            if (e.target.closest('.branch-directions-btn')) return;

            selectCard(card, idx);
        });
    });
}

function selectCard(card, idx) {
    const cards = document.querySelectorAll('.branch-card');
    const mapIframe = document.getElementById('googleMapIframe');
    const mapBranchName = document.getElementById('mapBranchName');
    const mapBranchAddr = document.getElementById('mapBranchAddr');
    const mapDirectionsLink = document.getElementById('mapDirectionsLink');
    const mapLoader = document.getElementById('mapLoader');

    // Update active state
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    card.classList.add('visible');

    // Update map
    const query = card.getAttribute('data-query');
    const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
    const data = branchData[idx] || { name: 'Aura Café', addr: card.getAttribute('data-directions') || '' };

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
    const mapIframe = document.getElementById('googleMapIframe');
    const mapLoader = document.getElementById('mapLoader');

    if (mapIframe && mapLoader) {
        // Hide loader on first load
        mapIframe.addEventListener('load', () => {
            mapLoader.classList.add('hidden');
        });

        // Show loader whenever src changes
        const observer = new MutationObserver(() => {
            mapLoader.classList.remove('hidden');
        });
        observer.observe(mapIframe, { attributes: true, attributeFilter: ['src'] });
    }
}

// ============================================================
// SEARCH — Filter branch cards
// ============================================================
function setupSearch() {
    const searchInput = document.getElementById('branchSearch');
    const searchClear = document.getElementById('searchClear');

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
    const cards = document.querySelectorAll('.branch-card');
    const noResults = document.getElementById('noResults');
    const searchTermEl = document.getElementById('searchTerm');
    const visibleCount = document.getElementById('visibleCount');
    const searchInput = document.getElementById('branchSearch');

    let count = 0;
    let firstVisible = null;

    cards.forEach((card, idx) => {
        const area = (card.getAttribute('data-area') || '').toLowerCase();
        const dataObj = branchData[idx] || {};
        const addr = (dataObj.addr || '').toLowerCase();
        const name = (dataObj.name || '').toLowerCase();

        const matches = !query || area.includes(query) || addr.includes(query) || name.includes(query);

        if (matches) {
            card.classList.remove('hidden');
            card.classList.add('visible');
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
            if (searchTermEl && searchInput) searchTermEl.textContent = searchInput.value;
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
function setupAreaChips() {
    const areaChips = document.querySelectorAll('.area-chip');
    const searchInput = document.getElementById('branchSearch');
    const searchClear = document.getElementById('searchClear');
    const visibleCount = document.getElementById('visibleCount');
    const noResults = document.getElementById('noResults');

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
            const cards = document.querySelectorAll('.branch-card');

            cards.forEach((card, idx) => {
                const cardArea = card.getAttribute('data-area') || '';
                const matches = area === 'all' || cardArea === area;

                if (matches) {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
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
