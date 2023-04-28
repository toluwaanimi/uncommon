/**
 * Imports
 */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { IOrderRepository } from '../../domain/repositories/order.repository';

/**
 * Order repository class, implements IOrderRepository interface
 */
export class OrderRepository implements IOrderRepository {
  /**
   * Order repository constructor
   * @param orderRepository
   */
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  /**
   * Retrieves the floor price of a collection based on its ID
   * @param id
   * @returns the minimum price of the collection
   */
  async getCollectionFloorPrice(id: string): Promise<number> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .select('MIN(price)')
      .where('order.collectionId = :collectionId', { collectionId: id })
      .getRawOne();
  }
}
