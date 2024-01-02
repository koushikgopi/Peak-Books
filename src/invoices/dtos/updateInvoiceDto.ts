import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateInvoiceDto {
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
    example: '2023-08-14',
  })
  dueDate: Date;

  @ApiProperty({
    description: 'The terms',

    // example: '',
  })
  terms: string;

  @ApiProperty({
    description: 'The sub total amount',

    example: '5000',
  })
  subTotal: number;

  @ApiProperty({
    description: 'The discount Identifier',
    example: 'Fixed',
  })
  discountIdentifier: string;

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
    description: 'The total',

    example: '250',
  })
  total: number;

  @ApiProperty({
    description: 'The payment status',

    example: 'completed',
  })
  paymentStatus: string;

  @ApiProperty({
    description: 'The invoice status',

    example: 'Paid',
  })
  invoiceStatus: string;

  @ApiProperty({
    description: 'The customer id',

    example: 1,
  })
  customer: number;

  @ApiProperty({
    description: 'The note of the invoice',

    example: 'abc',
  })
  note: string;

  @ApiProperty({
    description: 'The organization id',

    example: 1,
  })
  organization: number;

  @ApiProperty({
    description: 'the tester Id',

    example: 1,
  })
  tester: number;

  @ApiProperty({
    description:
      'This is the boolean data type with two possible outcome true or false',

    example: true,
  })
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({
    description:
      'This is the boolean data type with two possible outcome true or false',
    example: true,
  })
  @IsNotEmpty()
  isTaxable: boolean;

  @ApiProperty({
    description: 'The city',
    example: 'Los Angles',
  })
  city?: string;

  @ApiProperty({
    description: 'The city tax',
    example: 1.5,
  })
  cityTax?: number;

  @ApiProperty({
    description: 'The  city tax amount',
    example: 100,
  })
  cityTaxAmount?: number;

  @ApiProperty({
    description: 'The city',
    example: 'Washington',
  })
  state?: string;

  @ApiProperty({
    description: 'The city tax',
    example: 1.5,
  })
  stateTax?: number;

  @ApiProperty({
    description: 'The  city tax amount',
    example: 100,
  })
  stateTaxAmount?: number;

  @ApiProperty({
    description: 'The location code',
    example: 'WA',
  })
  stateShort?: string;

  @ApiProperty({
    description: 'The location code',
    example: 'WA_1725',
  })
  locationCode?: string;
}

class UpdateLineItemDto {
  @ApiProperty({
    description: 'the id of the lineItem',

    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'The Service Provided Or Category of product',

    example: 'ACCOUNTING',
  })
  Item: string;

  @ApiProperty({
    description: 'The description of the item',

    example: 'good item',
  })
  description: string;

  @ApiProperty({
    description: 'The  Unit, Hour, Flat rate of the item',

    example: 'good item',
  })
  unit: string;

  @ApiProperty({
    description: 'The  quantity of the item',

    example: 4,
  })
  quantity: number;

  @ApiProperty({
    description: 'The Amount for the item',

    example: 150,
  })
  rate: number;

  @ApiProperty({
    description: 'The multiplication of quantity and rate',

    example: 590,
  })
  amount: number;

  @ApiProperty({
    description: 'The invoiceId',

    example: 1,
  })
  invoice: number;

  @ApiProperty({
    description:
      'This is the boolean data type with two possible outcome true or false',

    example: true,
  })
  isActive: boolean;
}

export class UpdateInvoiceAndLineItemDto {
  @ApiProperty({
    type: UpdateInvoiceDto,

    required: true,
  })
  @Type(() => UpdateInvoiceDto)

  // @ValidateNested()
  invoiceValue: UpdateInvoiceDto;

  @ApiProperty({
    type: UpdateLineItemDto,

    isArray: true,

    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateLineItemDto)
  lineItemValue: UpdateLineItemDto[];
}
