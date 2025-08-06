import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { Account } from 'src/core/guards/account.guard';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(
    @Body() createProfileDto: CreateProfileDto,
    @Account('id') accountId: number,
  ) {
    return this.profileService.create(createProfileDto, accountId);
  }

  @Get()
  findAll(@Account('id') accountId: number) {
    return this.profileService.findAll(accountId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Account('id') accountId: number) {
    return this.profileService.findOne(id, accountId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Account('id') accountId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(id, accountId, updateProfileDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Account('id') accountId: number) {
    return this.profileService.delete(id, accountId);
  }
}
