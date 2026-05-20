import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  CreateLiveSessionDto,
  UpdateLiveSessionDto,
  UpsertLiveStatusDto,
} from '../dto/live.dto';

@Injectable()
export class LiveRepository {
  constructor(private readonly prisma: PrismaService) {}

  upsertStatus(data: UpsertLiveStatusDto) {
    const { userId, ...statusFields } = data;
    return this.prisma.liveStatus.upsert({
      where: { userId },
      update: statusFields,
      create: data,
    });
  }

  findStatusByUser(userId: string) {
    return this.prisma.liveStatus.findUnique({ where: { userId } });
  }

  createSession(data: CreateLiveSessionDto & { startedAt?: Date; endedAt?: Date }) {
    return this.prisma.liveSession.create({ data });
  }

  findSessionsByUser(userId: string) {
    return this.prisma.liveSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findSessionById(id: string) {
    return this.prisma.liveSession.findUnique({ where: { id } });
  }

  updateSession(
    id: string,
    data: UpdateLiveSessionDto & { startedAt?: Date | null; endedAt?: Date | null },
  ) {
    return this.prisma.liveSession.update({ where: { id }, data });
  }

  deleteSession(id: string) {
    return this.prisma.liveSession.delete({ where: { id } });
  }
}
