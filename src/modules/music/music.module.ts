import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { MusicController } from './controllers/music.controller';
import { MusicRepository } from './repositories/music.repository';
import { MusicService } from './services/music.service';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [MusicController],
  providers: [MusicRepository, MusicService],
  exports: [MusicService, MusicRepository],
})
export class MusicModule {}
