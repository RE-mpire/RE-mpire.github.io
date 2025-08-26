import { Router } from './lib/router.js';
import { initCopyButtons } from './lib/copy.js';
import { initPageContent } from './script.js';
import './lib/animatedSvg.js';

var App = {};

function initPage(content) {
  // Initialize the page content
  initPageContent(content);
  initCopyButtons();
}

App.init = function () {
  // Initialize static routes
  Router.addRoute('/', initPage);
  Router.addRoute('/pages/blog/placeholder', initPage);
  Router.addRoute('/pages/projects', initPage);
  Router.addRoute('/pages/tools', initPage);

  // Load the initial route based on the current URL
  Router.loadRoute(location.pathname);

  // Handle browser navigation events
  window.addEventListener('popstate', function () {
    Router.loadRoute(location.pathname);
  });
};

/* Nothing to see here */
function easterEgg() {
  var msg = "      ___           ___           ___           ___                     ___           ___     \r\n     /  /\\         /  /\\         /__/\\         /  /\\      ___          /  /\\         /  /\\    \r\n    /  /::\\       /  /:/_       |  |::\\       /  /::\\    /  /\\        /  /::\\       /  /:/_   \r\n   /  /:/\\:\\     /  /:/ /\\      |  |:|:\\     /  /:/\\:\\  /  /:/       /  /:/\\:\\     /  /:/ /\\  \r\n  /  /:/~/:/    /  /:/ /:/_   __|__|:|\\:\\   /  /:/~/:/ /__/::\\      /  /:/~/:/    /  /:/ /:/_ \r\n /__/:/ /:/___ /__/:/ /:/ /\\ /__/::::| \\:\\ /__/:/ /:/  \\__\\/\\:\\__  /__/:/ /:/___ /__/:/ /:/ /\\\r\n \\  \\:\\/:::::/ \\  \\:\\/:/ /:/ \\  \\:\\~~\\__\\/ \\  \\:\\/:/      \\  \\:\\/\\ \\  \\:\\/:::::/ \\  \\:\\/:/ /:/\r\n  \\  \\::/~~~~   \\  \\::/ /:/   \\  \\:\\        \\  \\::/        \\__\\::/  \\  \\::/~~~~   \\  \\::/ /:/ \r\n   \\  \\:\\        \\  \\:\\/:/     \\  \\:\\        \\  \\:\\        /__/:/    \\  \\:\\        \\  \\:\\/:/  \r\n    \\  \\:\\        \\  \\::/       \\  \\:\\        \\  \\:\\       \\__\\/      \\  \\:\\        \\  \\::/   \r\n     \\__\\/         \\__\\/         \\__\\/         \\__\\/                   \\__\\/         \\__\\/    \r\n\r\n \n\n  REVERSE ENGINEERING EMPIRE | RE-MPIRE"; console.log(msg);
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  if (location.pathname.includes('404')) return;
  if (App) App.init();

  easterEgg();
});

export { App };