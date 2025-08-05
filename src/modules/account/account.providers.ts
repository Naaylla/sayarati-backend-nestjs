import { DataSource } from 'typeorm';
import { Account } from './entities/account.entity';
import { Provider } from '@nestjs/common';

export const accountProviders: Provider[] = [
  {
    provide: 'ACCOUNT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Account),
    inject: ['DATA_SOURCE'],
  },
];
