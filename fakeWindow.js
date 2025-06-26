import { loadComponent, createComponent } from './lib/components.js';

function initfakeWindow() {

  // Get Browser and OS information
  const ua = navigator.userAgent;
  let browser = "chrome"; // Default to Chrome

  if (/Chrome\/([\d.]+)/.test(ua)) {
    browser = "chrome";
  } else if (/Safari\/([\d.]+)/.test(ua)) {
    browser = "safari";
  } else if (/Firefox\/([\d.]+)/.test(ua)) {
    browser = "firefox";
  }

  let os = "mac"; // Default to Mac
  if (/Windows/i.test(ua)) os = "win";
  else if (/Mac/i.test(ua)) os = "mac";

  // ---- Debugging ----
  const infoDiv = document.querySelector('.browser-info');
  if (infoDiv) {
    infoDiv.innerHTML =
      `Browser name: ${browser}<br>` +
      `OS: ${os}<br>` +
      `User Agent: ${ua}<br>`;
  }
  // -------------------

  if (browser == "safari") {
    if (os == "windows") {
      console.log("WHAT!?!")
    }
    browser = "chrome"; // Safari is not supported yet
  }

  const windowType = `${os}-${browser}`;

  function addWindow() {
    const domain = "example.com";

    const wrapper = document.getElementById('window-wrapper');
    createComponent(
      windowType,
      {
        title: 'My Custom Window',
        domainName: domain,
        domainPath: '',
        iframeSrc: `https://${domain}`,
      },
      function (el) {
        wrapper.appendChild(el);
      }
    );
  }

  // Ensure addWindow runs only after load completed
  loadComponent(windowType, function () {
    addWindow();
  });

}

export { initfakeWindow };