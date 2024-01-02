import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  //   JoinColumn,
  //   OneToMany,
  //   OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from './Organization';
import { Customer } from './Customer';

@Entity({ name: 'addresses' })
export class Address {
  @ApiProperty({
    description: 'The id for the address',
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    description: 'The object type',
    example: 'customer',
  })
  @Column()
  objectType: string;

  @ApiProperty({
    description: 'The address type - MA_Address or SA_Address',
    example: 'MA_ADD',
  })
  @Column()
  addressType: string;

  @ApiProperty({
    description: 'The address line 1',
    example: 'MA_ADD',
  })
  @Column()
  addressLine1: string;

  @ApiProperty({
    description: 'The address line 2',
    example: 'MA_ADD',
  })
  @Column()
  addressLine2: string;

  @ApiProperty({
    description: ' The city',
    example: 'Los Angles',
  })
  @Column()
  city: string;

  @ApiProperty({
    description: 'The state',
    example: 'Texas',
  })
  @Column()
  state: string;

  @ApiProperty({
    description: 'The state',
    example: 'Texas',
  })
  @Column()
  stateCode: string;

  @ApiProperty({
    description: 'The country',
    example: 'US',
  })
  @Column()
  country: string;

  @ApiProperty({
    description: ' The zipCode',
    example: '62512',
  })
  @Column()
  zipCode: string;

  @ApiProperty({
    description: 'The latitude',
    example: '38.8951',
  })
  @Column()
  latitude: string;

  @ApiProperty({
    description: 'The longitude',
    example: '-77.0364',
  })
  @Column()
  longitude: string;

  @ApiProperty({
    description: 'The place id',
    example: 'ChIJgUbEo8cfqokR5lP9_Wh_DaM',
  })
  @Column()
  placeId: string;

  @ApiProperty({ type: () => Organization })
  @ManyToOne(() => Organization, (organization) => organization.address)
  organization: Organization;

  @ApiProperty({ type: () => Customer })
  @ManyToOne(() => Customer, (customer) => customer.address)
  customer: Customer;

  @ApiProperty({
    description:
      'This is the boolean data type with two possible outcome true or false',
    example: false,
  })
  @Column()
  isDelete: boolean;

  @ApiProperty({
    description: 'The date and time',
  })
  @Column()
  createdAt: Date;

  @ApiProperty({
    description: 'The name of the user',
    example: 'Admin',
  })
  @Column()
  createdBy: string;

  @ApiProperty({
    description: 'The date and time',
  })
  @Column()
  updatedAt: Date;

  @ApiProperty({
    description: 'The name of the user',
    example: 'Admin',
  })
  @Column()
  updatedBy: string;
}
