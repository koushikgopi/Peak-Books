import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateVehicleDto {
  @ApiProperty({
    description: 'The Service Provided Or Category of product',
    example: 'ACCOUNTING',
  })
  vehicleMake: string;

  @ApiProperty({
    description: 'The description of the vehicle',
    example: 'good item',
  })
  description: string;

  @ApiProperty({
    description: 'The driver who is driving the  vehicle',
    example: 'john',
  })
  nameOfDriver: string;

  @ApiProperty({
    description: 'The  model of the vehicle',
    example: 'astar',
  })
  model: string;

  @ApiProperty({
    description: 'The licenseNo for the vehicle',
    example: 123123,
  })
  licenseNo: number;

  @ApiProperty({
    description: 'The organization id',
    example: 1,
  })
  organization: number;
}
