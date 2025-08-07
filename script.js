import { App } from './app.js';

function disableLinkDrag(body) {
  // Disable dragging on all links
  body.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener("dragstart", function (e) {
      e.preventDefault();  // Prevent default drag behavior
    });
  });
}

// Initialize spotlight effects on elements with class 'spotlight-container'
// radius can be set via class name i.e. 'spotlight-container-500'
function initSpotlights(body) {
  body.querySelectorAll('[class*="spotlight-container"]').forEach(el => {
    const match = el.className.match(/spotlight-container-(\d+)/);
    const radius = match ? parseInt(match[1], 10) : 500;  // Default radius if not set

    function updateSpotlight(x, y) {
      el.querySelectorAll('.spotlight').forEach(g => {
        const rect = g.getBoundingClientRect();
        const localX = x - rect.left;
        const localY = y - rect.top;
        g.style.backgroundImage = `radial-gradient(${radius}px at ${localX}px ${localY}px, #fff3, transparent 70%)`;
      });
    }

    el.addEventListener('mousemove', e => {
      updateSpotlight(e.clientX, e.clientY);
    });
  });
}

// Display link href on hover
const stalker = document.getElementById('STALKER');
const stalkerInner = stalker.querySelector('#STALKER_INNER');
const stalkerLink = stalker.querySelector('.stalker-link');

// Stalker follows mouse
document.addEventListener('mousemove', (e) => {
  stalker.style.transform = `translate(${e.clientX}px, ${e.clientY + 24}px)`;
});

function updateStalkerLinks(body) {
  function showStalker(e, link) {
    stalkerInner.style.opacity = '1';
    stalkerInner.style.filter = 'blur(0px)';
    stalkerInner.style.transitionDuration = '.4s';
    stalkerLink.textContent = link.href.replace(/^https?:\/\//, '');
    stalkerInner.style.marginLeft = `-${stalkerInner.offsetWidth / 2}px`;
    stalker.style.transform = `translate(${e.clientX}px, ${e.clientY + 24}px)`;
  }

  function hideStalker() {
    stalkerInner.style.opacity = '0';
    stalkerInner.style.filter = 'blur(16px)';
    stalkerInner.style.transitionDuration = '1.2s';
  }

  body.querySelectorAll('a:not(.no-stalker)').forEach(link => {
    link.onmouseenter = e => showStalker(e, link);
    link.onmouseleave = hideStalker;
  })
}

updateStalkerLinks(document);

if ('ontouchstart' in window) {  // Skip mouse effects for touch input
  document.addEventListener('touchstart', function (e) {
    e.preventDefault();  // Stop touch from generating mouse events
  }, { passive: false });

  document.addEventListener('touchend', function (e) {
    // Bypass 300ms delay for simulated click events
    e.preventDefault();
    e.target.click();
  }, { passive: false });
}

// window.initPageContent = function (el) {
export function initPageContent(el) {
  disableLinkDrag(el);
  initSpotlights(el);
  updateStalkerLinks(el);
}