import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from './Organization';
import { ProductTax } from './ProductTax';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    description: 'The id for the product',
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    description: 'The Service Provided Or Category of product',
    example: 'ACCOUNTING',
  })
  @Column()
  itemName: string;

  @ApiProperty({
    description: 'The description of the item',
    example: 'good item',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'The HSN code of the item',
    example: '1233432',
  })
  @Column()
  HSNorSAC: string;

  @ApiProperty({
    description: 'The  Unit, Hour, Kg, Flat rate of the item',
    example: 'kg',
  })
  @Column()
  unit: string;

  @ApiProperty({
    //Box, roll
    description: 'The packaging type ',
    example: 'box',
  })
  @Column()
  packagingType: string;

  @ApiProperty({
    description: 'The number of packages',
    example: 2,
  })
  @Column()
  numberOfPackage: number;

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
    description:
      'This is the  boolean  data type with two possible outcome true or false',
    example: true,
  })
  @Column()
  taxable: boolean;

  @ApiProperty({
    description: 'Total tax percentage',
    example: 18,
  })
  @Column()
  totalTaxRate: number;

  @ApiProperty({ type: () => Organization })
  @ManyToOne(() => Organization, (organization) => organization.product)
  organization: Organization;

  @ApiProperty({ type: ProductTax })
  @OneToMany(() => ProductTax, (productTax) => productTax.product)
  productTax: ProductTax[];

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
