/* ═══════════════════════════════════════════════════════════
   ECOSYSTEMA — Landing Scripts v3
   Premium motion: text reveals, stagger, counters, parallax
   ═══════════════════════════════════════════════════════════ */

// ─── HERO TEXT REVEAL (clip-slide animation) ───
function initHeroReveal() {
  const heroLines = document.querySelectorAll('.hero-line');

  heroLines.forEach((line) => {
    const text = line.innerHTML;
    line.innerHTML = `<span class="hero-line-inner">${text}</span>`;
  });

  // Trigger after a small delay for page load feel
  setTimeout(() => {
    const inners = document.querySelectorAll('.hero-line-inner');
    inners.forEach((inner, i) => {
      inner.style.transitionDelay = `${0.3 + i * 0.15}s`;
      inner.classList.add('visible');
    });

    // Also trigger eyebrow and bottom elements
    document.querySelector('.hero-eyebrow')?.classList.add('visible');
    document.querySelector('.hero-cta')?.classList.add('visible');
    document.querySelector('.hero-sub')?.classList.add('visible');
  }, 200);
}

// ─── SCROLL REVEAL with stagger ───
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      // Find siblings in the same parent that are .reveal
      const parent = entry.target.parentElement;
      const siblings = parent.querySelectorAll(':scope > .reveal');
      let index = 0;

      siblings.forEach((sib, i) => {
        if (sib === entry.target) index = i;
      });

      // Stagger delay based on position among siblings
      entry.target.style.animationDelay = `${index * 0.12}s`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach((el) => observer.observe(el));
}

// ─── HEADER SCROLL ───
function initHeaderScroll() {
  const header = document.getElementById('header');
  const scrollIndicator = document.getElementById('scrollIndicator');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }

        // Fade out scroll indicator
        if (scrollIndicator) {
          scrollIndicator.style.opacity = Math.max(0, 1 - scrollY / 250);
        }

        ticking = false;
      });
      ticking = true;
    }
  });
}

// ─── HAMBURGER ───
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── SMOOTH SCROLL ───
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ─── ACCORDION (Services + FAQ) ───
function initAccordions() {
  // Services
  document.querySelectorAll('.service-item').forEach((item) => {
    item.querySelector('.service-trigger').addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.service-item').forEach((i) => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  // FAQ
  document.querySelectorAll('.faq-item').forEach((item) => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}

// ─── COUNTER ANIMATION ───
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length === 0) return;

  let animated = false;
  const statsSection = statNumbers[0].closest('.stats-section');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;

        statNumbers.forEach((el, i) => {
          const target = parseInt(el.dataset.target, 10);
          const duration = target > 100 ? 2200 : 1600;

          // Stagger each counter
          setTimeout(() => {
            const start = performance.now();
            function tick(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out quart
              const eased = 1 - Math.pow(1 - progress, 4);
              el.textContent = Math.floor(eased * target).toLocaleString('es-CO');
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                el.textContent = target.toLocaleString('es-CO');
              }
            }
            requestAnimationFrame(tick);
          }, i * 150);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(statsSection);
}

// ─── SUBTLE PARTICLES (tiny white dots drifting slowly) ───
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const COUNT = 30;

  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement('div');
    dot.className = 'particle';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;

    const tx = (Math.random() - 0.5) * 150;
    const ty = (Math.random() - 0.5) * 150;
    dot.style.setProperty('--tx', `${tx}px`);
    dot.style.setProperty('--ty', `${ty}px`);

    const dur = 6 + Math.random() * 10;
    dot.style.animationDuration = `${dur}s`;
    dot.style.animationDelay = `${Math.random() * dur}s`;

    const size = 1 + Math.random() * 2;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;

    container.appendChild(dot);
  }
}

// ─── PARALLAX on mouse move (hero only) ───
function initHeroParallax() {
  const hero = document.querySelector('.hero-inner');
  if (!hero) return;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    const glows = document.querySelectorAll('.hero-glow');
    glows.forEach((glow, i) => {
      const factor = (i + 1) * 8;
      glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
}

// ─── CONTACT FORM (mock) ───
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const original = btn.innerHTML;

    btn.innerHTML = '✓ Mensaje enviado';
    btn.style.background = '#10b981';
    btn.style.color = '#fff';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  initHeroReveal();
  initScrollReveal();
  initHeaderScroll();
  initHamburger();
  initSmoothScroll();
  initAccordions();
  initCounters();
  initParticles();
  initHeroParallax();
  initContactForm();
});
