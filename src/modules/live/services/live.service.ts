import { Injectable, NotFoundException } from '@nestjs/common';
import { LiveSessionState } from '@prisma/client-activity';
import { LiveRepository } from '../repositories/live.repository';
import { UsersService } from '../../users/services/users.service';
import {
  CreateLiveSessionDto,
  UpdateLiveSessionDto,
  UpsertLiveStatusDto,
} from '../dto/live.dto';

@Injectable()
export class LiveService {
  constructor(
    private readonly liveRepository: LiveRepository,
    private readonly usersService: UsersService,
  ) {}

  async upsertStatus(dto: UpsertLiveStatusDto) {
    await this.ensureUserExists(dto.userId);
    const { userId, ...statusFields } = dto;
    return this.liveRepository.upsertStatus(dto.userId, dto, statusFields);
  }

  async getStatus(userId: string) {
    await this.ensureUserExists(userId);
    return (
      (await this.liveRepository.findStatusByUser(userId)) ?? {
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
    return this.liveRepository.createSession({
      ...dto,
      status: dto.status ?? LiveSessionState.CREATED,
      ...(dto.status === LiveSessionState.LIVE ? { startedAt: now } : {}),
      ...(dto.status === LiveSessionState.ENDED ? { endedAt: now } : {}),
    });
  }

  async findSessionsByUser(userId: string) {
    await this.ensureUserExists(userId);
    return this.liveRepository.findSessionsByUser(userId);
  }

  async updateSession(id: string, dto: UpdateLiveSessionDto) {
    const existing = await this.findSession(id);
    const now = new Date();

    return this.liveRepository.updateSession(id, {
      ...dto,
      startedAt:
        dto.status === LiveSessionState.LIVE && !existing.startedAt
          ? now
          : existing.startedAt,
      endedAt: dto.status === LiveSessionState.ENDED ? now : existing.endedAt,
    });
  }

  async removeSession(id: string) {
    await this.findSession(id);
    return this.liveRepository.removeSession(id);
  }

  private async ensureUserExists(userId: string) {
    await this.usersService.findOne(userId);
  }

  private async findSession(id: string) {
    const session = await this.liveRepository.findSessionById(id);
    if (!session) {
      throw new NotFoundException('Sesion live no encontrada.');
    }
    return session;
  }
}
