import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import {
  EVENT_USECASE_CONSTANTS,
  GET_TOKEN_ORDER_USE_CASE_PROXY,
} from './events/events-usecase.proxy';
import { RepositoriesModule } from '../repositories/repositories.module';
import { LeaderboardModule } from '../services/leaderboard/leaderboard.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    LoggerModule,
    RepositoriesModule,
    LeaderboardModule,
    ScheduleModule.forRoot(),
  ],
})
export class GeneralUseCaseProxyModule {
  // This static method registers the GeneralUseCaseProxyModule and returns a DynamicModule object.
  static register(): DynamicModule {
    return {
      module: GeneralUseCaseProxyModule,

      // The GET_TOKEN_ORDER_USE_CASE_PROXY provider provides access to the getTokenAndOrderEventProtocolActivities use case instance.
      providers: [GET_TOKEN_ORDER_USE_CASE_PROXY],

      // The EVENT_USECASE_CONSTANTS.GET_TOKEN_AND_ORDER_EVENT_PROTOCOL_ACTIVITIES is exported to be used in other modules that import this module.
      exports: [
        EVENT_USECASE_CONSTANTS.GET_TOKEN_AND_ORDER_EVENT_PROTOCOL_ACTIVITIES,
      ],
    };
  }
}
