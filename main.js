/* ===========================
   AXIOM BUSINESS TECH
   main.js — Shared Scripts
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===========================
  // NAVBAR — Scroll Effect
  // ===========================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ===========================
  // NAVBAR — Active Link
  // ===========================
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ===========================
  // NAVBAR — Mobile Menu
  // ===========================
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  }

  // ===========================
  // SCROLL FADE-IN (Intersection Observer)
  // ===========================
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(el => observer.observe(el));
  }

  // ===========================
  // HERO MINI BAR CHART ANIMATION
  // ===========================
  const bars = document.querySelectorAll('.mini-bar');
  const heights = [30, 45, 35, 60, 40, 70, 50];

  bars.forEach((bar, i) => {
    bar.style.height = '0px';
    setTimeout(() => {
      bar.style.transition = `height 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i * 80}ms`;
      bar.style.height = heights[i] + 'px';
    }, 1200);
  });

  // ===========================
  // COUNTER ANIMATION
  // ===========================
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const step = target / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = Math.floor(current) + suffix;
          }, 16);

          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => countObserver.observe(el));
  }

  // ===========================
  // FLIP CARDS — Touch Support (Mobile)
  // ===========================
  const flipCards = document.querySelectorAll('.flip-card');

  flipCards.forEach(card => {
    let isTouching = false;

    card.addEventListener('touchstart', () => {
      isTouching = true;
    }, { passive: true });

    card.addEventListener('touchend', () => {
      if (isTouching) {
        card.classList.toggle('flipped');
        isTouching = false;
      }
    });
  });

  // Also support CSS class for mobile tap
  const style = document.createElement('style');
  style.textContent = `
    .flip-card.flipped .flip-card-inner {
      transform: rotateY(180deg);
    }
    @media (hover: none) {
      .flip-card:hover .flip-card-inner {
        transform: none;
      }
    }
  `;
  document.head.appendChild(style);

  // ===========================
  // SMOOTH SCROLL for Anchor Links
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===========================
  // LOGO HOVER — Name Reveal (Already CSS-driven, this adds aria)
  // ===========================
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.setAttribute('aria-label', 'Axiom Business Tech — Home');
  }

});
