import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'The Service Provided Or Category of product',
    example: 'ACCOUNTING',
  })
  item: string;

  @ApiProperty({
    description: 'The description of the item',
    example: 'good item',
  })
  description: string;

  @ApiProperty({
    description: 'The  Unit, Hour, Flat rate of the item',
    example: 'good item',
  })
  unit: string;

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
    description: 'The unique code,such as part number',
    example: '1256',
  })
  sku: string;

  @ApiProperty({
    description:
      'This is the  boolean  data type with two possible outcome true or false',
    example: true,
  })
  taxable: boolean;

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

  // @ApiProperty({
  //   description: 'The date and time when the user was updated',
  // })
  // updatedAt: Date;
}
