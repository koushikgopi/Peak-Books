import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class UpdateMyOrganizationDto {
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
  @IsNotEmpty()
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

class UpdateAddressDto {
  @ApiProperty({
    description: 'The id',
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: 'The county',
    example: 'Bacon',
  })
  county: string;

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

export class UpdateOrganizationAndAddressDto {
  @ApiProperty({
    type: UpdateMyOrganizationDto,
    required: true,
  })
  @Type(() => UpdateMyOrganizationDto)
  @ValidateNested({ each: true })
  customerDetails: UpdateMyOrganizationDto;

  @ApiProperty({
    type: UpdateAddressDto,
    isArray: true,
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  addresses: UpdateAddressDto[];
}
