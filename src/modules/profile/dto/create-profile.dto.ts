import { Length, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @Length(2, 20)
  firstName: string;

  @Length(2, 20)
  lastName: string;

  @IsOptional()
  @IsUrl({}, { message: 'Profile picture must be a valid URL' })
  profilePicture?: string;
}
