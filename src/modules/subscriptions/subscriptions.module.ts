import { Module } from '@nestjs/common';
import { SubscriptionsController } from './controllers/subscriptions.controller';
import { SubscriptionRepository } from './repositories/subscription.repository';
import { SubscriptionsService } from './services/subscriptions.service';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionRepository, SubscriptionsService],
  exports: [SubscriptionRepository, SubscriptionsService],
})
export class SubscriptionsModule {}
