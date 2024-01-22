export type CreateCustomerType = {
  firstName: string;

  lastName: string;

  companyName: string;

  GSTINorUIN: string;

  phoneNo: string;

  mailId: string;

  isActive: boolean;

  organizationId: number;
};

export type CreateAddress = {
  objectType: string;
  addressType: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  stateCode: string;
  country: string;
  zipCode: string;
  latitude: string;
  longitude: string;
  placeId: string;
};

export type UpdateCustomerType = {
  firstName: string;

  lastName: string;

  companyName: string;

  GSTINorUIN: string;

  phoneNo: string;

  mailId: string;

  isActive: boolean;

  organization: number;
};

export type UpdateAddressType = {
  id: number;
  objectType: string;
  addressType: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  stateCode: string;
  zipCode: string;
  country: string;
  latitude: string;
  longitude: string;
  placeId: string;
};

export type CreateCustomerAndAddressType = {
  customerDetails: CreateCustomerType;
  addresses: CreateAddress[];
};

export type UpdateCustomerAndAddressType = {
  customerDetails: UpdateCustomerType;
  addresses: UpdateAddressType[];
};
