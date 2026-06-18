import { Injectable } from '@nestjs/common';
import { PrismaActivityService } from '../../../prisma/prisma-activity.service';
import { Prisma } from '@prisma/client-activity';

@Injectable()
export class LiveRepository {
  constructor(private readonly prisma: PrismaActivityService) {}

  upsertStatus(userId: string, data: Prisma.LiveStatusUpsertArgs['create'], updateData: Prisma.LiveStatusUpsertArgs['update']) {
    return this.prisma.liveStatus.upsert({
      where: { userId },
      update: updateData,
      create: data,
    });
  }

  findStatusByUser(userId: string) {
    return this.prisma.liveStatus.findUnique({ where: { userId } });
  }

  createSession(data: Prisma.LiveSessionCreateInput) {
    return this.prisma.liveSession.create({ data });
  }

  findSessionsByUser(userId: string) {
    return this.prisma.liveSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  updateSession(id: string, data: Prisma.LiveSessionUpdateInput) {
    return this.prisma.liveSession.update({
      where: { id },
      data,
    });
  }

  removeSession(id: string) {
    return this.prisma.liveSession.delete({ where: { id } });
  }

  findSessionById(id: string) {
    return this.prisma.liveSession.findUnique({ where: { id } });
  }
}
