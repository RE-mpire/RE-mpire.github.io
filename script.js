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
// radius can be set via class name i.e. 'spotlight-container-600'
function initSpotlights(body) {
  body.querySelectorAll('[class*="spotlight-container"]').forEach(el => {
    const match = el.className.match(/spotlight-container-(\d+)/);
    const radius = match ? parseInt(match[1], 10) : 600;  // Default radius if not set

    el.addEventListener('mousemove', e => {
      // Get mouse position relative to viewport
      const x = e.clientX;
      const y = e.clientY;
      el.querySelectorAll('.spotlight').forEach(g => {
        // Place the spotlight at mouse position for each spotlight element
        const rect = g.getBoundingClientRect();
        const localX = x - rect.left;
        const localY = y - rect.top;
        g.style.backgroundImage = `radial-gradient(${radius}px at ${localX}px ${localY}px, #fff3, transparent 70%)`;
      });
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
  body.querySelectorAll('a').forEach(link => {
    // Skip with class no-stalker
    if (link.classList.contains('no-stalker')) return;

    link.addEventListener('mouseenter', (e) => {
      stalkerInner.style.opacity = '1';
      stalkerInner.style.filter = 'blur(0px)';
      stalkerInner.style.transitionDuration = '.4s';
      stalkerLink.textContent = link.href.replace(/^https?:\/\//, '');
      const width = stalkerInner.offsetWidth;
      stalkerInner.style.marginLeft = `-${width / 2}px`;
      stalker.style.transform = `translate(${e.clientX}px, ${e.clientY + 24}px)`;
    });
    link.addEventListener('mouseleave', (e) => {
      stalkerInner.style.opacity = '0';
      stalkerInner.style.filter = 'blur(16px)';
      stalkerInner.style.transitionDuration = '1.2s';
    });
  });
}

updateStalkerLinks(document);

if ('ontouchstart' in window) {  // Skip mouse effects on touch devices
  console.log('Touch device detected, skipping mouse effects');
  initSpotlights = function () { }
  initLinkDisplay = function () { }
}

// window.initPageContent = function (el) {
export function initPageContent(el) {
  disableLinkDrag(el);
  initSpotlights(el);
  updateStalkerLinks(el);
}