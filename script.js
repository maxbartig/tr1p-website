// Light JS for scroll reveals and playful HUD tick
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Mobile nav menu
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenuLinks = document.querySelectorAll('.nav-menu a');

const closeNav = () => {
  if (!nav || !navToggle) return;
  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
};

navToggle?.addEventListener('click', () => {
  if (!nav) return;
  const open = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
});

navMenuLinks.forEach((link) => {
  link.addEventListener('click', () => closeNav());
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});

// Smooth scroll for anchor links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const supportPageForm = document.getElementById('support-page-form');
const suggestPageForm = document.getElementById('suggest-page-form');

supportPageForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(supportPageForm);
  const name = data.get('name') || 'Someone';
  const email = data.get('email') || '';
  const topic = data.get('topic') || 'Support Request';
  const message = data.get('message') || '';
  const body = encodeURIComponent(`From: ${name} (${email})\nTopic: ${topic}\n\n${message}`);
  window.open(`mailto:support@tr1p.app?subject=${encodeURIComponent(String(topic))}&body=${body}`, '_blank');
  supportPageForm.reset();
});

suggestPageForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(suggestPageForm);
  const name = data.get('name') || 'Someone';
  const email = data.get('email') || '';
  const topic = data.get('topic') || 'TR1P Feature Suggestion';
  const message = data.get('message') || '';
  const body = encodeURIComponent(`From: ${name} (${email})\nTopic: ${topic}\n\n${message}`);
  window.open(`mailto:support@tr1p.app?subject=${encodeURIComponent(String(topic))}&body=${body}`, '_blank');
  suggestPageForm.reset();
});

// Rotate hero audience text
const dynamicRole = document.querySelector('.hero-title__dynamic');
if (dynamicRole) {
  const roles = JSON.parse(dynamicRole.dataset.roles || '[]');
  let roleIndex = 0;

  const swapRole = () => {
    roleIndex = (roleIndex + 1) % roles.length;
    dynamicRole.classList.remove('is-changing');
    requestAnimationFrame(() => {
      dynamicRole.textContent = roles[roleIndex];
      dynamicRole.classList.add('is-changing');
    });
  };

  if (roles.length > 1) {
    setInterval(swapRole, 2200);
  }
}
