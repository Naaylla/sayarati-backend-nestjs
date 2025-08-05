import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { accountProviders } from '../account/account.providers';
import { DatabaseModule } from '../../core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [...accountProviders, AuthService],
})
export class AuthModule {}
