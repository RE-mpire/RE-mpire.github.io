
let windows = [];  // Array of window elements sorted by z-index (highest last)

function makeDraggable(draggableElem, titleElem) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;
  let pendingAnimationFrame = false;
  let latestEvent = null;

  function onPointerMove(e) {
    if (!isDragging) return;
    latestEvent = e;
    if (!pendingAnimationFrame) {
      pendingAnimationFrame = true;
      requestAnimationFrame(() => {
        const newLeft = latestEvent.clientX - offsetX;
        const newTop = latestEvent.clientY - offsetY;
        draggableElem.style.left = `${newLeft}px`;
        draggableElem.style.top = `${newTop}px`;
        pendingAnimationFrame = false;
      });
    }
  }

  function onPointerUp(e) {
    isDragging = false;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  }

  titleElem.addEventListener('pointerdown', function (e) {
    const rect = draggableElem.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    isDragging = true;
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  });
}

function bringToFront(windowElem) {
  const oldIndex = windows.indexOf(windowElem);
  if (oldIndex === -1 || oldIndex === windows.length - 1) return; // Already at front

  // Remove and push to end
  windows.splice(oldIndex, 1);
  windows.push(windowElem);

  // Only update z-indexes from the old index to the end
  for (let i = oldIndex; i < windows.length; i++) {
    windows[i].style.zIndex = 100 + i;
  }
}

function maximizeWindow(window) {
  window.classList.toggle("enlarged");
}

function hideWindow(window) {
  window.classList.add("hidden");
}

var windowManager = {
  windows: windows,
  bringToFront: bringToFront
}

export { windowManager, makeDraggable, maximizeWindow, hideWindow };