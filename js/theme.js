function initTheme() {
    const btn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const saved = localStorage.getItem('theme') || 'dark';
    if (saved === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    if (!btn) return;

    btn.addEventListener('click', () => {
        const isDark = html.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

document.addEventListener('DOMContentLoaded', initTheme);
