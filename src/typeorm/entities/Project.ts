import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from './Organization';

@Entity({ name: 'project' })
export class Project {
  @ApiProperty({
    description: 'The id of customer',
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    description: 'The name of the project',
    example: 'ABC',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The description of a project',
    example: 'Jhon',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'The start date',
  })
  @Column()
  startDate: Date;

  @ApiProperty({
    description: 'The start date',
  })
  @Column()
  endDate: Date;

  @ApiProperty({
    description: 'The total budget',
    example: 100,
  })
  @Column({ nullable: true, type: 'double' })
  totalBudget: number;

  @ApiProperty({
    description:
      'This is the  boolean  data type with two possible outcome true or false',
    example: true,
  })
  @Column()
  isActive: boolean;

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

  @ApiProperty({ type: () => Organization })
  @ManyToOne(() => Organization, (organization) => organization.project)
  organization: Organization;
}
