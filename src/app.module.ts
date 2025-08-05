import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true, cache: true }),
    AuthModule,
    AccountModule,
    ProfileModule,
  ],
})
export class AppModule {}
