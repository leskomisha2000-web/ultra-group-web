history.scrollRestoration = 'manual';

const reveals = document.querySelectorAll('.reveal');
const tiltCards = document.querySelectorAll('.tilt-card');
const heroParallax = document.getElementById('heroParallax');
const loader = document.getElementById('loader');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });

reveals.forEach((el) => revealObserver.observe(el));

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.012)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

window.addEventListener('mousemove', (e) => {
  if (!heroParallax || window.innerWidth < 900) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  heroParallax.style.transform =
    `translate3d(${x * 0.6}px, ${y * 0.45}px, 0)`;
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
  }, 2700);
});

window.addEventListener('pageshow', () => {
  forceTop();
});
