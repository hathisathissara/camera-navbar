// ===========================
// NAV - Active Link & Smooth Scroll
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('nav-links');

  // --- Hamburger toggle ---
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
    document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- Active nav link on scroll ---
  function updateActiveLink() {
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          // Remove active dot
          const dot = link.querySelector('.nav-dot');
          if (dot) dot.style.display = 'none';
        });

        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
          // Ensure dot shows on active
          let dot = activeLink.querySelector('.nav-dot');
          if (!dot) {
            dot = document.createElement('span');
            dot.classList.add('nav-dot');
            activeLink.appendChild(dot);
          }
          dot.style.display = 'block';
        }
      }
    });
  }

  // --- Navbar background on scroll ---
  function updateNavbar() {
    if (window.scrollY > 80) {
      navbar.style.background = 'rgba(15, 15, 15, 0.95)';
      navbar.style.backdropFilter = 'blur(20px)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.6), 0 1px 0 rgba(255, 255, 255, 0.03) inset';
    } else {
      navbar.style.background = '';
      navbar.style.backdropFilter = '';
      navbar.style.boxShadow = '';
    }
  }

  window.addEventListener('scroll', () => {
    updateActiveLink();
    updateNavbar();
  }, { passive: true });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll(
    '.section-header, .portfolio-item, .film-card, .about-image-col, .about-content-col, .contact-form, .contact-card'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Staggered portfolio animation ---
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });

  const filmCards = document.querySelectorAll('.film-card');
  filmCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.12}s`;
  });

  const contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // --- Contact form ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-primary');
      const originalText = btn.textContent;
      btn.textContent = 'Message Sent! ✓';
      btn.style.background = '#4CAF50';
      btn.style.pointerEvents = 'none';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.pointerEvents = '';
        contactForm.reset();
      }, 2500);
    });
  }

  // Initial calls
  updateActiveLink();
  updateNavbar();
});
