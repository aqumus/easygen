import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*/, {
    message:
      'Password must contain at least 1 letter, 1 number and 1 special character',
  })
  password: string;

  @IsString()
  name: string;
}
