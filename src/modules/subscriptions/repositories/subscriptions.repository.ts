import { Injectable } from '@nestjs/common';
import { PrismaUsersService } from '../../../prisma/prisma-users.service';
import { Prisma } from '@prisma/client-users';

@Injectable()
export class SubscriptionsRepository {
  constructor(private readonly prisma: PrismaUsersService) { }

  create(data: Prisma.SubscriptionCreateInput) {
    return this.prisma.subscription.create({ data });
  }

  findAll() {
    return this.prisma.subscription.findMany({ orderBy: { price: 'asc' } });
  }

  findById(id: string) {
    return this.prisma.subscription.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.SubscriptionUpdateInput) {
    return this.prisma.subscription.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.subscription.delete({ where: { id } });
  }
}
