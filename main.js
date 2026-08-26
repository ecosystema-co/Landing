// Project Data
const PROJECTS = [
  {
    slug: 'blooma',
    title: 'Blooma.io',
    year: '2024',
    category: 'SaaS · Diseño por suscripción',
    desc: 'Gestor de proyectos de diseño y desarrollo para empresas y freelance.',
    description:
      'Gestor de proyectos de diseño y desarrollo tanto para empresas como para freelance donde encontrarás todo lo necesario para tus trabajos, proyectos y ofertas.',
    tags: ['Next.js', 'Spring Boot', 'PostgreSQL'],
    url: 'https://blooma.io',
    cover: '/projects/blooma/landing1.png',
    wide: true,
    gallery: [
      '/projects/blooma/landing1.png',
      '/projects/blooma/landing2.png',
      '/projects/blooma/landing3.png',
      '/projects/blooma/landing4.png',
      '/projects/blooma/landing5.png',
      '/projects/blooma/dashboard.png',
      '/projects/blooma/projects.png',
      '/projects/blooma/orders.png',
      '/projects/blooma/orderDetails.png',
      '/projects/blooma/wallet.png',
      '/projects/blooma/credits.png',
      '/projects/blooma/Pricing.png',
      '/projects/blooma/portfolio.png',
      '/projects/blooma/brandkit.png',
      '/projects/blooma/members.png',
      '/projects/blooma/files.png',
      '/projects/blooma/storage.png',
      '/projects/blooma/authorization.png',
    ],
  },
  {
    slug: 'inspecol',
    title: 'Inspecol',
    year: '2026',
    category: 'Web corporativa · Inspección de gas',
    desc: 'Landing de inspección y certificación de instalaciones de gas natural y GLP.',
    description:
      'Landing de inspección y certificación de instalaciones de gas natural y GLP, con envío de PQRS directo al correo empresarial y múltiples canales de contacto para agendar inspecciones y citas.',
    tags: ['Next.js', 'Hostinger', 'WhatsApp API'],
    url: 'https://inspecol.com',
    cover: '/projects/inspecol/5.png',
    wide: false,
    gallery: [
      '/projects/inspecol/5.png',
      '/projects/inspecol/sec.png',
      '/projects/inspecol/radicar.png',
      '/projects/inspecol/3.png',
      '/projects/inspecol/4.png',
      '/projects/inspecol/6.png',
    ],
  },
  {
    slug: 'mercaqta',
    title: 'MercaQTA',
    year: '2025',
    category: 'E-commerce · Logística integrada',
    desc: 'Plataforma e-commerce con logística integrada para el Caquetá.',
    description:
      'Plataforma de comercio electrónico diseñada para negocios del Caquetá, con sistema de pagos integrado, gestión de inventario y rastreo de envíos en tiempo real.',
    tags: ['Flutter', 'FastAPI', 'PostgreSQL'],
    url: '#',
    cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    wide: false,
    gallery: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    slug: 'flettero',
    title: 'Flettero Logística',
    year: '2025',
    category: 'Sistema logístico · Rastreo GPS',
    desc: 'Sistema de gestión logística y rastreo GPS en tiempo real.',
    description:
      'Plataforma de gestión logística con rastreo GPS en tiempo real, optimización de rutas y administración de flota para empresas de transporte y distribución.',
    tags: ['Next.js', 'Python', 'AWS'],
    url: '#',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    wide: true,
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
    ],
  },
];

// Header Scroll Effect
const header = document.querySelector('.header');
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

  setTimeout(() => {
    const inners = document.querySelectorAll('.hero-line-inner');
    inners.forEach((inner, i) => {
      inner.style.transitionDelay = `${0.3 + i * 0.15}s`;
      inner.classList.add('visible');
    });

    document.querySelector('.hero-eyebrow')?.classList.add('visible');
    document.querySelector('.hero-cta')?.classList.add('visible');
    document.querySelector('.hero-sub')?.classList.add('visible');
  }, 200);
}

// Projects Grid Rendering
const projectsGrid = document.getElementById('projects-grid');

projectsGrid.innerHTML = PROJECTS.map(
  project => `
    <a href="#" class="project-card${project.wide ? ' project-card--wide' : ''} reveal" tabindex="0" role="button" data-slug="${project.slug}" aria-haspopup="dialog" aria-label="Ver detalle del proyecto ${project.title}">
      <div class="project-img">
        <img src="${project.cover}" alt="Vista previa del proyecto ${project.title}" loading="lazy">
        <div class="project-overlay">
          <span class="project-view">Ver proyecto →</span>
        </div>
      </div>
      <div class="project-info">
        <div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.desc}</p>
        </div>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
      </div>
    </a>
  `
).join('');

// Project Detail Modal
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('project-modal-content');
let lastFocusedElement = null;

function openProjectModal(slug) {
  const project = PROJECTS.find(p => p.slug === slug);
  if (!project) return;

  modalContent.innerHTML = `
    <div class="label">${project.year} · ${project.category}</div>
    <h2 class="modal-title" id="modal-title">${project.title}<span class="text-grey">.</span></h2>
    <div class="modal-body">
      <p class="modal-desc">${project.description}</p>
      <div>
        <div class="modal-tags">
          ${project.tags.map(tag => `<span class="tag tag-dark">${tag}</span>`).join('')}
        </div>
        <a class="btn-primary modal-cta" href="${project.url}" target="_blank" rel="noopener noreferrer">Visitar sitio ↗</a>
      </div>
    </div>
    <div class="modal-gallery">
      ${project.gallery
        .map((src, index) => `<img src="${src}" alt="${project.title} — captura ${index + 1}" loading="lazy">`)
        .join('')}
    </div>
  `;

  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => modal.classList.add('open'));
  });
  document.body.classList.add('no-scroll');
  modal.querySelector('.modal-close').focus();
}

function closeProjectModal() {
  if (modal.hidden) return;

  modal.classList.add('closing');
  setTimeout(() => {
    modal.classList.remove('open', 'closing');
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
    if (lastFocusedElement) lastFocusedElement.focus();
  }, 450);
}

projectsGrid.addEventListener('click', event => {
  event.preventDefault();
  const card = event.target.closest('.project-card');
  if (card) openProjectModal(card.dataset.slug);
});

projectsGrid.addEventListener('keydown', event => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const card = event.target.closest('.project-card');
  if (card) {
    event.preventDefault();
    openProjectModal(card.dataset.slug);
  }
});

modal.addEventListener('click', event => {
  if (event.target.closest('[data-modal-close]')) closeProjectModal();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeProjectModal();
});



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
