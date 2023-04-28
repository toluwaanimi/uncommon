import { BadRequestException, Injectable } from '@nestjs/common';
import {
  DataItem,
  ILeaderBoard,
} from '../../../domain/adapters/leader-board.interface';
import { leaderBoard } from '../../../../data/leader-board';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { ServiceInterface } from '../../../domain/adapters/service.interface';

@Injectable()
export class LeaderboardService implements ILeaderBoard {
  constructor(@InjectRedis() private readonly redisService: Redis) {
    // initialize the Redis database with data from the leaderBoard array
    this.initializeData().then();
  }

  /**
   * Initializes the Redis database with data from the leaderBoard array
   */
  private async initializeData(): Promise<void> {
    leaderBoard.forEach((item: DataItem) => {
      const { entry_id, collection_id, follower_id } = item;

      // Increment the score of a member in a sorted set by the given increment.
      // If the member does not exist in the sorted set, it is added with increment as its score
      this.redisService.zincrby('entries', follower_id, entry_id);
      this.redisService.zincrby('collections', follower_id, collection_id);
    });
  }

  /**
   * Get the top 10 collections with the highest scores
   * @returns {Promise<ServiceInterface>} - An object containing an array of data
   */
  async getTopCollections(): Promise<ServiceInterface> {
    try {
      const response = await this.redisService.zrevrange(
        'collections',
        0,
        9,
        'WITHSCORES',
      );

      const data = response.reduce((acc, curr, index, array) => {
        if (index % 2 === 0) {
          acc.push({
            follower_id: array[index + 1],
            collection_id: curr,
          });
        }
        return acc;
      }, []);
      return {
        data: data,
      };
    } catch (e) {
      throw new BadRequestException('Something went wrong');
    }
  }

  /**
   * Get the top 10 entries with the highest scores
   * @returns {Promise<ServiceInterface>} - An object containing an array of data
   */
  async getTopEntries(): Promise<ServiceInterface> {
    try {
      const response = await this.redisService.zrevrange(
        'entries',
        0,
        9,
        'WITHSCORES',
      );
      const data = response.reduce((acc, curr, index, array) => {
        if (index % 2 === 0) {
          acc.push({
            follower_id: array[index + 1],
            entry_id: curr,
          });
        }
        return acc;
      }, []);
      return {
        data,
      };
    } catch (e) {
      throw new BadRequestException('Something went wrong');
    }
  }
}
