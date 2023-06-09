// This interface defines optional filtering properties for orders
import { EventType } from './looksrare.interface';

export interface OrderFilterParams {
  order_type?: EventType; // Type of order, can be any string
  price_min?: number; // Minimum price of order, if provided
  price_max?: number; // Maximum price of order, if provided
  offset?: number; // The number of records to skip before returning results, if provided
}
