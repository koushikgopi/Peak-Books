import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty({
    description: 'The E way bill number  ',
    example: '5',
  })
  eWayBillNo: number;

  @ApiProperty({
    description: 'Delivery note for the invoice',
    example: '',
  })
  deliveryNote: string;

  @ApiProperty({
    description: 'The delivery note date for the invoice',
    example: '2023-08-14',
  })
  deliveryNoteDate: Date;

  @ApiProperty({
    description: 'The Reference number for the invoice',
    example: '5',
  })
  referenceNo: number;

  @ApiProperty({
    description: 'The Reference date for the invoice',
    example: '2023-08-14',
  })
  referenceDate: Date;

  @ApiProperty({
    description: 'The extra reference',
    example: '123qw',
  })
  extraReference: string;

  @ApiProperty({
    description: 'The order number from the buyer',
    example: 'qw123',
  })
  buyerOrderNo: string;

  @ApiProperty({
    description: 'The buyer Order No date for the invoice',
    example: '2023-08-14',
  })
  buyerOrderNoDate: Date;

  @ApiProperty({
    description: 'The dispatched doc number',
    example: 'qw123',
  })
  dispatchedDocNo: string;

  @ApiProperty({
    description: 'The destination',
    example: 'qw123',
  })
  destination: string;

  @ApiProperty({
    description: 'Bill of Landing/ LR-RR No',
    example: 'qw123',
  })
  LR_RRNo: string;

  @ApiProperty({
    description: 'The email of the company',
    example: 'abc@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'The invoice date',
    example: '2023-08-14',
  })
  invoiceDate: Date;

  @ApiProperty({
    description: 'The due date',
  })
  dueDate: Date;

  @ApiProperty({
    description: 'The terms of delivery',
  })
  terms: string;

  @ApiProperty({
    description: 'The sub total amount',
    example: '5000',
  })
  subTotal: number;

  @ApiProperty({
    description: 'The discount percentage',
    example: '5',
  })
  discountPercentage: number;

  @ApiProperty({
    description: 'The discount',
    example: '5',
  })
  discountAmount: number;

  @ApiProperty({
    description:
      'This is the  boolean  data type with two possible outcome true or false',
    example: true,
  })
  isTaxable: boolean;

  @ApiProperty({
    description: 'The tax',
    example: '5',
  })
  taxPercentage: number;

  @ApiProperty({
    description: 'The tax',
    example: '5',
  })
  taxAmount: number;

  @ApiProperty({
    description: 'The state tax amount ',
    example: '5',
  })
  SGSTAmount: number;

  @ApiProperty({
    description: 'The central tax amount ',
    example: '5',
  })
  CGSTAmount: number;

  @ApiProperty({
    description: 'The Integrated tax amount ',
    example: '5',
  })
  IGSTAmount: number;

  @ApiProperty({
    description: 'The tax',
    example: '5',
  })
  roundOff: number;

  @ApiProperty({
    description: 'The total',
    example: '250',
  })
  total: number;

  @ApiProperty({
    description: 'The note',
    example: 'abc',
  })
  note: string;

  @ApiProperty({
    description: 'The declaration for the invoice',
    example: 'abc',
  })
  declaration: string;

  @ApiProperty({
    description: 'The payment status',
    example: 'completed',
  })
  paymentStatus: string;

  @ApiProperty({
    description: 'The invoice status',
    example: 'completed',
  })
  invoiceStatus: string;

  @ApiProperty({
    description:
      'This is the boolean data type with two possible outcome true or false',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'The customer id',
    example: 1,
  })
  customerId: number;

  @ApiProperty({
    description: 'The account id',
    example: 1,
  })
  accountId: number;

  @ApiProperty({
    description: 'The organization id',
    example: 1,
  })
  organizationId: number;

  @ApiProperty({
    description: 'The vehicle id',
    example: 1,
  })
  vehicleId: number;
}

class CreateLineItemDto {
  @ApiProperty({
    description: 'The Category of product',
    example: 'ACCOUNTING',
  })
  itemName: string;

  @ApiProperty({
    description: 'The description of the item',
    example: 'good item',
  })
  description: string;

  @ApiProperty({
    description: 'The HSN code of the item',
    example: '1233432',
  })
  HSNorSAC: string;

  @ApiProperty({
    description: 'The  Unit, Hour, Flat rate of the item',
    example: 'good item',
  })
  unit: string;

  @ApiProperty({
    description: 'The  Unit, Hour, Kg, Flat rate of the item',
    example: 'kg',
  })
  packagingType: string;

  @ApiProperty({
    description: 'The  Unit, Hour, Kg, Flat rate of the item',
    example: 'kg',
  })
  numberOfPackage: string;

  @ApiProperty({
    description: 'The  quantity of the item',
    example: 4,
  })
  quantity: number;

  @ApiProperty({
    description: 'The Amount for the item',
    example: 150,
  })
  rate: number;

  @ApiProperty({
    description: 'The tx percentage for the item',
    example: 150,
  })
  totalTaxRate: number;

  @ApiProperty({
    description: 'The multiplication of quantity and rate',
    example: 590,
  })
  amount: number;

  @ApiProperty({
    description:
      'This is the  boolean  data type with two possible outcome true or false',
    example: true,
  })
  isActive: boolean;
}

export class CreateInvoiceAndLineItemDto {
  @ApiProperty({
    type: CreateInvoiceDto,
    required: true,
  })
  @Type(() => CreateInvoiceDto)
  @ValidateNested({ each: true })
  invoiceValue: CreateInvoiceDto;

  @ApiProperty({
    type: CreateLineItemDto,
    isArray: true,
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLineItemDto)
  lineItemValue: CreateLineItemDto[];
}
