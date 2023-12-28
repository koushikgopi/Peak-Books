import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from './Invoice';

@Entity({ name: 'lineItem' })
export class LineItem {
  @ApiProperty({
    description: 'The id of configuration',
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    description: 'The Service Provided Or Category of product',
    example: 'ACCOUNTING',
  })
  @Column()
  Item: string;

  @ApiProperty({
    description: 'The description of the item',
    example: 'good item',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'The  Unit, Hour, Flat rate of the item',
    example: 'good item',
  })
  @Column()
  unit: string;

  @ApiProperty({
    description: 'The  quantity of the item',
    example: 4,
  })
  @Column()
  quantity: number;

  @ApiProperty({
    description: 'The Amount for the item',
    example: 150,
  })
  @Column()
  rate: number;

  @ApiProperty({
    description: 'The multiplication of quantity and rate',
    example: 590,
  })
  @Column()
  amount: number;

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

  @ApiProperty({ type: () => Invoice })
  @ManyToOne(() => Invoice, (invoice) => invoice.lineItem, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  invoice: Invoice;

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
