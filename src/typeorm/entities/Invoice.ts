import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './Customer';
import { Organization } from './Organization';
import { LineItem } from './LineItem';
import { Vehicle } from './Vehicle';
import { Account } from './Account';

@Entity({ name: 'invoices' })
export class Invoice {
  @ApiProperty({
    description: 'The id of invoice',
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    description: 'The E way bill number  ',
    example: '5',
  })
  @Column()
  eWayBillNo: number;

  @ApiProperty({
    description: 'Delivery note for the invoice',
    example: '',
  })
  @Column()
  deliveryNote: string;

  @ApiProperty({
    description: 'The delivery note date for the invoice',
    example: '2023-08-14',
  })
  @Column()
  deliveryNoteDate: Date;

  @ApiProperty({
    description: 'The Reference number for the invoice',
    example: '5',
  })
  @Column()
  referenceNo: number;

  @ApiProperty({
    description: 'The Reference date for the invoice',
    example: '2023-08-14',
  })
  @Column()
  referenceDate: Date;

  @ApiProperty({
    description: 'The extra reference',
    example: '123qw',
  })
  @Column()
  extraReference: string;

  @ApiProperty({
    description: 'The order number from the buyer',
    example: 'qw123',
  })
  @Column()
  buyerOrderNo: string;

  @ApiProperty({
    description: 'The buyer Order No date for the invoice',
    example: '2023-08-14',
  })
  @Column()
  buyerOrderNoDate: Date;

  @ApiProperty({
    description: 'The dispatched doc number',
    example: 'qw123',
  })
  @Column()
  dispatchedDocNo: string;

  @ApiProperty({
    description: 'The destination',
    example: 'qw123',
  })
  @Column()
  destination: string;

  @ApiProperty({
    description: 'Bill of Landing/ LR-RR No',
    example: 'qw123',
  })
  @Column()
  LR_RRNo: string;

  @ApiProperty({
    description: 'The email of the company',
    example: 'abc@gmail.com',
  })
  @Column()
  email: string;

  @ApiProperty({
    description: 'The invoice date',
    example: '2023-08-14',
  })
  @Column()
  invoiceDate: Date;

  @ApiProperty({
    description: 'The due date',
  })
  @Column()
  dueDate: Date;

  @ApiProperty({
    description: 'The terms of delivery',
    // example: '',
  })
  @Column()
  terms: string;

  @ApiProperty({
    description: 'The sub total amount',
    example: '5000',
  })
  @Column('decimal', { precision: 6, scale: 2 })
  subTotal: number;

  @ApiProperty({
    description: 'The discount percentage',
    example: '5',
  })
  @Column()
  discountPercentage: number;

  @ApiProperty({
    description: 'The discount',
    example: '5',
  })
  @Column('decimal', { precision: 6, scale: 2 })
  discountAmount: number;

  @ApiProperty({
    description:
      'This is the  boolean  data type with two possible outcome true or false',
    example: true,
  })
  @Column()
  isTaxable: boolean;

  @ApiProperty({
    description: 'The tax',
    example: '5',
  })
  @Column('decimal', { precision: 6, scale: 2 })
  taxPercentage: number;

  @ApiProperty({
    description: 'The tax',
    example: '5',
  })
  @Column('decimal', { precision: 6, scale: 2 })
  taxAmount: number;

  @ApiProperty({
    description: 'The state tax amount ',
    example: '5',
  })
  @Column('decimal', { precision: 6, scale: 2 })
  SGSTAmount: number;

  @ApiProperty({
    description: 'The central tax amount ',
    example: '5',
  })
  @Column('decimal', { precision: 6, scale: 2 })
  CGSTAmount: number;

  @ApiProperty({
    description: 'The Integrated tax amount ',
    example: '5',
  })
  @Column('decimal', { precision: 6, scale: 2 })
  IGSTAmount: number;

  @ApiProperty({
    description: 'The tax',
    example: '5',
  })
  @Column('decimal', { precision: 6, scale: 2 })
  roundOff: number;

  @ApiProperty({
    description: 'The total',
    example: '250',
  })
  @Column('decimal', { precision: 6, scale: 2 })
  total: number;

  @ApiProperty({
    description: 'The note',
    example: 'abc',
  })
  @Column()
  note: string;

  @ApiProperty({
    description: 'The declaration for the invoice',
    example: 'abc',
  })
  @Column()
  declaration: string;

  @ApiProperty({
    description: 'The payment status',
    example: 'completed',
  })
  @Column()
  paymentStatus: string;

  @ApiProperty({
    description: 'The invoice status',
    example: 'completed',
  })
  @Column()
  invoiceStatus: string;

  @ApiProperty({ type: () => Customer })
  @ManyToOne(() => Customer, (customer) => customer.invoice)
  customer: Customer;

  @ApiProperty({ type: () => Account })
  @ManyToOne(() => Account, (account) => account.invoice)
  account: Account;

  @ApiProperty({ type: () => Organization })
  @ManyToOne(() => Organization, (organization) => organization.invoice)
  organization: Organization;

  @ApiProperty({ type: LineItem })
  @OneToMany(() => LineItem, (lineItem) => lineItem.invoice)
  lineItem: LineItem[];

  @ApiProperty({ type: () => Vehicle })
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.invoice)
  vehicle: Vehicle;

  @ApiProperty({
    description:
      'This is the  boolean  data type with two possible outcome true or false',
    example: true,
  })
  @Column()
  isActive: boolean;

  @ApiProperty({
    description: 'The created date and time',
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
