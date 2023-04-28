import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { CronHandlerModule } from './infrastructure/background/cron-handler/cron-handler.module';
import { JobConsumerModule } from './infrastructure/background/job-consumers/job-consumer.module';

@Module({
  imports: [ControllersModule, CronHandlerModule, JobConsumerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
