import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../users/repositories/user.repository';
import { CreateMusicItemDto, UpdateMusicItemDto } from '../dto/music.dto';
import { MusicRepository } from '../repositories/music.repository';

@Injectable()
export class MusicService {
  constructor(
    private readonly repository: MusicRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto: CreateMusicItemDto) {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado para la musica.');
    }

    return this.repository.create({
      ...dto,
      source: dto.source ?? 'SPOTIFY_MOCK',
    });
  }

  findByUser(userId: string) {
    return this.repository.findByUser(userId);
  }

  async update(id: string, dto: UpdateMusicItemDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repository.delete(id);
  }

  async findOne(id: string) {
    const item = await this.repository.findById(id);
    if (!item) {
      throw new NotFoundException('Cancion no encontrada.');
    }
    return item;
  }
}
