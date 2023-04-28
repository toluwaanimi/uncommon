// This is an interface for an order repository that extends the IBaseRepository interface
import { IBaseRepository } from './base-repository.interface';
import { OrderModel } from '../model/order.model';

export interface IOrderRepository extends IBaseRepository<OrderModel> {
  getCollectionFloorPrice(id: string): Promise<number>; // Get the floor price for the specified collection id
}
