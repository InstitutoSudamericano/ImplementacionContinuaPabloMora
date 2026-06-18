import { Injectable } from '@nestjs/common';
import { PrismaActivityService } from '../../../prisma/prisma-activity.service';
import { Prisma, InteractionType } from '@prisma/client-activity';

@Injectable()
export class InteractionsRepository {
  constructor(private readonly prisma: PrismaActivityService) {}

  upsertInteraction(fromUserId: string, toUserId: string, data: Prisma.InteractionUpsertArgs['create'], updateData: Prisma.InteractionUpsertArgs['update']) {
    return this.prisma.interaction.upsert({
      where: { fromUserId_toUserId: { fromUserId, toUserId } },
      update: updateData,
      create: data,
    });
  }

  findReciprocalLike(fromUserId: string, toUserId: string) {
    return this.prisma.interaction.findFirst({
      where: {
        fromUserId: toUserId,
        toUserId: fromUserId,
        type: InteractionType.LIKE,
      },
    });
  }

  findByUser(userId: string) {
    return this.prisma.interaction.findMany({
      where: { OR: [{ fromUserId: userId }, { toUserId: userId }] },
      orderBy: { updatedAt: 'desc' },
    });
  }

  findExistingMatch(userAId: string, userBId: string) {
    return this.prisma.match.findUnique({
      where: { userAId_userBId: { userAId, userBId } },
    });
  }
}
