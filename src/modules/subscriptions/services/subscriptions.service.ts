import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionRepository } from '../repositories/subscription.repository';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from '../dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly repository: SubscriptionRepository) {}

  create(dto: CreateSubscriptionDto) {
    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const subscription = await this.repository.findById(id);
    if (!subscription) {
      throw new NotFoundException('Suscripcion no encontrada.');
    }
    return subscription;
  }

  async update(id: string, dto: UpdateSubscriptionDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repository.delete(id);
  }
}
