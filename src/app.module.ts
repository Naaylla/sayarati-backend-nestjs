import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [AuthModule, AccountModule, ProfileModule],
})
export class AppModule {}
