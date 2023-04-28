import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { envConfig } from '../../config/environment-config/environment.config';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: envConfig.getRedisURL(),
        port: envConfig.getRedisPort(),
      },
    }),
  ],
  providers: [LeaderboardService],
  exports: [LeaderboardService],
})
export class LeaderboardModule {}
