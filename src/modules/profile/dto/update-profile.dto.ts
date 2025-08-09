import { Length, IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @Length(2, 20)
  firstName: string;
  @IsOptional()
  @Length(2, 20)
  lastName: string;
}
