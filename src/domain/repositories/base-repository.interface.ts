// This is an interface for a base repository
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

export interface IBaseRepository<T> {
  findOne?(query: FindOneOptions<T>): Promise<T | null>; // Find one entity based on the provided query

  find?(options?: FindManyOptions<T>): Promise<T[]>; // Find all entities based on the provided options

  save?(entity: T): Promise<T>; // Save the provided entity

  update?(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | FindOptionsWhere<T>, // Criteria to find the entity
    partialEntity: QueryDeepPartialEntity<T>, // Updated entity
  ): Promise<UpdateResult>; // Update the entity and return the result

  paginate?(
    option: IPaginationOptions, // Pagination options
    searchOptions?: FindOptionsWhere<T> | FindManyOptions<T>, // Search options
  ): Promise<Pagination<T>>; // Paginate the entities based on the provided options
}
