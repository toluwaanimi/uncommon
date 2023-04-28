import { Test, TestingModule } from '@nestjs/testing';
import { LeaderboardService } from './leaderboard.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { envConfig } from '../../config/environment-config/environment.config';

// Define a mock Redis client
const mockRedisService = () => ({
  zincrby: jest.fn(() => Promise.resolve(1)), // Mock the Redis "zincrby" method
  zrevrange: jest.fn(
    (_, start, end, option, callback) =>
      callback(null, ['entry1', 100, 'entry2', 90]), // Mock the Redis "zrevrange" method
  ),
});

describe('LeaderboardService', () => {
  let service: LeaderboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RedisModule.forRoot({
          config: {
            host: envConfig.getRedisURL(),
            port: envConfig.getRedisPort(),
            password: envConfig.getRedisPassword(),
          },
        }),
      ],
      providers: [
        LeaderboardService,
        {
          provide: 'Redis',
          useFactory: mockRedisService,
        },
      ],
    }).compile();

    // Get an instance of the leaderboard service
    service = module.get<LeaderboardService>(LeaderboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined(); // Test that the leaderboard service is defined
  });

  it('should get top entries', async () => {
    const entries = await service.getTopEntries(); // Call the "getTopEntries" method of the leaderboard service
    expect(entries).toBeDefined(); // Test that the result is defined
    expect(entries.data.length).toBeGreaterThanOrEqual(0); // Test that the result contains at least one entry
  });

  it('should get top collections', async () => {
    const collections = await service.getTopCollections(); // Call the "getTopCollections" method of the leaderboard service
    expect(collections).toBeDefined(); // Test that the result is defined
    expect(collections.data.length).toBeGreaterThanOrEqual(0); // Test that the result contains at least one collection
  });
});
