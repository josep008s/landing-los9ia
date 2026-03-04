/* ============================================
   AprendeDe — Los 9 de la IA Landing
   ============================================ */
(function () {
  'use strict';

  // --- Scroll Reveal ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // --- Counter Animation ---
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1200;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(ease * target);
      el.textContent = prefix + current.toLocaleString('es-ES') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq__item').forEach((item) => {
    item.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq__item').forEach((i) => i.classList.remove('active'));
      // Toggle current
      if (!isActive) item.classList.add('active');
    });
  });

  // --- Sticky CTA on Mobile ---
  const stickyCta = document.querySelector('.sticky-cta');
  const heroSection = document.querySelector('.hero');

  if (stickyCta && heroSection) {
    const stickyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            stickyCta.classList.add('show');
          } else {
            stickyCta.classList.remove('show');
          }
        });
      },
      { threshold: 0 }
    );
    stickyObserver.observe(heroSection);
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
