// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement } from '../utils.js';
import { store, setupStore, pickupStore } from '../store.js';

let pickupDate = new Date(pickupStore.pickupDateTime);
let returnDate = new Date(pickupStore.ReturnDateTime);
// selects
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const descDOM = getElement('.single-product-desc');
const isAirConDOM = getElement('.air-con');
const typeOfTransmissionDOM = getElement('.transmission');
const passengerQuantityDOM = getElement('.passenger-quantity');
const doorCountDOM = getElement('.door-count');
const baggageQuantityDOM = getElement('.baggage-quantity');
const pickupLocationDOM = getElement('.pickup-location');
const returnLocationDOM = getElement('.dropoff-location');
const pickupTimeDOM = getElement('.pickup-time');
const dropoffTimeDOM = getElement('.dropoff-time');

// show product when page loads
window.addEventListener('DOMContentLoaded', async function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const carId = parseInt(urlParams.get('id'));

  const currentVehicle = store.filter(
    (vehicle) => vehicle.vehicleSpec.id === carId
  );
  const vehicle = currentVehicle[0];
  const { vendor, charge, status, vehicleSpec } = vehicle;

  let isAirCon = '';
  if (vehicle.vehicleSpec.airConditioned === 'true') {
    isAirConDOM.textContent = 'Yes';
  } else {
    isAirConDOM.textContent = 'No';
  }

  document.title = `${vehicle.vehicleSpec.vehicleMakeModel} | CarTrawler`;
  imgDOM.src = vehicle.vehicleSpec.pictureURL;
  titleDOM.textContent = vehicle.vehicleSpec.vehicleMakeModel;
  companyDOM.textContent = `by ${vehicle.vendor.name}`;
  priceDOM.textContent = `$${vehicle.charge.rateTotalAmount}`;
  typeOfTransmissionDOM.textContent =
    vehicle.vehicleSpec.transmissionType.charAt(0);
  passengerQuantityDOM.textContent = vehicle.vehicleSpec.passengerQuantity;
  doorCountDOM.textContent = vehicle.vehicleSpec.doorCount;
  baggageQuantityDOM.textContent = vehicle.vehicleSpec.baggageQuantity;
  pickupLocationDOM.textContent = pickupStore.pickupLocation;
  returnLocationDOM.textContent = pickupStore.ReturnLocation;
  pickupTimeDOM.textContent = pickupDate;
  dropoffTimeDOM.textContent = returnDate;

  loading.style.display = 'none';
});
