import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../config/typeorm';
import { Event } from '../entities/event.entity';
import { Collection } from '../entities/collection.entity';
import { Order } from '../entities/order.entity';
import { EventRepository } from './event.repository';
import { OrderRepository } from './order.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([Event, Collection, Order]),
  ],
  providers: [EventRepository, OrderRepository],
  exports: [EventRepository, OrderRepository],
})
export class RepositoriesModule {}
