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
    window.addEventListener('route:loaded', () => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 10);
    }, { once: true });
    loadRoute(path);
  }

  function setupRouteLinks() {
    // Attach click handlers to all links with data-route
    document.querySelectorAll('a:not([link-external]):not([href*="#"])').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        navigateTo(link.getAttribute('href'));
      });
    });
  }

  async function loadRoute(path) {
    if (currentPath === path) return; // No change, do nothing
    if (path !== '/') { // remove trailing slashes, except for root
      path = path.replace(/\/+$/, '');
    }

    currentPath = path;
    const routeHandler = routes[path];
    var contentDiv = document.getElementById('content');
    var fetchPath = path.replace(/\/?$/, '/index.html');

    try {
      const response = await fetch(fetchPath, { cache: 'reload' });
      if (!response.ok) throw new Error('Not Found');
      const html = await response.text();

      // Extract content from the HTML response (Should always exist if the route is valid)
      const pageContent = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const pageTitle = html.match(/<title>([\s\S]*?)<\/title>/i);

      var wrapper = document.createElement('div');
      wrapper.innerHTML = pageContent[1];
      wrapper = wrapper.querySelector('#content');

      if (contentDiv == null) throw new Error('Content div not found, nowhere to insert content.');
      contentDiv.innerHTML = wrapper.innerHTML;
      document.title = pageTitle?.[1] || 'Untitled Page';

      wrapper.remove(); // Clean up the wrapper

      // call route handeler with the contentDiv for dynamic content
      // Note: there should always be a handeler for a route if it was registered
      if (routeHandler == null) throw new Error(`Handler not found for ${path}`);
      routeHandler(contentDiv);

      // Create and dispatch a custom event to notify that the route has been loaded
      const event = new CustomEvent('route:loaded', { detail: { path } });
      window.dispatchEvent(event);

      setupRouteLinks(); // Re-setup links after content change
    } catch (err) {
      console.error(err.message);
      window.location.replace('/404.html');
    }
  }

  Router = {
    addRoute: addRoute,
    navigateTo: navigateTo,
    loadRoute: loadRoute,
    setupRouteLinks: setupRouteLinks
  };

  // Handle browser navigation (back/forward)
  window.addEventListener('popstate', function () {
    loadRoute(location.pathname);
  });
})(window);

export { Router }