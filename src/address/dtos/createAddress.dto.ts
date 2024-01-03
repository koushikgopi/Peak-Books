import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    description: 'The object type - organization,customer,device,tester',
    example: 'Customer',
  })
  objectType: string;

  @ApiProperty({
    description: 'The address type - MA_Address or SA_Address',
    example: 'MA_ADD',
  })
  addressType: string;

  @ApiProperty({
    description: 'The address line 1',
    example: '5880, LIVE OAK PKWY',
  })
  addressLine1: string;

  @ApiProperty({
    description: 'The address line 2',
    example: '5880, LIVE OAK PKWY',
  })
  addressLine2: string;

  @ApiProperty({
    description: 'The name of a city',
    example: 'Texas',
  })
  city: string;

  @ApiProperty({
    description: 'The name of a state',
    example: 'Texas',
  })
  state: string;

  @ApiProperty({
    description: 'The state',
    example: 'Texas',
  })
  stateCode: string;

  @ApiProperty({
    description: 'The country',
    example: 'US',
  })
  country: string;

  @ApiProperty({
    description: ' The zipCode',
    example: '62512',
  })
  zipCode: string;

  @ApiProperty({
    description: 'The latitude',
    example: '38.8951',
  })
  latitude: string;

  @ApiProperty({
    description: 'The longitude',
    example: '-77.0364',
  })
  longitude: string;

  @ApiProperty({
    description: 'The place id',
    example: 'ChIJgUbEo8cfqokR5lP9_Wh_DaM',
  })
  placeId: string;
}
