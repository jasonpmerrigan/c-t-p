import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (store) => {
  // new set to fetch only unique values
  let companies = [
    'all',
    ...new Set(store.map((product) => product.vendor.name)),
  ];

  const companiesRenderToDOM = getElement('.companies');
  companiesRenderToDOM.innerHTML = companies
    .map((company) => {
      return `<button class="company-btn">${company}</button>`;
    })
    .join('');
  companiesRenderToDOM.addEventListener('click', function (e) {
    const element = e.target;
    if (element.classList.contains('company-btn')) {
      let companyFilteredStore = [];
      if (element.textContent === 'all') {
        companyFilteredStore = [...store];
      } else {
        companyFilteredStore = store.filter(
          (product) => product.vendor.name === e.target.textContent
        );
      }
      display(companyFilteredStore, getElement('.products-container'), true);
    }
  });
};

export default setupCompanies;
