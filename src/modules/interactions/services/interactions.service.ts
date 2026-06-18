import { BadRequestException, Injectable } from '@nestjs/common';
import { InteractionType } from '@prisma/client-activity';
import { InteractionsRepository } from '../repositories/interactions.repository';
import { MatchesService } from '../../matches/services/matches.service';
import { UsersService } from '../../users/services/users.service';
import { CreateInteractionDto } from '../dto/interaction.dto';

@Injectable()
export class InteractionsService {
  constructor(
    private readonly interactionsRepository: InteractionsRepository,
    private readonly usersService: UsersService,
    private readonly matchesService: MatchesService,
  ) {}

  async create(dto: CreateInteractionDto) {
    if (dto.fromUserId === dto.toUserId) {
      throw new BadRequestException('Un usuario no puede interactuar consigo mismo.');
    }

    const [fromUser, toUser] = await Promise.all([
      this.usersService.findOne(dto.fromUserId).catch(() => null),
      this.usersService.findOne(dto.toUserId).catch(() => null),
    ]);

    if (!fromUser || !toUser) {
      throw new BadRequestException('Ambos usuarios deben existir.');
    }

    const { fromUserId, toUserId, ...rest } = dto;
    const interaction = await this.interactionsRepository.upsertInteraction(
      fromUserId, 
      toUserId, 
      dto as any, 
      rest as any
    );

    if (dto.type === InteractionType.LIKE) {
      const reciprocalLike = await this.interactionsRepository.findReciprocalLike(
        dto.fromUserId,
        dto.toUserId
      );

      if (reciprocalLike) {
        const match = await this.matchesService.createCanonical(
          dto.fromUserId,
          dto.toUserId,
        );

        return {
          interaction,
          matchCreated: true,
          match,
        };
      }
    }

    return {
      interaction,
      matchCreated: false,
    };
  }

  findByUser(userId: string) {
    return this.interactionsRepository.findByUser(userId);
  }

  async findExistingMatch(userOneId: string, userTwoId: string) {
    const [userAId, userBId] = [userOneId, userTwoId].sort();
    return this.interactionsRepository.findExistingMatch(userAId, userBId);
  }
}
