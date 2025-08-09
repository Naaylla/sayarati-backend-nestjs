import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Headers,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { Account } from 'src/core/guards/account.guard';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ResponseMessage('Profile created succesfully')
  create(
    @Body() createProfileDto: CreateProfileDto,
    @Account('id') accountId: number,
  ) {
    return this.profileService.create(createProfileDto, accountId);
  }

  @Get()
  @ResponseMessage('Profiles fetched successfully')
  findAll(@Account('id') accountId: number) {
    return this.profileService.findAll(accountId);
  }

  @Get(':id')
  @ResponseMessage('Profile fetched successfully')
  findOne(@Param('id') id: number, @Account('id') accountId: number) {
    return this.profileService.findOne(id, accountId);
  }

  @ResponseMessage('Profile updated successfully')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Account('id') accountId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(id, accountId, updateProfileDto);
  }

  @ResponseMessage('Profile picture updated successfully')
  @Patch('picture/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateProfilePicture(
    @Param('id') id: number,
    @Account('id') accountId: number,
    @UploadedFile() file: Express.Multer.File,
    @Headers('authorization') authorizationHeader: string,
  ) {
    return this.profileService.updateProfilePicture(
      id,
      accountId,
      file,
      authorizationHeader,
    );
  }

  @Delete(':id')
  @ResponseMessage('Profile deleted successfully')
  delete(@Param('id') id: number, @Account('id') accountId: number) {
    return this.profileService.delete(id, accountId);
  }
}
