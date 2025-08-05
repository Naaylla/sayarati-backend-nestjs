import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { HashUtil } from 'src/core/utils/hash.util';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/shared/types/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { RateLimitterService } from 'src/rate-limitter/rate-limitter.service';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private configService: ConfigService,
    private rateLimitterService: RateLimitterService,
  ) {}
  async register(registerDto: RegisterDto) {
    const { email, password, confirmPassword } = registerDto;
    if (confirmPassword !== password) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
    }
    const hashedPassword = await HashUtil.hash(password);

    const account = await this.accountService.create({
      email,
      password: hashedPassword,
    });

    const accessToken = this.jwtService.signAsync(
      {
        id: account.id,
        type: 'AUTHENTICATION',
      },
      {
        expiresIn: '1d',
      },
    );

    const mailToken = await this.jwtService.signAsync(
      {
        id: account.id,
        type: 'EMAIL_VERIFICATION',
      },
      {
        expiresIn: '1h',
      },
    );
    const sentMail = await this.mailerService.sendMail({
      to: 'kemmounramzy93@gmail.com', // list of receivers
      from: 'abderrahmane.test@gmail.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    });

    console.log({ sentMail });
    return { account, accessToken };
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const account = await this.accountService.findByEmail(email);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (!account.isVerified) {
      throw new UnauthorizedException('Account not verified');
    }

    const isValidPassword = await HashUtil.verify(account.password, password);

    if (!isValidPassword) {
      throw new NotFoundException('Password is incorrect');
    }

    const accessToken = this.jwtService.signAsync({
      id: account.id,
    });

    return { account, accessToken };
  }

  async verifyAccount(token: string) {
    const { id, type } = await this.jwtService.verifyAsync<JwtPayload>(token);
    if (type !== 'EMAIL_VERIFICATION') {
      return;
    }

    const account = this.accountService.update(id, {
      isVerified: true,
    });

    return account;
  }

  async resendVertification(id: number) {
    const account = await this.accountService.findById(id);

    if (!this.rateLimitterService.isAllowed(account.email, 30)) {
      throw new BadRequestException('Too many request');
    }

    const mailToken = await this.jwtService.signAsync(
      {
        id,
        type: 'EMAIL_VERIFICATION',
      },
      {
        expiresIn: '1h',
      },
    );

    const sentMail = await this.mailerService.sendMail({
      to: account.email, // list of receivers
      from: this.configService.get('EMAIL_USER'),
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome',
      html: mailToken,
    });

    console.log({ sentMail });

    return sentMail;
  }
}
