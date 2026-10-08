// Load HTML components
function loadComponent(selector, file, callback) {
    fetch(file)
        .then(res => res.text())
        .then(html => {
            const clean = html.replace(/<script[\s\S]*?<\/script>/gi, '');
            document.querySelector(selector).innerHTML = clean;
            if (callback) callback();
        });
}

loadComponent('#header', 'components/header.html', () => {
    // Burger menu toggle
    const burger_menu = document.querySelector('.mobile-burger-menu');
    const burger_icon = document.querySelector('.burger-icon');
    const mobile_menu = document.querySelector('.mobile-menu');
    const menu_overlay = document.querySelector('.menu-overlay');

    if (burger_menu && burger_icon) {
        burger_icon.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = burger_menu.classList.toggle('is-open');
            if (menu_overlay) menu_overlay.classList.toggle('is-open', isOpen);
        });

        if (menu_overlay) {
            menu_overlay.addEventListener('click', () => {
                burger_menu.classList.remove('is-open');
                menu_overlay.classList.remove('is-open');
            });
        }

        // Prevent clicks inside the menu drawer from accidentally closing it (unless clicking a link)
        if (mobile_menu) {
            mobile_menu.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    e.stopPropagation();
                }
            });
        }

        document.addEventListener('click', (e) => {
            if (!burger_menu.contains(e.target) && !e.target.closest('.menu-overlay')) {
                burger_menu.classList.remove('is-open');
                if (menu_overlay) menu_overlay.classList.remove('is-open');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && burger_menu.classList.contains('is-open')) {
                burger_menu.classList.remove('is-open');
                if (menu_overlay) menu_overlay.classList.remove('is-open');
            }
        });
    }

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
