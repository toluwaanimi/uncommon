import { Controller, Get } from '@nestjs/common';
import { LeaderboardService } from '../../services/leaderboard/leaderboard.service';
import { HttpResponse } from '../../common/helpers/response.helper';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  // Retrieves the top entries on the leaderboard
  @Get('entries')
  async getTopEntries() {
    const response = await this.leaderboardService.getTopEntries();
    return HttpResponse.send('Top entries retrieved', response);
  }

  // Retrieves the top collections on the leaderboard
  @Get('collections')
  async getTopCollections() {
    const response = await this.leaderboardService.getTopCollections();
    return HttpResponse.send('Top collections retrieved', response);
  }
}
