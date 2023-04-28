// This is a Nest.js module for the CronHandlerService
import { Module } from '@nestjs/common';
import { CronHandlerService } from './cron-handler.service';
import { LooksrareModule } from '../../services/looksrare/looksrare.module';
import { BullModule } from '@nestjs/bull';
import { envConfig } from '../../config/environment-config/environment.config';

@Module({
  imports: [
    LooksrareModule, // Import the LooksrareModule
    BullModule.forRoot({
      // Set up Bull module with Redis configuration
      redis: {
        host: envConfig.getRedisURL(),
        port: envConfig.getRedisPort(),
        password: envConfig.getRedisPassword(),
      },
    }),
    BullModule.registerQueue({
      // Register a Bull queue with the name 'events'
      name: 'events',
    }),
  ],
  controllers: [], // No controllers needed for this module
  providers: [CronHandlerService], // Provide the CronHandlerService
})
export class CronHandlerModule {}
