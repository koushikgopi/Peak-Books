import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    description: 'The object type - organization,customer,device,tester',
    example: 'Customer',
  })
  // @IsNotEmpty()
  objectType: string;

  @ApiProperty({
    description: 'The address type - MA_Address or SA_Address',
    example: 'MA_ADD',
  })
  // @IsNotEmpty()
  addressType: string;

  @ApiProperty({
    description: 'The address line 1',
    example: '5880, LIVE OAK PKWY',
  })
  // @IsNotEmpty()
  addressLine1: string;

  @ApiProperty({
    description: 'The address line 2',
    example: '5880, LIVE OAK PKWY',
  })
  // @IsNotEmpty()
  addressLine2: string;

  @ApiProperty({
    description: 'The name of a city',
    example: 'Texas',
  })
  // @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'The name of a state',
    example: 'Texas',
  })
  // @IsNotEmpty()
  state: string;

  @ApiProperty({
    description: 'The country',
    example: 'US',
  })
  // @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'The latitude',
    example: '38.8951',
  })
  // @IsNotEmpty()
  latitude: string;

  @ApiProperty({
    description: 'The longitude',
    example: '-77.0364',
  })
  // @IsNotEmpty()
  longitude: string;

  @ApiProperty({
    description: 'The place id',
    example: 'ChIJgUbEo8cfqokR5lP9_Wh_DaM',
  })
  // @IsNotEmpty()
  placeId: string;
}
