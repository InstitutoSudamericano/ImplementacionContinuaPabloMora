import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { MatchesController } from './controllers/matches.controller';
import { MatchesRepository } from './repositories/matches.repository';
import { MatchesService } from './services/matches.service';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [MatchesController],
  providers: [MatchesRepository, MatchesService],
  exports: [MatchesService, MatchesRepository],
})
export class MatchesModule {}
