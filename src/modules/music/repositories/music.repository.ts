import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMusicItemDto, UpdateMusicItemDto } from '../dto/music.dto';

@Injectable()
export class MusicRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateMusicItemDto) {
    return this.prisma.musicItem.create({ data });
  }

  findByUser(userId: string) {
    return this.prisma.musicItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string) {
    return this.prisma.musicItem.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateMusicItemDto) {
    return this.prisma.musicItem.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.musicItem.delete({ where: { id } });
  }
}
