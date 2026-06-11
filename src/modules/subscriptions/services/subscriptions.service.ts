import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaUsersService } from '../../../prisma/prisma-users.service';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from '../dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaUsersService) {}

  create(dto: CreateSubscriptionDto) {
    return this.prisma.subscription.create({ data: dto });
  }

  findAll() {
    return this.prisma.subscription.findMany({ orderBy: { price: 'asc' } });
  }

  async findOne(id: string) {
    const subscription = await this.prisma.subscription.findUnique({ where: { id } });
    if (!subscription) {
      throw new NotFoundException('Suscripcion no encontrada.');
    }
    return subscription;
  }

  async update(id: string, dto: UpdateSubscriptionDto) {
    await this.findOne(id);
    return this.prisma.subscription.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.subscription.delete({ where: { id } });
  }
}
