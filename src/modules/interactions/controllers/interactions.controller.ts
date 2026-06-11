import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { InteractionType } from '@prisma/client-activity';
import { CreateInteractionDto, InteractionActionDto } from '../dto/interaction.dto';
import { InteractionsService } from '../services/interactions.service';

@ApiTags('interactions')

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @ApiOperation({ summary: 'Crear interaccion personalizada (type manual)' })
  @Post()
  create(@Body() dto: CreateInteractionDto) {
    return this.interactionsService.create(dto);
  }

  @ApiOperation({ summary: '❤️ Like — Si hay like mutuo se genera un Match automatico', description: 'Body: { fromUserId, toUserId }' })
  @Post('like')
  like(@Body() dto: InteractionActionDto) {
    return this.interactionsService.create({ ...dto, type: InteractionType.LIKE });
  }

  @ApiOperation({ summary: '💔 Dislike — No le interesa el usuario' })
  @Post('dislike')
  dislike(@Body() dto: InteractionActionDto) {
    return this.interactionsService.create({
      ...dto,
      type: InteractionType.DISLIKE,
    });
  }

  @ApiOperation({ summary: '🚫 Avoid — No mostrar mas este usuario' })
  @Post('avoid')
  avoid(@Body() dto: InteractionActionDto) {
    return this.interactionsService.create({ ...dto, type: InteractionType.AVOID });
  }

  @ApiOperation({ summary: '🚨 Report — Reportar usuario por comportamiento inapropiado' })
  @Post('report')
  report(@Body() dto: InteractionActionDto) {
    return this.interactionsService.create({
      ...dto,
      type: InteractionType.REPORT,
    });
  }

  @ApiOperation({ summary: 'Ver todas las interacciones de un usuario' })
  @ApiParam({ name: 'userId', description: 'ID UUID del usuario' })
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.interactionsService.findByUser(userId);
  }
}
