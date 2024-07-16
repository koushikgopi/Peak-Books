import { IsString, Matches, MinLength } from 'class-validator';

export class SigninRequestDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(8)
  @Matches(/[a-z]/)
  @Matches(/[A-Z]/)
  @Matches(/[0-9]/)
  password: string;
}
