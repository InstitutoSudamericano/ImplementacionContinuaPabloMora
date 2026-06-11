import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaActivityService } from '../../../prisma/prisma-activity.service';
import { UsersService } from '../../users/services/users.service';
import { CreateChatDto, CreateMessageDto } from '../dto/chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    private readonly prisma: PrismaActivityService,
    private readonly usersService: UsersService,
  ) {}

  async createChat(dto: CreateChatDto) {
    const match = await this.findMatch(dto.matchId);
    const existingChat = await this.prisma.chat.findUnique({
      where: { matchId: dto.matchId },
      include: { match: true, messages: { orderBy: { createdAt: 'asc' } } },
    });

    if (existingChat) {
      return existingChat;
    }

    return this.prisma.chat.create({
      data: { matchId: match.id },
      include: { match: true, messages: true },
    });
  }

  async getChatByMatch(matchId: string) {
    await this.findMatch(matchId);
    const chat = await this.prisma.chat.findUnique({
      where: { matchId },
      include: { match: true, messages: { orderBy: { createdAt: 'asc' } } },
    });
    if (!chat) {
      throw new NotFoundException('No existe un chat para ese match.');
    }
    return chat;
  }

  async getMessages(chatId: string) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { match: true, messages: { orderBy: { createdAt: 'asc' } } },
    });
    if (!chat) {
      throw new NotFoundException('Chat no encontrado.');
    }
    return chat.messages;
  }

  async createMessage(chatId: string, dto: CreateMessageDto) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { match: true, messages: { orderBy: { createdAt: 'asc' } } },
    });
    if (!chat) {
      throw new NotFoundException('Chat no encontrado.');
    }

    const sender = await this.usersService.findOne(dto.senderId).catch(() => null);
    if (!sender) {
      throw new NotFoundException('Remitente no encontrado.');
    }

    const isParticipant = [chat.match.userAId, chat.match.userBId].includes(
      dto.senderId,
    );

    if (!isParticipant) {
      throw new BadRequestException(
        'El remitente no pertenece al match del chat.',
      );
    }

    return this.prisma.message.create({
      data: { chatId, senderId: dto.senderId, content: dto.content },
      include: { chat: true },
    });
  }

  private async findMatch(matchId: string) {
    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
      include: { chat: true },
    });

    if (!match) {
      throw new NotFoundException('Match no encontrado.');
    }

    return match;
  }
}
