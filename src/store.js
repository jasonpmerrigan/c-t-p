import { getStorageItem, setStorageItem } from './utils.js';
let store = getStorageItem('store');

const setupStore = (carTrawlerProducts) => {
  const vehVendorAvails = carTrawlerProducts[0].VehAvailRSCore.VehVendorAvails;
  const products = vehVendorAvails.reduce((acc, product) => {
    const { Vendor, VehAvails } = product;
    const availableVehicles = VehAvails.map((available) => {
      const status = available['@Status'];
      const charge = {
        rateTotalAmount: available.TotalCharge['@RateTotalAmount'],
      };
      const vehicleSpec = {
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
  setStorageItem('store', products);
};

const findProduct = (store) => {
  let product = store.find((product) => product === id);
  console.log(id);
  return product;
};

export { store, setupStore, findProduct };
