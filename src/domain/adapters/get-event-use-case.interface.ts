// This interface defines optional filtering properties for orders
export interface OrderFilterParams {
  order_type?: string; // Type of order, can be any string
  price_min?: number; // Minimum price of order, if provided
  price_max?: number; // Maximum price of order, if provided
  page?: number; // The page number of results to return, if provided
  offset?: number; // The number of records to skip before returning results, if provided
}
