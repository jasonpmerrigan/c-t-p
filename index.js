// global imports
import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';

// specific imports
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';
import { getElement } from './src/utils.js';

const init = async () => {
  const products = await fetchProducts();
  if (products) {
    setupStore(products);
    console.log(products);
    console.log(store);

    const carsOverOneThousand = store.filter(function (item) {
      return item.charge.rateTotalAmount > 1000;
    });

    display(carsOverOneThousand, getElement('.featured-center'));
  }
};

window.addEventListener('DOMContentLoaded', init);
