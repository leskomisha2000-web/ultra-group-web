history.scrollRestoration = 'manual';

const reveals = document.querySelectorAll('.reveal');
const heroParallax = document.getElementById('heroParallax');
const loader = document.getElementById('loader');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.16 });

reveals.forEach((el) => revealObserver.observe(el));

window.addEventListener('mousemove', (e) => {
  if (!heroParallax || window.innerWidth < 900) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 8;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;

  heroParallax.style.transform =
    `translate3d(${x * 0.45}px, ${y * 0.28}px, 0)`;
});

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
  }, 1900);
});

window.addEventListener('pageshow', () => {
  forceTop();
});
