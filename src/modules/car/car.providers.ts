import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Car } from './entities/car.entity';

export const carProviders: Provider[] = [
  {
    provide: 'CAR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Car),
    inject: ['DATA_SOURCE'],
  },
];
