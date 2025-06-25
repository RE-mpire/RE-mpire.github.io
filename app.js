import { Router } from './lib/router.js';
import { enableTextScramble } from './lib/textScramble.js';

var App = {};

App.init = function () {
  // Initialize static routes
  Router.addRoute('/blog', function () { });
  Router.addRoute('/projects', function () { });
  Router.addRoute('/', function () { enableTextScramble(); });

  // Load the initial route based on the current URL
  Router.loadRoute(location.pathname);

  // Handle browser navigation events
  window.addEventListener('popstate', function () {
    Router.loadRoute(location.pathname);
  });
};

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  if (App) App.init();

  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const overlay = document.getElementById('overlay-bg');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('menu--open');
    overlay.classList.toggle('overlay--active');
  });
});

export { App };