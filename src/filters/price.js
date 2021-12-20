import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
  const priceInput = getElement('.price-filter');
  const priceValue = getElement('.price-value');

  let maxPrice = store.map((product) => product.charge.rateTotalAmount);
  maxPrice = Math.max(...maxPrice);
  maxPrice = Math.ceil(maxPrice);

  let minPrice = store.map((product) => product.charge.rateTotalAmount);
  minPrice = Math.min(...minPrice);
  minPrice = Math.floor(minPrice);

  priceInput.value = maxPrice;
  priceInput.max = maxPrice;

  priceInput.min = minPrice;
  priceValue.textContent = `Value: $${minPrice}`;

  priceInput.addEventListener('input', function () {
    const value = parseInt(priceInput.value);
    priceValue.textContent = `Value: $${value}`;

    let filteredStore = store.filter(
      (product) => product.charge.rateTotalAmount <= value
    );
    display(filteredStore, getElement('.products-container'), true);
    if (filteredStore.length < 1) {
      const products = getElement('.products-container');
      products.innerHTML = `<h3 class="filter-error">
        sorry, no products match $${value} or less </h3>`;
    }
  });
};

export default setupPrice;
