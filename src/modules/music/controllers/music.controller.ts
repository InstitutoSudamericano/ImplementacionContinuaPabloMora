import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MusicService } from '../services/music.service';
import { CreateMusicItemDto, UpdateMusicItemDto } from '../dto/music.dto';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  create(@Body() dto: CreateMusicItemDto) {
    return this.musicService.create(dto);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.musicService.findByUser(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMusicItemDto) {
    return this.musicService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicService.remove(id);
  }
}
