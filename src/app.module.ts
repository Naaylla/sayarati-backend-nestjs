import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { RateLimitterModule } from './rate-limitter/rate-limitter.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true, cache: true }),
    AuthModule,
    AccountModule,
    ProfileModule,
    RateLimitterModule,
  ],
})
export class AppModule {}
