import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { RateLimitterModule } from './modules/rate-limiter/rate-limiter.module';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { FileUploadModule } from './modules/file-upload/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true, cache: true }),
    AuthModule,
    AccountModule,
    ProfileModule,
    RateLimitterModule,
    FileUploadModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
