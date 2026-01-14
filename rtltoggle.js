// RTL Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const dirBtn = document.getElementById('dir-toggle');
    const html = document.documentElement;

    // Helper to set direction
    const setDirection = (dir) => {
        html.dir = dir;
        localStorage.setItem('dir', dir);

        // Dispatch event for other scripts (e.g., charts, sliders) to react
        // Using both names for compatibility if other scripts listen to one or the other
        window.dispatchEvent(new CustomEvent('dir-change', { detail: { dir } }));
        window.dispatchEvent(new Event('dirchange'));
    };

    // Toggle button listener
    if (dirBtn) {
        // Clone to remove potential old listeners if this script runs multiple times
        const newDirBtn = dirBtn.cloneNode(true);
        dirBtn.parentNode.replaceChild(newDirBtn, dirBtn);

        newDirBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentDir = html.dir || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            setDirection(newDir);
        });
    }

    // Sync with other tabs
    window.addEventListener('storage', (e) => {
        if (e.key === 'dir') {
            html.dir = e.newValue;
        }
    });

    // Initial check (in case it wasn't set by head script)
    if (!html.dir) {
        html.dir = localStorage.getItem('dir') || 'ltr';
    }
});
