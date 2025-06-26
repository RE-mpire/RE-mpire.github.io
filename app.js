import { Router } from './lib/router.js';
import { enableTextScramble } from './lib/textScramble.js';
import { loadComponent, createComponent } from './lib/components.js';
import { initfakeWindow } from './fakeWindow.js';

var App = {};

/* Initilization function */
App.init = function () {
  // Initialize static routes
  Router.addRoute('/blog', function () { });
  Router.addRoute('/projects', function () { });
  Router.addRoute('/', function () { 
    enableTextScramble();
    initfakeWindow(); // Initialize the fake window component
   });

  // Load the initial route based on the current URL
  Router.loadRoute(location.pathname);

  // Handle browser navigation events
  window.addEventListener('popstate', function () {
    Router.loadRoute(location.pathname);
  });
};

document.addEventListener('DOMContentLoaded', function () {
  if (App) App.init(); // Initialize the app

  /* Navigation Menu Toggle*/
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const overlay = document.getElementById('overlay-bg');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('menu--open');
    overlay.classList.toggle('overlay--active');
  });
  /* End Navigation Menu Toggle*/
});

export { App };