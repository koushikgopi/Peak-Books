import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'The Service Provided Or Category of product',
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
    description: 'The  Unit, Hour, Kg, Flat rate of the item',
    example: 'kg',
  })
  unit: string;

  @ApiProperty({
    //Box, roll
    description: 'The packaging type ',
    example: 'box',
  })
  packagingType: string;

  @ApiProperty({
    description: 'The number of packages',
    example: 2,
  })
  numberOfPackage: number;

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
    description:
      'This is the  boolean  data type with two possible outcome true or false',
    example: true,
  })
  taxable: boolean;

  @ApiProperty({
    description: 'Total tax percentage',
    example: 18,
  })
  totalTaxRate: number;

  @ApiProperty({
    description: 'The organization id',
    example: 1,
  })
  organization: number;

  @ApiProperty({
    description:
      'This is the  boolean  data type with two possible outcome true or false',
    example: true,
  })
  isActive: boolean;
}

class UpdateProductTaxDto {
  @ApiProperty({
    description: 'The id of product tax',

    example: 1,
  })
  id: number;

  @ApiProperty({
    description: ' The type of the product tax',
    example: 'CGST',
  })
  taxType: string;

  @ApiProperty({
    description: 'The discount percentage',
    example: '5',
  })
  taxPercentage: number;

  @ApiProperty({
    description: 'The id of product',

    example: 1,
  })
  product: number;

  @ApiProperty({
    description:
      'This is the boolean data type with two possible outcome true or false',
    example: true,
  })
  isActive: boolean;
}

export class UpdateProductAndProductTaxDto {
  @ApiProperty({
    type: UpdateProductDto,
    required: true,
  })
  @Type(() => UpdateProductDto)
  @ValidateNested({ each: true })
  productValue: UpdateProductDto;

  @ApiProperty({
    type: UpdateProductTaxDto,
    isArray: true,
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductTaxDto)
  productTaxValue: UpdateProductTaxDto[];
}
