import { Router } from './lib/router.js';
import { initPageContent } from './script.js';

var App = {};

App.init = function () {
  // Initialize static routes
  Router.addRoute('/', initPageContent);
  Router.addRoute('/pages/blog/placeholder', initPageContent);

  // Load the initial route based on the current URL
  Router.loadRoute(location.pathname);

  // Handle browser navigation events
  window.addEventListener('popstate', function () {
    Router.loadRoute(location.pathname);
  });
};

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  if (location.pathname.includes('404')) return;
  if (App) App.init();

  /* Nothing to see here */
  var msg = `
\r\n\r\n      ___           ___           ___           ___                     ___           ___     \r\n     \/  \/\\         \/  \/\\         \/__\/\\         \/  \/\\      ___          \/  \/\\         \/  \/\\    \r\n    \/  \/::\\       \/  \/:\/_       |  |::\\       \/  \/::\\    \/  \/\\        \/  \/::\\       \/  \/:\/_   \r\n   \/  \/:\/\\:\\     \/  \/:\/ \/\\      |  |:|:\\     \/  \/:\/\\:\\  \/  \/:\/       \/  \/:\/\\:\\     \/  \/:\/ \/\\  \r\n  \/  \/:\/~\/:\/    \/  \/:\/ \/:\/_   __|__|:|\\:\\   \/  \/:\/~\/:\/ \/__\/::\\      \/  \/:\/~\/:\/    \/  \/:\/ \/:\/_ \r\n \/__\/:\/ \/:\/___ \/__\/:\/ \/:\/ \/\\ \/__\/::::| \\:\\ \/__\/:\/ \/:\/  \\__\\\/\\:\\__  \/__\/:\/ \/:\/___ \/__\/:\/ \/:\/ \/\\\r\n \\  \\:\\\/:::::\/ \\  \\:\\\/:\/ \/:\/ \\  \\:\\~~\\__\\\/ \\  \\:\\\/:\/      \\  \\:\\\/\\ \\  \\:\\\/:::::\/ \\  \\:\\\/:\/ \/:\/\r\n  \\  \\::\/~~~~   \\  \\::\/ \/:\/   \\  \\:\\        \\  \\::\/        \\__\\::\/  \\  \\::\/~~~~   \\  \\::\/ \/:\/ \r\n   \\  \\:\\        \\  \\:\\\/:\/     \\  \\:\\        \\  \\:\\        \/__\/:\/    \\  \\:\\        \\  \\:\\\/:\/  \r\n    \\  \\:\\        \\  \\::\/       \\  \\:\\        \\  \\:\\       \\__\\\/      \\  \\:\\        \\  \\::\/   \r\n     \\__\\\/         \\__\\\/         \\__\\\/         \\__\\\/                   \\__\\\/         \\__\\\/    \r\n\r\n 

  REVERSE ENGINEERING EMPIRE | RE-MPIRE`;
  console.log(msg);
});

export { App };