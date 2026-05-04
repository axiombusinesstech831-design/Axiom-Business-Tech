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
      navbar.classList.toggle('scrolled', window.scrollY > 20);
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
  // NAVBAR — Mobile Menu (FIXED)
  // ===========================
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');

  if (hamburger && mobileMenu) {

    function openMenu() {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
      if (mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when any mobile nav link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close when clicking anywhere outside the menu or hamburger
    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
        hamburger.focus();
      }
    });
  }

  // ===========================
  // SCROLL FADE-IN (Intersection Observer)
  // ===========================
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px'
      });

      fadeEls.forEach(el => observer.observe(el));
    } else {
      fadeEls.forEach(el => el.classList.add('visible'));
    }
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

  if (counters.length > 0 && 'IntersectionObserver' in window) {
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
    card.addEventListener('touchend', (e) => {
      // Only toggle if not tapping a link inside the card
      if (!e.target.closest('a')) {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    }, { passive: false });
  });

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
  // LOGO — Aria Label
  // ===========================
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.setAttribute('aria-label', 'Axiom Business Tech — Home');
  }

});
