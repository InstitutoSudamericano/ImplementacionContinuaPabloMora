import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionsRepository } from '../repositories/subscriptions.repository';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from '../dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly subscriptionsRepository: SubscriptionsRepository) {}

  create(dto: CreateSubscriptionDto) {
    return this.subscriptionsRepository.create(dto);
  }

  findAll() {
    return this.subscriptionsRepository.findAll();
  }

  async findOne(id: string) {
    const subscription = await this.subscriptionsRepository.findById(id);
    if (!subscription) {
      throw new NotFoundException('Suscripcion no encontrada.');
    }
    return subscription;
  }

  async update(id: string, dto: UpdateSubscriptionDto) {
    await this.findOne(id);
    return this.subscriptionsRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.subscriptionsRepository.remove(id);
  }
}
