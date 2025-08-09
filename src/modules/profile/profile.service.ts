import { Inject, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('PROFILE_REPOSITORY')
    private profileRepository: Repository<Profile>,
    private fileUploadService: FileUploadService,
  ) {}
  async create(createProfileDto: CreateProfileDto, accountId: number) {
    const profile = this.profileRepository.create({
      ...createProfileDto,
      account: { id: accountId },
    });

    await this.profileRepository.insert(profile);
    return { profile };
  }

  async findAll(accountId: number) {
    const profiles = await this.profileRepository.find({
      where: {
        account: {
          id: accountId,
        },
      },
    });

    return { profiles };
  }

  async findOne(id: number, accountId: number) {
    const profile = await this.profileRepository.findOne({
      where: {
        id,
        account: {
          id: accountId,
        },
      },
    });

    return { profile };
  }

  async update(
    id: number,
    accountId: number,
    updateProfileDto: UpdateProfileDto,
  ) {
    await this.profileRepository.update(
      {
        id,
        account: { id: accountId },
      },
      updateProfileDto,
    );

    return;
  }
  async updateProfilePicture(
    id: number,
    accountId: number,
    file: Express.Multer.File,
    authorizationHeader: string,
  ) {
    const res = await this.fileUploadService.upload(file, authorizationHeader);
    console.log({ res });

    const profilePicture = '';
    await this.profileRepository.update(
      {
        id,
        account: { id: accountId },
      },
      { profilePicture },
    );

    return;
  }

  async delete(id: number, accountId: number) {
    await this.profileRepository.delete({
      id,
      account: { id: accountId },
    });

    return;
  }
}
