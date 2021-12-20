import { getElement } from '../utils.js';

const cartOverlay = getElement('.cart-overlay');
const cartCloseBtn = getElement('.cart-close');
const toggleCartBtn = getElement('.toggle-cart');

// open cart
toggleCartBtn.addEventListener('click', () => {
  cartOverlay.classList.add('show');
});

// close cart
cartCloseBtn.addEventListener('click', () => {
  cartOverlay.classList.remove('show');
});

export const openCart = () => {
  cartOverlay.classList.add('show');
};
