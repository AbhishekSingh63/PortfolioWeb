/* =========================================
   Script.js - Interactive Logic (Simplified)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = themeBtn?.querySelector('i');

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        html.setAttribute('data-theme', 'dark');
        if (icon) icon.className = 'fa-solid fa-moon';
    }

    // Toggle theme on click
    themeBtn?.addEventListener('click', () => {
        const isDark = html.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        if (icon) {
            icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    });

    // --- 2. Navbar Scroll Effect ---
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // --- 3. Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            // Find which section is currently in view
            if (window.scrollY >= section.offsetTop - 150) {
                current = section.id;
            }
        });
        navLinks.forEach(link => {
            // Highlight matching nav link
            link.classList.toggle('active', link.getAttribute('href').includes(current) && current !== '');
        });
    });

    // --- 4. Simple Scroll Elements Reveal ---
    const reveals = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    window.addEventListener('scroll', () => {
        reveals.forEach(el => {
            // Add visible class when element comes into view
            if (window.scrollY + window.innerHeight > el.offsetTop + 100) {
                el.classList.add('visible');
            }
        });
    });

    // --- 5. Simple Number Counters ---
    const counters = document.querySelectorAll('.counter-value');
    counters.forEach(counter => {
        let count = 0;
        const target = parseInt(counter.getAttribute('data-target') || 0);
        const increment = Math.max(1, Math.floor(target / 50));

        const updateCounter = setInterval(() => {
            count += increment;
            if (count >= target) {
                counter.innerText = target;
                clearInterval(updateCounter);
            } else {
                counter.innerText = count;
            }
        }, 30);
    });

    // --- 6. Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (backToTopBtn) {
            backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
        }
    });
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 7. Simple Form Handle ---
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');

        if (submitBtn) submitBtn.innerText = 'Sending...';

        setTimeout(() => {
            if (submitBtn) submitBtn.innerText = 'Send Message';
            form.reset();

            if (successMsg) {
                successMsg.classList.remove('d-none');
                setTimeout(() => successMsg.classList.add('d-none'), 3000);
            } else {
                alert("Message Sent!");
            }
        }, 1500);
    });

});
