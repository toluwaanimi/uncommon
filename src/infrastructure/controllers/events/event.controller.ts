import { Controller, Get, Inject, Query } from '@nestjs/common';
import { UseCaseProxy } from '../../usecase-proxy/usecase-proxy';
import { EVENT_USECASE_CONSTANTS } from '../../usecase-proxy/events/events-usecase.proxy';
import { GetEventOrdersUseCase } from '../../../usecases/events/get-event-orders.use-case';
import { OrderFilterParamsDTO } from '../../common/dto/get-order-filter.dto';
import { HttpResponse } from '../../common/helpers/response.helper';

/**
 * This controller handles HTTP requests for event orders.
 * It injects a `UseCaseProxy` instance for the `GetEventOrdersUseCase` use case.
 * The `GetEventOrdersUseCase` use case retrieves a list of event orders based on the provided query parameters.
 * The response is wrapped in an `HttpResponse` helper object before being returned to the client.
 */
@Controller('orders')
export class EventController {
  constructor(
    @Inject(
      EVENT_USECASE_CONSTANTS.GET_TOKEN_AND_ORDER_EVENT_PROTOCOL_ACTIVITIES,
    )
    private readonly useCaseUseCaseProxy: UseCaseProxy<GetEventOrdersUseCase>,
  ) {}

  /**
   * This endpoint retrieves a list of event orders based on the provided query parameters.
   * The query parameters are parsed into an `OrderFilterParamsDTO` object and passed to the `GetEventOrdersUseCase` use case.
   * The response is wrapped in an `HttpResponse` helper object before being returned to the client.
   */
  @Get('')
  async getOrders(@Query() query: OrderFilterParamsDTO) {
    const response = await this.useCaseUseCaseProxy
      .getInstance()
      .getOrders(query);
    return HttpResponse.send('Orders retrieved', response);
  }
}
