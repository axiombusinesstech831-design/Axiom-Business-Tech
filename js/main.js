document.addEventListener('DOMContentLoaded', function () {

  var btn = document.getElementById('hamburgerBtn');
  var menu = document.getElementById('mobileMenu');

  if (btn && menu) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle('open');
      btn.classList.toggle('open', open);
    });

    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        btn.classList.remove('open');
      });
    });

    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        btn.classList.remove('open');
      }
    });
  }

  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fade-in').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.fade-in').forEach(function (el) { el.classList.add('visible'); });
  }

  var bars = document.querySelectorAll('.mini-bar');
  var heights = [30, 45, 35, 60, 40, 70, 50];
  bars.forEach(function (bar, i) {
    bar.style.height = '0px';
    setTimeout(function () {
      bar.style.transition = 'height 0.6s ease ' + (i * 80) + 'ms';
      bar.style.height = heights[i] + 'px';
    }, 1200);
  });

  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = +el.dataset.count;
        var suffix = el.dataset.suffix || '';
        var step = target / (1800 / 16);
        var cur = 0;
        var t = setInterval(function () {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          el.textContent = Math.floor(cur) + suffix;
        }, 16);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(function (el) { co.observe(el); });
  }

  document.querySelectorAll('.flip-card').forEach(function (card) {
    card.addEventListener('touchend', function (e) {
      if (!e.target.closest('a')) {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    }, { passive: false });
  });

  var s = document.createElement('style');
  s.textContent = '.flip-card.flipped .flip-card-inner{transform:rotateY(180deg)}@media(hover:none){.flip-card:hover .flip-card-inner{transform:none}}';
  document.head.appendChild(s);

});
