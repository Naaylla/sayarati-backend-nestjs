import { Controller, Post, Body, Get, Query, Request } from '@nestjs/common';
import { SetCookies, ClearCookies, CookieSettings } from '@nestjsplus/cookies';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResponseMessage } from '../../core/decorators/response-message.decorator';

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
  @ResponseMessage('Logged in successfully')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('verify-account')
  @ResponseMessage('Account verified successfully')
  verifyAccount(@Query('token') token: string) {
    return this.authService.verifyAccount(token);
  }

  @Post('resend-verification')
  @ResponseMessage('Verification resent')
  resendVerification() {
    const userId = 28;
    return this.authService.resendVertification(userId);
  }

  @Post('refresh-token')
  @SetCookies({ name: 'refreshToken', httpOnly: true, sameSite: true })
  @ResponseMessage('Set refresh token sucessfully')
  async refreshToken(
    @Request() request: Request & { _cookies: CookieSettings[] },
  ) {
    const id = 1;
    const refreshToken = await this.authService.refreshToken(id);
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
}
