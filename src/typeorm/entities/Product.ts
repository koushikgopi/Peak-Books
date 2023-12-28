import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from './Organization';

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
  item: string;

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
    description:
      'This is the  boolean  data type with two possible outcome true or false',
    example: true,
  })
  @Column()
  taxable: boolean;

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

  @ApiProperty({ type: () => Organization })
  @ManyToOne(() => Organization, (organization) => organization.product)
  organization: Organization;

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
