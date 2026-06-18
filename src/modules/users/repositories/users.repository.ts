import { Injectable } from '@nestjs/common';
import { PrismaUsersService } from '../../../prisma/prisma-users.service';
import { Prisma } from '@prisma/client-users';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaUsersService) {}

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
      include: { subscription: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { subscription: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        subscription: true,
        userRoles: { include: { role: true } },
      },
    });
  }

  findByEmailSilent(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { userRoles: { include: { role: true } } },
    });
  }

  update(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
      include: { subscription: true },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  findSubscriptionById(id: string) {
    return this.prisma.subscription.findUnique({ where: { id } });
  }

  async getStatsSummary() {
    const [subscriptions, topUsers] = await Promise.all([
      this.prisma.$queryRaw`
        SELECT 
          s."name" AS "subscriptionType", 
          COUNT(u."id")::INT AS "userCount",
          (s."price" * COUNT(u."id"))::FLOAT AS "estimatedRevenue"
        FROM "Subscription" s
        LEFT JOIN "User" u ON u."suscripcionId" = s."id"
        GROUP BY s."id", s."name", s."price"
        ORDER BY "userCount" DESC;
      `,
      this.prisma.user.findMany({ take: 5 }).then(users => users.map(u => ({
        id: u.id,
        nombre: u.nombre,
        email: u.email,
        matchCount: 0
      }))),
    ]);
    return {
      subscriptions,
      topUsers,
    };
  }
}
