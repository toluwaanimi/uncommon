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

  // This function initializes the Redis database with data from the leaderBoard array.
  private async initializeData(): Promise<void> {
    // Loop through each entry in the leaderBoard array.
    for (let i = 0; i < leaderBoard.length; i++) {
      const entry = leaderBoard[i];
      // Construct the Redis key for the current entry.
      const entryKey = `${entry.id}`;
      // Construct the Redis key for the current entry's collection.
      const collectionKey = `${entry.collection_id}`;

      // Add the current entry's ID to the collection set.
      await this.redisService.sadd(collectionKey, entry.id);

      // Increment the follower count for the current entry in the entries:followers sorted set.
      await this.redisService.zincrby('entries:followers', 1, entryKey);
      // Increment the follower count for the current entry's collection in the collections:followers sorted set.
      await this.redisService.zincrby(
        'collections:followers',
        1,
        collectionKey,
      );
    }
  }

  /**
   * Get the top 10 collections with the highest scores
   * @returns {Promise<ServiceInterface>} - An object containing an array of data
   */
  async getTopCollections(): Promise<ServiceInterface> {
    try {
      const result = await this.redisService.zrevrange(
        'collections:followers',
        0,
        9,
        'WITHSCORES',
      );

      const collections = {};
      for (let i = 0; i < result.length; i += 2) {
        const collectionKey = result[i];
        const count = parseInt(result[i + 1], 10);
        collections[collectionKey] = count;
      }
      return { data: collections };
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
      const result = await this.redisService.zrevrange(
        'entries:followers',
        0,
        9,
        'WITHSCORES',
      );

      const entries = {};
      for (let i = 0; i < result.length; i += 2) {
        const entryKey = result[i];
        const count = parseInt(result[i + 1], 10);
        entries[entryKey] = count;
      }
      return {
        data: entries,
      };
    } catch (e) {
      throw new BadRequestException('Something went wrong');
    }
  }
}
