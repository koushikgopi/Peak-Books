import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty({
    description: 'The email of the company',
    example: 'abc@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The invoice date',
    // example: '2023-08-14',
  })
  // @IsNotEmpty()
  invoiceDate: Date;

  @ApiProperty({
    description: 'The due date',
    // example: '2023-08-14',
  })
  // @IsNotEmpty()
  dueDate: Date;

  @ApiProperty({
    description: 'The terms',
    // example: '',
  })
  @IsNotEmpty()
  terms: string;

  @ApiProperty({
    description: 'The sub total amount',
    example: '5000',
  })
  @IsNotEmpty()
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
  @IsNotEmpty()
  total: number;

  @ApiProperty({
    description: 'The note',
    example: 'abc',
  })
  note: string;

  @ApiProperty({
    description: 'The payment status',
    example: 'completed',
  })
  // @IsNotEmpty()
  paymentStatus: string;

  @ApiProperty({
    description: 'The invoice status',
    example: 'Unpaid',
  })
  invoiceStatus: string;
  @ApiProperty({
    description: 'The customer id',
    example: 1,
  })
  customerId: number;

  @ApiProperty({
    description: 'The organization id',
    example: 1,
  })
  organizationId: number;

  @ApiProperty({
    description: 'The tester id',
    example: 1,
  })
  testerId: number;

  @ApiProperty({
    description:
      'This is the boolean data type with two possible outcome true or false',
    example: true,
  })
  // @IsNotEmpty()
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
    description: 'The location code',
    example: 'WA_1725',
  })
  locationCode?: string;

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
}

class CreateLineItemDto {
  @ApiProperty({
    description: 'The Service Provided Or Category of product',
    example: 'ACCOUNTING',
  })
  @IsNotEmpty()
  Item: string;

  @ApiProperty({
    description: 'The description of the item',
    example: 'good item',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The  Unit, Hour, Flat rate of the item',
    example: 'good item',
  })
  @IsNotEmpty()
  unit: string;

  @ApiProperty({
    description: 'The  quantity of the item',
    example: 4,
  })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'The Amount for the item',
    example: 150,
  })
  @IsNotEmpty()
  rate: number;

  @ApiProperty({
    description: 'The multiplication of quantity and rate',
    example: 590,
  })
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description:
      'This is the  boolean  data type with two possible outcome true or false',
    example: true,
  })
  // @IsNotEmpty()
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
