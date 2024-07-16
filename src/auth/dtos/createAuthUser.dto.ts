import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthUserDto {
  @ApiProperty({
    description: 'The username for the user',
    example: 'example@123',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The email id for the user',
    example: 'example@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The first name for the user',
    example: 'Jhon',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'The last name for the user',
    example: 'Doe',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'The phone number for the user',
    example: '9988998899',
  })
  @IsNotEmpty()
  phoneNo: string;

  @ApiProperty({
    description: 'The password for the user',
    example: 'aa',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The role id ',
    example: 1,
  })
  roleId: number;
}
