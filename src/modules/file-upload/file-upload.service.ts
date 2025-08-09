import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import fs, { PathLike } from 'fs';
import FormData from 'form-data';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileUploadService {
  private readonly fileServerUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.fileServerUrl =
      this.configService.get<string>('FILE_SERVER_URL') ||
      'http://localhost:9999';
  }

  async upload(
    file: Express.Multer.File,
    authorizationHeader: string,
  ): Promise<string> {
    const form = new FormData();

    form.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const response = await lastValueFrom(
      this.httpService.post(`${this.fileServerUrl}/upload`, form, {
        headers: {
          ...form.getHeaders(),
          Authorization: authorizationHeader,
        },
      }),
    );

    return response.data;
  }

  async delete(filename: string, jwtToken: string): Promise<void> {
    await lastValueFrom(
      this.httpService.delete(`${this.fileServerUrl}/delete/${filename}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }),
    );
  }
}
