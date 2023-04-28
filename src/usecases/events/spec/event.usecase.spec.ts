// Import necessary modules, interfaces and classes
import { ILogger } from '../../../domain/logger/logger.interface';
import { IEventRepository } from '../../../domain/repositories/event.repository';
import { IOrderRepository } from '../../../domain/repositories/order.repository';
import { GetEventOrdersUseCase } from '../get-event-orders.use-case';
import { OrderFilterParams } from '../../../domain/adapters/get-event-use-case.interface';

// Start test suite
describe('EventService', () => {
  let getEventOrdersUseCase: GetEventOrdersUseCase;
  let logger: ILogger;
  let eventRepository: IEventRepository;
  let orderRepository: IOrderRepository;

  // Setup test dependencies
  beforeEach(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();

    eventRepository = {} as IEventRepository;

    const pagination = {
      items: [
        {
          collection: {
            order: {
              id: '1',
              price: 1,
              endTime: 1,
              signer: '',
            },
            id: '1',
          },
          id: '1',
          seller: '',
        },
      ],
      meta: {
        currentPage: 1,
        itemCount: 3,
        itemsPerPage: 10,
        totalPages: 1,
      },
    };

    eventRepository.getCollectionListing = jest
      .fn()
      .mockResolvedValue(pagination);

    orderRepository = {} as IOrderRepository;
    orderRepository.getCollectionFloorPrice = jest.fn().mockResolvedValue(10);

    getEventOrdersUseCase = new GetEventOrdersUseCase(
      eventRepository,
      orderRepository,
      logger,
    );
  });

  // Start test block for getCollectionListing method
  describe('getCollectionListing', () => {
    it('should return a pagination object', async () => {
      const filterParams: OrderFilterParams = { page: 1, offset: 10 };
      const pagination = await eventRepository.getCollectionListing(
        filterParams,
      );
      expect(pagination).toBeDefined();
      expect(pagination.items.length).toBeGreaterThan(0);
    });
  });

  // Start test block for getCollectionFloorPrice method
  describe('getCollectionFloorPrice', () => {
    it('should return a number', async () => {
      const id = '1';
      const floorPrice = await orderRepository.getCollectionFloorPrice(id);
      expect(floorPrice).toBeDefined();
    });
  });

  // Start test block for getOrderByFilter method
  describe('getOrderByFilter', () => {
    it('should return orders', async () => {
      expect(await getEventOrdersUseCase.getOrders({})).toBeDefined();
    });
  });
});

// End of the test suite
