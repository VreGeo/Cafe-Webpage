// Load HTML components
function loadComponent(selector, file, callback) {
    fetch(file)
        .then(res => res.text())
        .then(html => {
            // Strip any scripts injected by dev servers (e.g. Live Server WebSocket)
            const clean = html.replace(/<script[\s\S]*?<\/script>/gi, '');
            document.querySelector(selector).innerHTML = clean;
            if (callback) callback();
        });
}

loadComponent('#header', 'components/header.html', () => {
    // Burger menu toggle
    const burger_menu = document.querySelector('.mobile-burger-menu');
    burger_menu.addEventListener('click', () => {
        burger_menu.classList.toggle('is-open');
    });
    document.addEventListener('click', (e) => {
        if (!burger_menu.contains(e.target)) {
            burger_menu.classList.remove('is-open');
        }
    });

    // Search bar toggle
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('#search-input');
    const searchIcon = document.querySelector('.search-icon');

    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = searchContainer.classList.toggle('is-open');
        if (isOpen) searchInput.focus();
    });

    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchContainer.classList.remove('is-open');
            searchInput.value = '';
        }
    });

    // Close on Escape, submit on Enter
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchContainer.classList.remove('is-open');
            searchInput.value = '';
            searchInput.blur();
        }
        if (e.key === 'Enter' && searchInput.value.trim()) {
            console.log('Search:', searchInput.value); // replace with real search logic
        }
    });
});

loadComponent('#footer', 'components/footer.html');
