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

