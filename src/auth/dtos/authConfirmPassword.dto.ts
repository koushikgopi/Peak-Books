import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class AuthConfirmPasswordUserDto {
  @IsEmail()
  email: string;

  @IsString()
  confirmationCode: string;

  @IsString()
  @MinLength(8)
  @Matches(/[a-z]/)
  @Matches(/[A-Z]/)
  @Matches(/[0-9]/)
  newPassword: string;
}
