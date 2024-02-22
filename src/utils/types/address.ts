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

export type UpdateAddress = {
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

export type CreateAddressType = {
  addresses: CreateAddress[];
};

export type UpdateAddressType = {
  addresses: UpdateAddress[];
};
