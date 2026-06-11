import { Injectable } from '@nestjs/common';
import { PrismaActivityService } from '../../../prisma/prisma-activity.service';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class MatchesService {
  constructor(
    private readonly prisma: PrismaActivityService,
    private readonly usersService: UsersService,
  ) {}

  async findByUser(userId: string) {
    const matches = await this.prisma.match.findMany({
      where: { OR: [{ userAId: userId }, { userBId: userId }] },
      include: { chat: { include: { messages: { orderBy: { createdAt: 'asc' } } } } },
      orderBy: { createdAt: 'desc' },
    });
    
    // Enrich with user info since they are in a separate DB
    const enrichedMatches = await Promise.all(
      matches.map(async (match) => {
        const [userA, userB] = await Promise.all([
          this.usersService.findOne(match.userAId).catch(() => null),
          this.usersService.findOne(match.userBId).catch(() => null),
        ]);

        return {
          id: match.id,
          descripcion: `Match: ${userA?.nombre} y ${userB?.nombre}`,
          fechaDeMatch: match.createdAt,
          chat: match.chat ? {
            id: match.chat.id,
            mensajes: match.chat.messages.map(m => {
              const senderName = m.senderId === userA?.id ? userA?.nombre : userB?.nombre;
              return `${senderName}: ${m.content}`;
            })
          } : null,
        };
      })
    );

    return enrichedMatches;
  }

  async createCanonical(userOneId: string, userTwoId: string) {
    const [userAId, userBId] = [userOneId, userTwoId].sort();
    const existingMatch = await this.prisma.match.findUnique({
      where: { userAId_userBId: { userAId, userBId } },
      include: { chat: true },
    });

    if (existingMatch) {
      return existingMatch;
    }

    return this.prisma.match.create({
      data: { userAId, userBId },
      include: { chat: true },
    });
  }
}
