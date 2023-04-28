// This is a Nest.js service for handling a cron job
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LooksrareService } from '../../services/looksrare/looksrare.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class CronHandlerService {
  constructor(
    private readonly looksrareService: LooksrareService, // Inject the LooksrareService
    @InjectQueue('events') private readonly eventsQueue: Queue, // Inject the Bull queue with the name 'events'
  ) {}

  // @Cron(CronExpression.EVERY_30_SECONDS) // Cron job expression, runs every 30 seconds
  // async handleCron() {
  //   const events = await this.looksrareService.getEvents(); // Get events from LooksrareService
  //   if (events.status && events.data) { // Check if events have data
  //     for (const event of events.data) { // Loop through each event
  //       await this.eventsQueue.add('processEvent', event); // Add each event to the Bull queue
  //       console.log(`Job added to queue for event with id ${event.id}`);
  //     }
  //   }
  // }
}
