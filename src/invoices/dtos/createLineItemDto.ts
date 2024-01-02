import { ApiProperty } from '@nestjs/swagger';

export class CreateLineItemDto {
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
