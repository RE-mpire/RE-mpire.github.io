if (!('ontouchstart' in window)) {  // Skip mouse effects on touch devices

  /* Spotlight Effect */
  // match the spotlight effect to elements with class 'spotlight-container-xx where xx is the radius
  document.querySelectorAll('[class*="spotlight-container"]').forEach(el => {
    // Extract radius from class name, default to 600 if not found
    const match = el.className.match(/spotlight-container-(\d+)/);
    const radius = match ? parseInt(match[1], 10) : 600;

    el.addEventListener('mousemove', e => {
      // Get mouse position relative to viewport
      const x = e.clientX;
      const y = e.clientY;
      el.querySelectorAll('.spotlight').forEach(g => {
        // Get spotlight element's bounding rect
        const rect = g.getBoundingClientRect();
        // Calculate mouse position relative to this spotlight element
        const localX = x - rect.left;
        const localY = y - rect.top;
        g.style.backgroundImage = `radial-gradient(${radius}px at ${localX}px ${localY}px, rgba(255,255,255,0.2), transparent 70%)`;
      });
    });
  });

  /* Link Stalker */
  const stalker = document.getElementById('STALKER');
  const stalkerLink = stalker.querySelector('.stalker-link');
  // Move stalker under mouse
  document.addEventListener('mousemove', (e) => {
    stalker.style.transform = `translate(${e.clientX}px, ${e.clientY + 24}px)`;
  });
  // Update stalker link on hover
  document.querySelectorAll('a').forEach(link => {
    // Skip with class no-stalker
    if (link.classList.contains('no-stalker')) return;
    link.addEventListener('mouseenter', (e) => {
      const stalkerInner = document.getElementById('STALKER_INNER');
      stalkerInner.style.opacity = '1';
      stalkerInner.style.filter = 'blur(0px)';
      stalkerInner.style.transitionDuration = '0.4s';
      stalkerLink.textContent = link.href;
      const width = stalkerInner.offsetWidth;
      stalkerInner.style.marginLeft = `-${width / 2}px`;
    });
    link.addEventListener('mouseleave', (e) => {
      const stalkerInner = document.getElementById('STALKER_INNER');
      stalkerInner.style.opacity = '0';
      stalkerInner.style.filter = 'blur(16px)';
      stalkerInner.style.transitionDuration = '1.2s';
    });
  });
} else {
  console.log('Touch device detected, skipping mouse effects');
}

