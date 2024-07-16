export type CreateInvoiceType = {
  eWayBillNo: number;

  deliveryNote: string;

  deliveryNoteDate: Date;

  referenceNo: number;

  referenceDate: Date;

  extraReference: string;

  buyerOrderNo: string;

  buyerOrderNoDate: Date;

  dispatchedDocNo: string;

  destination: string;

  LR_RRNo: string;

  email: string;

  invoiceDate: Date;

  dueDate: Date;

  terms: string;

  subTotal: number;

  discountPercentage: number;

  discountAmount: number;

  isTaxable: boolean;

  taxPercentage: number;

  taxAmount: number;

  SGSTAmount: number;

  CGSTAmount: number;

  IGSTAmount: number;

  roundOff: number;

  total: number;

  note: string;

  declaration: string;

  paymentStatus: string;

  invoiceStatus: string;

  isActive: boolean;

  customerId: number;

  accountId: number;

  organizationId: number;

  vehicleId: number;
};

class CreateLineItemType {
  itemName: string;

  description: string;

  HSNorSAC: string;

  unit: string;

  packagingType: string;

  numberOfPackage: string;

  quantity: number;

  rate: number;

  totalTaxRate: number;

  amount: number;

  isActive: boolean;
}

export type UpdateInvoiceType = {
  eWayBillNo: number;

  deliveryNote: string;

  deliveryNoteDate: Date;

  referenceNo: number;

  referenceDate: Date;

  extraReference: string;

  buyerOrderNo: string;

  buyerOrderNoDate: Date;

  dispatchedDocNo: string;

  destination: string;

  LR_RRNo: string;

  email: string;

  invoiceDate: Date;

  dueDate: Date;

  terms: string;

  subTotal: number;

  discountPercentage: number;

  discountAmount: number;

  isTaxable: boolean;

  taxPercentage: number;

  taxAmount: number;

  SGSTAmount: number;

  CGSTAmount: number;

  IGSTAmount: number;

  roundOff: number;

  total: number;

  note: string;

  declaration: string;

  paymentStatus: string;

  invoiceStatus: string;

  isActive: boolean;

  customer: number;

  account: number;

  organization: number;

  vehicle: number;
};

export type UpdateLineItemType = {
  id: number;

  itemName: string;

  description: string;

  HSNorSAC: string;

  unit: string;

  packagingType: string;

  numberOfPackage: string;

  quantity: number;

  rate: number;

  totalTaxRate: number;

  amount: number;

  isActive: boolean;

  invoice: number;
};

export type CreateInvoiceAndLineItemDto = {
  invoiceValue: CreateInvoiceType;
  lineItemValue: CreateLineItemType[];
};

export type UpdateInvoiceAndLineItemDto = {
  invoiceValue: UpdateInvoiceType;
  lineItemValue: UpdateLineItemType[];
};
