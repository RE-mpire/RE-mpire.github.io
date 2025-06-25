// components mac-chrome.js

import { windowManager, makeDraggable, maximizeWindow, hideWindow } from '/lib/windowManager.js';

// Initialization
{
    const componentName = 'mac-chrome';

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
        <div class="mac-chrome window">
            <div class="title-bar-width">
            <div class="title-bar outer yosemite">
                <span class="dots">
                <div class="dot red exit"></div>
                <div class="dot amber minimize"></div>
                <div class="dot green maximize"></div>
                </span>
                <span class="logo-description">${title}</span>
            </div>
            <div class="url-bar">
                <img src="./assets/browser/ssl.svg" width="20px" height="20px" class="ssl-padlock">
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
            const titleElem = windowElem.querySelector('.title-bar');
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