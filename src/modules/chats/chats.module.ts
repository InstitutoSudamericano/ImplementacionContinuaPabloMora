import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { ChatsController } from './controllers/chats.controller';
import { ChatsRepository } from './repositories/chats.repository';
import { ChatsService } from './services/chats.service';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [ChatsController],
  providers: [ChatsRepository, ChatsService],
  exports: [ChatsService, ChatsRepository],
})
export class ChatsModule {}
