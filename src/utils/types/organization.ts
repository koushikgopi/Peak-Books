export type createOrganizationType = {
  organizationName: string;

  organizationShortName: string;

  organizationDescription: string;

  organizationLogo: string;

  phoneNo: string;

  mailId: string;

  GSTINorUIN: string;

  isActive: boolean;
};
export type UpdateOrganizationType = {
  organizationName: string;

  organizationShortName: string;

  organizationDescription: string;

  organizationLogo: string;

  phoneNo: string;

  mailId: string;

  GSTINorUIN: string;

  isActive: boolean;
};
export type CreateOrgAddressType = {
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

export type UpdateOrgAddressType = {
  id: number;
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

export type CreateAccountType = {
  accountHolderName: string;

  bankName: string;

  accountNo: string;

  IFSCCode: string;

  branch: string;

  isActive: boolean;
};

export type UpdateAccountType = {
  id: number;

  accountHolderName: string;

  bankName: string;

  accountNo: string;

  IFSCCode: string;

  branch: string;

  isActive: boolean;
};

export type CreateOrganizationAndAddressType = {
  organizationDetails: createOrganizationType;
  addresses: CreateOrgAddressType[];
  accountDetails: CreateAccountType[];
};

export type UpdateOrganizationAndAddressType = {
  organizationDetails: UpdateOrganizationType;
  addresses: UpdateOrgAddressType[];
  accountDetails: UpdateAccountType[];
};
