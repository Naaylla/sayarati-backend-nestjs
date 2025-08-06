import { RegisterDto } from '../../auth/dto/register.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateAccountDto extends OmitType(RegisterDto, [
  'confirmPassword',
]) {}
