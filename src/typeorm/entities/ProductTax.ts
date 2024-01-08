import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './Customer';
import { User } from './User';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './Product';

@Entity({ name: 'productTax' })
export class ProductTax {
  @ApiProperty({
    description: 'The id for the product tax',
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    description: ' The type of the product tax',
    example: 'CGST',
  })
  @Column()
  taxType: string;

  @ApiProperty({
    description: 'The discount percentage',
    example: '5',
  })
  @Column()
  taxPercentage: number;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.productTax, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  product: Product;

  @ApiProperty({
    description:
      'This is the boolean data type with two possible outcome true or false',
    example: true,
  })
  @Column()
  isActive: boolean;

  @ApiProperty({
    description: ' The date and time when the role was assigned ',
  })
  @Column()
  createdAt: Date;

  @ApiProperty({
    description: 'The name of the user who assigned the role',
    example: 'Admin',
  })
  @Column()
  createdBy: string;

  @ApiProperty({
    description: 'The date and time when the role of the user was updated',
  })
  @Column()
  updatedAt: Date;

  @ApiProperty({
    description: ' The name of the user who updated the role',
    example: 'Admin',
  })
  @Column()
  updatedBy: string;
}
