import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { RateLimiterModule } from './modules/rate-limiter/rate-limiter.module';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { CarModule } from './modules/car/car.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true, cache: true }),
    AuthModule,
    AccountModule,
    ProfileModule,
    RateLimiterModule,
    FileUploadModule,
    CarModule,
  ],

  providers: [JwtStrategy],
})
export class AppModule {}
