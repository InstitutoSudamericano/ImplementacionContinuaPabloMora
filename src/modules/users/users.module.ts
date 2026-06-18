import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';

@Module({
  imports: [PrismaModule, SubscriptionsModule],
  controllers: [UsersController],
  providers: [UserRepository, UsersService],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
