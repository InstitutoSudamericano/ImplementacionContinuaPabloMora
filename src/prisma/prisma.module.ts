import { Global, Module } from '@nestjs/common';
import { PrismaUsersService } from './prisma-users.service';
import { PrismaActivityService } from './prisma-activity.service';

@Global()
@Module({
  providers: [PrismaUsersService, PrismaActivityService],
  exports: [PrismaUsersService, PrismaActivityService],
})
export class PrismaModule {}
