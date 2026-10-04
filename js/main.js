// 1. Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Reveal sections as they scroll into view
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// 3. Highlight the nav link of the section you're viewing
const navLinks = document.querySelectorAll('.nav-link');
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('section[id]').forEach((s) => spyObserver.observe(s));

// 4. Close the mobile menu after tapping a link
const menu = document.getElementById('menu');
document.querySelectorAll('.nav-link, .navbar .btn').forEach((link) => {
  link.addEventListener('click', () => {
    if (menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// 5. Soft glow that follows the mouse (desktop only)
const glow = document.querySelector('.glow');
const canHover = matchMedia('(hover: hover)').matches;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canHover && !reduceMotion) {
  window.addEventListener('mousemove', (e) => {
    glow.style.setProperty('--x', e.clientX + 'px');
    glow.style.setProperty('--y', e.clientY + 'px');
  });
}