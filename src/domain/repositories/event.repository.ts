// This is an interface for an event repository that extends the IBaseRepository interface
import { IBaseRepository } from './base-repository.interface';
import { EventModel } from '../model/event.model';
import { Pagination } from 'nestjs-typeorm-paginate';
import { OrderFilterParams } from '../adapters/get-event-use-case.interface';

export interface IEventRepository extends IBaseRepository<EventModel> {
  getCollectionListing(
    params: OrderFilterParams, // Parameters for filtering and pagination
  ): Promise<Pagination<EventModel>>; // Get a paginated list of events based on the provided parameters
}
