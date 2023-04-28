import { Module } from '@nestjs/common';
import { LooksrareService } from './looksrare.service';

@Module({
  controllers: [],
  providers: [LooksrareService],
  exports: [LooksrareService],
})
export class LooksrareModule {}
