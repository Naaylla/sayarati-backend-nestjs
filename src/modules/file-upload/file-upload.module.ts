import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [FileUploadService],
})
export class FileUploadModule {}
