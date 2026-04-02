history.scrollRestoration = 'manual';

const reveals = document.querySelectorAll('.reveal');
const loader = document.getElementById('loader');
const hero = document.querySelector('.hero');
const heroParallax = document.getElementById('heroParallax');
const scrollDown = document.getElementById('scrollDown');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: "0px 0px -8% 0px"
});

reveals.forEach((el) => observer.observe(el));

window.addEventListener('mousemove', (e) => {
  if (!heroParallax || window.innerWidth < 900) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  heroParallax.style.transform = `translate3d(${x * 0.45}px, ${y * 0.28}px, 0)`;
});

if (scrollDown) {
  scrollDown.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById('sluzby');
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

function forceTop() {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

window.addEventListener('load', () => {
  forceTop();
  setTimeout(forceTop, 60);
  setTimeout(forceTop, 180);

  setTimeout(() => {
    if (loader) loader.classList.add('hidden');
    if (hero) hero.classList.add('hero-animate');
  }, 2400);
});

window.addEventListener('pageshow', () => {
  forceTop();
});
/* ===== SERVICE TABS ===== */
const serviceTabs = document.querySelectorAll('.service-tab');
const servicePanels = document.querySelectorAll('.service-panel');

serviceTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.service;

    serviceTabs.forEach((btn) => btn.classList.remove('active'));
    servicePanels.forEach((panel) => panel.classList.remove('active'));

    tab.classList.add('active');

    const activePanel = document.querySelector(`[data-panel="${target}"]`);
    if (activePanel) activePanel.classList.add('active');
  });
});
