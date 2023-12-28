import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './Customer';
import { User } from './User';
import { Vehicle } from './Vehicle';
import { Product } from './Product';
import { Invoice } from './Invoice';

@Entity({ name: 'organizations' })
export class Organization {
  @ApiProperty({
    description: 'The id Of the organization',
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    description: 'The name of the organization',
    example: 'Abc',
  })
  @Column()
  organizationName: string;

  @ApiProperty({
    description: 'This is the description of the organization',
    example: 'This is good organization',
  })
  @Column()
  organizationDescription: string;

  @ApiProperty({ type: Customer })
  @OneToMany(() => Customer, (customer) => customer.organization)
  customer: Customer[];

  @ApiProperty({ type: User })
  @OneToMany(() => User, (user) => user.organization)
  user: User[];

  @ApiProperty({ type: Vehicle })
  @OneToMany(() => Vehicle, (vehicle) => vehicle.organization)
  vehicle: Vehicle[];

  @ApiProperty({ type: Product })
  @OneToMany(() => Product, (product) => product.organization)
  product: Product[];

  @ApiProperty({ type: Invoice })
  @OneToMany(() => Invoice, (invoice) => invoice.organization)
  invoice: Invoice[];

  //   @ApiProperty({ type: Address })
  //   @OneToMany(() => Address, (address) => address.organization)
  //   address: Address[];

  @ApiProperty({
    description:
      'This is the  boolean  data type with two possible outcome true or false',

    example: true,
  })
  @Column()
  isActive: boolean;

  @ApiProperty({
    description:
      'This is the boolean data type with two possible outcome true or false',
    example: false,
  })
  @Column()
  isDelete: boolean;

  @ApiProperty({ description: 'The Logo of the organization', example: '' })
  @Column()
  organizationLogo: string;

  @ApiProperty({
    description: 'The phone number for the user',
    example: '9988998899',
  })
  @Column()
  phoneNo: string;

  @ApiProperty({
    description: ' The streetNumber where tested by the organization',
    example: 'AZ 85123',
  })
  @Column()
  streetNumber: string;

  @ApiProperty({
    description: 'This is the  streetName where tested by the organization',
    example: 'Aztec Dr',
  })
  @Column()
  streetName: string;

  @ApiProperty({
    description: ' The apartment where tested by the organization',
    example: 'MiniPalais',
  })
  @Column()
  apartment: string;

  @ApiProperty({
    description: ' The city where tested by the organization',
    example: 'NewYork',
  })
  @Column()
  city: string;

  @ApiProperty({
    description: 'The state where tested by the organization',
    example: 'Texas',
  })
  @Column()
  state: string;

  @ApiProperty({
    description: 'The country',

    example: 'United states',
  })
  @Column()
  country: string;

  @ApiProperty({
    description: 'This is created date and time of organization',
  })
  @Column()
  createdAt: Date;

  @ApiProperty({
    description: 'The name of person who created the organization',
    example: 'Admin',
  })
  @Column()
  createdBy: string;

  @ApiProperty({
    description: 'This is updated date and time of organization',
  })
  @Column()
  updatedAt: Date;

  @ApiProperty({
    description: 'The name of person who updated the organization',
    example: 'Admin',
  })
  @Column()
  updatedBy: string;
}
