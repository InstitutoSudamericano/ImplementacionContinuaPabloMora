import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ChatsRepository } from '../repositories/chats.repository';
import { UsersService } from '../../users/services/users.service';
import { CreateChatDto, CreateMessageDto } from '../dto/chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly usersService: UsersService,
  ) {}

  async createChat(dto: CreateChatDto) {
    const match = await this.findMatch(dto.matchId);
    const existingChat = await this.chatsRepository.findByMatchId(dto.matchId);

    if (existingChat) {
      return existingChat;
    }

    return this.chatsRepository.createChat(match.id);
  }

  async getChatByMatch(matchId: string) {
    await this.findMatch(matchId);
    const chat = await this.chatsRepository.findByMatchId(matchId);
    if (!chat) {
      throw new NotFoundException('No existe un chat para ese match.');
    }
    return chat;
  }

  async getMessages(chatId: string) {
    const chat = await this.chatsRepository.findById(chatId);
    if (!chat) {
      throw new NotFoundException('Chat no encontrado.');
    }
    return chat.messages;
  }

  async createMessage(chatId: string, dto: CreateMessageDto) {
    const chat = await this.chatsRepository.findById(chatId);
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

    return this.chatsRepository.createMessage(chatId, dto.senderId, dto.content);
  }

  private async findMatch(matchId: string) {
    const match = await this.chatsRepository.findMatchById(matchId);

    if (!match) {
      throw new NotFoundException('Match no encontrado.');
    }

    return match;
  }
}
