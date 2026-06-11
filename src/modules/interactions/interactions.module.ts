import { Module } from '@nestjs/common';
import { MatchesModule } from '../matches/matches.module';
import { UsersModule } from '../users/users.module';
import { InteractionsController } from './controllers/interactions.controller';
import { InteractionsService } from './services/interactions.service';

@Module({
  imports: [UsersModule, MatchesModule],
  controllers: [InteractionsController],
  providers: [InteractionsService],
  exports: [InteractionsService],
})
export class InteractionsModule {}
