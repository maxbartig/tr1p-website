// ===== Mobile nav =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Live "bank" timer in the hero phone mock =====
(function bankTimer() {
  const el = document.getElementById('bankTimer');
  if (!el) return;
  let seconds = 3 * 60 + 42;
  setInterval(() => {
    seconds += 1;
    const m = Math.floor(seconds / 60);
    const s = String(seconds % 60).padStart(2, '0');
    el.textContent = `${m}m ${s}s`;
  }, 1000);
})();

// ===== Passport counters, triggered once when scrolled into view =====
(function passportCounters() {
  const card = document.getElementById('passportCard');
  if (!card) return;

  const shavedTarget = 204; // minutes
  const shavedEl = document.getElementById('pShaved');
  const targets = Array.from(card.querySelectorAll('[data-target]'));

  let counted = false;
  function run() {
    if (counted) return;
    counted = true;
    const start = performance.now();
    const dur = 1500;
    function frame(now) {
      const k = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      targets.forEach((elx) => {
        const target = parseInt(elx.getAttribute('data-target'), 10);
        elx.textContent = target >= 1000
          ? Math.round(target * e).toLocaleString('en-US')
          : String(Math.round(target * e));
      });
      if (shavedEl) {
        const val = Math.round(shavedTarget * e);
        shavedEl.textContent = `${Math.floor(val / 60)}h ${val % 60}m`;
      }
      if (k < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const obs = new IntersectionObserver((entries) => {
    if (entries.some((en) => en.isIntersecting)) run();
  }, { threshold: 0.35 });
  obs.observe(card);
})();

// ===== Pricing plan selection =====
(function plans() {
  const buttons = document.querySelectorAll('.plan');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
    });
  });
})();

// ===== Pricing headline word ticker =====
(function pricingTicker() {
  const el = document.getElementById('pricingTicker');
  if (!el) return;
  const words = ['unlimited drives', 'Live Activities', 'personal records', 'instant results'];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % words.length;
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = words[i];
      el.style.opacity = '1';
    }, 200);
  }, 2400);
  el.style.transition = 'opacity .2s';
})();

// ===== FAQ accordion =====
(function faq() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      items.forEach((it) => it.classList.remove('is-open'));
      if (willOpen) item.classList.add('is-open');
    });
  });
  if (items[0]) items[0].classList.add('is-open');
})();
