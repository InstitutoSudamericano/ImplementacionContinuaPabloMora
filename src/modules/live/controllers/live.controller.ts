import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LiveService } from '../services/live.service';
import {
  CreateLiveSessionDto,
  UpdateLiveSessionDto,
  UpsertLiveStatusDto,
} from '../dto/live.dto';

@ApiTags('live')

@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @ApiOperation({ summary: 'Activar/desactivar estado live de un usuario', description: 'Crea o actualiza el estado live del usuario' })
  @Post('status')
  upsertStatus(@Body() dto: UpsertLiveStatusDto) {
    return this.liveService.upsertStatus(dto);
  }

  @ApiOperation({ summary: 'Ver estado live de un usuario' })
  @ApiParam({ name: 'userId', description: 'ID UUID del usuario' })
  @Get('status/:userId')
  getStatus(@Param('userId') userId: string) {
    return this.liveService.getStatus(userId);
  }

  @ApiOperation({ summary: 'Crear sesion live' })
  @Post('sessions')
  createSession(@Body() dto: CreateLiveSessionDto) {
    return this.liveService.createSession(dto);
  }

  @ApiOperation({ summary: 'Ver sesiones live de un usuario' })
  @ApiParam({ name: 'userId', description: 'ID UUID del usuario' })
  @Get('sessions/user/:userId')
  findSessionsByUser(@Param('userId') userId: string) {
    return this.liveService.findSessionsByUser(userId);
  }

  @ApiOperation({ summary: 'Actualizar sesion live' })
  @ApiParam({ name: 'id', description: 'ID UUID de la sesion' })
  @Patch('sessions/:id')
  updateSession(@Param('id') id: string, @Body() dto: UpdateLiveSessionDto) {
    return this.liveService.updateSession(id, dto);
  }

  @ApiOperation({ summary: 'Eliminar sesion live' })
  @ApiParam({ name: 'id', description: 'ID UUID de la sesion' })
  @Delete('sessions/:id')
  removeSession(@Param('id') id: string) {
    return this.liveService.removeSession(id);
  }
}
