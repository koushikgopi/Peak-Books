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
  // @IsOptional()
  companyName: string;

  @ApiProperty({
    description: 'The phone number of the customer',
    example: '9988998899',
  })
  // @IsOptional()
  phoneNo: string;

  @ApiProperty({
    description: 'The email id of the customer',
    example: 'example@gmail.com',
  })
  // @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The website url',
  })
  // @IsNotEmpty()
  websiteUrl: string;

  @ApiProperty({
    description:
      'This is the  boolean  data type with two possible outcome true or false',
    example: true,
  })
  // @IsNotEmpty()
  isActive: boolean;
  @ApiProperty({
    description: 'The state',
    example: 'Texas',
  })
  locationType: string;

  @ApiProperty({
    description: 'The organization id ',
    example: 1,
  })
  organizationId: number;
}

class CreateAddressDto {
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
    description: 'The city',
    example: 'LosAngles',
  })
  // @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'The country',
    example: 'US',
  })
  // @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'The zip code',
    example: '625014',
  })
  // @IsNotEmpty()
  zipCode: string;

  @ApiProperty({
    description: 'The streetNo.',
    example: '125',
  })
  // @IsNotEmpty()
  streetNo: string;

  @ApiProperty({
    description: 'The streetName',
    example: 'North Elston Avenue',
  })
  // @IsNotEmpty()
  streetName: string;

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

  @ApiProperty({
    description: 'The name of a state',
    example: 'Texas',
  })
  // @IsNotEmpty()
  state: string;
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
    type: CreateAddressDto,
    isArray: true,
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses: CreateAddressDto[];
}
