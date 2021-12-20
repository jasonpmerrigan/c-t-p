import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';
import { store, setupStore } from './store.js';

const display = (products, element, filters) => {
  element.innerHTML = products
    .map((product) => {
      const { id, name } = product.vendor;
      const {
        pictureURL,
        fuelType,
        transmissionType,
        vehicleMakeModel,
        airConditioned,
        passengerQuantity,
        doorCount,
        baggageQuantity,
      } = product.vehicleSpec;

      let isAirCon = '';
      if (product.vehicleSpec.airConditioned === 'true') {
        isAirCon = 'Y';
      } else {
        isAirCon = 'N';
      }

      const { rateTotalAmount } = product.charge;
      return `<article class="product">
                <div class="product-container">
                    <img src="${pictureURL}" class="product-img img" alt="${vehicleMakeModel}">
                    <!-- product icons -->
                    <div class="product-icons"><a href="product.html?id=${id}" class="product-icon">
                            <i class="fas fa-search"></i>
                        </a>
                        <button-cart-btn class="product-icon" data-id='${id}'> 
                        <i class="fas fa-shopping-cart"></i>
                        </button-cart-btn>
                    </div>
                </div>
                <footer>
                <p class="product-name">${vehicleMakeModel}</p>

                <div class="product-feature">
                <img src="./images/snowflake.svg" class='product-features-img' alt="snowflake">
                <p class="product-price">${isAirCon}</p>
                </div>

                <div class="product-feature">
                <img src="./images/transmission.svg" class='product-features-img' alt="transmission">
                <p class="product-price">${transmissionType.charAt(0)}</p>
                </div>

                <div class="product-feature">
                <img src="./images/person.svg" class='product-features-img' alt="person">
                <p class="product-price">${passengerQuantity}</p>
                </div>

                <div class="product-feature">
                <img src="./images/door.svg" class='product-features-img' alt="door">
                <p class="product-price">${doorCount}</p>
                </div>

                <div class="product-feature">
                <img src="./images/bag.svg" class='product-features-img' alt="bag">
                <p class="product-price">${baggageQuantity}</p>
                </div>
                

                <hr>
                <br>
                <p class="product-price">${name}</p>
                <p class="product-price">$${rateTotalAmount}</p>
                </footer>
            </article>
            `;
    })
    .join('');
  if (filters) {
    return;
  }
  element.addEventListener('click', function (event) {
    const parent = event.target.parentElement;
    if (parent.classList.contains('product-icon')) {
      console.log('object');
      console.log(products.dataset.id);
      // addToCart(parent.dataset.id);
    }
  });
};

export default display;
