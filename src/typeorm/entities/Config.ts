import { ApiProperty } from '@nestjs/swagger';
import { Organization } from './Organization';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'configs' })
export class Config {
  @ApiProperty({
    description: 'The id of configuration',
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    description: 'The config type',
    example: 'firstNotification',
  })
  @Column()
  configurationType: string;

  @ApiProperty({
    description: 'The value',
    example: 60,
  })
  @Column()
  value: string;

  @ApiProperty({ type: () => Organization })
  @ManyToOne(() => Organization, (organization) => organization.config)
  organization: Organization;

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
