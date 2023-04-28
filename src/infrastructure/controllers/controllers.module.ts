// Import required modules and controllers
import { Module } from '@nestjs/common';
import { EventController } from './events/event.controller';
import { GeneralUseCaseProxyModule } from '../usecase-proxy/general-usecase-proxy.module';
import { LeaderboardController } from './leaderboard/leaderboard.controller';
import { LeaderboardModule } from '../services/leaderboard/leaderboard.module';

@Module({
  // Import and register the GeneralUseCaseProxyModule and LeaderboardModule
  imports: [GeneralUseCaseProxyModule.register(), LeaderboardModule],
  // Declare the controllers that are included in this module
  controllers: [EventController, LeaderboardController],
  // Declare any providers that are included in this module
  providers: [],
})
// Export the module class
export class ControllersModule {}
