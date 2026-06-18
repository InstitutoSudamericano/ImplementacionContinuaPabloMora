import { Injectable } from '@nestjs/common';
import { PrismaActivityService } from '../../../prisma/prisma-activity.service';
import { Prisma } from '@prisma/client-activity';

@Injectable()
export class MusicRepository {
  constructor(private readonly prisma: PrismaActivityService) {}

  create(data: Prisma.MusicItemCreateInput) {
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

  update(id: string, data: Prisma.MusicItemUpdateInput) {
    return this.prisma.musicItem.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.musicItem.delete({ where: { id } });
  }
}
