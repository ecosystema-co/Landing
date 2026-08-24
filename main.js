// Project Data
const PROJECTS = [
  {
    slug: 'blooma',
    title: 'Blooma.io',
    year: '2024',
    category: 'SaaS · Diseño por suscripción',
    description:
      'Gestor de proyectos de diseño y desarrollo tanto para empresas como para freelance donde encontrarás todo lo necesario para tus trabajos, proyectos y ofertas.',
    tags: ['UI/UX', 'Plataforma Web', 'Créditos & Pagos', 'Branding'],
    url: 'https://blooma.io',
    cover: '/projects/blooma/landing1.png',
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
    description:
      'Landing de inspección y certificación de instalaciones de gas natural y GLP, con envío de PQRS directo al correo empresarial y múltiples canales de contacto para agendar inspecciones y citas.',
    tags: ['Sitio Corporativo', 'Formulario PQRS', 'WhatsApp', 'Normativa'],
    url: 'https://inspecol.com',
    cover: '/projects/inspecol/5.png',
    gallery: [
      '/projects/inspecol/5.png',
      '/projects/inspecol/sec.png',
      '/projects/inspecol/radicar.png',
      '/projects/inspecol/3.png',
      '/projects/inspecol/4.png',
      '/projects/inspecol/6.png',
    ],
  },
];

// Header Scroll Effect
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const questionBtn = item.querySelector('.faq-question');

  questionBtn.addEventListener('click', () => {
    // Close other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.icon').textContent = '+';
      }
    });

    // Toggle current item
    item.classList.toggle('active');
    const icon = item.querySelector('.icon');

    if (item.classList.contains('active')) {
      icon.textContent = '-';
    } else {
      icon.textContent = '+';
    }
  });
});

// Projects Grid Rendering
const projectsGrid = document.getElementById('projects-grid');

projectsGrid.innerHTML = PROJECTS.map(
  project => `
    <article class="project-card" tabindex="0" role="button" data-slug="${project.slug}" aria-haspopup="dialog" aria-label="Ver detalle del proyecto ${project.title}">
      <div class="project-media">
        <img src="${project.cover}" alt="Vista previa del proyecto ${project.title}" loading="lazy">
        <span class="project-hint">Ver proyecto ↗</span>
      </div>
      <div class="project-info">
        <h3 class="project-title">${project.title}</h3>
        <span class="label">${project.year}</span>
      </div>
    </article>
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

// Smooth Scrolling for anchor links (if browser doesn't support CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
