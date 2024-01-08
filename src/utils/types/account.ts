export type CreateAccountType = {
  accountHolderName: string;

  bankName: string;

  accountNo: string;

  IFSCCode: string;

  branch: string;

  organizationId: number;

  isActive: boolean;
};

export type UpdateAccountType = {
  id: number;

  accountHolderName: string;

  bankName: string;

  accountNo: string;

  IFSCCode: string;

  branch: string;

  organization: number;

  isActive: boolean;
};
