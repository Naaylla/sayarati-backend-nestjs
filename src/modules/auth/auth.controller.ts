import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Request,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { SetCookies, ClearCookies, CookieSettings } from '@nestjsplus/cookies';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResponseMessage } from '../../core/decorators/response-message.decorator';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { Account } from 'src/core/guards/account.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @SetCookies({ name: 'refreshToken', httpOnly: true, sameSite: true })
  @ResponseMessage('User registered successfully')
  async register(
    @Body() registerDto: RegisterDto,
    @Request() request: Request & { _cookies: CookieSettings[] },
  ) {
    const { account, accessToken, refreshToken } =
      await this.authService.register(registerDto);

    request._cookies = [
      {
        name: 'refreshToken',
        value: refreshToken,
      },
    ];

    return { account, accessToken };
  }

  @Post('login')
  @SetCookies({ name: 'refreshToken', httpOnly: true, sameSite: true })
  @ResponseMessage('Logged in successfully')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,

    @Request() request: Request & { _cookies: CookieSettings[] },
  ) {
    const { accessToken, refreshToken, account } =
      await this.authService.login(loginDto);
    request._cookies = [
      {
        name: 'refreshToken',
        value: refreshToken,
      },
    ];

    return {
      account,
      accessToken,
    };
  }

  @Get('verify-account')
  @ResponseMessage('Account verified successfully')
  verifyAccount(@Query('token') token: string) {
    return this.authService.verifyAccount(token);
  }

  @Post('resend-verification')
  @ResponseMessage('Verification resent')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  resendVerification(@Account('id') accountId: number) {
    return this.authService.resendVertification(accountId);
  }

  @Post('refresh-token')
  @SetCookies({ name: 'refreshToken', httpOnly: true, sameSite: true })
  @ResponseMessage('Set refresh token sucessfully')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Request() request: Request & { _cookies: CookieSettings[] },
    @Account('id') accountId: number,
  ) {
    const refreshToken = await this.authService.refreshToken(accountId);
    request._cookies = [
      {
        name: 'refreshToken',
        value: refreshToken,
      },
    ];

    return;
  }

  @Post('logout')
  @ClearCookies('refreshToken')
  @ResponseMessage('Logged out successfully')
  logout() {
    return;
  }

  @Post('forgot-password')
  @ClearCookies('refreshToken')
  @ResponseMessage('Logged out successfully')
  forgotPassword() {
    return;
  }
}
