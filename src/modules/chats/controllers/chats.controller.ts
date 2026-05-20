import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ChatsService } from '../services/chats.service';
import { CreateChatDto, CreateMessageDto } from '../dto/chat.dto';

@ApiTags('chats')

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @ApiOperation({ summary: 'Crear chat para un match', description: 'Si el chat ya existe, devuelve el existente' })
  @Post()
  createChat(@Body() dto: CreateChatDto) {
    return this.chatsService.createChat(dto);
  }

  @ApiOperation({ summary: 'Obtener chat por matchId' })
  @ApiParam({ name: 'matchId', description: 'ID UUID del match' })
  @Get('match/:matchId')
  getByMatch(@Param('matchId') matchId: string) {
    return this.chatsService.getChatByMatch(matchId);
  }

  @ApiOperation({ summary: 'Ver historial de mensajes del chat' })
  @ApiParam({ name: 'chatId', description: 'ID UUID del chat' })
  @Get(':chatId/messages')
  getMessages(@Param('chatId') chatId: string) {
    return this.chatsService.getMessages(chatId);
  }

  @ApiOperation({ summary: 'Enviar mensaje en el chat', description: 'El sender debe ser participante del match' })
  @ApiParam({ name: 'chatId', description: 'ID UUID del chat' })
  @Post(':chatId/messages')
  createMessage(
    @Param('chatId') chatId: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.chatsService.createMessage(chatId, dto);
  }
}
