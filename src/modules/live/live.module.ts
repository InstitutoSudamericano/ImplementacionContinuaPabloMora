import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { LiveController } from './controllers/live.controller';
import { LiveRepository } from './repositories/live.repository';
import { LiveService } from './services/live.service';

@Module({
  imports: [UsersModule],
  controllers: [LiveController],
  providers: [LiveRepository, LiveService],
})
export class LiveModule {}
