import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class MatchRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.match.findUnique({
      where: { id },
      include: { userA: true, userB: true, chat: true },
    });
  }

  findByUsers(userAId: string, userBId: string) {
    return this.prisma.match.findUnique({
      where: { userAId_userBId: { userAId, userBId } },
      include: { userA: true, userB: true, chat: true },
    });
  }

  create(userAId: string, userBId: string) {
    return this.prisma.match.create({
      data: { userAId, userBId },
      include: { userA: true, userB: true, chat: true },
    });
  }

  findByUser(userId: string) {
    return this.prisma.match.findMany({
      where: { OR: [{ userAId: userId }, { userBId: userId }] },
      include: { userA: true, userB: true, chat: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
