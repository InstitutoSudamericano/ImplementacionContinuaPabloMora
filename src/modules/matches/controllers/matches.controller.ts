import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { MatchesService } from '../services/matches.service';

@ApiTags('matches')

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @ApiOperation({ summary: 'Ver matches de un usuario', description: 'Devuelve todos los matches donde participa el usuario' })
  @ApiParam({ name: 'userId', description: 'ID UUID del usuario' })
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.matchesService.findByUser(userId);
  }
}
