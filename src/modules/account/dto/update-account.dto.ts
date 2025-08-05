import { PartialType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';
import { IsBoolean } from 'class-validator';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @IsBoolean()
  isVerified: boolean;
}
