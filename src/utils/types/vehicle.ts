export type CreateVehicleType = {
  nameOfDriver: string;

  vehicleMake: string;

  model: string;

  licenseNo: string;

  organizationId: number;
};

export type UpdateVehicleType = {
  id: number;

  nameOfDriver: string;

  vehicleMake: string;

  model: string;

  licenseNo: string;

  organization: number;
};
