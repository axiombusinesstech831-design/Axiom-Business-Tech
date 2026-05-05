/* ============================================================
   AXIOM BUSINESS TECH — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initCounterAnimation();
  initMarquee();
  initFormHandling();
});

/* ── NAVBAR SCROLL EFFECT ──────────────────────────────── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ── MOBILE MENU TOGGLE ────────────────────────────────── */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (!hamburgerBtn || !mobileMenu) return;

  hamburgerBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('open', isOpen);
  });

  // Close menu when link clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      hamburgerBtn.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburgerBtn.classList.remove('open');
    }
  });
}

/* ── SCROLL FADE-IN ANIMATIONS ────────────────────────── */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
    observer.observe(el);
  });
}

/* ── COUNTER ANIMATION (Stats) ────────────────────────– */
function initCounterAnimation() {
  const observerOptions = { threshold: 0.5 };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const step = target / (duration / 16);
      
      let current = 0;
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = Math.floor(current) + suffix;
      }, 16);
      
      observer.unobserve(el);
    });
  }, observerOptions);

  document.querySelectorAll('[data-count]').forEach(el => {
    observer.observe(el);
  });
}

/* ── ANIMATED MARQUEE ──────────────────────────────────– */
function initMarquee() {
  const marqueeTrack = document.querySelector('.marquee-track');
  if (!marqueeTrack) return;

  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });

  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

/* ── FORM HANDLING ─────────────────────────────────────– */
function initFormHandling() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate required fields
    let isValid = true;
    form.querySelectorAll('[required]').forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#F43F5E';
        isValid = false;
      }
    });

    if (!isValid) return;

    // Show loading state
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    // Simulate send (in production, use FormSpree, EmailJS, or backend API)
    setTimeout(() => {
      const formContent = document.getElementById('formContent');
      const formSuccess = document.getElementById('formSuccess');
      
      if (formContent && formSuccess) {
        formContent.style.display = 'none';
        formSuccess.style.display = 'block';
      }

      // Reset form
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Reset after 5 seconds
      setTimeout(() => {
        if (formContent && formSuccess) {
          formContent.style.display = 'block';
          formSuccess.style.display = 'none';
        }
      }, 5000);
    }, 1200);
  });
}

/* ── SMOOTH SCROLL LINKS ────────────────────────────────– */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── ACTIVE NAV LINK TRACKING ──────────────────────────– */
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (window.scrollY >= top - 100 && window.scrollY < top + height - 100) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { passive: true });

/* ── IMAGE LAZY LOADING FALLBACK ───────────────────────– */
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.src;
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(img);
  }
});

/* ── DYNAMIC YEAR IN FOOTER ────────────────────────────– */
const yearSpan = document.querySelector('.footer-copy span');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

console.log('✨ Axiom Business Tech — Modern & Ready');
