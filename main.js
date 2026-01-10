document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Theme Logic
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    if (savedTheme === 'dark' || (!savedTheme && systemTheme === 'dark')) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Navbar Dropdown Logic (Hover for Desktop)
    const navDropdowns = document.querySelectorAll('.dropdown-trigger');
    navDropdowns.forEach(trigger => {
        const menu = trigger.nextElementSibling;
        if (menu) {
            const wrapper = trigger.parentElement;
            wrapper.addEventListener('mouseenter', () => {
                menu.classList.remove('hidden');
                setTimeout(() => {
                    menu.classList.remove('opacity-0', 'translate-y-2');
                }, 10);
            });
            wrapper.addEventListener('mouseleave', () => {
                menu.classList.add('opacity-0', 'translate-y-2');
                setTimeout(() => {
                    menu.classList.add('hidden');
                }, 200);
            });
        }
    });

    // Content Dropdowns / Accordions (Click-based)
    // Unified logic for both "accordion-trigger" (Home1) and "calm-dropdown-trigger" (Index2)
    // We treat them identically: Toggle next sibling visibility and rotate icon.
    const contentTriggers = document.querySelectorAll('.accordion-trigger, .calm-dropdown-trigger');

    contentTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.nextElementSibling;
            // Find the icon to rotate. It might be a dedicated div (Home1) or an <i> tag (Index2)
            // We look for a child that has distinct classes or just the last child icon
            const iconContainer = trigger.querySelector('.rounded-full') || trigger.querySelector('[data-lucide="plus"]');
            const icon = trigger.querySelector('i') || trigger.querySelector('svg'); // Fallback

            // Toggle Content
            // Check if we are using the 'hidden' class approach or max-height approach
            // Home1 used max-height, Home2 used hidden. Let's unify to 'hidden' toggle for simplicity in "combining"
            // OR support both by checking class list.

            if (content.classList.contains('hidden')) {
                // Open
                content.classList.remove('hidden');
                // Optional: Animation handling if using max-height style
                content.style.maxHeight = content.scrollHeight + "px";

                // Rotate Icon
                if (iconContainer) iconContainer.classList.add('rotate-45');
                else if (icon) icon.classList.add('rotate-45');

            } else {
                // Close
                content.style.maxHeight = null; // Close if using height transition
                // Delay adding hidden if we want to wait for transition, but for now instant toggle + height anim
                setTimeout(() => {
                    if (!content.style.maxHeight) content.classList.add('hidden');
                }, 300); // match transition

                // Rotate Icon
                if (iconContainer) iconContainer.classList.remove('rotate-45');
                else if (icon) icon.classList.remove('rotate-45');
            }
        });
    });

    // Handle initial hidden state for accordions that use max-height
    // This ensures they are collapsible properly
    document.querySelectorAll('.accordion-content, .calm-dropdown-content').forEach(el => {
        if (el.classList.contains('hidden')) {
            el.style.maxHeight = null;
        }
    });

    // Global Click Animation
    // Adds a pop effect to text elements and images when clicked
    document.body.addEventListener('click', (e) => {
        const target = e.target;
        // Check if the target is a text element or image
        if (target.matches('h1, h2, h3, h4, h5, h6, p, span, img, a, button, li')) {
            // Remove class if it exists to restart animation (optional, but good for rapid clicks)
            target.classList.remove('pop-click');

            // Force reflow
            void target.offsetWidth;

            // Add class
            target.classList.add('pop-click');

            // Remove class after animation completes
            setTimeout(() => {
                target.classList.remove('pop-click');
            }, 200);
        }
    });
    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Optional: Animate opacity or slide
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('animate-fade-in-up');
            }
        });
    }

    // Tabbed Interface Logic for "Mega Collections"
    // Expects buttons with data-tab-target="#id" and contents with id="id"
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSelector = btn.getAttribute('data-tab-target');
            const targetContent = document.querySelector(targetSelector);

            // Deactivate all
            tabButtons.forEach(b => {
                b.classList.remove('bg-indigo-600', 'text-white');
                b.classList.add('bg-white', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-300');
            });
            tabContents.forEach(c => c.classList.add('hidden'));

            // Activate current
            btn.classList.remove('bg-white', 'text-slate-600', 'dark:bg-slate-800', 'dark:text-slate-300');
            btn.classList.add('bg-indigo-600', 'text-white');

            if (targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.classList.add('animate-fade-in-up');
            }
        });
    });
});
