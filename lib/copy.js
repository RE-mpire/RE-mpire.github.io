// copy.js - Handles copy-to-clipboard functionality for code blocks 

function triggerCopy(button) {
  const copyIndicator = button.previousElementSibling;
  const codeBlock = button.closest('.code-block')?.querySelector('.copyable');
  copyIndicator.style = '  opacity: 1; transform: translateX(0px); filter: blur(0px);'
  setTimeout(() => {
    copyIndicator.style = '';  // Reset styles
  }, 1000);
  if (!codeBlock) {
    console.error('No copyable found.');
    return;
  }
  navigator.clipboard.writeText(codeBlock.textContent);
}

export function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
      triggerCopy(this);
    });
  });
}