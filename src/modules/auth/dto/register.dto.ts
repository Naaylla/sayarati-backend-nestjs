import {
  IsEmail,
  Matches,
  IsStrongPassword,
  IsString,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email format' })
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @IsString()
  @Length(8)
  confirmPassword: string;
}
