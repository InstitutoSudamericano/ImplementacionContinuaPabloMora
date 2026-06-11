import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { MusicController } from './controllers/music.controller';
import { MusicService } from './services/music.service';

@Module({
  imports: [UsersModule],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
