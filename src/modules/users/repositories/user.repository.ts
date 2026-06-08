import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
      include: { subscription: true, liveStatus: true, musicItems: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { subscription: true, liveStatus: true, musicItems: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        subscription: true,
        liveStatus: true,
        musicItems: true,
        userRoles: { include: { role: true } },
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { userRoles: { include: { role: true } } },
    });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
      include: { subscription: true, liveStatus: true, musicItems: true },
    });
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getSubscriptionStatsRaw(): Promise<any[]> {
    return this.prisma.$queryRaw`
      SELECT 
        s."name" AS "subscriptionType", 
        COUNT(u."id")::INT AS "userCount",
        (s."price" * COUNT(u."id"))::FLOAT AS "estimatedRevenue"
      FROM "Subscription" s
      LEFT JOIN "User" u ON u."suscripcionId" = s."id"
      GROUP BY s."id", s."name", s."price"
      ORDER BY "userCount" DESC;
    `;
  }

  async getTopUsersByMatchesRaw(): Promise<any[]> {
    return this.prisma.$queryRaw`
      SELECT 
        u."id", 
        u."nombre", 
        u."email", 
        COUNT(m."id")::INT AS "matchCount"
      FROM "User" u
      LEFT JOIN "Match" m ON m."userAId" = u."id" OR m."userBId" = u."id"
      GROUP BY u."id", u."nombre", u."email"
      ORDER BY "matchCount" DESC
      LIMIT 5;
    `;
  }
}
