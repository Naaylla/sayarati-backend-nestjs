import { Controller, Get, Inject } from '@nestjs/common';
import { AccountService } from './account.service';
import type { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Controller('account')
export class AccountController {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly accountService: AccountService,
  ) {}

  @Get('profile')
  getProfile() {}
}
