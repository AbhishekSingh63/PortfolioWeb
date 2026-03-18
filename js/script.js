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

        // Update aria-label for accessibility
        themeBtn.setAttribute('aria-label', isDark ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    });

    // --- 2. Navbar Scroll Effect ---
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // --- 3. Active Nav Link on Scroll (IntersectionObserver) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(currentId)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // --- 4. Simple Scroll Elements Reveal (IntersectionObserver) ---
    const reveals = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: only animate once
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 5. Simple Number Counters ---
    const counters = document.querySelectorAll('.counter-value');

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                let count = 0;
                const target = parseInt(counter.getAttribute('data-target') || 0);

                // Adjust animation speed based on target value
                const duration = 2000; // 2 seconds
                let increment = target / (duration / 30); // 30ms interval

                // Ensure small numbers animate properly (e.g., target = 2)
                if (target < 10) increment = 1;
                else increment = Math.max(1, Math.floor(increment));

                const updateCounter = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        counter.innerText = target;
                        clearInterval(updateCounter);
                    } else {
                        // For small decimals, only show integer
                        counter.innerText = Math.floor(count);
                    }
                }, target < 10 ? 500 : 30); // Slower interval for small numbers

                observer.unobserve(counter); // Only run once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
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

    // --- 7. Simple Form Handle (Web3Forms) ---
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);

        if (submitBtn) {
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                form.reset();
                if (successMsg) {
                    successMsg.classList.remove('d-none');
                    // Changed formatting to a success message, user can edit this section in index.html
                    successMsg.innerText = "Message sent successfully! I'll get back to you soon.";
                    successMsg.classList.replace('alert-danger', 'alert-success');
                    setTimeout(() => successMsg.classList.add('d-none'), 5000);
                }
            } else {
                throw new Error("Form submission failed");
            }
        } catch (error) {
            console.error(error);
            if (successMsg) {
                successMsg.classList.remove('d-none');
                successMsg.classList.replace('alert-success', 'alert-danger');
                successMsg.innerText = "Oops! Something went wrong. Please try again later.";
                setTimeout(() => successMsg.classList.add('d-none'), 5000);
            } else {
                alert("Something went wrong! Please try again later.");
            }
        } finally {
            if (submitBtn) {
                submitBtn.innerText = 'Send Message';
                submitBtn.disabled = false;
            }
        }
    });

});
