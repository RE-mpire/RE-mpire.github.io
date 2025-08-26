// effects.js - Handles various visual effects on the page

function disableLinkDrag(body) {
  // Disable dragging on all links
  body.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener("dragstart", function (e) {
      e.preventDefault();  // Prevent default drag behavior
    });
  });
}

/* === Spotlight Effect === */
// Initialize spotlight effects on elements with class 'spotlight-container'
// radius can be set via class name i.e. 'spotlight-container-500'
function initSpotlights(body) {
  body.querySelectorAll('[class*="spotlight-container"]').forEach(el => {
    const match = el.className.match(/spotlight-container-(\d+)/);
    const radius = match ? parseInt(match[1], 10) : 500;  // Default radius if not set

    const updateSpotlight = (x, y) => {  // moves the spotlight to (x, y)
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
/* === End Spotlight Effect === */

/* === Stalker Link Effect === */
// Elements display a floating label that follows the cursor when hovering over links
const stalker = document.getElementById('STALKER');
const stalkerInner = stalker.querySelector('#STALKER_INNER');
const stalkerLink = stalker.querySelector('.stalker-link');

// Stalker follows mouse
document.addEventListener('mousemove', (e) => {
  stalker.style.transform = `translate(${e.clientX}px, ${e.clientY + 24}px)`;
});

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

function updateStalkerLinks(body) {
  body.querySelectorAll('a:not(.no-stalker)').forEach(link => {
    link.onmouseenter = e => showStalker(e, link);
    link.onmouseleave = hideStalker;
  })
}
/* === End Stalker Link Effect === */

/* === Initialize the page content here === */
if ('ontouchstart' in window) {  // Skip mouse effects for touch input
  let touchCanceled = false;

  document.addEventListener('touchstart', function (e) {
    touchCanceled = false;
  });

  document.addEventListener('touchend', function (e) {
    e.preventDefault();
    const link = e.target.closest('a');
    if (link && !touchCanceled) {
      link.click();
    }
  }, { passive: false });

  document.addEventListener('touchmove', function () {
    touchCanceled = true;
  });
}

updateStalkerLinks(document);
disableLinkDrag(document);
/* === End Initialization === */

export function initPageContent(el) {
  hideStalker();
  disableLinkDrag(el);
  initSpotlights(el);
  updateStalkerLinks(el);
}