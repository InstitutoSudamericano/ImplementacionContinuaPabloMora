import { Injectable } from '@nestjs/common';
import { PrismaActivityService } from '../../../prisma/prisma-activity.service';

@Injectable()
export class MatchesRepository {
  constructor(private readonly prisma: PrismaActivityService) {}

  findByUser(userId: string) {
    return this.prisma.match.findMany({
      where: { OR: [{ userAId: userId }, { userBId: userId }] },
      include: { chat: { include: { messages: { orderBy: { createdAt: 'asc' } } } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  findByUsersCanonical(userAId: string, userBId: string) {
    return this.prisma.match.findUnique({
      where: { userAId_userBId: { userAId, userBId } },
      include: { chat: true },
    });
  }

  createCanonical(userAId: string, userBId: string) {
    return this.prisma.match.create({
      data: { userAId, userBId },
      include: { chat: true },
    });
  }
}
