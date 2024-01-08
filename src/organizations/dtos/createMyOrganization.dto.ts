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
    description: 'The name of the organization',
    example: 'Abc',
  })
  organizationShortName: string;

  @ApiProperty({
    description: 'This is the description of the organization',
    example: 'This is good organization',
  })
  organizationDescription: string;

  @ApiProperty({
    description: 'This is the description of the organizationLogo',
    example: 'This is good organizationLogo',
  })
  organizationLogo: string;

  @ApiProperty({
    description: 'The phone number for the user',
    example: '9988998899',
  })
  @IsOptional()
  phoneNo: string;

  @ApiProperty({
    description: 'The MAIL ID for the organization',
    example: 'example@gmail.com',
  })
  mailId: string;

  @ApiProperty({
    description: 'The GST number for the organization',
    example: '33SDWES2334Q2AW',
  })
  GSTINorUIN: string;

  @ApiProperty({
    description:
      'This is the boolean data type with two possible outcome true or false',
    example: true,
  })
  @IsNotEmpty()
  isActive: boolean;
}

class CreateAddressDto {
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
