import {
  IsEmail,
  Matches,
  IsStrongPassword,
  IsString,
  Length,
  IsNotEmpty,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  confirmPassword: string;
}
