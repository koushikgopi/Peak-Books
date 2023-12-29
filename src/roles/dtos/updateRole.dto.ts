import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    description: ' The name of the role',
    example: 'Admin',
  })
  @IsNotEmpty()
  roleName: string;

  @ApiProperty({
    description: ' The description of the role assigned to user',
    example: 'AAA is assigned as a admin',
  })
  @IsNotEmpty()
  roleDescription: string;

  @ApiProperty({
    description:
      'This is the boolean data type with two possible outcome true or false',
    example: true,
  })
  @IsNotEmpty()
  isActive: boolean;
}
