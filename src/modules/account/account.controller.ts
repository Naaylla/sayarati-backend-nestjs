import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import type { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from 'src/core/guards/auth.gard';

@Controller('account')
export class AccountController {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly accountService: AccountService,
  ) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile() {
    return { message: 'Zeref, Team lead te3 DEV' };
  }
}
