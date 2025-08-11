import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ConfigModule } from '@nestjs/config';
<<<<<<< HEAD
import { RateLimitterModule } from './modules/rate-limitter/rate-limitter.module';
import { CarModule } from './car/car.module';
import { Car } from './car/car';
import { CarModule } from './car/car.module';
=======
import { RateLimitterModule } from './modules/rate-limiter/rate-limiter.module';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
>>>>>>> 93864983cd853bbbb860aad0e6600572fd2b2136

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true, cache: true }),
    AuthModule,
    AccountModule,
    ProfileModule,
    RateLimitterModule,
<<<<<<< HEAD
    CarModule,
  ],
  providers: [Car],
=======
    FileUploadModule,
  ],
  providers: [JwtStrategy],
>>>>>>> 93864983cd853bbbb860aad0e6600572fd2b2136
})
export class AppModule {}
