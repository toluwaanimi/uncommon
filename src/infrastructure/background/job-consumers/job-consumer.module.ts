import { Module } from '@nestjs/common';
import { LooksrareModule } from '../../services/looksrare/looksrare.module';
import { EventsProcessor } from './event.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../entities/event.entity';
import { Collection } from '../../entities/collection.entity';
import { Token } from '../../entities/token.entity';
import { Order } from '../../entities/order.entity';

@Module({
  imports: [
    LooksrareModule, // Importing the LooksrareModule
    TypeOrmModule.forFeature([Event, Collection, Token, Order]), // Importing TypeOrmModule to add entities to the module context
  ],
  controllers: [], // No controllers in this module
  providers: [EventsProcessor], // Providing the EventsProcessor as a service
})
export class JobConsumerModule {}
