import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateVehicleDto {
  @ApiProperty({
    description: 'The id',
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: 'The name of driver',
    example: 'john',
  })
  @IsNotEmpty()
  nameOfDriver: string;

  @ApiProperty({
    description: 'The Vehicle Make',
    example: 'Ford',
  })
  @IsNotEmpty()
  vehicleMake: string;

  @ApiProperty({
    description: 'The Model',
    example: '150',
  })
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    description: 'The License No.',
    example: 'S35566',
  })
  @IsNotEmpty()
  licenseNo: string;

  @ApiProperty({
    description: 'The organization id',
    example: 1,
  })
  organization: number;
}
