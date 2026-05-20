import { BadRequestException, Injectable } from '@nestjs/common';
import { InteractionType } from '@prisma/client';
import { MatchRepository } from '../../matches/repositories/match.repository';
import { MatchesService } from '../../matches/services/matches.service';
import { UserRepository } from '../../users/repositories/user.repository';
import { CreateInteractionDto } from '../dto/interaction.dto';
import { InteractionRepository } from '../repositories/interaction.repository';

@Injectable()
export class InteractionsService {
  constructor(
    private readonly repository: InteractionRepository,
    private readonly userRepository: UserRepository,
    private readonly matchRepository: MatchRepository,
    private readonly matchesService: MatchesService,
  ) {}

  async create(dto: CreateInteractionDto) {
    if (dto.fromUserId === dto.toUserId) {
      throw new BadRequestException('Un usuario no puede interactuar consigo mismo.');
    }

    const [fromUser, toUser] = await Promise.all([
      this.userRepository.findById(dto.fromUserId),
      this.userRepository.findById(dto.toUserId),
    ]);

    if (!fromUser || !toUser) {
      throw new BadRequestException('Ambos usuarios deben existir.');
    }

    const interaction = await this.repository.upsert(dto);

    if (dto.type === InteractionType.LIKE) {
      const reciprocalLike = await this.repository.findSpecific(
        dto.toUserId,
        dto.fromUserId,
        InteractionType.LIKE,
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
    return this.repository.findByUser(userId);
  }

  async findExistingMatch(userOneId: string, userTwoId: string) {
    const [userAId, userBId] = [userOneId, userTwoId].sort();
    return this.matchRepository.findByUsers(userAId, userBId);
  }
}
