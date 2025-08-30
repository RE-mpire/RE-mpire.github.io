// components win-chrome.js

import { windowManager, makeDraggable, maximizeWindow, hideWindow } from '/lib/windowManager.js';

// Initialization
{
    const componentName = 'win-chrome';

    // Ensure the component's CSS is loaded once
    if (!document.getElementById(componentName + '-css')) {
        const link = document.createElement('link');
        link.id = componentName + '-css';
        link.rel = 'stylesheet';
        link.href = '/components/' + componentName + '/style.css';
        document.head.appendChild(link);
    }


    // Component definition
    window[componentName] = {
        template: function ({ title, domainName, domainPath, iframeSrc }) {
            return `
        <div class="win-chrome window">
        <div class="titlebar-width">
            <div class="titlebar">
                <div style="margin-top:5px;">
                    <img src="/assets/browser/logo.svg" width="20px" height="15px" class="site-favicon">
                    <span class="titlebar-text">${title}</span>
                </div>
                <div>
                    <span class="minimize">&#8212;</span>
                    <span class="maximize">□</span>
                    <span class="exit">✕</span>
                </div>
            </div>
            <div class="url-bar">
                <img src="/assets/browser/ssl.svg" width="20px" height="20px" class="ssl-padlock">
                <span class="domain-name">${domainName}</span>
                <span class="domain-path">${domainPath}</span>
            </div>
        </div>
        <iframe class="content" src="${iframeSrc}" frameBorder="0"></iframe>
        </div>
        `;
        },
        makeComponent: function ({ title, domainName, domainPath, iframeSrc }) {
            const wrapper = document.createElement(componentName.toLowerCase());
            wrapper.innerHTML = this.template({ title, domainName, domainPath, iframeSrc }).trim();
            const windowElem = wrapper.firstChild;
            windowManager.windows.push(windowElem);

            // Add drag functionality
            const titleElem = windowElem.querySelector('.titlebar');
            makeDraggable(windowElem, titleElem);

            // Add exit functionality
            const exitBtn = windowElem.querySelector('.exit');
            exitBtn.addEventListener('click', function () {
                hideWindow(windowElem);
            });

            // Add maximize functionality
            const maximizeBtn = windowElem.querySelector('.maximize');
            maximizeBtn.addEventListener('click', function () {
                maximizeWindow(windowElem);
            });

            // Bring window to front on click
            windowElem.addEventListener('mousedown', function () {
                windowManager.bringToFront(windowElem);
            });

            // Set initial z-index
            windowManager.bringToFront(windowElem);
            return wrapper.firstChild;
        }
    };
} // end scope