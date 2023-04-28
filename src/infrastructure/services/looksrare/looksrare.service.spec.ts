// Import required modules and interfaces
import { Test, TestingModule } from '@nestjs/testing';
import { LooksrareService } from './looksrare.service';
import { IEventsQueryParams } from '../../../domain/adapters/looksrare.interface';

// Describe test suite for LooksrareService
describe('LooksrareService', () => {
  let service: LooksrareService;

  // Before each test case, initialize the testing module
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LooksrareService],
    }).compile();

    // Get the LooksrareService instance from the testing module
    service = module.get<LooksrareService>(LooksrareService);
  });

  // Test case to check if LooksrareService instance is defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test case to fetch events from Looksrare
  it('should fetch events from Looksrare', async () => {
    // Set query parameters for the event fetch
    const params: IEventsQueryParams = {
      collection: '',
      tokenId: '',
      from: '',
      to: '',
      type: 'CANCEL_OFFER',
      pagination: {
        first: 1,
        cursor: 1,
      },
    };
    // Expect the fetch to be successful with a status of true
    expect((await service.getEvents({})).status).toBe(true);
  });
});
