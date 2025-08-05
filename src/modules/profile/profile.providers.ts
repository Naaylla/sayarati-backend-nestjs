import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Profile } from './entities/profile.entity';

export const profileProviders: Provider[] = [
  {
    provide: 'PROFILE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Profile),
    inject: ['DATA_SOURCE'],
  },
];
