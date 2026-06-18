import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MatchesModule } from '../matches/matches.module';
import { UsersModule } from '../users/users.module';
import { InteractionsController } from './controllers/interactions.controller';
import { InteractionsRepository } from './repositories/interactions.repository';
import { InteractionsService } from './services/interactions.service';

@Module({
  imports: [PrismaModule, UsersModule, MatchesModule],
  controllers: [InteractionsController],
  providers: [InteractionsRepository, InteractionsService],
  exports: [InteractionsService, InteractionsRepository],
})
export class InteractionsModule {}
