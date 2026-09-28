// Load HTML components
function loadComponent(selector, file) {
    fetch(file)
        .then(res => res.text())
        .then(html => document.querySelector(selector).innerHTML = html);
}

loadComponent('#header', 'components/header.html');
loadComponent('#footer', 'components/footer.html');