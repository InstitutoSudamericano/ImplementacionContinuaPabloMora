import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SubscriptionsService } from '../services/subscriptions.service';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from '../dto/create-subscription.dto';

@ApiTags('subscriptions')

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @ApiOperation({ summary: 'Crear plan de suscripcion', description: 'Valores validos para name: FREE, GOLD, PREMIUM, PLATINO, BRONCE' })
  @Post()
  create(@Body() dto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(dto);
  }

  @ApiOperation({ summary: 'Listar todos los planes' })
  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener plan por ID' })
  @ApiParam({ name: 'id', description: 'ID UUID de la suscripcion' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionsService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar plan' })
  @ApiParam({ name: 'id', description: 'ID UUID de la suscripcion' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubscriptionDto) {
    return this.subscriptionsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Eliminar plan' })
  @ApiParam({ name: 'id', description: 'ID UUID de la suscripcion' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionsService.remove(id);
  }
}
