import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { MusicController } from './controllers/music.controller';
import { MusicRepository } from './repositories/music.repository';
import { MusicService } from './services/music.service';

@Module({
  imports: [UsersModule],
  controllers: [MusicController],
  providers: [MusicRepository, MusicService],
})
export class MusicModule {}
