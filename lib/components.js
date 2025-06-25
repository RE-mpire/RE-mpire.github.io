/* This module manages dynamic loading and instantiation of UI components.
 *
 * Components are expected to have the following structure and be located
 * in the `./components/<component-name>/` directory:
 *
 * const componentName = 'comp-name';
 *
 * // Ensure the component's CSS is loaded
 * if (!document.getElementById('comp-css')) {
 *     const link = document.createElement('link');
 *     link.id = 'comp-css';
 *     link.rel = 'stylesheet';
 *     link.href = './components/comp.css';
 *     document.head.appendChild(link);
 * }
 *
 * // Register the component on the window object
 * window[componentName] = {
 *     template: function({ properties }) {
 *         return `<div>...</div>`;
 *     },
 *     makeComponent: function({ properties }) {
 *         // Create the component and return its wrapper element
 *     }
 * };
 *
 * The functions below allow for dynamic loading and instantiation of such components.
 */


let components = {} // map of loaded components
let componentLoadCallbacks = {}; // pending callbacks for components being loaded


// Function to load a component dynamically
function loadComponent(name, callback) {
    if (components[name]) { // Component already loaded, execute callback
        callback();
    } else if (componentLoadCallbacks[name]) { // Component is being loaded, defer callback
        componentLoadCallbacks[name].push(callback);
    } else {  
        // Component not loaded, create first callback entry
        componentLoadCallbacks[name] = [callback];

        // Load the component
        const script = document.createElement('script');
        script.id = `${name}-component`;
        script.type = 'module';
        script.src = `./components/${name}/script.js`;
        document.head.appendChild(script);

        script.onerror = function() { // Handle error
            console.error(`Failed to load component: ${name}`);
            delete componentLoadCallbacks[name];
        };

        script.onload = function() { // Handle success
            components[name] = window[name];
            // Flush all pending callbacks for this component
            componentLoadCallbacks[name].forEach(cb => cb(components[name]));
            delete componentLoadCallbacks[name];
        };
    }
}


// Function to create a component
function createComponent(name, params, callback) {
    if (components[name]) { // Component loaded
        const result = components[name].makeComponent(params);
        callback(result);
        return;
    }
    if (componentLoadCallbacks[name]) { // Component loading, deffer creation
        componentLoadCallbacks[name].push(() => {
            const result = components[name].makeComponent(params);
            callback(result);
        });
        return;
    }
    console.error(`Component "${name}" not loaded.`);
    return null;
}

export { loadComponent, createComponent };