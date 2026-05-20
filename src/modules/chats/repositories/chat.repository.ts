import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ChatRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(matchId: string) {
    return this.prisma.chat.create({
      data: { matchId },
      include: {
        match: { include: { userA: true, userB: true } },
        messages: true,
      },
    });
  }

  findByMatchId(matchId: string) {
    return this.prisma.chat.findUnique({
      where: { matchId },
      include: {
        match: { include: { userA: true, userB: true } },
        messages: { include: { sender: true }, orderBy: { createdAt: 'asc' } },
      },
    });
  }

  findById(chatId: string) {
    return this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        match: { include: { userA: true, userB: true } },
        messages: { include: { sender: true }, orderBy: { createdAt: 'asc' } },
      },
    });
  }

  createMessage(chatId: string, senderId: string, content: string) {
    return this.prisma.message.create({
      data: { chatId, senderId, content },
      include: { sender: true, chat: true },
    });
  }
}
