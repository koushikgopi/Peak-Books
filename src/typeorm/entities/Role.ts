import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  OneToMany,
  //   JoinColumn,
  //   OneToMany,
  //   OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './Customer';
import { User } from './User';

@Entity({ name: 'roles' })
export class Role {
  @ApiProperty({
    description: 'The id for the role',
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    description: ' The name of the role',
    example: 'Admin',
  })
  @Column()
  roleName: string;

  @ApiProperty({
    description: ' The description of the role assigned to user',
    example: 'AAA is assigned as a admin',
  })
  @Column()
  roleDescription: string;

  @ApiProperty({ type: Customer })
  @OneToMany(() => Customer, (customer) => customer.role)
  customer: Customer[];

  @ApiProperty({ type: User })
  @OneToMany(() => User, (user) => user.role)
  user: User[];

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
