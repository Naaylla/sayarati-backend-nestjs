import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import type { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '../../core/guards/auth.guard';
import { Account } from 'src/core/guards/account.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('account')
export class AccountController {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly accountService: AccountService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Account('id') id: number) {
    return this.accountService.findById(id);
  }

  @Patch('password/:id')
  updatePassword(
    @Account('id') id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { oldPassword, newPassword } = updatePasswordDto;
    return this.accountService.updatePassword(id, oldPassword, newPassword);
  }
}
