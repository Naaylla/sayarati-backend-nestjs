import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/database/database.module';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { accountProviders } from './account.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController],
  providers: [...accountProviders, AccountService],
  exports: [AccountService],
})
export class AccountModule {}
