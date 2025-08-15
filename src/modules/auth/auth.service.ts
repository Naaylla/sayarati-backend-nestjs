import {
  BadRequestException,
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
import { RateLimiterService } from '../rate-limiter/rate-limiter.service';
import { TooManyRequestsException } from '../../core/exceptions/too-many-request';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private configService: ConfigService,
    private rateLimiterService: RateLimiterService,
  ) {}
  async register(registerDto: RegisterDto) {
    const { email, password, confirmPassword } = registerDto;
    if (confirmPassword !== password) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
    }
    const hashedPassword = await HashUtil.hash(password);

    const { account } = await this.accountService.create({
      email,
      password: hashedPassword,
    });

    const accessToken = await this.jwtService.signAsync(
      {
        id: account.id,
        type: 'AUTHENTICATION',
      },
      {
        expiresIn: '1d',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        id: account.id,
        type: 'AUTHENTICATION',
      },
      {
        expiresIn: '30d',
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

    await this.mailerService.sendMail({
      to: 'kemmounramzy93@gmail.com',
      from: 'abderrahmane.test@gmail.com',
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome', // plaintext body
      html: mailToken,
    });

    return { account, accessToken, refreshToken };
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const { account } = await this.accountService.findByEmail(email);

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

    const accessToken = await this.jwtService.signAsync(
      {
        id: account.id,
        type: 'AUTHENTICATION',
      },
      {
        expiresIn: '1d',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        id: account.id,
        type: 'AUTHENTICATION',
      },
      {
        expiresIn: '30d',
      },
    );

    const { password: _, ...accountWithoutPassword } = account;

    return { account: accountWithoutPassword, accessToken, refreshToken };
  }
  async verifyAccount(token: string) {
    const { id, type } = await this.jwtService.verifyAsync<JwtPayload>(token);
    if (type !== 'EMAIL_VERIFICATION') {
      return;
    }

    await this.accountService.update(id, {
      isVerified: true,
    });

    return;
  }
  async resendVertification(id: number) {
    const { account } = await this.accountService.findById(id);
    const isAllowed = await this.rateLimiterService.isAllowed(
      account.email,
      30,
    );

    if (!isAllowed) {
      throw new TooManyRequestsException(
        'You can send a new verification link each 30 seconds',
      );
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
      to: account.email,
      from: this.configService.get('EMAIL_USER'),
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome',
      html: mailToken,
    });

    return sentMail;
  }
  async refreshToken(id: number) {
    const refreshToken = await this.jwtService.signAsync(
      {
        id,
        type: 'AUTHENTICATION',
      },
      {
        expiresIn: '30d',
      },
    );

    return refreshToken;
  }

  async forgotPassword(email: string) {
    await this.mailerService.sendMail({
      to: email,
      from: 'abderrahmane.test@gmail.com',
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome', // plaintext body
      html: 'mailToken',
    });
  }
}
