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
    const queryBuilder = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.collection', 'collection')
      .leftJoinAndSelect('collection.order', 'order');

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
      page: params.offset,
      limit: 10,
    });
  }
}
