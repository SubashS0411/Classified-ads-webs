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

    // Global Image Glow Toggle
    document.body.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            e.target.classList.toggle('image-glow');
        }
    });

    // Mobile Menu Logic (Side Drawer)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');

    function toggleMobileMenu(show) {
        if (show) {
            mobileMenu.classList.remove('-translate-x-full', 'rtl:translate-x-full');
            mobileOverlay.classList.remove('hidden');
            // Force reflow
            void mobileOverlay.offsetWidth;
            mobileOverlay.classList.remove('opacity-0');
            document.body.classList.add('overflow-hidden');
        } else {
            mobileMenu.classList.add('-translate-x-full', 'rtl:translate-x-full');
            mobileOverlay.classList.add('opacity-0');
            setTimeout(() => {
                mobileOverlay.classList.add('hidden');
            }, 300);
            document.body.classList.remove('overflow-hidden');
        }
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu(true);
        });
    }

    if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.addEventListener('click', () => toggleMobileMenu(false));
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));
    }

    // Close on resize if switching to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && mobileMenu && !mobileMenu.classList.contains('-translate-x-full')) {
            toggleMobileMenu(false);
        }
    });

    // Tabbed Interface Logic for "Mega Collections"
    // Footer Text Glow Logic
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // e.preventDefault(); // Uncomment if you want to prevent navigation for testing
            this.classList.toggle('footer-link-active');
        });
    });

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

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const hasSuffix = counter.getAttribute('data-suffix');
            const suffix = hasSuffix ? hasSuffix : '';

            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                // parse innerText to number, removing potential suffix or commas
                const count = +counter.innerText.replace(suffix, '').replace(/,/g, '');

                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target.toLocaleString() + suffix;
                }
            };
            updateCount();
        });
    }

    // Trigger animation when counters section is in view
    const countersSection = document.getElementById('counters');
    if (countersSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect(); // Run only once
            }
        });
        observer.observe(countersSection);
    }
});

/* Advanced Contact Page Logic */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Triage Selection Logic (Reason & User Type)
    const setupSelection = (selector) => {
        const triggers = document.querySelectorAll(selector);
        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                // Remove selected from siblings
                const siblings = trigger.closest('.grid').querySelectorAll(selector);
                siblings.forEach(s => s.classList.remove('selected'));

                // Add selected to clicked
                trigger.classList.add('selected');

                // Optional: Show checkmark icon if present
                const check = trigger.querySelector('.check-icon');
                if (check) {
                    siblings.forEach(s => {
                        const c = s.querySelector('.check-icon');
                        if (c) c.classList.add('opacity-0');
                    });
                    check.classList.remove('opacity-0');
                }
            });
        });
    };
    setupSelection('.reason-card');
    setupSelection('.user-type-card');

    // 2. FAQ Accordion (Icon-Only Toggle, One-at-a-time)
    const faqBtns = document.querySelectorAll('.faq-toggle-btn');

    faqBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Prevent bubbling if needed, though structure separates text now
            e.stopPropagation();

            const currentItem = btn.closest('.faq-item');
            const currentContent = currentItem.querySelector('.faq-content');
            const currentIcon = btn.querySelector('.faq-icon');
            const isOpen = !currentContent.classList.contains('hidden');

            // 1. Close ALL other items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== currentItem) {
                    const content = item.querySelector('.faq-content');
                    const icon = item.querySelector('.faq-icon');

                    content.classList.add('hidden');
                    if (icon) icon.classList.remove('rotate-180');
                    const btn = item.querySelector('.faq-toggle-btn');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                }
            });

            // 2. Toggle CURRENT item
            if (isOpen) {
                // Close
                currentContent.classList.add('hidden');
                currentIcon.classList.remove('rotate-180');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                // Open
                currentContent.classList.remove('hidden');
                // Optional: Check if we want animation. Since 'hidden' is used, we'd need max-height transition.
                // For now, simple toggle as per previous logic "hidden" class usage in HTML refactor.
                // If animation is desired, we could use a utility class or JS animation.
                // Let's stick to the requested "smoothly" by using a simple transition if CSS supports it, 
                // but checking style.css, 'hidden' is usually display:none. 
                // To support animation we might want to use a slide-down class instead of just removing hidden?
                // The prompt asked for "smoothly".
                // Let's add a small animation class if available, or just toggle.
                currentContent.classList.add('animate-fade-in-up'); // Reusing existing animation
                currentIcon.classList.add('rotate-180');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // 3. Feedback Logic
    const feedbackEmojis = document.querySelectorAll('.emoji-btn');
    if (feedbackEmojis.length > 0) {
        feedbackEmojis.forEach(emoji => {
            emoji.addEventListener('click', () => {
                feedbackEmojis.forEach(e => e.classList.remove('selected', 'grayscale'));
                feedbackEmojis.forEach(e => {
                    if (e !== emoji) e.classList.add('grayscale', 'opacity-50');
                });
                emoji.classList.add('selected');

                // Show Thank You message
                const msg = document.getElementById('feedback-msg');
                if (msg) {
                    msg.classList.remove('hidden', 'opacity-0');
                    msg.classList.add('animate-fade-in-up');
                }
            });
        });
    }

    // 4. Booking Modal Simulation
    const bookBtns = document.querySelectorAll('.book-call-btn');
    bookBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real app, open modal. Here, strict no-alert policy? 
            // Better to show a toast or console log or visual feedback.
            // Let's toggle button text to "Scheduled ✓"
            const originalText = btn.innerText;
            btn.innerText = "Redirecting to Calendar...";
            setTimeout(() => {
                btn.innerText = originalText;
            }, 2000);
        });
    });

    // General Scroll Animation Observer
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    if (scrollElements.length > 0) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the animation class defined in CSS
                    entry.target.classList.add('animate-fade-up-image');
                    entry.target.classList.remove('opacity-0');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        scrollElements.forEach(el => scrollObserver.observe(el));
    }
});

/* -------------------------------------------------------------------------- */
/*                               Text Scramble Effect                          */
/* -------------------------------------------------------------------------- */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="text-indigo-500 font-bold">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize on Descriptions
document.addEventListener('DOMContentLoaded', () => {
    // Select paragraphs that are siblings to headings or typical description classes
    const targets = document.querySelectorAll('p.text-slate-500, p.text-slate-600, p.text-lg, p.text-slate-700, p.text-slate-400');

    targets.forEach(el => {
        // Add cursor pointer to indicate interactivity
        el.classList.add('cursor-pointer', 'hover:text-slate-800', 'dark:hover:text-slate-200', 'transition-colors');
        el.title = "Click to decode";

        const scrambler = new TextScramble(el);
        // Store original text
        el.dataset.originalText = el.innerText;

        el.addEventListener('click', () => {
            if (el.classList.contains('scrambling')) return;
            el.classList.add('scrambling');

            // Scramble to random text then back
            scrambler.setText(el.dataset.originalText).then(() => {
                el.classList.remove('scrambling');
            });
        });
    });
});

