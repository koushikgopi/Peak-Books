export type CreateProductType = {
  itemName: string;

  description: string;

  HSNorSAC: string;

  unit: string;

  packagingType: string;

  numberOfPackage: number;

  quantity: number;

  rate: number;

  taxable: boolean;

  totalTaxRate: number;

  organizationId: number;

  isActive: boolean;
};

export type CreateProductTaxType = {
  taxType: string;

  taxPercentage: number;

  isActive: boolean;
};

export type UpdateProductType = {
  itemName: string;

  description: string;

  HSNorSAC: string;

  unit: string;

  packagingType: string;

  numberOfPackage: number;

  quantity: number;

  rate: number;

  taxable: boolean;

  totalTaxRate: number;

  organization: number;

  isActive: boolean;
};

export type UpdateProductTaxType = {
  id: number;

  taxType: string;

  taxPercentage: number;

  product: number;

  isActive: boolean;
};

export type CreateProductAndProductTaxType = {
  productValue: CreateProductType;
  productTaxValue: CreateProductTaxType[];
};

export type UpdateProductAndProductTaxType = {
  productValue: UpdateProductType;
  productTaxValue: UpdateProductTaxType[];
};
