import { Module } from '@nestjs/common';
import { MatchesModule } from '../matches/matches.module';
import { UsersModule } from '../users/users.module';
import { ChatsController } from './controllers/chats.controller';
import { ChatRepository } from './repositories/chat.repository';
import { ChatsService } from './services/chats.service';

@Module({
  imports: [MatchesModule, UsersModule],
  controllers: [ChatsController],
  providers: [ChatRepository, ChatsService],
})
export class ChatsModule {}
