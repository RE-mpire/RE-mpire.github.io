/* Basic client-side router supporting static routes only.
 *
 * Provides a global `Router` object with:
 * - addRoute(path, handler): Register a handler function for a specific path.
 * - navigateTo(path): Change the browser URL and load the route handler.
 * - loadRoute(path): Load the handler for a given path, or show a 404 message if not found.
 *
 * Handles browser navigation (back/forward) using the popstate event.
 *
 * @namespace Router
 * @property {function(string, function):void} addRoute - Register a handler for a path.
 * @property {function(string):void} navigateTo - Navigate to a path and load its handler.
 * @property {function(string):void} loadRoute - Load the handler for a path or show 404.
 */

var Router = {};

// Basic router: supports static routes only
(function (window) {
  var routes = {};
  var currentPath = '';

  function addRoute(path, handler) {
    routes[path] = handler;
  }

  function navigateTo(path) {
    if (currentPath === path) return;
    window.history.pushState(null, null, path);
    loadRoute(path);
  }

  function setupRouteLinks() {
    // Attach click handlers to all links with data-route
    document.querySelectorAll('a[data-route]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        navigateTo(link.getAttribute('href'));
      });
    });
  }

  function loadRoute(path) {
    if (currentPath === path) return; // No change, do nothing
    if (path !== '/') { // remove trailing slashes, except for root
      path = path.replace(/\/+$/, '');
    }

    currentPath = path;
    var routeHandler = routes[path];
    var contentDiv = document.getElementById('content');
    var fetchPath = path;
    fetchPath = fetchPath.replace(/\/?$/, '/index.html');

    fetch(fetchPath, { cache: 'reload' })
      .then(function (response) {
        if (!response.ok) throw new Error('Not Found');
        return response.text();
      })
      .then(function (html) {
        var pageContent = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        var pageTitle = html.match(/<title>([\s\S]*?)<\/title>/i);

        var wrapper = document.createElement('div');
        wrapper.innerHTML = pageContent[1];
        wrapper = wrapper.querySelector('#content');

        if (contentDiv) {
          contentDiv.innerHTML = wrapper.innerHTML; // Use the inner HTML of the wrapper
          wrapper.remove(); // Clean up the wrapper
        } else {
          console.warn('Content div not found, nowhere to insert content.');
        }
        document.title = pageTitle?.[1] || 'Untitled Page';

        if (routeHandler) routeHandler();
        else throw new Error('Handler not found for ' + path);

        setupRouteLinks(); // Re-setup links after content change
      })
      .catch(function (err) {
        console.error(err.message);
        document.title = 'Not Found';
        if (contentDiv) {
          contentDiv.innerHTML = '<h3>404 Not Found</h3><p>The page you are looking for does not exist.</p>';
        }
      });
  }

    Router = {
    addRoute: addRoute,
    navigateTo: navigateTo,
    loadRoute: loadRoute,
    setupRouteLinks: setupRouteLinks
  };

  window.addEventListener('popstate', function () {
    loadRoute(location.pathname);
  });
})(window);

export { Router }