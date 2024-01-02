import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './Customer';
import { User } from './User';
import { Vehicle } from './Vehicle';
import { Product } from './Product';
import { Invoice } from './Invoice';
import { Address } from './Address';

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
    description: 'The name of the organization',
    example: 'Abc',
  })
  @Column()
  organizationShortName: string;

  @ApiProperty({
    description: 'This is the description of the organization',
    example: 'This is good organization',
  })
  @Column()
  organizationDescription: string;

  @ApiProperty({ description: 'The Logo of the organization', example: '' })
  @Column()
  organizationLogo: string;

  @ApiProperty({
    description: 'The phone number for the organization',
    example: '9988998899',
  })
  @Column()
  phoneNo: string;

  @ApiProperty({
    description: 'The MAIL ID for the organization',
    example: 'example@gmail.com',
  })
  @Column()
  mailId: string;

  @ApiProperty({
    description: 'The GST number for the organization',
    example: '33SDWES2334Q2AW',
  })
  @Column()
  GSTINorUIN: string;

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

  @ApiProperty({ type: Address })
  @OneToMany(() => Address, (address) => address.organization)
  address: Address[];

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
