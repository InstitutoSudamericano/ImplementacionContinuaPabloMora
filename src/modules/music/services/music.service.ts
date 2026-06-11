import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaActivityService } from '../../../prisma/prisma-activity.service';
import { UsersService } from '../../users/services/users.service';
import { CreateMusicItemDto, UpdateMusicItemDto } from '../dto/music.dto';

@Injectable()
export class MusicService {
  constructor(
    private readonly prisma: PrismaActivityService,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateMusicItemDto) {
    await this.usersService.findOne(dto.userId);

    return this.prisma.musicItem.create({
      data: {
        ...dto,
        source: dto.source ?? 'SPOTIFY_MOCK',
      }
    });
  }

  findByUser(userId: string) {
    return this.prisma.musicItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, dto: UpdateMusicItemDto) {
    await this.findOne(id);
    return this.prisma.musicItem.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.musicItem.delete({ where: { id } });
  }

  async findOne(id: string) {
    const item = await this.prisma.musicItem.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('Cancion no encontrada.');
    }
    return item;
  }
}
