import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ChatsModule } from './modules/chats/chats.module';
import { InteractionsModule } from './modules/interactions/interactions.module';
import { LiveModule } from './modules/live/live.module';
import { MatchesModule } from './modules/matches/matches.module';
import { MusicModule } from './modules/music/music.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SubscriptionsModule,
    UsersModule,
    MatchesModule,
    InteractionsModule,
    ChatsModule,
    MusicModule,
    LiveModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
