/* ===========================
   AXIOM BUSINESS TECH
   main.js — Shared Scripts
   =========================== */

document.addEventListener('DOMContentLoaded', function () {

  // ===========================
  // MOBILE MENU
  // ===========================
  var hamburger = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();

      var isOpen = mobileMenu.classList.contains('open');

      if (isOpen) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      } else {
        mobileMenu.classList.add('open');
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    });

    // Close when a link inside menu is clicked
    var menuLinks = mobileMenu.querySelectorAll('a');
    for (var i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    }

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===========================
  // NAVBAR — Scroll Effect
  // ===========================
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ===========================
  // SCROLL FADE-IN
  // ===========================
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ===========================
  // HERO BAR CHART ANIMATION
  // ===========================
  var bars = document.querySelectorAll('.mini-bar');
  var heights = [30, 45, 35, 60, 40, 70, 50];
  bars.forEach(function (bar, i) {
    bar.style.height = '0px';
    setTimeout(function () {
      bar.style.transition = 'height 0.6s cubic-bezier(0.4,0,0.2,1) ' + (i * 80) + 'ms';
      bar.style.height = heights[i] + 'px';
    }, 1200);
  });

  // ===========================
  // COUNTER ANIMATION
  // ===========================
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.dataset.count);
          var suffix = el.dataset.suffix || '';
          var duration = 1800;
          var step = target / (duration / 16);
          var current = 0;
          var timer = setInterval(function () {
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
    counters.forEach(function (el) { countObserver.observe(el); });
  }

  // ===========================
  // FLIP CARDS — Touch Support
  // ===========================
  var flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(function (card) {
    card.addEventListener('touchend', function (e) {
      if (!e.target.closest('a')) {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    }, { passive: false });
  });

  var style = document.createElement('style');
  style.textContent = '.flip-card.flipped .flip-card-inner{transform:rotateY(180deg);}@media(hover:none){.flip-card:hover .flip-card-inner{transform:none;}}';
  document.head.appendChild(style);

  // ===========================
  // SMOOTH SCROLL
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

});
