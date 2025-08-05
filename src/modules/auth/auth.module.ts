import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigService } from '@nestjs/config';
import { RateLimitterModule } from '../../rate-limitter/rate-limitter.module';
import { join } from 'path';
import { RateLimitterService } from 'src/rate-limitter/rate-limitter.service';

@Module({
  imports: [
    DatabaseModule,
    AccountModule,
    RateLimitterModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_OR_KEY'),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_USER'),
            pass: configService.get<string>('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"From Name" <from@example.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RateLimitterService],
})
export class AuthModule {}
