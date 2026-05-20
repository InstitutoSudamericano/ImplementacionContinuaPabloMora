import { Module } from '@nestjs/common';
import { MatchRepository } from './repositories/match.repository';
import { MatchesController } from './controllers/matches.controller';
import { MatchesService } from './services/matches.service';

@Module({
  controllers: [MatchesController],
  providers: [MatchRepository, MatchesService],
  exports: [MatchRepository, MatchesService],
})
export class MatchesModule {}
