import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupSort = (store) => {
  const filters = [
    'Price - low to high',
    'Price - high to low',
    'Car - A-Z',
    'Car - Z-A',
  ];

  const sortedRenderToDOM = getElement('.sort-filters');
  sortedRenderToDOM.innerHTML = filters
    .map((filter) => {
      return `<option value="${filter}">${filter}</option>`;
    })
    .join('');

  sortedRenderToDOM.addEventListener('change', function (e) {
    const element = e.target;
    let sortedStore = [];
    if (element.value) {
      if (element.value == 'Price - low to high') {
        sortedStore = sortedStore = [
          ...store.sort(
            (a, b) => a.charge.rateTotalAmount - b.charge.rateTotalAmount
          ),
        ];
      } else if (element.value == 'Price - high to low') {
        sortedStore = [
          ...store.sort(
            (a, b) => b.charge.rateTotalAmount - a.charge.rateTotalAmount
          ),
        ];
      } else if (element.value == 'Car - A-Z') {
        sortedStore = [
          ...store.sort((a, b) =>
            a.vehicleSpec.vehicleMakeModel.localeCompare(
              b.vehicleSpec.vehicleMakeModel
            )
          ),
        ];
      } else if (element.value == 'Car - Z-A')
        sortedStore = [
          ...store.sort((a, b) =>
            b.vehicleSpec.vehicleMakeModel.localeCompare(
              a.vehicleSpec.vehicleMakeModel
            )
          ),
        ];
      display(sortedStore, getElement('.products-container'), true);
    }
  });
};

export default setupSort;
