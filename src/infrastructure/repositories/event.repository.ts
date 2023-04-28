import { IEventRepository } from '../../domain/repositories/event.repository';
import { Event } from '../entities/event.entity';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { EventModel } from '../../domain/model/event.model';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderFilterParams } from '../../domain/adapters/get-event-use-case.interface';

export class EventRepository implements IEventRepository {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getCollectionListing(
    params: OrderFilterParams,
  ): Promise<Pagination<EventModel>> {
    // Create the query builder
    // Create a query builder for the `event` entity
    const queryBuilder = await this.eventRepository
      .createQueryBuilder('event')

      // Join the `collection` entity with `event`
      .leftJoinAndSelect('event.collection', 'collection')

      // Join the `order` entity with `collection`
      .leftJoinAndSelect('collection.order', 'order')

      .leftJoinAndSelect('collection.token', 'token')

      // Filter the results where the length of the `item_ids` array in `order` is 0
      // exclude multi-item orders
      .where('COALESCE(ARRAY_LENGTH(order.item_ids, 1), 0) = 0');

    // Filter by order type if specified
    if (params.order_type) {
      queryBuilder.andWhere('event.type = :type', {
        type: params.order_type,
      });
    }

    // Filter by minimum price if specified
    if (params.price_min) {
      queryBuilder.andWhere('order.price >= :minPrice', {
        minPrice: params.price_min,
      });
    }

    // Filter by maximum price if specified
    if (params.price_max) {
      queryBuilder.andWhere('order.price <= :maxPrice', {
        maxPrice: params.price_max,
      });
    }

    // Sort by price, descending if maximum price is specified, otherwise ascending
    await queryBuilder.orderBy(
      'order.price',
      params.price_max ? 'DESC' : 'ASC',
    );

    // Paginate the results and return them
    return await paginate(queryBuilder, {
      page: params.offset ? params.offset : 1,
      limit: 10,
    });
  }
}
