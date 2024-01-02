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
import { Invoice } from './Invoice';

@Entity({ name: 'account' })
export class Account {
  @ApiProperty({
    description: 'The id for the role',
    example: 1,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    description: ' Name of the account holder',
    example: 'john',
  })
  @Column()
  accountHolderName: string;

  @ApiProperty({
    description: ' Bank name ',
    example: 'yes bank ',
  })
  @Column()
  bankName: string;

  @ApiProperty({
    description: ' Account number  ',
    example: '123345121212 ',
  })
  @Column()
  accountNo: string;

  @ApiProperty({
    description: 'IFSC Code Bank',
    example: 'YES0001 ',
  })
  @Column()
  IFSCCode: string;

  @ApiProperty({
    description: ' Bank branch ',
    example: 'anna nagar',
  })
  @Column()
  branch: string;

  @ApiProperty({ type: Invoice })
  @OneToMany(() => Invoice, (invoice) => invoice.account)
  invoice: Invoice[];

  @ApiProperty({
    description:
      'This is the boolean data type with two possible outcome true or false',
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
