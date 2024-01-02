import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateMyOrganizationDto {
  @ApiProperty({
    description: 'The name Of the organization',
    example: 'Abc',
  })
  @IsNotEmpty()
  organizationName: string;

  @ApiProperty({
    description: 'This is the description of the organization',
    example: 'This is good organization',
  })
  // @IsNotEmpty()
  organizationDescription: string;

  @ApiProperty({
    description: 'This is the description of the organizationLogo',
    example: 'This is good organizationLogo',
  })
  @IsNotEmpty()
  organizationLogo: string;

  @ApiProperty({
    description:
      'This is the boolean data type with two possible outcome true or false',
    example: true,
  })
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({
    description: 'The phone number for the user',
    example: '9988998899',
  })
  @IsOptional()
  phoneNo: string;

  @ApiProperty({
    /**
     * TestingCompany,WaterPurveyor
     */
    description: 'This is the organizationType of the organization',
    example: 'TestingCompany',
  })
  // @IsNotEmpty()
  organizationType: string;

  @ApiProperty({
    description: 'The address line 1',
    example: '7207 BUFORD HWY NE, DORAVILLE  GA',
  })
  addressLine1: string;

  @ApiProperty({
    description: 'The address line 2',
    example: '7207 BUFORD HWY NE, DORAVILLE  GA',
  })
  addressLine2: string;

  @ApiProperty({
    description: ' The streetNumber where tested by the organization',
    example: 'AZ 85123',
  })
  streetNumber?: string;

  @ApiProperty({
    description: 'This is the  streetName where tested by the organization',
    example: 'Aztec Dr',
  })
  streetName?: string;

  @ApiProperty({
    description: ' The apartment where tested by the organization',
    example: 'MiniPalais',
  })
  apartment?: string;

  @ApiProperty({
    description: ' The city where tested by the organization',
    example: 'NewYork',
  })
  city: string;

  @ApiProperty({
    description: 'The state where tested by the organization',
    example: 'Texas',
  })
  state: string;

  @ApiProperty({
    description: 'The postalCode where tested by the organization',
    example: '85321',
  })
  postalCode: string;

  @ApiProperty({
    description: 'The timeZone',
    // example: 'Texas',
  })
  timeZone: string;

  @ApiProperty({
    description: 'The country',
    example: 'United states',
  })
  country: string;
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
    description: 'The name of a state',
    example: 'Texas',
  })
  // @IsNotEmpty()
  state: string;

  @ApiProperty({
    description: 'The name of a state',
    example: 'Texas',
  })
  // @IsNotEmpty()
  stateCode: string;

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

export class CreateOrganizationAndAddressDto {
  @ApiProperty({
    type: CreateMyOrganizationDto,
    required: true,
  })
  @Type(() => CreateMyOrganizationDto)
  @ValidateNested({ each: true })
  organizationDetails: CreateMyOrganizationDto;

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
