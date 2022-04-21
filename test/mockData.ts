const customerDataTest = {
  emailAddress: 'string@gmail.com',
  firstName: 'string',
  lastName: 'string',
  phone: 'string',
  streetAddress: 'string',
  homeAddress: 'string',
  city: 'string',
  state: 'Queensland',
  postCode: 'string',
  businessName: 'string',
  businessABN: 'string',
  businessPhone: 'string',
  businessEmail: 'string@gmail.com',
  businessStreetAddress: 'string',
  businessAddress: 'string',
  businessCity: 'string',
  businessState: 'Queensland',
  businessPostCode: 'string',
  driversLicenseFront: {
    docType: 'DRIVER_LICENSE_FRONT',
    docUrl: 'string',
  },
  driversLicenseBack: {
    docType: 'DRIVER_LICENSE_FRONT',
    docUrl: 'string',
  },
  motorVehicleRego: {
    docType: 'DRIVER_LICENSE_FRONT',
    docUrl: 'string',
  },
  bankAccount: {
    docType: 'DRIVER_LICENSE_FRONT',
    docUrl: 'string',
  },
  creditCard: {
    docType: 'DRIVER_LICENSE_FRONT',
    docUrl: 'string',
  },
  medicareCard: {
    docType: 'DRIVER_LICENSE_FRONT',
    docUrl: 'string',
  },
}
const manualContractTest = {
  customer: {
    ...customerDataTest,
  },
  product: {
    trailerType: 'string',
    modelNumber: 'string',
    serialNumber: 'string',
    trNumber: 'string',
    trailerLength: 'string',
    trailerWidth: 'string',
    cost: 0,
  },
  startDate: '2021-11-26T02:44:46.851Z',
  paymentType: 'WEEKLY',
  retailPrice: 0,
  interestRate: 0,
  customOrder: true,
}

const contractDataTest = {
  product: {
    trailerType: 'string',
    modelNumber: 'string',
    serialNumber: 'string',
    trNumber: 'string',
    trailerLength: 'string',
    trailerWidth: 'string',
    cost: 0,
  },
  customer: {
    emailAddress: 'johndoe@a.co',
    firstName: 'johndoe',
    lastName: 'G',
  },
  startDate: '2021-11-25T10:56:39.460Z',
  paymentType: 'WEEKLY',
  retailPrice: 0,
  interestRate: 0,
  customOrder: true,
}

export { contractDataTest, manualContractTest, customerDataTest }
