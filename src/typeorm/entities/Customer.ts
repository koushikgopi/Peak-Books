import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from './Organization';
import { Role } from './Role';
import { Invoice } from './Invoice';
import { Address } from './Address';

@Entity({ name: 'customers' })
export class Customer {
  @ApiProperty({
    description: 'The id of customer',
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    description: 'The first name of the customer',
    example: 'Jhon',
  })
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the customer',
    example: 'Doe',
  })
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty({
    description: 'The company name',
    example: 'ABC',
  })
  @Column({ nullable: true })
  companyName: string;

  @ApiProperty({
    description: 'The GST number for the organization',
    example: '33SDWES2334Q2AW',
  })
  @Column()
  GSTINorUIN: string;

  @ApiProperty({
    description: 'The phone number of the customer',
    example: '9988998899',
  })
  @Column({ nullable: true })
  phoneNo: string;

  @ApiProperty({
    description: 'The email id of the customer',
    example: 'example@gmail.com',
  })
  @Column({ nullable: true })
  mailId: string;

  @ApiProperty({
    description:
      'This is the  boolean  data type with two possible outcome true or false',
    example: true,
  })
  @Column()
  isActive: boolean;

  @ApiProperty({ type: () => Organization })
  @ManyToOne(() => Organization, (organization) => organization.customer)
  organization: Organization;

  @ApiProperty({ type: () => Role })
  @ManyToOne(() => Role, (role) => role.customer)
  role: Role;

  @ApiProperty({ type: Invoice })
  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoice: Invoice[];

  @ApiProperty({ type: Address })
  @OneToMany(() => Address, (address) => address.customer)
  address: Address[];

  @ApiProperty({
    description: 'The created date',
  })
  @Column()
  createdAt: Date;

  @ApiProperty({
    description: 'The name of person',
    example: 'Admin',
  })
  @Column()
  createdBy: string;

  @ApiProperty({
    description: 'The updated date and time',
  })
  @Column()
  updatedAt: Date;

  @ApiProperty({
    description: 'The name of person',
    example: 'Admin',
  })
  @Column()
  updatedBy: string;
}
