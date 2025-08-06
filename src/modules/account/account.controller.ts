import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import type { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '../../core/guards/auth.guard';
import { Account } from 'src/core/guards/account.guard';

@Controller('account')
export class AccountController {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly accountService: AccountService,
  ) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Account('id') id: string) {
    return id;
  }
}
