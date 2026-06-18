import { Injectable } from '@nestjs/common';
import { PrismaActivityService } from '../../../prisma/prisma-activity.service';

@Injectable()
export class ChatsRepository {
  constructor(private readonly prisma: PrismaActivityService) {}

  findMatchById(matchId: string) {
    return this.prisma.match.findUnique({
      where: { id: matchId },
      include: { chat: true },
    });
  }

  findByMatchId(matchId: string) {
    return this.prisma.chat.findUnique({
      where: { matchId },
      include: { match: true, messages: { orderBy: { createdAt: 'asc' } } },
    });
  }

  createChat(matchId: string) {
    return this.prisma.chat.create({
      data: { matchId },
      include: { match: true, messages: true },
    });
  }

  findById(id: string) {
    return this.prisma.chat.findUnique({
      where: { id },
      include: { match: true, messages: { orderBy: { createdAt: 'asc' } } },
    });
  }

  createMessage(chatId: string, senderId: string, content: string) {
    return this.prisma.message.create({
      data: { chatId, senderId, content },
      include: { chat: true },
    });
  }
}
