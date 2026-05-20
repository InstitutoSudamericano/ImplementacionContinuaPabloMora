import { Injectable, NotFoundException } from '@nestjs/common';
import { LiveSessionState } from '@prisma/client';
import { UserRepository } from '../../users/repositories/user.repository';
import {
  CreateLiveSessionDto,
  UpdateLiveSessionDto,
  UpsertLiveStatusDto,
} from '../dto/live.dto';
import { LiveRepository } from '../repositories/live.repository';

@Injectable()
export class LiveService {
  constructor(
    private readonly repository: LiveRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async upsertStatus(dto: UpsertLiveStatusDto) {
    await this.ensureUserExists(dto.userId);
    return this.repository.upsertStatus(dto);
  }

  async getStatus(userId: string) {
    await this.ensureUserExists(userId);
    return (
      (await this.repository.findStatusByUser(userId)) ?? {
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
    return this.repository.createSession({
      ...dto,
      status: dto.status ?? LiveSessionState.CREATED,
      ...(dto.status === LiveSessionState.LIVE ? { startedAt: now } : {}),
      ...(dto.status === LiveSessionState.ENDED ? { endedAt: now } : {}),
    });
  }

  async findSessionsByUser(userId: string) {
    await this.ensureUserExists(userId);
    return this.repository.findSessionsByUser(userId);
  }

  async updateSession(id: string, dto: UpdateLiveSessionDto) {
    const existing = await this.findSession(id);
    const now = new Date();

    return this.repository.updateSession(id, {
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
    return this.repository.deleteSession(id);
  }

  private async ensureUserExists(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }
  }

  private async findSession(id: string) {
    const session = await this.repository.findSessionById(id);
    if (!session) {
      throw new NotFoundException('Sesion live no encontrada.');
    }
    return session;
  }
}
