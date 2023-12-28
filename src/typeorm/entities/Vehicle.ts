import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from './Organization';
import { Invoice } from './Invoice';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @ApiProperty({
    description: ' The id for the role',
    example: '1',
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    description: 'The name of driver',
    example: 'john',
  })
  @Column()
  nameOfDriver: string;

  @ApiProperty({
    description: 'The Vehicle Make',
    example: 'Ford',
  })
  @Column()
  vehicleMake: string;

  @ApiProperty({
    description: 'The Model',
    example: '150',
  })
  @Column()
  model: string;

  @ApiProperty({
    description: 'The License No.',
    example: 'S35566',
  })
  @Column({ unique: true })
  licenseNo: string;

  @ApiProperty({ type: () => Organization })
  @ManyToOne(() => Organization, (organization) => organization.vehicle)
  organization: Organization;

  @ApiProperty({ type: Invoice })
  @OneToMany(() => Invoice, (invoice) => invoice.vehicle)
  invoice: Invoice[];

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
    description: 'The name of the user who updated the role',
    example: 'Admin',
  })
  @Column()
  updatedBy: string;
}
