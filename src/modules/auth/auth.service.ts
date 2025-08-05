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

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private mailerService: MailerService,
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
      to: 'test@nestjs.com', // list of receivers
      from: 'noreply@nestjs.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: mailToken, // plaintext body
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

  async resendVertification() {
    const sentMail = await this.mailerService.sendMail({
      to: 'test@nestjs.com', // list of receivers
      from: 'noreply@nestjs.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    });

    console.log({ sentMail });

    return sentMail;
  }
}
