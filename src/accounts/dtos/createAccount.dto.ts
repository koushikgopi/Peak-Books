import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({
    description: 'Name of the account holder',
    example: 'john',
  })
  accountHolderName: string;

  @ApiProperty({
    description: 'Bank name ',
    example: 'yes bank ',
  })
  bankName: string;

  @ApiProperty({
    description: 'Account number',
    example: '123345121212',
  })
  accountNo: string;

  @ApiProperty({
    description: 'IFSC Code Bank',
    example: 'YES0001 ',
  })
  IFSCCode: string;

  @ApiProperty({
    description: 'Bank branch',
    example: 'anna nagar',
  })
  branch: string;

  @ApiProperty({
    description: 'The organization id',
    example: 1,
  })
  organizationId: number;

  @ApiProperty({
    description:
      'This is the boolean data type with two possible outcome true or false',
    example: true,
  })
  isActive: boolean;
}
