import { UseCaseProxy } from '../usecase-proxy';
import { LoggerService } from '../../logger/logger.service';
import { EventRepository } from '../../repositories/event.repository';
import { OrderRepository } from '../../repositories/order.repository';
import { GetEventOrdersUseCase } from '../../../usecases/events/get-event-orders.use-case';

// Define constants for event use case proxy
export const EVENT_USECASE_CONSTANTS = {
  GET_TOKEN_AND_ORDER_EVENT_PROTOCOL_ACTIVITIES:
    'GET_TOKEN_AND_ORDER_EVENT_USE_CASE_PROXY',
};

// Create a provider for the GetEventOrdersUseCase proxy
export const GET_TOKEN_ORDER_USE_CASE_PROXY = {
  // Dependencies that will be injected into the factory function
  inject: [EventRepository, OrderRepository, LoggerService],
  // Unique identifier for this provider
  provide:
    EVENT_USECASE_CONSTANTS.GET_TOKEN_AND_ORDER_EVENT_PROTOCOL_ACTIVITIES,
  // Factory function that creates the proxy for GetEventOrdersUseCase
  useFactory: (
    eventRepository: EventRepository,
    orderRepository: OrderRepository,
    loggerService: LoggerService,
  ) =>
    new UseCaseProxy(
      new GetEventOrdersUseCase(
        eventRepository,
        orderRepository,
        loggerService,
      ),
    ),
};
