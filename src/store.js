import { getStorageItem, setStorageItem } from './utils.js';
let store = getStorageItem('store');
let pickupStore = getStorageItem('pickupStore');

const setupStore = (carTrawlerProducts) => {
  const pickupDetails = carTrawlerProducts[0].VehAvailRSCore.VehRentalCore;

  const pickupAndReturnInformation = {
    pickupDateTime: pickupDetails['@PickUpDateTime'],
    ReturnDateTime: pickupDetails['@ReturnDateTime'],
    pickupLocation: pickupDetails.PickUpLocation['@Name'],
    ReturnLocation: pickupDetails.ReturnLocation['@Name'],
  };

  pickupStore = pickupAndReturnInformation;
  setStorageItem('pickupStore', pickupStore);

  const vehVendorAvails = carTrawlerProducts[0].VehAvailRSCore.VehVendorAvails;
  let index = 0;
  const products = vehVendorAvails.reduce((acc, product) => {
    const { Vendor, VehAvails } = product;
    const availableVehicles = VehAvails.map((available) => {
      const status = available['@Status'];
      const charge = {
        rateTotalAmount: available.TotalCharge['@RateTotalAmount'],
      };
      const vehicleSpec = {
        id: index,
        airConditioned: available.Vehicle['@AirConditionInd'],
        transmissionType: available.Vehicle['@TransmissionType'],
        fuelType: available.Vehicle['@FuelType'],
        driveType: available.Vehicle['@DriveType'],
        passengerQuantity: available.Vehicle['@PassengerQuantity'],
        baggageQuantity: available.Vehicle['@BaggageQuantity'],
        doorCount: available.Vehicle['@DoorCount'],
        vehicleMakeModel: available.Vehicle.VehMakeModel['@Name'],
        pictureURL: available.Vehicle.PictureURL,
      };
      index = index + 1;
      const vendor = {
        name: Vendor['@Name'],
        id: Vendor['@Code'],
      };
      return {
        vendor,
        status,
        charge,
        vehicleSpec,
      };
    });
    availableVehicles.forEach((vehicle) => acc.push(vehicle));
    return acc;
  }, []);

  console.log(pickupAndReturnInformation);

  console.log(store);
  store = [...products];
  setStorageItem('store', store);
};

const findProduct = (store) => {
  let product = store.find((product) => product === id);
  console.log(id);
  return product;
};

export { store, pickupStore, setupStore, findProduct };
