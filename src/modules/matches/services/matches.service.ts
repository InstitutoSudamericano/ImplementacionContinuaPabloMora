import { Injectable } from '@nestjs/common';
import { MatchRepository } from '../repositories/match.repository';

@Injectable()
export class MatchesService {
  constructor(private readonly repository: MatchRepository) {}

  findByUser(userId: string) {
    return this.repository.findByUser(userId);
  }

  async createCanonical(userOneId: string, userTwoId: string) {
    const [userAId, userBId] = [userOneId, userTwoId].sort();
    const existingMatch = await this.repository.findByUsers(userAId, userBId);

    if (existingMatch) {
      return existingMatch;
    }

    return this.repository.create(userAId, userBId);
  }
}
