import { Injectable, NotFoundException } from '@nestjs/common';
import { LiveSessionState } from '@prisma/client-activity';
import { PrismaActivityService } from '../../../prisma/prisma-activity.service';
import { UsersService } from '../../users/services/users.service';
import {
  CreateLiveSessionDto,
  UpdateLiveSessionDto,
  UpsertLiveStatusDto,
} from '../dto/live.dto';

@Injectable()
export class LiveService {
  constructor(
    private readonly prisma: PrismaActivityService,
    private readonly usersService: UsersService,
  ) {}

  async upsertStatus(dto: UpsertLiveStatusDto) {
    await this.ensureUserExists(dto.userId);
    const { userId, ...statusFields } = dto;
    return this.prisma.liveStatus.upsert({
      where: { userId },
      update: statusFields,
      create: dto,
    });
  }

  async getStatus(userId: string) {
    await this.ensureUserExists(userId);
    return (
      (await this.prisma.liveStatus.findUnique({ where: { userId } })) ?? {
        userId,
        isOnline: false,
        isLiveEnabled: false,
        currentLiveTitle: null,
      }
    );
  }

  async createSession(dto: CreateLiveSessionDto) {
    await this.ensureUserExists(dto.userId);

    const now = new Date();
    return this.prisma.liveSession.create({
      data: {
        ...dto,
        status: dto.status ?? LiveSessionState.CREATED,
        ...(dto.status === LiveSessionState.LIVE ? { startedAt: now } : {}),
        ...(dto.status === LiveSessionState.ENDED ? { endedAt: now } : {}),
      }
    });
  }

  async findSessionsByUser(userId: string) {
    await this.ensureUserExists(userId);
    return this.prisma.liveSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateSession(id: string, dto: UpdateLiveSessionDto) {
    const existing = await this.findSession(id);
    const now = new Date();

    return this.prisma.liveSession.update({
      where: { id },
      data: {
        ...dto,
        startedAt:
          dto.status === LiveSessionState.LIVE && !existing.startedAt
            ? now
            : existing.startedAt,
        endedAt: dto.status === LiveSessionState.ENDED ? now : existing.endedAt,
      }
    });
  }

  async removeSession(id: string) {
    await this.findSession(id);
    return this.prisma.liveSession.delete({ where: { id } });
  }

  private async ensureUserExists(userId: string) {
    await this.usersService.findOne(userId);
  }

  private async findSession(id: string) {
    const session = await this.prisma.liveSession.findUnique({ where: { id } });
    if (!session) {
      throw new NotFoundException('Sesion live no encontrada.');
    }
    return session;
  }
}
