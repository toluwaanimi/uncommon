import { DataSource, DataSourceOptions } from 'typeorm';
import { Logger } from '@nestjs/common';
import { envConfig } from '../environment-config/environment.config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Event } from '../../entities/event.entity';
import { Collection } from '../../entities/collection.entity';
import { Order } from '../../entities/order.entity';
import { Token } from '../../entities/token.entity';

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  entities: [Event, Collection, Order, Token],
  migrations: [process.cwd() + '/database/migrations/*.entity.{js,ts}'],
  synchronize: true,
  migrationsRun: false,
  url: envConfig.getPostgresURL(),
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    ssl:
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'staging' ||
      process.env.NODE_ENV === 'development',
  },
};

export const AppDataSource = new DataSource(typeormConfig);

AppDataSource.initialize().then(() =>
  Logger.log('[DATABASE] connection successful'),
);
