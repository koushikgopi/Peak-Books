import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Organization } from './Organization';
import { Role } from './Role';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    description: 'The id for the user',
    example: '1',
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    description: 'The username for the user',
    example: 'example@123',
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    description: 'The email id for the user',
    example: 'example@gmail.com',
  })
  @Column()
  email: string;

  @ApiProperty({
    description: 'The first name for the user',
    example: 'Jhon',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    description: 'The last name for the user',
    example: 'Doe',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    description: 'The phone number for the user',
    example: '9988998899',
  })
  @Column()
  phoneNo: string;

  @ApiProperty({
    description: 'The user status for the user',
    example: 'pending',
  })
  @Column()
  userStatus: string;

  @ApiProperty({ type: () => Role })
  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  @ApiProperty({ type: () => Organization })
  @ManyToOne(() => Organization, (organization) => organization.user)
  organization: Organization;

  @ApiProperty({
    description: 'True or false',
    example: 'True',
  })
  @Column()
  isActive: boolean;

  @ApiProperty({
    description: 'The time when the user was created ',
  })
  @Column()
  createdAt: Date;

  @ApiProperty({
    description: 'The admin how created the user',
    example: 'Admin',
  })
  @Column()
  createdBy: string;

  @ApiProperty({
    description: 'The time when the user was updated ',
  })
  @Column()
  updatedAt: Date;

  @ApiProperty({
    description: 'The admin who updated the user',
    example: 'Admin',
  })
  @Column()
  updatedBy: string;
}
