// Light JS for scroll reveals and playful HUD tick
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Animate the speed number for a subtle live feel
const speedEl = document.querySelector('.speed');
if (speedEl) {
  const target = Number(speedEl.dataset.target || 68);
  let current = target - 12;
  const tick = () => {
    current += Math.random() * 1.8;
    if (current > target + 3) current = target - 6;
    speedEl.textContent = Math.round(current);
    requestAnimationFrame(tick);
  };
  tick();
}

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
