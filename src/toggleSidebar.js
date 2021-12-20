// fetch element
import { getElement } from './utils.js';

const toggleNav = getElement('.toggle-nav');
const sidebarOverlay = getElement('.sidebar-overlay');
const closeButton = getElement('.sidebar-close');

// open sidebar
toggleNav.addEventListener('click', () => {
    sidebarOverlay.classList.add('show');
});

// close sidebar
closeButton.addEventListener('click', () => {
    sidebarOverlay.classList.remove('show');
});