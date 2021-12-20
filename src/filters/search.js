import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupSearch = (store) => {
  const form = getElement('.input-form');
  const nameInput = getElement('.search-input');
  form.addEventListener('keyup', function () {
    const searchInput = nameInput.value;
    if (searchInput) {
      const searchedStore = store.filter((product) => {
        let name = product.vehicleSpec.vehicleMakeModel;
        name = name.toLowerCase();
        if (name.includes(searchInput)) {
          return product;
        }
      });
      display(searchedStore, getElement('.products-container'), true);
      if (searchedStore.length < 1) {
        const products = getElement('.products-container');
        products.innerHTML = `<h3 class="filter-error">
        sorry, no products match your search </h3>`;
      }
    } else {
      display(store, getElement('.products-container'), true);
    }
  });
};

export default setupSearch;
