import { Injectable, NotFoundException } from '@nestjs/common';
import { MusicRepository } from '../repositories/music.repository';
import { UsersService } from '../../users/services/users.service';
import { CreateMusicItemDto, UpdateMusicItemDto } from '../dto/music.dto';

@Injectable()
export class MusicService {
  constructor(
    private readonly musicRepository: MusicRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateMusicItemDto) {
    await this.usersService.findOne(dto.userId);

    return this.musicRepository.create({
      ...dto,
      source: dto.source ?? 'SPOTIFY_MOCK',
    });
  }

  findByUser(userId: string) {
    return this.musicRepository.findByUser(userId);
  }

  async update(id: string, dto: UpdateMusicItemDto) {
    await this.findOne(id);
    return this.musicRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.musicRepository.remove(id);
  }

  async findOne(id: string) {
    const item = await this.musicRepository.findById(id);
    if (!item) {
      throw new NotFoundException('Cancion no encontrada.');
    }
    return item;
  }
}
