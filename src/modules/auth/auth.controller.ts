import { Controller, Post, Body, Get, Query, Res } from '@nestjs/common';
import { Cookies, SetCookies, ClearCookies } from '@nestjsplus/cookies';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
import { ResponseMessage } from '../../core/decorators/response-message.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ResponseMessage('User registered successfully')
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    const { account, accessToken, refreshToken } =
      await this.authService.register(registerDto);

    response.cookie('refreshToken', refreshToken);

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
  @ResponseMessage('Set refresh token sucessfully')
  refreshToken(@Cookies() cookies) {
    console.log({ cookies });
    return 'slm';
  }

  @Post('logout')
  @ClearCookies('refreshToken')
  @ResponseMessage('Logged out successfully')
  logout() {
    return 'slm';
  }
}
