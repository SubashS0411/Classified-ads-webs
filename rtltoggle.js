// RTL Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const dirBtn = document.getElementById('dir-toggle');
    const html = document.documentElement;

    // Load saved direction
    const savedDir = localStorage.getItem('dir') || 'ltr';
    html.dir = savedDir;

    if (dirBtn) {
        dirBtn.addEventListener('click', () => {
            const newDir = html.dir === 'ltr' ? 'rtl' : 'ltr';
            html.dir = newDir;
            localStorage.setItem('dir', newDir);
        });
    }
});
