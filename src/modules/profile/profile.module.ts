import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { profileProviders } from './profile.providers';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [...profileProviders, ProfileService],
})
export class ProfileModule {}
