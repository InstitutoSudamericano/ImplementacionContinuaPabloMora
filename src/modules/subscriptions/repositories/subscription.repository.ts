import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from '../dto/create-subscription.dto';

@Injectable()
export class SubscriptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateSubscriptionDto) {
    return this.prisma.subscription.create({ data });
  }

  findAll() {
    return this.prisma.subscription.findMany({ orderBy: { price: 'asc' } });
  }

  findById(id: string) {
    return this.prisma.subscription.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateSubscriptionDto) {
    return this.prisma.subscription.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.subscription.delete({ where: { id } });
  }
}
