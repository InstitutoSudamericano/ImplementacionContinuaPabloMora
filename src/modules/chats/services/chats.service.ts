import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MatchRepository } from '../../matches/repositories/match.repository';
import { UserRepository } from '../../users/repositories/user.repository';
import { CreateChatDto, CreateMessageDto } from '../dto/chat.dto';
import { ChatRepository } from '../repositories/chat.repository';

@Injectable()
export class ChatsService {
  constructor(
    private readonly repository: ChatRepository,
    private readonly matchRepository: MatchRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createChat(dto: CreateChatDto) {
    const match = await this.findMatch(dto.matchId);
    const existingChat = await this.repository.findByMatchId(dto.matchId);

    if (existingChat) {
      return existingChat;
    }

    return this.repository.create(match.id);
  }

  async getChatByMatch(matchId: string) {
    await this.findMatch(matchId);
    const chat = await this.repository.findByMatchId(matchId);
    if (!chat) {
      throw new NotFoundException('No existe un chat para ese match.');
    }
    return chat;
  }

  async getMessages(chatId: string) {
    const chat = await this.repository.findById(chatId);
    if (!chat) {
      throw new NotFoundException('Chat no encontrado.');
    }
    return chat.messages;
  }

  async createMessage(chatId: string, dto: CreateMessageDto) {
    const chat = await this.repository.findById(chatId);
    if (!chat) {
      throw new NotFoundException('Chat no encontrado.');
    }

    const sender = await this.userRepository.findById(dto.senderId);
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

    return this.repository.createMessage(chatId, dto.senderId, dto.content);
  }

  private async findMatch(matchId: string) {
    const match = await this.matchRepository.findById(matchId);

    if (!match) {
      throw new NotFoundException('Match no encontrado.');
    }

    return match;
  }
}
