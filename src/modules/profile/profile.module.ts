import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { profileProviders } from './profile.providers';
import { DatabaseModule } from 'src/core/database/database.module';
import { FileUploadService } from '../file-upload/file-upload.service';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule, FileUploadModule],
  controllers: [ProfileController],
  providers: [...profileProviders, FileUploadService, ProfileService],
})
export class ProfileModule {}
