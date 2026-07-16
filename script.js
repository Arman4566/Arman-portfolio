document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 2. Intersection Observer (Scroll Reveal Animations)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing after animation triggers once
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // 3. Dynamic Navbar Active Page Highlight
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    // 4. Smooth Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple user validation indicator
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.style.pointerEvents = 'none';
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

            // Simulate server network delay
            setTimeout(() => {
                submitBtn.style.background = 'linear-gradient(135deg, #00f260, #0575e6)';
                submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-circle-check"></i>';
                contactForm.reset();

                // Reset button back to standard visual state after 3.5s
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.pointerEvents = 'auto';
                }, 3500);
            }, 1800);
        });
    }
});


