import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { LiveController } from './controllers/live.controller';
import { LiveRepository } from './repositories/live.repository';
import { LiveService } from './services/live.service';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [LiveController],
  providers: [LiveRepository, LiveService],
  exports: [LiveService, LiveRepository],
})
export class LiveModule {}
