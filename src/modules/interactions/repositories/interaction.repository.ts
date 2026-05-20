import { Injectable } from '@nestjs/common';
import { InteractionType } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateInteractionDto } from '../dto/interaction.dto';

@Injectable()
export class InteractionRepository {
  constructor(private readonly prisma: PrismaService) {}

  upsert(data: CreateInteractionDto) {
    const { fromUserId, toUserId, ...rest } = data;

    return this.prisma.interaction.upsert({
      where: { fromUserId_toUserId: { fromUserId, toUserId } },
      update: rest,
      create: data,
      include: { fromUser: true, toUser: true },
    });
  }

  findByUser(userId: string) {
    return this.prisma.interaction.findMany({
      where: { OR: [{ fromUserId: userId }, { toUserId: userId }] },
      include: { fromUser: true, toUser: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  findSpecific(fromUserId: string, toUserId: string, type?: InteractionType) {
    return this.prisma.interaction.findFirst({
      where: {
        fromUserId,
        toUserId,
        ...(type ? { type } : {}),
      },
    });
  }
}
