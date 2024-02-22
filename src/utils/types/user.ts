export type CreateUserType = {
  username: string;

  password: string;

  email: string;

  firstName: string;

  lastName: string;

  phoneNo: string;

  // roleId: number;

  organizationId: number;
};

export type UpdateUserType = {
  username: string;

  password: string;

  email: string;

  firstName: string;

  lastName: string;

  phoneNo: string;

  // role: number;

  organization: number;
};
