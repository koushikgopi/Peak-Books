import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'The first name of the customer',
    example: 'john',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the customer',
    example: 'Doe',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'name of the company',
    example: 'truwave',
  })
  companyName: string;

  @ApiProperty({
    description: 'The GST number for the organization',
    example: '33SDWES2334Q2AW',
  })
  GSTINorUIN: string;

  @ApiProperty({
    description: 'The phone number of the customer',
    example: '9988998899',
  })
  phoneNo: string;

  @ApiProperty({
    description: 'The email id of the customer',
    example: 'example@gmail.com',
  })
  mailId: string;

  @ApiProperty({
    description:
      'This is the  boolean  data type with two possible outcome true or false',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'The organization id ',
    example: 1,
  })
  organizationId: number;
}

class CreateAddress {
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
    description: 'The city',
    example: 'LosAngles',
  })
  city: string;

  @ApiProperty({
    description: 'The name of a state',
    example: 'Texas',
  })
  state: string;

  @ApiProperty({
    description: 'The name of a state',
    example: 'Texas',
  })
  stateCode: string;

  @ApiProperty({
    description: 'The country',
    example: 'US',
  })
  country: string;

  @ApiProperty({
    description: 'The zip code',
    example: '625014',
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

export class CreateCustomerAndAddressDto {
  @ApiProperty({
    type: CreateCustomerDto,
    required: true,
  })
  @Type(() => CreateCustomerDto)
  @ValidateNested({ each: true })
  customerDetails: CreateCustomerDto;

  @ApiProperty({
    type: CreateAddress,
    isArray: true,
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAddress)
  addresses: CreateAddress[];
}
