import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    AccountModule,
    JwtModule.register({
      secret: 'YOUR_SECRET',
    }),
    MailerModule.forRoot({
      transport: {
        host: '<host>',
        port: Number('<port>'),
        secure: false,
        auth: {
          user: '<username>',
          pass: '<password>',
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
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
