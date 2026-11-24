/* ===================================================
   GUDIMILLA ASMITHA - PORTFOLIO INTERACTIVITY (main.js)
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ================= 1. MOBILE MENU TOGGLE ================= */
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a.nav-link');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('fa-xmark');
            navbar.classList.toggle('active');
        });

        // Close menu when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('fa-xmark');
                navbar.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && !menuIcon.contains(e.target) && navbar.classList.contains('active')) {
                menuIcon.classList.remove('fa-xmark');
                navbar.classList.remove('active');
            }
        });
    }

    /* ================= 2. SCROLL SPY & STICKY HEADER ================= */
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const scrollTopBtn = document.querySelector('#scrollTopBtn');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Sticky Header
        if (header) {
            header.classList.toggle('sticky', scrollPos > 50);
        }

        // Back to top button
        if (scrollTopBtn) {
            if (scrollPos > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        // Active Section Indicator in Navbar
        sections.forEach(sec => {
            const top = sec.offsetTop - 140;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    /* ================= 3. TYPED.JS INITIALIZATION ================= */
    if (typeof Typed !== 'undefined' && document.querySelector('.multiple-text')) {
        new Typed('.multiple-text', {
            strings: ['Software Developer'],
            typeSpeed: 60,
            backSpeed: 35,
            backDelay: 1500,
            loop: true
        });
    }

    /* ================= 4. PROJECTS FILTER TABS ================= */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategories = card.getAttribute('data-category') || '';
                    if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                        card.style.display = 'flex';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                    }
                });
            });
        });
    }

    /* ================= 5. CONTACT FORM HANDLING ================= */
    const contactForm = document.querySelector('#contactForm');
    const formFeedback = document.querySelector('#formFeedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.querySelector('#fullName').value.trim();
            const emailAddr = document.querySelector('#emailAddr').value.trim();
            const phoneNum = document.querySelector('#phoneNum').value.trim();
            const subject = document.querySelector('#subject').value.trim();
            const message = document.querySelector('#message').value.trim();

            if (!fullName || !emailAddr || !subject || !message) {
                formFeedback.innerHTML = `<span style="color: #f87171;"><i class="fa-solid fa-triangle-exclamation"></i> Please fill in all required fields.</span>`;
                formFeedback.style.display = 'block';
                return;
            }

            // Create mailto fallback link for the user
            const mailtoBody = encodeURIComponent(
                `Hi Asmitha,\n\nName: ${fullName}\nEmail: ${emailAddr}\nPhone: ${phoneNum}\n\nMessage:\n${message}\n`
            );
            const mailtoLink = `mailto:asmitha1902@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

            // Show confirmation
            formFeedback.innerHTML = `
                <div style="background: rgba(52, 211, 153, 0.15); border: 1px solid rgba(52, 211, 153, 0.4); padding: 1.2rem; border-radius: 8px; color: #34d399;">
                    <i class="fa-solid fa-circle-check"></i> Thank you, <strong>${fullName}</strong>! Opening your email client to send message to <strong>asmitha1902@gmail.com</strong>...
                </div>
            `;
            formFeedback.style.display = 'block';

            // Open mailto link
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 800);
        });
    }

    /* ================= 7. SCROLLREVEAL ANIMATIONS ================= */
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '50px',
            duration: 1200,
            delay: 150,
            reset: false
        });

        sr.reveal('.badge-status, .home-content h3, .home-content h1, .section-title-wrap', { origin: 'top' });
        sr.reveal('.home-bio, .hero-metrics, .social-media, .btn-group', { origin: 'bottom', interval: 100 });
        sr.reveal('.avatar-wrapper', { origin: 'right', delay: 200 });
        sr.reveal('.about-img', { origin: 'left' });
        sr.reveal('.about-content', { origin: 'right' });
        sr.reveal('.experience-card', { origin: 'bottom' });
        sr.reveal('.project-card', { origin: 'bottom', interval: 150 });
        sr.reveal('.skill-category-card', { origin: 'bottom', interval: 120 });
        sr.reveal('.qual-column', { origin: 'bottom', interval: 200 });
        sr.reveal('.resume-showcase-card', { origin: 'bottom' });
        sr.reveal('.contact-info-panel', { origin: 'left' });
        sr.reveal('.contact-form-panel', { origin: 'right' });
    }
});
